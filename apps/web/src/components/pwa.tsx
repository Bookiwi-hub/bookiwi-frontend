import React from "react";

// 테마 색상에 사용할 상수 정의
const background = {
  light: "#ffffff",
  dark: "#000000",
};

/**
 * PWA를 위한 메타 태그 및 링크를 제공하는 컴포넌트
 */
export function PWA() {
  return (
    <>
      <link rel="manifest" href="/manifest.json" />
      <meta id="theme-color" name="theme-color" content={background.light} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      <meta name="apple-mobile-web-app-title" content="PWAGram" />
      <link rel="apple-touch-icon" href="/images/logo.png" />
    </>
  );
}
