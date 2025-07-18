# @bookiwi/supabase

Bookiwi를 위한 Supabase 클라이언트 래퍼 - 이 패키지는 Bookiwi 모노레포의 일부이며 소셜 전자책 읽기 기능을 위해 특별히 설계되었습니다.

## 주요 기능

- 🔐 **인증 관리** - 카카오 OAuth 통합
- 📚 **키위 관리** - 독서 그룹 생성 및 관리
- 👥 **소셜 독서** - 참가자 관리 및 협업
- 🎨 **하이라이트 & 주석** - 댓글이 포함된 텍스트 하이라이팅
- 📖 **EPUB 처리** - 파일 업로드 및 메타데이터 추출
- 🏷️ **타입 안전성** - 생성된 타입을 통한 완전한 TypeScript 지원
- 🗄️ **데이터베이스 스키마** - 뷰와 함수를 포함한 완전한 PostgreSQL 스키마

## 패키지 구조

```
src/
├── manager/          # 핵심 비즈니스 로직 매니저
│   ├── auth.ts      # 인증 관리
│   ├── kiwi.ts      # 키위(독서 그룹) 작업
│   ├── reader.ts    # 읽기 및 주석 기능
│   └── index.ts     # 메인 SupabaseManager 클래스
├── database/         # 데이터베이스 스키마 및 SQL
│   ├── *.sql        # 데이터베이스 함수 및 뷰
│   ├── tables.dbml  # 메인 테이블 스키마
│   └── views.dbml   # 데이터베이스 뷰 스키마
├── types/           # TypeScript 타입 정의
│   ├── database.ts  # 생성된 데이터베이스 타입
│   ├── response.ts  # API 응답 타입
│   └── params.ts    # 매개변수 타입
├── utils/           # 유틸리티 함수
│   ├── file.ts      # 파일 처리 유틸리티
│   ├── epubjs.ts    # EPUB 처리 유틸리티
│   └── base.ts      # 기본 유틸리티 함수
└── index.ts         # 패키지 진입점
```

## 설치

```bash
pnpm add @bookiwi/supabase
```

## 사용법

### 기본 설정

```typescript
import SupabaseManager from "@bookiwi/supabase";

const supabase = new SupabaseManager(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY,
);
```

### 인증

```typescript
// 카카오로 로그인
const { data } = await supabase.auth.signInWithKakao({
  options: {
    redirectTo: "https://your-app.com/auth/callback",
  },
});

// 현재 사용자 정보 가져오기
const user = await supabase.auth.getUser();
```

### 키위 관리

```typescript
// 새로운 키위(독서 그룹) 생성
const { shareCode } = await supabase.kiwi.createKiwi({
  name: "북클럽 토론",
  description: "함께 읽어요!",
  file: epubFile,
  userId: user.id,
  maxParticipants: 10,
  password: "선택적-비밀번호",
});

// 키위 참가
await supabase.kiwi.joinKiwi({
  shareCode: "kiwi-share-code",
  userId: user.id,
  participantName: "독자 이름",
});

// 사용자의 키위 목록 가져오기
const myKiwis = await supabase.kiwi.getMyKiwis(user.id);
```

### 리더 기능

```typescript
// 키위 리더 데이터 가져오기
const readerData = await supabase.reader.getKiwiReader(kiwiId);

// 하이라이트 생성
await supabase.reader.createHighlight({
  kiwiId,
  participantId,
  cfi: "epubcfi(...)",
  text: "하이라이트된 텍스트",
  color: "#ffff00",
});

// 하이라이트에 댓글 추가
await supabase.reader.createHighlightComment({
  highlightId,
  participantId,
  content: "좋은 지적이에요!",
});

// 읽기 진도 업데이트
await supabase.reader.updateProgress({
  participantId,
  cfiStart: "epubcfi(...)",
  cfiEnd: "epubcfi(...)",
  percentage: 45,
});
```
