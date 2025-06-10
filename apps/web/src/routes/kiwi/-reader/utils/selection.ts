export const hasSelection = (
  selection?: Selection | null,
): selection is Selection => selection != null && !selection.isCollapsed;

export const isForwardSelection = (selection: Selection) => {
  if (selection.anchorNode && selection.focusNode) {
    const range = document.createRange();
    range.setStart(selection.anchorNode, selection.anchorOffset);
    range.setEnd(selection.focusNode, selection.focusOffset);

    return !range.collapsed;
  }

  return true;
};
