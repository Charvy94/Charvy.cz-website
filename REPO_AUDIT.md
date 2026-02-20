# Repository Audit (extension-oriented)

Date: 2026-02-20  
Scope: full repo (`src/`, `php-backend/`, root tooling/docs)

## 1) Repo orientation

### Product purpose & runtime
- **Purpose**: Multi-page personal/business website (`charvy.cz`) with sections for photography, workshop/shop, blog, TTRPG, legal pages, social links, and account/dashboard pages. Frontend routes are registered in `src/App.tsx` (`/`, `/workshop`, `/blog`, `/auth`, `/dashboard`, etc.).
- **Runtime**:
  - **Frontend**: React SPA, built by Vite, served as static assets.
  - **Backend**: standalone PHP API endpoints under `php-backend/` for auth/cart/orders/contact.
- **Primary stack**:
  - TypeScript + React + React Router + Tailwind + shadcn-style component set (`package.json`).
  - PHP + PDO + MySQL-style schema assumptions (`php-backend/*.php`).

### Entrypoints and boot
- Frontend boot path:
  1. `src/main.tsx` mounts `<App />`.
  2. `src/App.tsx` wires providers (`QueryClientProvider`, `HelmetProvider`, theme/auth/cart/language contexts) and routing.
- Backend entrypoints:
  - `php-backend/login.php`, `register.php`, `logout.php`, `cart.php`, `orders.php`, `contact.php`.
  - Shared config and helper functions live in `php-backend/config.php`.
- Build-time packaging:
  - Vite plugin in `vite.config.ts` copies `php-backend/` into `dist/api/` on build.

### Top-level layout
- `src/`: React app source (pages, components, contexts, services, hooks).
- `php-backend/`: PHP API implementation.
- `public/`: static assets (`robots.txt`, `sitemap.xml`, etc.).
- Root configs: `package.json`, `tsconfig*.json`, `vite.config.ts`, `eslint.config.js`, Tailwind/PostCSS configs.

---

## 2) Build & run

### Current commands (from scripts)
- Install dependencies: `npm i` (lockfile present: `package-lock.json`).
- Dev server: `npm run dev` (Vite, configured on port **8080** in `vite.config.ts`).
- Build: `npm run build`.
- Lint: `npm run lint`.
- Preview: `npm run preview`.

### Toolchains/package managers discovered
- Node/npm project (`package.json` + `package-lock.json`).
- Also `bun.lockb` exists → mixed PM artifacts, potential drift.
- No `.nvmrc` / `.node-version` pinned runtime found.

### Build/lint verification (executed)
- `npm run build` ✅ (passes with chunk-size warning).
- `npm run lint` ❌ (5 errors, 12 warnings). Errors include:
  - `@typescript-eslint/no-empty-object-type` in `src/components/ui/command.tsx` and `src/components/ui/textarea.tsx`.
  - `@typescript-eslint/no-explicit-any` in `src/lib/translations.ts`, `src/services/cartApi.ts`.
  - `@typescript-eslint/no-require-imports` in `tailwind.config.ts`.

### Missing/inconsistent docs/scripts
- Root `README.md` is generic Lovable template and does not document PHP backend run/setup, schema migration requirements, or local dev proxy setup.
- `php-backend/README.md` suggests localhost origins `5173/4173`, but Vite dev port is `8080` in repo config.

---

## 3) Architecture & data flow

### Major modules
- `src/pages/*`: route-level page composition.
- `src/contexts/*`: app state providers (auth, cart, language, theme).
- `src/services/*`: API calls (`authApi`, `cartApi`, `contactApi`, `apiBase`).
- `php-backend/config.php`: CORS/env/db/shared helper functions.
- `php-backend/cart.php` and `orders.php`: e-commerce-like actions.

### Flow A (Auth): UI → API → session/local storage
1. User submits credentials in `src/pages/Auth.tsx`.
2. Frontend calls `loginUser()` from `src/services/authApi.ts` (POST `/login.php`, `credentials: include`).
3. Backend validates user/password in `php-backend/login.php`, sets `$_SESSION` values.
4. Frontend stores returned user payload to localStorage via `AuthContext` (`auth_user`).

### Flow B (Order): UI cart → API → DB write
1. User checks out from `src/components/CheckoutModal.tsx`.
2. Frontend calls `orderApi.createOrder()` (`src/services/cartApi.ts`, POST `/orders`).
3. Backend `php-backend/orders.php` reads `userId`, loads `cart_items`, inserts into `orders` and `order_items`, then clears cart.
4. Frontend clears local cart state via `CartContext.clearCart()`.

### Clean extension points
- Add new frontend feature as a route/page in `src/pages` + service in `src/services` + optional context if cross-cutting.
- Backend should add endpoint in `php-backend/` and centralize validation/session policy in `config.php` helper(s).
- For safer extension: introduce a backend `requireAuthenticatedUser()` helper and a typed API client layer (`src/services/*`) with consistent error parsing.

---

## 4) High-priority bug/risk findings

## 5) Security & reliability findings

### Critical
1. **Hard-coded database credentials committed in source**
   - Location: `php-backend/config.php` default constants include concrete `DB_USER` and `DB_PASS` fallback values.
   - Risk: immediate secret exposure, credential reuse compromise, accidental production misuse.
   - Fix:
     - Remove credential defaults from source.
     - Fail fast when env vars are absent.
     - Rotate exposed DB credentials now.

2. **Authentication/authorization bypass in cart & orders**
   - Location: `php-backend/cart.php` and `php-backend/orders.php` trust `userId` from path/body with no session-to-user binding check.
   - Risk: an attacker can read/modify another user cart/orders by sending another `userId`.
   - Fix:
     - Start session in these endpoints and enforce `$_SESSION['user_id']` exists.
     - Ignore incoming `userId` where authenticated; derive user ID from session.
     - Return 403 on mismatches.

### High
3. **CSRF exposure for cookie-authenticated endpoints**
   - Location: frontend sends `credentials: include`; backend accepts state-changing POST/PUT/DELETE without CSRF tokens and without explicit strict SameSite cookie settings.
   - Risk: cross-site request forgery for logged-in users.
   - Fix:
     - Enforce `SameSite=Strict/Lax`, secure cookies, and CSRF token validation for mutating routes.

4. **Order pricing integrity broken (server-side total = 0 placeholder)**
   - Location: `php-backend/orders.php` sets item price to `0` with TODO-style comment.
   - Risk: all orders may be persisted with zero value; accounting/business logic invalid.
   - Fix:
     - Load canonical product prices from DB.
     - Compute totals server-side from trusted catalog data.

### Medium
5. **Likely Apache rewrite mismatch in API `.htaccess`**
   - Location: `php-backend/.htaccess` rewrites `^api/cart` and `^api/orders`.
   - Risk: when file lives in `/api/` directory, per-dir rewrite path is typically `cart`/`orders`; current rules may not match and routes can fail.
   - Fix:
     - Rewrite from `^cart` and `^orders` (and test in target hosting).

6. **Lint pipeline failing in current branch**
   - Location: multiple files (see lint output).
   - Risk: quality gate is noisy; regressions easier to ship.
   - Fix:
     - Address current lint errors; optionally tune rules for generated shadcn files.

7. **Runtime/env inconsistency between docs and config**
   - Location: `vite.config.ts` uses port `8080`; `php-backend/config.php` CORS allows `5173/4173`; backend README references 5173.
   - Risk: local integration failures and false CORS errors.
   - Fix:
     - Align dev port and allowed origins in docs/config.

8. **TypeScript strictness is relaxed heavily**
   - Location: `tsconfig.json` (`strictNullChecks: false`, `noImplicitAny: false`, `allowJs: true`, `noUnusedLocals: false`).
   - Risk: lower static safety, harder safe extension at scale.
   - Fix:
     - Introduce staged strictness roadmap (start with `strictNullChecks`, selected folders).

---

## 6) Tests & quality

- No test framework/scripts discovered (`package.json` has no test command).
- Current confidence comes mostly from typecheck/build and manual behavior.
- Recommended near-term:
  - Add unit tests for API URL resolver and form validation logic.
  - Add integration tests for auth/cart/order happy + forbidden-path cases.
  - Add backend endpoint tests for session/user mismatch handling.

---

## 7) Documentation & DX assessment

Gaps:
- Root `README.md` is boilerplate; does not explain real product architecture or backend coupling.
- No DB schema/migration docs for tables used by backend (`users`, `cart_items`, `orders`, `order_items`).
- No "how to run frontend + php backend together locally" guide.

Recommended docs additions:
- `docs/architecture.md`: runtime boundaries + request flows.
- `docs/backend-schema.md`: required tables/columns/indexes and constraints.
- `docs/local-dev.md`: start commands, ports, env vars, CORS notes, troubleshooting.

---

## 8) Deliverables

## A) Repo map (quick reference)
- Entrypoints: `src/main.tsx`, `src/App.tsx`, `php-backend/*.php`.
- Modules: pages/components/contexts/services (frontend), endpoint scripts + shared config (backend).
- Dependency mgmt: npm (`package-lock.json`), possible bun artifact (`bun.lockb`).
- Run: `npm i` → `npm run dev` (port 8080).
- Build: `npm run build` (copies backend into `dist/api`).

## B) Prioritized issue list
1. **Critical**: hardcoded DB credentials (`php-backend/config.php`).
2. **Critical**: no server-side authz binding for `userId` (`php-backend/cart.php`, `orders.php`).
3. **High**: CSRF protection missing on cookie-authenticated mutating endpoints.
4. **High**: orders persisted with zero-price placeholder (`php-backend/orders.php`).
5. **Medium**: potential rewrite mismatch in `.htaccess`.
6. **Medium**: lint fails (errors present).
7. **Medium**: docs/config CORS+port mismatch.
8. **Medium**: low TypeScript strictness for long-term maintainability.

## C) Safe extension plan (short)
1. **Stabilize trust boundaries first**
   - Add centralized backend auth guard; forbid client-provided user IDs.
2. **Introduce typed contract layer**
   - Define request/response DTOs in `src/services` + shared API error format.
3. **Modularize backend by domain**
   - Extract repeated logic from flat endpoint scripts into shared service functions.
4. **Add minimum CI gates**
   - Build + lint + tests required before merge.
5. **Document extension conventions**
   - Route/page naming, service naming, validation policy, i18n + SEO expectations.

## D) Quick wins (small PR-sized)
1. **Secret hygiene PR**
   - Edit `php-backend/config.php`: remove credential fallback literals; require env.
2. **Authz enforcement PR**
   - In `cart.php`/`orders.php`, `session_start()` + session user enforcement helper.
3. **Port/CORS doc sync PR**
   - Update `php-backend/config.php` allowed localhost origins to include `8080`, and docs.
4. **Lint unblock PR**
   - Fix 5 lint errors currently breaking `npm run lint`.
5. **README overhaul PR**
   - Replace Lovable template with practical run/build/deploy + architecture docs links.

## E) Optional CI/pre-commit improvements
- Add GitHub Actions workflow:
  - `npm ci`
  - `npm run lint`
  - `npm run build`
- Add pre-commit hooks (Husky + lint-staged) for TS/TSX linting + formatting.
- Add dependency audit step (`npm audit --production`) with non-blocking report initially.

---

## Suggested next files to inspect (if deeper audit needed)
- `tailwind.config.ts` and generated `src/components/ui/*` to decide lint-rule strategy for shared templates.
- PHP hosting vhost config (outside repo) to validate `.htaccess` behavior.
- Actual DB schema SQL (currently not in repo), required to verify nullable/constraints/indexes and password column compatibility assumptions.
