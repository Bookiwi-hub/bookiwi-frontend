-- Supabase function to create a kiwi with all related data in one transaction
CREATE OR REPLACE FUNCTION create_kiwi(
  -- Required parameters (must come first)
  p_epub_file VARCHAR,
  p_epub_locations TEXT,
  p_kiwi_name VARCHAR,
  p_user_id UUID,
  
  -- Optional parameters (with default values)
  p_epub_cover_image VARCHAR DEFAULT NULL,
  p_epub_title VARCHAR DEFAULT NULL,
  p_epub_author VARCHAR DEFAULT NULL,
  p_epub_publisher VARCHAR DEFAULT NULL,
  p_epub_nav JSON DEFAULT NULL,
  p_kiwi_description VARCHAR DEFAULT '',
  p_kiwi_detail_description TEXT DEFAULT '',
  p_kiwi_max_participants INT DEFAULT 10,
  p_kiwi_password VARCHAR DEFAULT NULL
)
RETURNS TABLE(
  kiwi_id UUID,
  share_code UUID,
  epub_id UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_epub_id UUID;
  v_kiwi_id UUID;
  v_share_code UUID;
BEGIN
  -- Insert epub
  INSERT INTO epubs AS e (
    file,
    locations,
    cover_image,
    title,
    author,
    publisher,
    nav
  ) VALUES (
    p_epub_file,
    p_epub_locations,
    p_epub_cover_image,
    p_epub_title,
    p_epub_author,
    p_epub_publisher,
    p_epub_nav
  )
  RETURNING e.id INTO v_epub_id;

  -- Insert kiwi
  INSERT INTO kiwis AS k (
    epub_id,
    name,
    description,
    detail_description,
    max_participants,
    password
  ) VALUES (
    v_epub_id,
    p_kiwi_name,
    p_kiwi_description,
    p_kiwi_detail_description,
    p_kiwi_max_participants,
    p_kiwi_password
  )
  RETURNING k.id, k.share_code INTO v_kiwi_id, v_share_code;

  -- Insert user_kiwi relationship
  INSERT INTO user_kiwis AS uk (
    user_id,
    kiwi_id,
    admin,
    participated,
    is_active
  ) VALUES (
    p_user_id,
    v_kiwi_id,
    true,
    false,
    true
  );

  -- Return the created IDs
  RETURN QUERY SELECT v_kiwi_id, v_share_code, v_epub_id;
END;
$$; 