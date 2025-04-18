import { DeviceType } from "#/constants/device-type";

export function getDeviceType(userAgent?: string): DeviceType {
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

  // iPad 체크
  if (iPadRegex.test(ua) && !macRegex.test(ua)) {
    return DeviceType.TABLET;
  }

  // Mac 체크
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
}
