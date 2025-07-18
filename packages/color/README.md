# @bookiwi/color

Bookiwi를 위한 색상 팔레트 - 이 패키지는 Bookiwi 모노레포의 일부이며 일관된 색상 시스템을 제공합니다.

## 주요 기능

- 🎨 **통일된 색상 팔레트** - Bookiwi 전반에서 사용하는 일관된 색상 시스템
- 🌈 **하이라이트 색상** - 텍스트 하이라이팅을 위한 최적화된 색상들
- 🎯 **브랜드 색상** - 키위 그린을 포함한 브랜드 정체성 색상
- 📱 **접근성 고려** - 가독성과 대비를 고려한 색상 선택

## 패키지 구조

```
src/
├── colors.ts    # 색상 팔레트 정의
└── index.ts     # 패키지 진입점
```

## 설치

```bash
pnpm add @bookiwi/color
```

## 사용법

### 기본 사용법

```typescript
import { colors, primaryColor } from "@bookiwi/color";

// 전체 색상 팔레트 사용
console.log(colors); // 10가지 색상 배열

// 기본 하이라이트 색상 사용
console.log(primaryColor); // "#B2FF59" (키위 그린)
```

### React 컴포넌트에서 사용

```typescript
import { colors } from '@bookiwi/color';

function HighlightButton({ colorIndex }: { colorIndex: number }) {
  return (
    <button
      style={{ backgroundColor: colors[colorIndex] }}
      className="highlight-btn"
    >
      하이라이트
    </button>
  );
}
```

### CSS 변수로 사용

```typescript
import { colors } from "@bookiwi/color";

// CSS 커스텀 프로퍼티 설정
const root = document.documentElement;
colors.forEach((color, index) => {
  root.style.setProperty(`--bookiwi-color-${index}`, color);
});
```

## 색상 팔레트

| 색상          | 헥스 코드 | 용도                              |
| ------------- | --------- | --------------------------------- |
| 키위 그린     | `#B2FF59` | 브랜드 메인 컬러, 기본 하이라이트 |
| 밝은 노랑     | `#FFF176` | 텍스트 하이라이트                 |
| 밝은 민트     | `#80DEEA` | 텍스트 하이라이트                 |
| 연보라        | `#CE93D8` | 텍스트 하이라이트                 |
| 라이트 핑크   | `#F48FB1` | 텍스트 하이라이트                 |
| 연한 코랄     | `#FF8A65` | 텍스트 하이라이트                 |
| 핑크레드      | `#FF6F91` | 텍스트 하이라이트                 |
| 청록          | `#4DB6AC` | 텍스트 하이라이트                 |
| 라이트 오렌지 | `#FFB74D` | 텍스트 하이라이트                 |
| 소프트 브라운 | `#A1887F` | 텍스트 하이라이트                 |

## 색상 선택 원칙

### 가독성 우선

- 텍스트와의 대비가 충분한 색상 선택
- 밝고 부드러운 톤으로 눈의 피로감 최소화

### 브랜드 정체성

- **키위 그린** (`#B2FF59`)을 메인 브랜드 컬러로 사용
- 자연스럽고 친근한 느낌의 색상 팔레트

### 사용자 경험

- 하이라이트 시 텍스트 가독성 보장
- 다양한 사용자의 색상 선호도 고려
- 색각 이상자도 구분 가능한 색상 조합

## 타입 정의

```typescript
// 색상 배열 타입 (readonly)
export declare const colors: readonly [
  "#B2FF59", // 키위 그린
  "#FFF176", // 밝은 노랑
  "#80DEEA", // 밝은 민트
  "#CE93D8", // 연보라
  "#F48FB1", // 라이트 핑크
  "#FF8A65", // 연한 코랄
  "#FF6F91", // 핑크레드
  "#4DB6AC", // 청록
  "#FFB74D", // 라이트 오렌지
  "#A1887F", // 소프트 브라운
];

// 기본 색상 타입
export declare const primaryColor: "#B2FF59";
```

## 사용 사례

### 텍스트 하이라이팅

```typescript
import { colors } from "@bookiwi/color";

function highlightText(text: string, colorIndex: number) {
  return `<mark style="background-color: ${colors[colorIndex]}">${text}</mark>`;
}
```

### 사용자별 색상 할당

```typescript
import { colors } from "@bookiwi/color";

function getUserColor(userId: string): string {
  // 사용자 ID를 기반으로 색상 할당
  const colorIndex = userId.charCodeAt(0) % colors.length;
  return colors[colorIndex];
}
```

### 테마 시스템

```typescript
import { colors, primaryColor } from "@bookiwi/color";

const theme = {
  primary: primaryColor,
  highlight: colors,
  brand: {
    kiwi: colors[0], // 키위 그린
    accent: colors[1], // 밝은 노랑
  },
};
```
