# PHP Backend API for charvy.cz

## Setup Instructions

### 1. Database Setup

Run the SQL schema to create required tables:

```bash
mysql -u your_username -p your_database < schema.sql
```

Or import `schema.sql` via phpMyAdmin.

### 2. Configure config.php

Update these values in `config.php`:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'd386892_users');
define('DB_USER', 'your_actual_username');
define('DB_PASS', 'your_actual_password');
```

CORS is already configured for `https://charvy.cz`.

### 3. Upload Files

Upload the entire `php-backend/` folder to your server, e.g., to `https://charvy.cz/php-backend/`

### 4. Test the Setup

Test the contact form:
```bash
curl -X POST https://charvy.cz/php-backend/contact.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.cz","message":"Test message"}'
```

## API Endpoints

### Contact Form

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/php-backend/contact.php` | Send contact email (to you + confirmation to customer) |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/php-backend/auth.php/register` | Register new user |
| POST | `/php-backend/auth.php/login` | Login user |
| POST | `/php-backend/auth.php/logout` | Logout (requires Bearer token) |
| GET | `/php-backend/auth.php/me` | Get current user (requires Bearer token) |

### Cart

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/php-backend/cart.php/{userId}` | Get user's cart items |
| POST | `/php-backend/cart.php` | Add item to cart |
| PUT | `/php-backend/cart.php` | Update item quantity |
| DELETE | `/php-backend/cart.php/{userId}/{productId}` | Remove item from cart |
| DELETE | `/php-backend/cart.php/{userId}` | Clear entire cart |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/php-backend/orders.php/{userId}` | Get user's orders |
| POST | `/php-backend/orders.php` | Create new order |

## Request/Response Examples

### Register User
```json
POST /php-backend/auth.php/register
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "John Doe"
}
```

Response:
```json
{
  "user": { "id": 1, "email": "user@example.com", "name": "John Doe" },
  "token": "abc123..."
}
```

### Login
```json
POST /php-backend/auth.php/login
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

### Contact Form
```json
POST /php-backend/contact.php
{
  "name": "Customer Name",
  "email": "customer@email.cz",
  "message": "Hello, I would like to order...",
  "subject": "Objednávka z workshopu"
}
```

### Add to Cart
```json
POST /php-backend/cart.php
{
  "userId": 1,
  "productId": "product-123",
  "quantity": 2
}
```

### Create Order
```json
POST /php-backend/orders.php
{
  "userId": 1,
  "email": "user@example.com",
  "phone": "+420123456789",
  "shippingAddress": "Ulice 123, Praha",
  "notes": "Optional notes"
}
```

## File Structure

```
/php-backend/
├── .htaccess      # URL rewriting rules
├── config.php     # Database config & helpers
├── schema.sql     # Database schema (run this first!)
├── auth.php       # Authentication endpoints
├── cart.php       # Cart API endpoints
├── contact.php    # Contact form email
├── orders.php     # Orders API endpoints
└── README.md      # This file
```

## Security Notes

- All passwords are hashed using PHP's `password_hash()` with `PASSWORD_DEFAULT`
- Sessions expire after 30 days
- Input validation is performed on all endpoints
- CORS is restricted to charvy.cz domain
