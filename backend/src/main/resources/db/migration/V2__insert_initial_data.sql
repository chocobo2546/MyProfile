-- ============================================
-- INSERT ROLES
-- ============================================
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'), ('ROLE_USER')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- INSERT DEFAULT ADMIN USER
-- Password: "mai_bork" hashed with BCrypt
-- hasd true : $2a$10$FBchxO2YCws9VvjskqZ5G.2s0UKQwTG765V178HD2e9A2lBbuHlBG
-- ============================================
INSERT INTO users (email, password, role_id, created_at, updated_at)
SELECT 'admin@gameportfolio.com', '$2a$10$FBchxO2YCws9VvjskqZ5G.2s0UKQwTG765V178HD2e9A2lBbuHlBG', r.id, NOW(), NOW()
FROM roles r WHERE r.name = 'ROLE_ADMIN'
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- INSERT WORLDS
-- ============================================
INSERT INTO worlds (name) VALUES ('Lava World'), ('Ice World')
ON CONFLICT (id) DO NOTHING;