# PHP Backend API

## Setup Instructions

1. **Upload files** to your server in a folder (e.g., `/api/`).

2. **Install Node dependencies** in project root (required for Resend SDK used by contact endpoint):
   ```bash
   npm install
   ```

3. **Configure environment variables**:
   - Create `/api/.env` (same folder as `config.php`) with your credentials.
   - Or set env vars in your hosting control panel.

   ```bash
   # Database
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASS=your_db_password
   APP_ENV=production

   # Contact mail recipient
   CONTACT_RECIPIENT_EMAIL=admin@example.com
   CONTACT_RECIPIENT_NAME=Admin Name

   # Sender identity (optional defaults)
   CONTACT_FROM_EMAIL=info@charvy.cz
   CONTACT_FROM_NAME=Charvy.cz

   # Resend transport
   RESEND_API_KEY=re_xxxxxxxxx
   ```

4. **CORS**: Update `$allowedOrigins` in `config.php` with your frontend domain(s).

5. **Update frontend**: Set `VITE_API_URL` environment variable:
   ```bash
   VITE_API_URL=https://your-domain.com/api
   ```

## API Endpoints

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login.php` | Log in and start a session |
| POST | `/api/register.php` | Register a new user |
| POST | `/api/logout.php` | Log out and clear the session |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cart/{userId}` | Get user's cart items |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart` | Update item quantity |
| DELETE | `/api/cart/{userId}/{productId}` | Remove item from cart |
| DELETE | `/api/cart/{userId}` | Clear entire cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders/{userId}` | Get user's orders |
| POST | `/api/orders` | Create new order |

### Contact

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact.php` | Sends Workshop inquiry to admin + confirmation copy to sender |

#### Contact anti-spam behavior

- Honeypot field (`website`) must stay empty.
- Time check: form must not be submitted too quickly.
- IP rate limit: max 5 requests / 10 minutes.

## File Structure

```text
/api/
├── config.php
├── contact.php
├── cart.php
├── login.php
├── orders.php
├── logout.php
├── register.php
└── README.md
```
