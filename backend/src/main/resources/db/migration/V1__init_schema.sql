-- ============================================
-- ROLES
-- ============================================
CREATE TABLE IF NOT EXISTS roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- ============================================
-- USERS
-- ============================================
CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_users_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE RESTRICT
);

-- ============================================
-- VISITORS
-- ============================================
CREATE TABLE IF NOT EXISTS visitors (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    ip VARCHAR(45),
    country VARCHAR(100),
    device VARCHAR(255),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_visitors_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- ============================================
-- DOWNLOADS
-- ============================================
CREATE TABLE IF NOT EXISTS downloads (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    visitor_id BIGINT,
    file_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_downloads_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    CONSTRAINT fk_downloads_visitor FOREIGN KEY (visitor_id) REFERENCES visitors(id) ON DELETE SET NULL
);

-- ============================================
-- PROJECTS
-- ============================================
CREATE TABLE IF NOT EXISTS projects (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(500),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- WORLDS
-- ============================================
CREATE TABLE IF NOT EXISTS worlds (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- ============================================
-- NPC
-- ============================================
CREATE TABLE IF NOT EXISTS npc (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    world_id BIGINT NOT NULL,
    CONSTRAINT fk_npc_world FOREIGN KEY (world_id) REFERENCES worlds(id) ON DELETE CASCADE
);

-- ============================================
-- NPC_DIALOGUES
-- ============================================
CREATE TABLE IF NOT EXISTS npc_dialogues (
    id BIGSERIAL PRIMARY KEY,
    npc_id BIGINT NOT NULL,
    sequence_order BIGINT NOT NULL,
    message TEXT NOT NULL,
    CONSTRAINT fk_npc_dialogues_npc FOREIGN KEY (npc_id) REFERENCES npc(id) ON DELETE CASCADE,
    CONSTRAINT unique_npc_sequence UNIQUE (npc_id, sequence_order)
);

-- ============================================
-- RESUME_FILES
-- ============================================
CREATE TABLE IF NOT EXISTS resume_files (
    id BIGSERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    uploaded_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_visitors_created_at ON visitors(created_at);
CREATE INDEX idx_downloads_created_at ON downloads(created_at);
CREATE INDEX idx_npc_world_id ON npc(world_id);
CREATE INDEX idx_npc_dialogues_npc_id ON npc_dialogues(npc_id);

-- ============================================
-- AUTO-UPDATE UPDATED_AT TRIGGER (for users and projects)
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();