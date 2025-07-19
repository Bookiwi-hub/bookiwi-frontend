DROP VIEW IF EXISTS highlight_comments_view;

CREATE OR REPLACE VIEW highlight_comments_view AS
SELECT 
    c.id,
    c.highlight_id AS "highlightId",
    c.text,
    c.participant_id AS "participantId",
    p.name,
    p.profile_image AS "profileImage",
    p.color,
    c.created_at AS "createdAt",
    c.updated_at AS "updatedAt"
FROM comments c
JOIN participants p ON c.participant_id = p.id; 


-- Primary index for filtering by highlight_id (most common query pattern)
CREATE INDEX IF NOT EXISTS idx_comments_highlight_id ON comments(highlight_id);

-- Composite index for highlight_id filtering with created_at ordering
CREATE INDEX IF NOT EXISTS idx_comments_highlight_created ON comments(highlight_id, created_at);

-- Index for participant_id to optimize JOIN with participants table
CREATE INDEX IF NOT EXISTS idx_comments_participant_id ON comments(participant_id);

-- Index for participants.id (if not already exists as primary key)
-- Note: This might already exist as it's the primary key, but including for completeness
CREATE INDEX IF NOT EXISTS idx_participants_id ON participants(id); 