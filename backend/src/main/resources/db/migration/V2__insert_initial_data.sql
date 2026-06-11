-- ============================================
-- INSERT ROLES
-- ============================================
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'), ('ROLE_USER')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- Password: "admin123" hashed with BCrypt
-- Hash: $2a$10$uv6PceOu1SLZxnhKVM8UMenaecr/DdojdTOO/sw452xgqMLuVmSsa
-- ============================================
INSERT INTO users (email, password, role_id, created_at, updated_at)
SELECT 'admin@gameportfolio.com', '$2a$10$uv6PceOu1SLZxnhKVM8UMenaecr/DdojdTOO/sw452xgqMLuVmSsa', r.id, NOW(), NOW()
FROM roles r WHERE r.name = 'ROLE_ADMIN'
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- INSERT WORLDS
-- ============================================
INSERT INTO worlds (name) VALUES ('Lava World'), ('Ice World')
ON CONFLICT (id) DO NOTHING;