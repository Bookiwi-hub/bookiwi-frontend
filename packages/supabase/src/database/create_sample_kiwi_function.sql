-- Supabase function to create a sample kiwi with all related data in one transaction
CREATE OR REPLACE FUNCTION create_sample_kiwi(
  p_user_id UUID
)
RETURNS TABLE(
  kiwi_id UUID,
  share_code UUID
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_kiwi_id UUID;
  v_share_code UUID;
  v_participant_1_id UUID;
  v_participant_2_id UUID;
  v_highlight_1_id UUID;
  v_highlight_2_id UUID;
  v_sample_epub_id UUID := 'ce6e5d90-ae97-4d99-8302-fa292b693b3e'::UUID;
BEGIN
  -- Insert sample kiwi
  INSERT INTO kiwis AS k (
    epub_id,
    name,
    description,
    detail_description,
    max_participants,
    password
  ) VALUES (
    v_sample_epub_id,
    '운수 좋은 날',
    '예시 키위로 체험해 보세요.',
    '운수 좋은 날로 키위를 체험하세요',
    10,
    NULL
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

  -- Insert sample participants
  INSERT INTO participants AS p (
    kiwi_id,
    user_id,
    name,
    profile_image,
    color,
    single_page,
    font_family,
    font_size,
    font_weight,
    line_height,
    cfi_start,
    cfi_end,
    percentage,
    last_activity_at
  ) VALUES (
    v_kiwi_id,
    'e1b3eab1-6750-4a01-a020-156693aecf12'::UUID,
    '채종민',
    null,
    '#FFF176',
    false,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    5,
    NULL
  )
  RETURNING p.id INTO v_participant_1_id;

  INSERT INTO participants AS p (
    kiwi_id,
    user_id,
    name,
    profile_image,
    color,
    single_page,
    font_family,
    font_size,
    font_weight,
    line_height,
    cfi_start,
    cfi_end,
    percentage,
    last_activity_at
  ) VALUES (
    v_kiwi_id,
    'd70e7a0e-3a35-4d94-b300-e19968ec1b55'::UUID,
    '조현지',
    null,
    '#80DEEA',
    false,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    NULL,
    50,
    NULL
  )
  RETURNING p.id INTO v_participant_2_id;

  -- Insert sample highlights
  INSERT INTO highlights AS h (
    kiwi_id,
    participant_id,
    cfi,
    text,
    color,
    section_href
  ) VALUES (
    v_kiwi_id,
    v_participant_1_id,
    'epubcfi(/30/4!/4/2/8,/1:101,/1:141)',
    '다섯 푼이 찰깍하고 손바닥에 떨어질 제 거의 눈물을 흘릴 만큼 기뻤었다.',
    '#FFF176',
    'c0_unsu_joh_eun_nal.xhtml'
  )
  RETURNING h.id INTO v_highlight_1_id;

  INSERT INTO highlights AS h (
    kiwi_id,
    participant_id,
    cfi,
    text,
    color,
    section_href
  ) VALUES (
    v_kiwi_id,
    v_participant_2_id,
    'epubcfi(/30/4!/4/2/14,/1:0,/1:139)',
    '"에이, 오라질 년, 조롱복은 할 수가 없어, 못 먹어 병, 먹어서 병, 어쩌란 말이야! 왜 눈을 바루 뜨지 못해!"하고 김 첨지는 앓는 이의 뺨을 한 번 후려갈겼다. 홉뜬 눈은 조금 바루어졌건만 이슬이 맺히었다. 김 첨지의 눈시울도 뜨끈뜨끈하였다.',
    '#80DEEA',
    'c0_unsu_joh_eun_nal.xhtml'
  )
  RETURNING h.id INTO v_highlight_2_id;

  -- Insert sample comments
  INSERT INTO comments AS c (
    highlight_id,
    participant_id,
    text
  ) VALUES 
  (
    v_highlight_1_id,
    v_participant_1_id,
    '찰깍이라는 표현이 너무 좋다.' || E'\n' || '요즘은 동전을 쓰지 않아서 그런지, 한 문장만으로도 시대 분위기가 확 느껴져.' || E'\n' || '옛날 사람들의 절박함이 한순간에 와닿는다.'
  ),
  (
    v_highlight_1_id,
    v_participant_2_id,
    '그 작은 동전 소리 하나에 울컥하는 마음이 전해지는 게 너무 찡하다.' || E'\n' || ' 내 첫 월급 받은 날도 생각이 나'
  ),
  (
    v_highlight_2_id,
    v_participant_1_id,
    '"조롱복"이라는 단어가 좀 생소한데, 이건 ''죽을 복도 없다''는 뜻'
  ),
  (
    v_highlight_2_id,
    v_participant_2_id,
    '때리고 울고, 결국 다 병든 사람들. 누구 하나 선하지도, 악하지도 않아. 그냥 다 지는 중.'
  );

  -- Return the created IDs
  RETURN QUERY SELECT v_kiwi_id, v_share_code;
END;
$$; 