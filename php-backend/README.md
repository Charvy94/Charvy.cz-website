# PHP Backend API

## Setup Instructions

1. **Upload files** to your server in a folder (e.g., `/api/`)

2. **Update config.php**:
   - Set your database credentials (`DB_USER`, `DB_PASS`)
   - Update the `$allowedOrigins` list with your frontend domain(s)

3. **Update frontend** - Set `VITE_API_URL` environment variable:
   ```
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
| POST | `/api/contact.php` | Send a contact form message via email |

## Request/Response Examples

### Add to Cart
```json
POST /api/cart
{
  "userId": 1,
  "productId": "product-123",
  "quantity": 2
}
```

### Create Order
```json
POST /api/orders
{
  "userId": 1,
  "email": "user@example.com",
  "phone": "+1234567890",
  "shippingAddress": "123 Main St, City",
  "notes": "Optional notes"
}
```

## File Structure

```
/api/
├── .htaccess      # URL rewriting rules
├── config.php     # Database config & helpers
├── cart.php       # Cart API endpoints
├── login.php      # Auth login endpoint
├── orders.php     # Orders API endpoints
├── logout.php     # Auth logout endpoint
├── register.php   # Auth registration endpoint
└── README.md      # This file
```
