# 📚 Bookiwi

[웹사이트 링크](https://app-bookiwi.netlify.app)

## 📖 Social E-book Reader

Bookiwi는 소셜 이북 리더기 앱입니다. 여러 사용자가 하나의 E-Book(epyb)을 읽으며 하이라이트와 메모를 공유합니다.

### 키위

**키위는 여러 유저가 책을 읽는 방을 의미합니다.**  
함께 같은 영상을 보는 넷플릭스 파티, 함께 대화를 나누는 단톡방과 같은 개념입니다.  
키위에서 하나의 책을 보며 하이라이트를 공유하고 코멘트를 공유합니다.

## 🔲 Architecture

![Turborepo](https://img.shields.io/badge/Turborepo-Monorepo-EF4444?style=flat&logo=turborepo&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-Package_Manager-F69220?style=flat&logo=pnpm&logoColor=white)

```
bookiwi-frontend/
├── apps/
│   ├── native/          # React Native (예정)
│   └── web/             # 웹 애플리케이션
├── packages/
│   ├── color/           # 공통 색상 시스템
│   ├── epubjs/          # EPUB 리더 라이브러리
│   ├── jotai/           # 상태 관리 유틸리티
│   └── supabase/        # supabase apis
└── pnpm-workspace.yaml  # 모노레포 설정
```

### Database Structure

<img width="1000" height="500" alt="bookiwi-erd" src="https://github.com/user-attachments/assets/91092eed-2c92-4180-a845-1f4681e4c739" />

---

# 🌐 Web

## Tech Stack

### **SPA**

![TanStack Router](https://img.shields.io/badge/TanStack_Router-1.114-FF6B6B?style=flat&logo=react&logoColor=white)

동적이고 상호작용이 많으며, 빠른 사용자 경험을 위해 SPA 프레임워크인 Tanstack Router 사용

- 복잡한 사용자 인터페이스를 가진 앱
- 클라이언트 측에서 상태를 많이 관리
- SEO와 초기 렌더링이 중요하지 않음
- 페이지 이동이 많이 없는 앱

### **State Management**

![Jotai](https://img.shields.io/badge/Jotai-Atomic_State-000000?style=flat&logo=react&logoColor=white)

Bottom-up, 분산형 atom 기반의 상태 관리를 위해 Jotai 사용

- 컴포넌트 간 상태 공유가 필요
- 상태 간 의존 관계가 있는 복잡한 로직이 많음
- 집중식 보다는 필요한 곳에서 atom 생성이 유리
- 불필요한 리렌더링을 방지
- 상태를 provider로 간단하게 격리 및 초기화

### **Design & UI**

![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.0+-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Shadcn/ui](https://img.shields.io/badge/Shadcn/ui-Component_Library-000000?style=flat&logo=shadcnui&logoColor=white)

- 기획자와 디자이너가 없는 상황이기 때문에 TailwindCSS와 Shadcn으로 빠르게 예쁜 디자인 구현

### **Backend & Database**

![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat&logo=supabase&logoColor=white)

- 빠른 MVP 구현을 위해 BaaS 사용
- BaaS 중 가장 저렴
- RealTime 기능
- 관계형 데이터베이스 + 비정형 데이터 지원(JSON)
- 카카오톡 소셜 로그인 지원
- (추후 백앤드도 개발해 보고 싶음)

![IndexedDB](https://img.shields.io/badge/IndexedDB-Local_Storage-FFA500?style=flat&logo=html5&logoColor=white)

- 비로그인 사용자의 데이터를 저장하기 위해 IndexedDB 사용

<img width="40%" height="" alt="image" src="https://github.com/user-attachments/assets/020249b5-8d35-457e-a5de-ba06fffe81d5" />

## ✅ 기능 명세서

### Auth

<img width="40%" height="60%" alt="image" src="https://github.com/user-attachments/assets/98fdc4d8-7d45-4eeb-a929-347d0c177bf9" />

- 소셜 로그인
- 게스트 모드: 로그인 없이 체험하기 (세션 로그인)

### 내 키위

<img width="40%" height="" alt="image" src="https://github.com/user-attachments/assets/77d6695e-3c6e-45fe-a531-8385e60970c6" />

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

<img width="40%" height="" alt="image" src="https://github.com/user-attachments/assets/ec404bb1-2961-46b0-9f21-45434b584e1a" />

- 삭제하기 -> 탈퇴 모달 트리거
- 나가기 -> 탈퇴 모달 트리거

### 상세 키위 모달

<div style="display: flex;">
  <img width="40%" height="" alt="image" src="https://github.com/user-attachments/assets/70e377fd-50e5-42d5-b7ba-b5b577e24eb4" />
  <img width="40%" height="" alt="image" src="https://github.com/user-attachments/assets/74897b7d-7da7-4763-9521-49855baa2d19" />
</div>

- 키위 정보 렌더링(상세 설명, 공유 코드 등)
- 책 정보 렌더링(작가, 목차 등)
- 참여자 진행률

### 키위 생성 모달

<div style="display: flex;">
<img width="30%" height="" alt="image" src="https://github.com/user-attachments/assets/3fbe8bc5-f5b4-4d87-8a7b-7726670b693a" />
<img width="30%" height="" alt="image" src="https://github.com/user-attachments/assets/b1c9cab0-4e6f-4349-959f-42b6d92c1973" />
<img width="30%" height="" alt="image" src="https://github.com/user-attachments/assets/215def26-599d-4b79-82ce-8611a4494dbd" />
</div>

- 키위 정보 입력(이름, 설명, 상세 설명, 최대 인원, 비밀번호 )
- epub 파일
- 키위 성공 메시지 + 공유 코드

### 키위 가져오기 모달

<img width="30%" height="" alt="image" src="https://github.com/user-attachments/assets/b3b0a2c3-0778-49f3-9df6-32499843cb9f" />

- 키위 정보 렌더링
- 비밀번호가 있는 경우 비밀번호 입력 창
- 가져오기 버튼 -> 해당 키위를 사용자 리스트로 가져오기

### 키위 삭제 or 탈퇴 모달

<div style="display: flex;">
<img width="30%" height="" alt="image" src="https://github.com/user-attachments/assets/0814ac1c-b4e4-4104-900f-57fc4bc0f13d" />
<img width="30%" 30%height="" alt="image" src="https://github.com/user-attachments/assets/58f72293-491b-42b4-aacb-ca645ee8c316" />
</div>

- 삭제:
  - 관리자: 방 폭파(방에 있는 모든 기록 삭제)
  - 참여자: 참여를 취소하고 리스트 삭제(사용자가 키위에 참여 남긴 정보 삭제)
  - 비관리자 & 미참여: 방을 내 키위에서 삭제(사용자 리스트에서만 제거)
- 나가기: 참여 취소(키위를 탈퇴하고 키위에 남긴 기록 삭제)

###

## 📑 Tech Blog & 💦 Trouble Shooting

### ✨Feat

- [Resizable Split View](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/resizable)
- [DOM Range와 DOMRect를 이용한 텍스트 드래그 팝업 메뉴](https://github.com/Bookiwi-hub/bookiwi-frontend/wiki/Text-Selection-Menu)
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
