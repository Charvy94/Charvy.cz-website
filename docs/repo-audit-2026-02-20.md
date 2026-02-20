# Repository Audit (2026-02-20)

## Scope
- Reviewed frontend (Vite/React/TypeScript) and bundled PHP backend (`php-backend`).
- Ran lint/build to validate current health.

## Repo map
- Frontend SPA boot: `src/main.tsx` -> `src/App.tsx`.
- API client layer: `src/services/*.ts`.
- State/context: `src/contexts/*.tsx`.
- Backend API: `php-backend/*.php`, copied into `dist/api` by a Vite build plugin.

## Highest-priority issues
1. **Critical: Hard-coded database credentials committed in repository**
   - `php-backend/config.php` defines fallback `DB_USER` and `DB_PASS` with real-looking values.
   - Risk: immediate credential disclosure and unauthorized DB access.

2. **Critical: Missing authorization checks on cart/order endpoints**
   - `cart.php` and `orders.php` trust `userId` from path/body and do not validate authenticated session ownership.
   - Risk: insecure direct object reference (IDOR), users can read/modify other users' cart/orders by changing IDs.

3. **High: Potentially broken API rewriting rules**
   - `php-backend/.htaccess` rewrites `^api/cart` and `^api/orders` even though this file is intended inside `/api`.
   - Risk: `/api/cart` and `/api/orders` routing may fail depending on Apache rewrite base behavior.

4. **High: Order pricing logic not implemented server-side**
   - `orders.php` sets all item prices to `0` during order creation.
   - Risk: incorrect totals, accounting inconsistencies, future payment integration breakage.

5. **High: Security boundary mismatch in auth state**
   - Frontend `AuthContext` trusts `localStorage` as auth truth; backend session existence is not revalidated on app load.
   - Risk: UI can appear authenticated while server session is expired; authorization behavior becomes inconsistent.

6. **Medium: Tailwind config duplicate `keyframes` key**
   - `tailwind.config.ts` declares `extend.keyframes` twice; earlier accordion animation config gets overwritten.
   - Risk: subtle style/runtime regressions and broken expected shadcn animations.

7. **Medium: Lint baseline currently failing**
   - `npm run lint` fails with TypeScript/ESLint errors and warnings; no passing quality gate.

## Build/run notes
- Works: `npm run build`.
- Fails: `npm run lint` (5 errors, 12 warnings at audit time).
- No test script in `package.json`; test coverage effectively absent.

## Extension plan (safe path)
1. **Security first milestone**
   - Rotate DB credentials and remove hardcoded defaults.
   - Add `requireAuthenticatedUser()` helper in PHP and enforce on cart/orders.
   - Derive effective `userId` from session, not client payload.

2. **Backend correctness milestone**
   - Introduce products/pricing source of truth server-side.
   - Validate cart product IDs + prices transactionally when creating orders.

3. **Frontend reliability milestone**
   - Add `/session` endpoint and hydrate auth context from server state.
   - Unify API error handling (`response.json()` guarded parsing + typed errors).

4. **Quality gates milestone**
   - Make lint pass; add `npm test` with Vitest + React Testing Library.
   - Add CI workflow for lint/build/test.

## Quick-win PR-sized tasks
- Replace committed DB defaults with empty placeholders + startup validation in `config.php`.
- Fix `.htaccess` rules to target local paths (`^cart`, `^orders`) and document Apache setup.
- Add auth guard helper in PHP and apply to cart/orders endpoints.
- Merge duplicated Tailwind `keyframes` declarations.
- Add `check` script (`npm run lint && npm run build`) and document in README.

