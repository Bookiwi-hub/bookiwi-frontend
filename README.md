# 📚 Bookiwi

[북키위 웹앱 링크](https://app-bookiwi.netlify.app)

## 📖 Social E-book Reader

Bookiwi는 소셜 이북 리더기 앱입니다. 여러 사용자가 하나의 E-Book(epub)을 읽으며 하이라이트와 메모를 공유합니다.

#### 키위(이북 리더 방)

**키위는 여러 유저가 함께 책을 읽는 방을 의미합니다.**  
함께 같은 영상을 보는 넷플릭스 파티 또는 단톡방과 같은 개념입니다.  
키위에서 함께 책을 보며 하이라이트와 코멘트를 공유합니다.

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

<img width="100%" height="" alt="bookiwi-erd" src="https://github.com/user-attachments/assets/91092eed-2c92-4180-a845-1f4681e4c739" />

## README

### 🌐 [Web](/apps/web/README.md)

### Packages

- [supabase](/packages/supabase/README.md)
- [color](/packages/color/README.md)
- [epubjs](/packages/epubjs/README.md)

## 📑💦 Tech Blog

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
