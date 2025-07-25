# 📚 Bookiwi

> ⚠️ **데스크톱 전용 서비스**  
> 현재 모바일/태블릿이 지원되지 않습니다. PC나 노트북으로만 접속해 주세요.

### [🌐 북키위 웹 링크](https://app-bookiwi.netlify.app)

**아래 코드로 키위에 참가해 보세요.**

- 카라마조프가의 형제들: `ce4e3a94-7f7a-4247-b627-c1f5c1f3e71f`
- 위대한 개츠비: `474a6506-ae1a-4861-a5be-b171b241e9c6`

## 📖 Social E-book Reader

Bookiwi는 소셜 이북 리더기 앱입니다. 여러 사용자가 하나의 E-Book(epub)을 읽으며 하이라이트와 메모를 공유합니다.

키위는 여러 유저가 함께 책을 읽는 방을 의미합니다.

<img width="" height="" alt="Bookiwi" src="https://github.com/user-attachments/assets/07d0e291-b54f-45d7-982b-25969a12c5b8" />

## 🔲 Architecture

![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=flat&logo=pnpm&logoColor=white)

```
bookiwi-frontend/
├── apps/
│   ├── native/          # React Native
│   └── web/             # 웹 애플리케이션
├── packages/
│   ├── color/           # 공통 색상 시스템
│   ├── epubjs/          # EPUB 리더 라이브러리
│   ├── jotai/           # 상태 관리 유틸리티
│   └── supabase/        # supabase apis
└── pnpm-workspace.yaml  # 모노레포 설정
```

## 📑💦 Tech Blog

### ✨Feat

- [Resizable Split View](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/resizable)
- [독서를 방해하지 않는 Text Selection Menu](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Text-Selection-Menu)
- [모바일/태블릿 접근 제한](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/pointer-devices-only)
- [게스트 모드: 로그인 없이 사용하기](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Guset-Mode)
- [싱글톤 매니저 클래스를 사용한 IndexedDB](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/IndexedDB-Singleton-Manager-Class)

### ❗ Error

- [SPA 새로고침 시 Not Found 에러](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Not-Found-Errors-on-SPA-Page-Reload)
- [Selection 참조 불변으로 인한 React 리렌더링 에러](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Persistent-Selection-Object-References)
- [다음 섹션 이동 시 설정 리셋 버그](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Setting-Reset-Bug)
- [AbortController를 사용한 취소 후 성공 화면 나타나는 문제 수정](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Fixing-Success-Screen-Appearing-After-Cancel-Using-AbortController)
- [Promise를 사용한 IndexedDB "Database Not Initialized" 문제 해결](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/IndexedDB-Not-Initialized)
- [Tanstack Router 캐싱으로 인한 데이터 불일치](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Data-Inconsistency-Caused-by-Tanstack-Router-Caching)
- [URL에서 잘못된 파일 경로 추출로 인한 decodeURIComponent 스토리지 파일 삭제 오류 수정](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/decodeURIComponent)

### 🚀 Optimizing

- [React Context에서 Jotai로 마이그레이션](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Jotai)
- [Throttling과 Memoization을 사용한 Slider 최적화](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Throttling-Memoization)
- [Object Store 분할을 통한 IndexedDB 과도한 페치 문제 해결](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Splitting-IndexedDB-Stores)

### 🛠 Technique

- [useRef & useEffect 대신 Callback ref](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Callback-ref-for-DOM-interaction-instead-of-useRef-%26-useEffect)
- [크기 조절 가능한 컨테이너 모니터링을 위한 ResizeObserver](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/ResizeObserver-for-Monitoring-Resizable-Containers)
- [React.Children과 reduce 메서드를 사용한 자식 컴포넌트 간 구분자 삽입](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/children-reduce)
- [복잡한 상태를 위한 useReducer](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/useReducer-instead-of-useState--for-Complex-State)
- [텍스트 선택을 위한 Selection WEB API](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Selection-WEB-API)
- [Range와 Selection을 사용한 텍스트 선택 방향 감지](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Detecting-Selection-Direction)
- [요소 위치 및 크기 설정을 위한 DOMRect](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/DOMRect)

### ⚙️ Setup

- [Husky lint-staged in monorepo](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/husky-monorepo).
- [cross-env](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/cross-env).
- [Generate js file during build Issue](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/noEmit).
- [tsconfig in monorepo](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/tsconfig-monorepo).
- [Build Internal Package in Turborepo](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/internal-packages).

## 데이터베이스 ERD

<img width="" height="" alt="ERD" src="https://github.com/user-attachments/assets/586248b4-7a91-4008-8119-ef7fd2c169c1" />

# 📚 Bookiwi Web

## Tech Stack

### **SPA**

![TanStack Router](https://img.shields.io/badge/TanStack_Router-FF6B6B?style=flat&logo=react&logoColor=white)

동적이고 상호작용이 많으며, 빠른 사용자 경험을 위해 SPA 프레임워크인 Tanstack Router 사용

- 복잡한 사용자 인터페이스를 가진 앱
- 클라이언트 측에서 상태를 많이 관리
- SEO와 초기 렌더링이 중요하지 않음
- 페이지 이동이 많이 없는 앱

### **State Management**

![Jotai](https://img.shields.io/badge/Jotai-06B6D4?style=flat&logo=react&logoColor=white)

Bottom-up, 분산형 atom 기반의 상태 관리를 위해 Jotai 사용

- 컴포넌트 간 상태 공유가 필요
- 상태 간 의존 관계가 있는 복잡한 로직이 많음
- 집중식 보다는 필요한 곳에서 atom 생성이 유리
- 불필요한 리렌더링을 방지
- 상태를 provider로 간단하게 격리 및 초기화

### **Design & UI**

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white)

- 기획자와 디자이너가 없는 상황이기 때문에 TailwindCSS와 Shadcn으로 빠르게 예쁜 디자인 구현

### **Backend & Database**

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)

- 빠른 MVP 구현을 위해 BaaS 사용
- BaaS 중 가장 저렴
- RealTime 기능
- 관계형 데이터베이스 + 비정형 데이터 지원(JSON)
- 카카오톡 소셜 로그인 지원
- (추후 백앤드도 개발해 보고 싶음)

![IndexedDB](https://img.shields.io/badge/IndexedDB-FFA500?style=flat&logo=html5&logoColor=white)

- 비로그인 사용자의 데이터를 저장하기 위해 IndexedDB 사용

### **Monitoring & Error Tracking**

![Sentry](https://img.shields.io/badge/Sentry-362D59?style=flat&logo=sentry&logoColor=white)

- 실시간 에러 추적 및 성능 모니터링
- TanStack Router와 통합하여 라우터 레벨 추적
- 사용자 경험 개선을 위한 오류 분석 및 디버깅
- 프로덕션 환경에서의 안정성 보장

## 📁 Folder Structure

```
apps/web/src/
├── components/          # 재사용 가능한 공통 컴포넌트
│   ├── ui/             # shadcn/ui 기반 기본 UI 컴포넌트
│   ├── header/         # 앱 헤더 컴포넌트
│   ├── loading.tsx     # 로딩 페이지
│   └── error.tsx       # 에러 페이지
│
├── routes/             # TanStack Router 기반 파일 라우팅
│   ├── __root.tsx      # 루트 라우트 (전역 레이아웃)
│   ├── index.tsx       # 홈 페이지 (리디렉션)
│   ├── auth/           # 인증 관련 라우트
│   ├── my-kiwis/       # 내 키위 목록 페이지
│   │   ├── -apis/      # 페이지 전용 API 함수들
│   │   ├── -components/# 페이지 전용 컴포넌트들
│   │   ├── -kiwis/     # 키위 관련 컴포넌트들
│   │   ├── -modals/    # 모달 컴포넌트들
│   │   └── index.tsx   # 페이지 진입점
│   ├── kiwi/           # 키위 리더 페이지
│   │   ├── -apis/      # API 추상화 레이어
│   │   ├── -header/    # 키위 전용 헤더
│   │   ├── -mobile/    # 모바일 버전 (개발 중)
│   │   ├── -modals/    # 모달 컴포넌트들
│   │   ├── -reader/    # 이북 리더 핵심 로직
│   │   │   ├── atoms/  # Jotai 상태 관리
│   │   │   ├── apis/   # 리더 관련 API
│   │   │   ├── components/ # 리더 컴포넌트
│   │   │   ├── hooks/  # 커스텀 훅
│   │   │   └── utils/  # 유틸리티 함수
│   │   ├── -split-view/# 분할 화면 관리
│   │   └── $id.tsx     # 동적 라우트
│   └── my-page/        # 마이페이지
│
├── managers/           # 외부 서비스 및 데이터 관리
│   ├── user.ts         # 사용자 인증 관리
│   ├── supabase.ts     # Supabase 클라이언트
│   ├── idb.ts          # IndexedDB 관리
│   └── kiwi.ts         # 키위 세션 관리
│
├── constants/          # 상수 정의
├── hooks/              # 전역 커스텀 훅
├── lib/                # 라이브러리 설정
├── utils/              # 유틸리티 함수
└── styles.css          # 전역 스타일
```

## 🔄 데이터 플로우

<img width="" height="" alt="image" src="https://github.com/user-attachments/assets/6a2ab49e-1ff6-480e-871f-bd2c2570bc2f" />

## 🔖 Convention & Pattern

### 1. **대시 프리픽스 컨벤션**

```
routes/my-kiwis/
├── -apis/          # 내부 API (외부에서 접근 불가)
├── -components/    # 내부 컴포넌트
├── -modals/        # 내부 모달
└── index.tsx       # 공개 진입점
```

- **`-` 프리픽스**: 해당 라우트에서만 사용되는 private 컴포넌트/모듈
- **목적**: 코드 조직화, 재사용성 구분, 의존성 관리

### 2. **File-based Routing (TanStack Router)**

```typescript
// 라우트 구조
/ → routes/index.tsx
/auth → routes/auth/index.tsx
/my-kiwis → routes/my-kiwis/index.tsx
/kiwi/:id → routes/kiwi/$id.tsx
/my-page → routes/my-page/index.tsx
```

- **loader**: 데이터 페칭
- **beforeLoad**: 인증 가드 및 전처리
- **pendingComponent**: 로딩 상태 처리

### 3. **Atomic State Management (Jotai)**

```typescript
// 상태 분산 관리
export const bookAtom = atom<Book | null>(null);
export const currentSectionAtom = atom<Section | undefined>(undefined);
export const highlightsAtom = atom<Highlight[]>([]);

// 파생 상태
export const typographyAtom = atom<{
  fontFamily: string | null;
  fontSize: number | null;
  lineHeight: number | null;
  fontWeight: number | null;
} | null>((get) => {
  const fontFamily = get(participantFontFamilyAtom);
  const fontSize = get(participantFontSizeAtom);
  const lineHeight = get(participantLineHeightAtom);
  const fontWeight = get(participantFontWeightAtom);

  return {
    fontFamily,
    fontSize,
    lineHeight,
    fontWeight,
  };
});

// 액션 아톰
export const addHighlightAtom = atom(
  null,
  async (get, set, newHighlight: NewHighlight) => {
    const result = await addHighlight(newHighlight);
    set(highlightsAtom, (prev) => [...prev, result]);
  },
);
```

- **Bottom-up 설계**: 필요한 곳에서 atom 생성
- **의존 관계**: 파생 atom으로 복잡한 상태 관리
- **격리된 스토어**: 리더별 독립적인 상태 관리

### 4. **Manager Pattern**

```typescript
// 외부 서비스 추상화
class UserManager {
  private currentUser: User | null = null;

  async isLoggedIn() {
    /* ... */
  }
  get user() {
    /* ... */
  }
  async logout() {
    /* ... */
  }
}

class IndexedDBManager {
  async add<T>(storeName: string, item: T) {
    /* ... */
  }
  async get<T>(storeName: string, key: IDBValidKey) {
    /* ... */
  }
}
```

- **책임 분리**: 각 매니저는 특정 도메인 담당
- **싱글톤 패턴**: 전역 상태 및 연결 관리
- **타입 안전성**: 제네릭을 통한 타입 보장

### 5. **API Abstraction Layer**

```typescript
// 인증 상태에 따른 API 분기
export async function getKiwiReader(kiwiId: string) {
  if (userManager.isGuest) {
    return getGuestSampleKiwi();
  }
  return supabaseManager.kiwi.getKiwiReader(kiwiId);
}

export async function addHighlight(highlight: NewHighlight) {
  if (userManager.isGuest) {
    return addGuestHighlight(highlight);
  }
  return supabaseManager.reader.addHighlight(highlight);
}
```

- **통합 인터페이스**: 인증 여부와 관계없이 동일한 API
- **조건부 구현**: 게스트/로그인 사용자별 다른 데이터 소스
- **투명한 전환**: 컴포넌트는 인증 상태를 신경 쓰지 않음

### 6. **Component Architecture**

```typescript
// Provider Pattern으로 상태 격리
function ReaderProvider({ children, epub, kiwi, participants, currentParticipant }) {
  const readerStore = createStore();

  // 초기 상태 설정
  readerStore.set(kiwiAtom, kiwi);
  readerStore.set(participantsAtom, participants);

  return (
    <Provider store={readerStore}>
      {children}
    </Provider>
  );
}

// 컴포넌트에서 상태 사용
function BookmarkButton() {
  const book = useAtomValue(bookAtom);
  const currentLocation = useAtomValue(currentLocationAtom);
  const addBookmark = useSetAtom(addBookmarkAtom);

  const handleBookmark = () => {
    addBookmark({ /* ... */ });
  };
}
```

- **컨텍스트 격리**: 각 리더 세션마다 독립적인 상태
- **선언적 컴포넌트**: 비즈니스 로직과 UI 분리
- **훅 기반**: 재사용 가능한 로직 추상화

## 🎮 기능

<details>
<summary>/auth</summary>

<img width="" height="" alt="image" src="https://github.com/user-attachments/assets/98fdc4d8-7d45-4eeb-a929-347d0c177bf9" />

- 소셜 로그인
- 게스트 모드: 로그인 없이 체험하기 (세션 로그인)

</details>

---

<details>
<summary>/my-kiwis</summary>

### 내 키위

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/77d6695e-3c6e-45fe-a531-8385e60970c6" />

- 유저가 가지고 있는 키위 리스트 렌더링
- 키위 카드 -> 상세 키위 정보 모달 트리거
- 키위 카드 케밥 버튼 -> 팝업 메뉴 트리거
- 키위 카드 팝업 메뉴: 삭제 및 나가기 버튼
- 키위 정보 렌더링 (이름, 설명, 진행률, 참여자 수, 활동 시간)
- 해당 키위로 이동해 활동하기 위한 입장 버튼
- 새 키위를 만들 수 있는 버튼 -> 키위 생성 모달 트리거
- 다른 키위 공유 코드를 입력하는 Input
- 키위를 리스트 내로 가져올 수 있는 버튼 -> 키위 가져오기 모달 트리거
- 프로필 버튼 -> 마이페이지 링크
- 알림 확인 버튼(추후 유저의 하이라이트에 댓글이 달렸을 경우 알림을 줄 예정)

### 키위 카드 팝업 메뉴

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/ec404bb1-2961-46b0-9f21-45434b584e1a" />

- 삭제하기 -> 탈퇴 모달 트리거
- 나가기 -> 탈퇴 모달 트리거

### 상세 키위 모달

<div style="display: flex;">
  <img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/70e377fd-50e5-42d5-b7ba-b5b577e24eb4" />
  <img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/74897b7d-7da7-4763-9521-49855baa2d19" />
</div>

- 키위 정보 렌더링(상세 설명, 공유 코드 등)
- 책 정보 렌더링(작가, 목차 등)
- 참여자 진행률

### 키위 생성 모달

<div style="display: flex;">
<img width="33%" height="" alt="image" src="https://github.com/user-attachments/assets/3fbe8bc5-f5b4-4d87-8a7b-7726670b693a" />
<img width="33%" height="" alt="image" src="https://github.com/user-attachments/assets/b1c9cab0-4e6f-4349-959f-42b6d92c1973" />
<img width="33%" height="" alt="image" src="https://github.com/user-attachments/assets/215def26-599d-4b79-82ce-8611a4494dbd" />
</div>

- 키위 정보 입력(이름, 설명, 상세 설명, 최대 인원, 비밀번호 )
- epub 파일
- 키위 성공 메시지 + 공유 코드

### 키위 가져오기 모달

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/b3b0a2c3-0778-49f3-9df6-32499843cb9f" />

- 키위 정보 렌더링
- 비밀번호가 있는 경우 비밀번호 입력 창
- 가져오기 버튼 -> 해당 키위를 사용자 리스트로 가져오기

### 키위 삭제 or 탈퇴 모달

<div style="display: flex;">
<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/0814ac1c-b4e4-4104-900f-57fc4bc0f13d" />
<img width="50%" 30%height="" alt="image" src="https://github.com/user-attachments/assets/58f72293-491b-42b4-aacb-ca645ee8c316" />
</div>

- 삭제:
  - 관리자: 방 폭파(방에 있는 모든 기록 삭제)
  - 참여자: 참여를 취소하고 리스트 삭제(사용자가 키위에 참여 남긴 정보 삭제)
  - 비관리자 & 미참여: 방을 내 키위에서 삭제(사용자 리스트에서만 제거)
- 나가기: 참여 취소(키위를 탈퇴하고 키위에 남긴 기록 삭제)

</details>

---

<details>
<summary>/kiwi</summary>

### 키위(이북 리더 방)

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/21613c60-9581-49af-8ecf-12c380ffb822" />

- epub 렌더링
- 페이지 넘기기: 클릭 버튼, 키보드
- 슬라이더: 페이지 조정, 진행률 표시
- 헤더: 홈 버튼, 사이드바, 북마크, 하이라이트, 프로필

### 헤더

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/7c4ab26d-4535-442d-973e-c288a7efdd47" />

- 홈 버튼: 내 키위 페이지로 이동
- 사이드바: 사이드바(왼쪽) 트리거
- 북마크: 해당 페이지 북마크 저장(해당 페이지가 포함되어 있는 페이지라면 북마크 표시)
- 하이라이트: 하이라이트 패널 트리거
- 프로필: 현재 키위 참여자 목록 렌더링 팝업

### 분할 뷰

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/1d52e3f3-4b3f-4672-8ca1-9bd6fd213f38" />

- 일반
  - 하이라이트 패널이 (세컨더리 패널) 책 위에 렌더링
  - 사이즈 조정 가능
- 핀
  - 핀 가능 버튼
  - 책과 하이라이 ㅡ 패널이 양 옆으로 위치
  - 사이즈 조정 가능

### 하이라이트 패널 - 하이라이트 목록

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/02eb9940-3764-446b-8f50-c42954c584ff" />

- 하이라이트 목록 렌더링
- 클릭 -> 하이라이트 페널 이동 & 해당 페이지로 이동

### 하이라이트 패널 - 하이라이트

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/269c4916-648a-4df8-8a26-2eba3412dc75" />

- 하이라이트 텍스트 렌더링
- 코멘트 렌더링
- 코멘트 Input
- 삭제 및 수정(예정)

### 택스트 드래그 메뉴

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/3fe1b3d3-a62a-430e-899b-f8509257c8ff" />

- 하이라이트 텍스트 드래그 시 메뉴
- 아래에서 위로 드래그 시 위에 메뉴 렌더링
- 위에서 아래로 드래그 시 아래 메뉴 렌더링
- 하이라이트 버튼 -> 하이라이트 저장
- 코멘트 버튼 -> -> 하이라이트 저장 & 하이라이트 탭 - 하이라이트 탭 열기

### 사이드 바- 목차

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/d4bfc1bb-bedb-4523-a79f-9739dd2b46e1" />

- 목차 렌더링
- 목차 클릭 -> 해당 목차로 이동

### 사이드 바 - 책갈피

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/d369a837-86e2-4bc9-9aac-90048e7c683b" />

- 책갈피 렌더링
- 책갈피 클릭 -> 해당 페이지로 이동
- 책갈피 삭제

### 사이드 바 - 참가자

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/7d9f414c-bcc2-4cb1-aef9-7ca5f7fec83c" />

- 참가자 목록
- 참가자 색상
- 참가자 진행률

### 사이드 바 - 검색

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/1a7760f5-b63e-4eee-847a-2b93e2527d77" />

- 단어 검색 Input
- 책의 해당 단어 검색 기능
- 검색된 단어 주위 문장 렌더링
- 클릭 -> 해당 페이지로 이동

### 사이드 바 - 설정

<img width="50%" height="" alt="image" src="https://github.com/user-attachments/assets/64ec8788-c58c-4c4a-a274-d49775af5b57" />

- 한 페이지로 보기 토글
- 폰트 변경
- 글자 크기 변경
- 글자 굵기 변경
- 문단 간격 변경

</details>
