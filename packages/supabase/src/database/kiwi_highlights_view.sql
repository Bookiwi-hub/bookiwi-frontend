-- Drop existing view first (to allow modifications)
DROP VIEW IF EXISTS kiwi_highlights_view;

CREATE VIEW kiwi_highlights_view AS
SELECT 
    h.id,
    h.cfi,
    h.section_href as "sectionHref",
    h.text,
    h.color,
    h.participant_id as "participantId",
    p.name,
    p.profile_image as "profileImage",
    h.created_at as "createdAt",
    h.updated_at as "updatedAt",
    h.kiwi_id as "kiwiId",
    COALESCE(c.comment_count, 0) as "commentCount"
FROM highlights h
LEFT JOIN participants p ON h.participant_id = p.id
LEFT JOIN (
    SELECT 
        highlight_id,
        COUNT(*) as comment_count
    FROM comments
    GROUP BY highlight_id
) c ON h.id = c.highlight_id;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_highlights_kiwi_section ON highlights(kiwi_id, section_href);
CREATE INDEX IF NOT EXISTS idx_highlights_participant_id ON highlights(participant_id); 