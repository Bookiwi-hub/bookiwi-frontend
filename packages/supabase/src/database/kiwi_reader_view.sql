CREATE OR REPLACE VIEW kiwi_reader_view AS
SELECT 
    k.id as kiwi_id,
    -- Kiwi object
    json_build_object(
        'id', k.id,
        'name', k.name,
        'description', k.description,
        'maxParticipants', k.max_participants,
        'detailDescription', k.detail_description,
        'password', k.password,
        'shareCode', k.share_code,
        'createdAt', k.created_at
    ) as kiwi,
    
    -- Epub object
    json_build_object(
        'id', e.id,
        'file', e.file,
        'locations', e.locations,
        'coverImage', e.cover_image,
        'title', e.title,
        'author', e.author,
        'publisher', e.publisher,
        'nav', e.nav
    ) as epub,
    
    -- Participants array
    COALESCE(
        (SELECT jsonb_agg(
            json_build_object(
                'id', p.id,
                'name', p.name,
                'profileImage', p.profile_image,
                'color', p.color,
                'singlePage', p.single_page,
                'fontFamily', p.font_family,
                'fontSize', p.font_size,
                'fontWeight', p.font_weight,
                'lineHeight', p.line_height,
                'cfiStart', p.cfi_start,
                'cfiEnd', p.cfi_end,
                'percentage', p.percentage,
                'lastActivityAt', p.last_activity_at
            )
        )
        FROM participants p 
        WHERE p.kiwi_id = k.id
        ), '[]'::jsonb
    ) as participants,
    
    -- Annotations array (highlights with comments)
    COALESCE(
        (SELECT jsonb_agg(
            json_build_object(
                'id', h.id,
                'cfi', h.cfi,
                'text', h.text,
                'color', h.color,
                'participantId', h.participant_id,
                'createdAt', h.created_at,
                'updatedAt', h.updated_at,
                'sectionHref', h.section_href,
                'comments', COALESCE(
                    (SELECT jsonb_agg(
                        json_build_object(
                            'id', c.id,
                            'text', c.text,
                            'createdAt', c.created_at,
                            'updatedAt', c.updated_at,
                            'participantId', c.participant_id
                        )
                    )
                    FROM comments c 
                    WHERE c.highlight_id = h.id
                    ), '[]'::jsonb
                )
            )
        )
        FROM highlights h
        WHERE h.kiwi_id = k.id
        ), '[]'::jsonb
    ) as annotations

FROM kiwis k
JOIN epubs e ON k.epub_id = e.id;

-- Create an index for better performance when querying by kiwi_id
CREATE INDEX IF NOT EXISTS idx_kiwi_reader_view_kiwi_id ON kiwis(id);
CREATE INDEX IF NOT EXISTS idx_participants_kiwi_id ON participants(kiwi_id);
CREATE INDEX IF NOT EXISTS idx_highlights_kiwi_id ON highlights(kiwi_id);
CREATE INDEX IF NOT EXISTS idx_comments_highlight_id ON comments(highlight_id); 