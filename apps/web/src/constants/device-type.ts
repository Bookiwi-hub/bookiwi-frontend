import { getDeviceType } from "#/utils/get-device-type";

export enum DeviceType {
  DESKTOP,
  MOBILE,
  TABLET,
}

export const DEVICE_TYPE = getDeviceType();

export const isDesktop = DEVICE_TYPE === DeviceType.DESKTOP;
export const isMobile = DEVICE_TYPE === DeviceType.MOBILE;
export const isTablet = DEVICE_TYPE === DeviceType.TABLET;
