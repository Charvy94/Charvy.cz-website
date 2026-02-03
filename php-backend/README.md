# PHP Backend API

## Setup Instructions

1. **Upload files** to your server in a folder (e.g., `/api/`)

2. **Update config.php**:
   - Set your database credentials (`DB_USER`, `DB_PASS`)
   - Update `Access-Control-Allow-Origin` with your frontend domain

3. **Update frontend** - Set `VITE_API_URL` environment variable:
   ```
   VITE_API_URL=https://www.charvy.cz/api
   ```

## API Endpoints

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
| POST | `/api/contact` | Send a contact message |

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
├── contact.php    # Contact form email handler
├── orders.php     # Orders API endpoints
└── README.md      # This file
```
