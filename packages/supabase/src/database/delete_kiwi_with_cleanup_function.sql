CREATE OR REPLACE FUNCTION delete_kiwi_with_cleanup(p_kiwi_id UUID)
RETURNS JSON AS $$
DECLARE
  epub_info RECORD;
  epub_ref_count INT;
  result JSON;
BEGIN
  -- 키위가 존재하는지 확인하고 epub 정보 가져오기
  SELECT e.id, e.file, e.cover_image
  INTO epub_info
  FROM kiwis k
  JOIN epubs e ON k.epub_id = e.id
  WHERE k.id = p_kiwi_id;
  
  -- 키위가 존재하지 않으면 에러
  IF NOT FOUND THEN
    RAISE EXCEPTION '키위를 찾을 수 없습니다.';
  END IF;
  
  -- 키위 삭제 (CASCADE로 관련 데이터들 자동 삭제)
  DELETE FROM kiwis WHERE id = p_kiwi_id;
  
  -- 해당 epub을 참조하는 다른 키위가 있는지 확인
  SELECT COUNT(*)
  INTO epub_ref_count
  FROM kiwis
  WHERE epub_id = epub_info.id;
  
  -- 참조하는 키위가 없으면 epub 삭제하고 파일 경로들 반환
  IF epub_ref_count = 0 THEN
    -- epub 레코드 삭제
    DELETE FROM epubs WHERE id = epub_info.id;
    
    -- 삭제할 파일 경로들 반환
    result := json_build_object(
      'success', true,
      'epub_deleted', true,
      'epub_file_path', epub_info.file,
      'cover_image_path', epub_info.cover_image
    );
  ELSE
    -- epub은 유지, 파일 삭제 불필요
    result := json_build_object(
      'success', true,
      'epub_deleted', false,
      'epub_file_path', null,
      'cover_image_path', null
    );
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql; 