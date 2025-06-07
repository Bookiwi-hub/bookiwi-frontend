import { NavItem } from "@bookiwi/epubjs";

export const mapSectionHrefToNavItem = (
  navItems: NavItem[],
  sectionHref: string,
) => {
  let targetNavItem: NavItem | undefined;

  const searchInNavItem = (navItem: NavItem): boolean => {
    let found = false;
    dfs(navItem, (nav) => {
      if (found) return;
      // sectionHref와 일치하는 href를 가진 NavItem을 찾는다.
      if (compareHref(sectionHref, nav.href)) {
        targetNavItem ??= nav;
        found = true;
      }
    });
    return found;
  };

  navItems.some(searchInNavItem);

  return targetNavItem;
};

export function compareHref(sectionHref: string, navItemHref: string): boolean {
  // 빈 문자열이나 undefined 처리
  if (!sectionHref || !navItemHref) return false;

  // navItemHref에서 fragment(#) 부분 제거
  const cleanNavItemHref = navItemHref.split("#")[0];

  // 빈 문자열 처리
  if (!cleanNavItemHref) return false;

  // 정확한 매칭 또는 양방향 endsWith 비교
  return (
    sectionHref === cleanNavItemHref ||
    sectionHref.endsWith(cleanNavItemHref) ||
    cleanNavItemHref.endsWith(sectionHref)
  );
}

export function dfs(nav: NavItem, fn: (nav: NavItem) => void) {
  fn(nav);
  nav.subitems?.forEach((child) => dfs(child, fn));
}
