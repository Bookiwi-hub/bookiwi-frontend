import { CSSProperties } from "react";

import Contents from "@bookiwi/epubjs/types/contents";

import { Settings } from "#/types/kiwi";
import { getKeys } from "#/utils";

// 커스텀 스타일을 식별하기 위한 열거형
export enum Style {
  Custom = "custom", // 커스텀 스타일의 고유 식별자
}

/**
 * camelCase를 kebab-case로 변환하는 함수
 * @param {string} str - 변환할 camelCase 문자열
 * @return {string} - kebab-case로 변환된 문자열
 * @example
 * camelToSnake('fontSize') // 'font-size'
 */
const camelToSnake = (str: string) =>
  str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

/**
 * CSSProperties 객체를 CSS 문자열로 변환하는 함수
 * @param {CSSProperties} o - CSS 속성을 포함한 객체
 * @return {string} - CSS 문자열
 * @example
 * mapToCss({ fontSize: '16px', color: 'red' })
 * // 'font-size: 16px !important;\ncolor: red !important;'
 */
const mapToCss = (o: CSSProperties) =>
  getKeys(o)
    .filter((k) => o[k] !== undefined)
    .map((k) => {
      // fontSize가 숫자인 경우 'px'을 붙여줌
      const value =
        k === "fontSize" && typeof o[k] === "number" ? `${o[k]}px` : o[k];
      return `${camelToSnake(k)}: ${value} !important;`;
    })
    .join("\n");

/**
 * 사용자 설정에 따라 동적으로 스타일을 업데이트하는 함수
 * 이 함수는 EPUB 문서에 사용자 설정을 반영한 CSS를 생성하고 적용합니다.
 * contents.addStylesheetCss는 Promise<boolean>을 반환하며, 스타일 적용 성공 여부를 나타냅니다.
 *
 * @param {Settings | undefined} settings - 사용자 설정 데이터
 * @return {Promise<boolean>} - 스타일 적용 성공 여부(Promise<boolean>)
 * @example
 * updateCustomStyle({ fontSize: '18px'})
 *   .then(success => console.log('Style applied:', success));
 */
export const updateCustomStyle = async (
  contents: Contents,
  settings: Omit<Settings, "isSinglePage">,
) => {
  if (!contents) return Promise.resolve(false);
  const newSettings = {
    fontFamily: settings.fontFamily ?? undefined,
    fontSize: settings.fontSize ?? undefined,
    lineHeight: settings.lineHeight ?? undefined,
    fontWeight: settings.fontWeight ?? undefined,
  };
  const css = `a, article, cite, div, li, p, pre, span, table, body {
    ${mapToCss(newSettings)}
  }`;

  return contents.addStylesheetCss(css, Style.Custom);
};
