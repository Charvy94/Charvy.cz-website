-- =====================================================
-- DATABASE SCHEMA FOR USER AUTHENTICATION SYSTEM
-- Run these commands on your SQL server
-- =====================================================

-- 1. USERS TABLE
-- Stores user account information
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,  -- Store bcrypt/argon2 hashed passwords, NEVER plain text
    name VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email)
);

-- 2. USER SESSIONS TABLE (optional - for session-based auth)
CREATE TABLE user_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    session_token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_token (session_token),
    INDEX idx_user_id (user_id)
);

-- 3. ORDER HISTORY TABLE
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    total_amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'CZK',
    status ENUM('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_orders (user_id),
    INDEX idx_order_number (order_number)
);

-- 4. ORDER ITEMS TABLE
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    product_type ENUM('photo_print', 'workshop', 'digital', 'other') NOT NULL,
    quantity INT DEFAULT 1,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    metadata JSON,  -- Store additional info like photo dimensions, workshop date, etc.
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    INDEX idx_order_items (order_id)
);

-- 5. USER PHOTOS TABLE
-- Links users to their purchased/accessible photos
CREATE TABLE user_photos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    photo_url VARCHAR(500) NOT NULL,
    thumbnail_url VARCHAR(500),
    title VARCHAR(255),
    description TEXT,
    access_type ENUM('purchased', 'event', 'gift') DEFAULT 'purchased',
    event_name VARCHAR(255),  -- e.g., "Wedding 2024", "Workshop March"
    access_expires_at TIMESTAMP NULL,  -- NULL = permanent access
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_photos (user_id)
);

-- 6. GAMING SERVER CONNECTIONS TABLE
CREATE TABLE gaming_connections (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    server_name VARCHAR(100) NOT NULL,
    server_type ENUM('minecraft', 'ttrpg', 'other') NOT NULL,
    player_name VARCHAR(100),
    player_uuid VARCHAR(36),  -- For Minecraft UUID
    connection_status ENUM('active', 'inactive', 'banned') DEFAULT 'active',
    last_seen TIMESTAMP NULL,
    total_playtime_minutes INT DEFAULT 0,
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    metadata JSON,  -- Store game-specific data
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_gaming (user_id),
    INDEX idx_server_player (server_name, player_name)
);

-- 7. GAMING SESSION HISTORY TABLE
CREATE TABLE gaming_sessions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    connection_id INT NOT NULL,
    session_start TIMESTAMP NOT NULL,
    session_end TIMESTAMP NULL,
    duration_minutes INT,
    server_ip VARCHAR(45),
    notes TEXT,
    FOREIGN KEY (connection_id) REFERENCES gaming_connections(id) ON DELETE CASCADE,
    INDEX idx_connection_sessions (connection_id),
    INDEX idx_session_date (session_start)
);

-- =====================================================
-- EXAMPLE API ENDPOINTS YOU'LL NEED ON YOUR SERVER:
-- =====================================================
-- 
-- POST /api/auth/login
--   Body: { email, password }
--   Returns: { user: { id, email, name }, token }
--
-- POST /api/auth/logout
--   Header: Authorization: Bearer <token>
--
-- GET /api/user/orders
--   Header: Authorization: Bearer <token>
--   Returns: Array of orders with items
--
-- GET /api/user/photos
--   Header: Authorization: Bearer <token>
--   Returns: Array of accessible photos
--
-- GET /api/user/gaming
--   Header: Authorization: Bearer <token>
--   Returns: Gaming connections and recent sessions
--
-- =====================================================

-- SECURITY NOTES:
-- 1. Always hash passwords using bcrypt or argon2
-- 2. Use HTTPS for all API communications
-- 3. Implement rate limiting on login endpoints
-- 4. Use prepared statements to prevent SQL injection
-- 5. Validate and sanitize all user inputs
-- 6. Set appropriate CORS headers on your API
