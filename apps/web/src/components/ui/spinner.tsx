import { memo } from "react";

import { primaryColor } from "@bookiwi/color";

import { cn } from "#/lib/utils";

interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;

  className?: string;
}

/**
 * 로딩 상태를 표시하는 스피너 컴포넌트입니다.
 *
 * 연두색 테마의 회전 애니메이션과 펄스 효과를 제공하며,
 * 다양한 크기로 사용할 수 있는 범용적인 로딩 인디케이터입니다.
 *
 * @example
 * ```tsx
 * // 기본 사용 (중간 크기)
 * <Spinner />
 *
 * // 프리셋 크기 사용
 * <Spinner size="xs" />   // 16px
 * <Spinner size="sm" />   // 24px
 * <Spinner size="md" />   // 32px (기본값)
 * <Spinner size="lg" />   // 48px
 * <Spinner size="xl" />   // 64px
 *
 * // 커스텀 크기 사용
 * <Spinner size={20} />   // 20px
 * <Spinner size={100} />  // 100px
 *
 * // 추가 스타일링
 * <Spinner size="lg" className="my-4 opacity-75" />
 *
 * // 로딩 상태 표시
 * {isLoading && <Spinner size="sm" />}
 * ```
 *
 * @param props - 스피너 컴포넌트의 속성
 * @returns 로딩 스피너 JSX 엘리먼트
 */
function Spinner({ size = "md", className }: SpinnerProps) {
  const isCustomSize = typeof size === "number";

  const getPresetSizeClass = (sizeValue: string) => {
    const sizeMap = {
      xs: "size-4", // 16px
      sm: "size-6", // 24px
      md: "size-8", // 32px
      lg: "size-12", // 48px
      xl: "size-16", // 64px
    } as const;

    return sizeMap[sizeValue as keyof typeof sizeMap] || sizeMap.md;
  };

  const getCustomSizeStyle = (sizeValue: number) => ({
    width: `${sizeValue}px`,
    height: `${sizeValue}px`,
  });

  const sizeClass = isCustomSize ? "" : getPresetSizeClass(size as string);
  const sizeStyle = isCustomSize
    ? getCustomSizeStyle(size as number)
    : undefined;

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative">
        {/* 메인 스피너 - 회전 애니메이션 */}
        <div
          className={cn(
            sizeClass,
            "animate-spin rounded-full border-4 border-gray-200",
          )}
          style={{
            ...sizeStyle,
            borderTopColor: primaryColor,
          }}
        />
        {/* 보조 스피너 - 펄스 효과 */}
        <div
          className={cn(
            "absolute left-0 top-0",
            sizeClass,
            "animate-pulse rounded-full border-4 border-transparent",
          )}
          style={{
            ...sizeStyle,
            borderTopColor: `${primaryColor}30`, // 30% 투명도
          }}
        />
      </div>
    </div>
  );
}

export default memo(Spinner);
