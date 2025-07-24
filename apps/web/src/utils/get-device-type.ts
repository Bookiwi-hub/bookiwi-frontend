import { DeviceType } from "#/constants/device-type";

/**
 * 사용자 에이전트 문자열을 기반으로 장치 유형을 감지합니다.
 *
 * @param userAgent - 장치 감지에 사용할 사용자 에이전트 문자열 (선택적)
 *                    제공되지 않으면 브라우저의 navigator.userAgent를 사용합니다.
 * @returns 감지된 장치 유형 (DESKTOP, MOBILE, TABLET)
 *
 * @example
 * // 브라우저의 navigator.userAgent 사용
 * const deviceType = getDeviceType();
 *
 * // 특정 사용자 에이전트 문자열 제공
 * getDeviceType("Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)"); // DeviceType.MOBILE
 * getDeviceType("Mozilla/5.0 (iPad; CPU OS 14_0 like Mac OS X)"); // DeviceType.TABLET
 * getDeviceType("Mozilla/5.0 (Windows NT 10.0; Win64; x64)"); // DeviceType.DESKTOP
 */
export const getDeviceType = (userAgent?: string): DeviceType => {
  const ua =
    userAgent ||
    (typeof window !== "undefined" ? window.navigator.userAgent : "");

  // 모바일 패턴
  const mobileRegex = new RegExp(
    [
      "Mobile",
      "Android.*Mobile",
      "iPhone",
      "iPod",
      "BlackBerry",
      "IEMobile",
      "Opera Mini",
      "Windows Phone",
      "webOS",
      "Palm",
      "SamsungBrowser",
      "Opera Mobi",
      "Opera Mobile",
      "Mobile Safari",
      "SymbianOS",
      "Series60",
      "S60",
      "MeeGo",
      "Firefox.*Mobile",
      "MicroMessenger",
    ].join("|"),
    "i",
  );

  // iPhone 체크 (먼저 수행)
  if (ua.indexOf("iPhone") !== -1) {
    return DeviceType.MOBILE;
  }

  // iPad 특정 패턴 (iPadOS 13+)
  const iPadRegex = /iPad|Mozilla.*Mac OS.*Safari|Macintosh.*Safari/i;

  // Mac 전용 패턴 (iPad 제외)
  const macRegex = /Macintosh.*Chrome|Macintosh.*Firefox|Macintosh.*Edge/i;

  // 일반 태블릿 패턴
  const tabletRegex = new RegExp(
    [
      "Android(?!.*Mobile)",
      "Kindle",
      "PlayBook",
      "Silk",
      "Tablet",
      "Nexus(?!.*Mobile)",
      "KFAPWI",
      "RIM Tablet",
      "HP TouchPad",
      "Shield Tablet",
    ].join("|"),
    "i",
  );

  // iPad 체크 - Macintosh + Safari인 경우 터치 지원 여부로 iPad와 Mac 구분
  if (iPadRegex.test(ua)) {
    // 터치 지원이 있고 Chrome/Firefox/Edge가 아니면 iPad로 판단
    const hasTouch =
      typeof window !== "undefined" &&
      (window.navigator.maxTouchPoints > 0 || "ontouchstart" in window);
    const isNonSafariBrowser = /Chrome|Firefox|Edge/i.test(ua);

    if (hasTouch && !isNonSafariBrowser) {
      return DeviceType.TABLET;
    }
    if (/Macintosh.*Safari/i.test(ua) && !isNonSafariBrowser) {
      // Mac Safari는 데스크톱으로 분류
      return DeviceType.DESKTOP;
    }
  }

  // Mac 체크 (Chrome, Firefox, Edge)
  if (macRegex.test(ua)) {
    return DeviceType.DESKTOP;
  }

  // 일반 태블릿 체크
  if (tabletRegex.test(ua) && !mobileRegex.test(ua)) {
    return DeviceType.TABLET;
  }

  // 모바일 체크
  if (mobileRegex.test(ua)) {
    return DeviceType.MOBILE;
  }

  // 기본값
  return DeviceType.DESKTOP;
};
