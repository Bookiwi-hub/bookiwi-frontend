-- 기존 뷰 삭제
DROP VIEW IF EXISTS my_kiwis_view;

-- 새로운 뷰 생성
CREATE OR REPLACE VIEW my_kiwis_view AS
SELECT 
    k.id,
    k.name,
    k.description,
    k.detail_description as "detailDescription",
    k.max_participants as "maxParticipants",
    k.password,
    k.share_code as "shareCode",
    k.created_at as "createdAt",
    
    -- 관리자 정보
    json_build_object(
        'id', admin_user.id,
        'name', admin_user.name,
        'email', admin_user.email,
        'profileImage', admin_user.profile_image
    ) as "admin",
    
    -- 사용자 정보 (뷰를 조회하는 사용자)
    uk.user_id as "user_id",
    
    -- 책 메타데이터
    json_build_object(
        'coverImage', e.cover_image,
        'title', e.title,
        'author', e.author,
        'publisher', e.publisher,
        'nav', e.nav
    ) as "bookMetadata",
    
    -- 참가자 정보 (JSON 배열)
    COALESCE(
        (
            SELECT json_agg(
                json_build_object(
                    'id', p.id,
                    'userId', p.user_id,
                    'name', p.name,
                    'profileImage', p.profile_image,
                    'progress', p.percentage,
                    'color', p.color,
                    'lastActivityAt', p.last_activity_at
                )
            )
            FROM participants p
            WHERE p.kiwi_id = k.id
        ), 
        '[]'::json
    ) as participants

FROM kiwis k
    JOIN epubs e ON k.epub_id = e.id
    JOIN user_kiwis uk ON k.id = uk.kiwi_id
    LEFT JOIN user_kiwis admin_uk ON k.id = admin_uk.kiwi_id AND admin_uk.admin = true
    LEFT JOIN users admin_user ON admin_uk.user_id = admin_user.id
WHERE uk.is_active = true; 