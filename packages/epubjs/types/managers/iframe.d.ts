import { Section } from "../../src/section";
import Contents from "../../src/contents";
import { Layout } from "../../src/layout";
import { EpubCFI } from "../../src/epubcfi";
import { Pane, Highlight, Underline } from "marks-pane";

interface IframeViewOptions {
  ignoreClass?: string;
  axis?: string;
  direction?: string;
  width?: number;
  height?: number;
  layout?: Layout;
  globalLayoutProperties?: Record<string, any>;
  method?: string;
  forceRight?: boolean;
  allowScriptedContent?: boolean;
  allowPopups?: boolean;
  flow?: string;
  forceEvenPages?: boolean;
}

interface HighlightStyles {
  fill?: string;
  "fill-opacity"?: string;
  "mix-blend-mode"?: string;
  [key: string]: string | undefined;
}

interface UnderlineStyles {
  stroke?: string;
  "stroke-opacity"?: string;
  "mix-blend-mode"?: string;
  [key: string]: string | undefined;
}

interface Mark {
  element: HTMLElement;
  range: Range;
  listeners: Array<((e: Event) => void) | undefined>;
}

interface HighlightMark {
  mark: Highlight;
  element: HTMLElement;
  listeners: Array<((e: Event) => void) | undefined>;
}

interface UnderlineMark {
  mark: Underline;
  element: HTMLElement;
  listeners: Array<((e: Event) => void) | undefined>;
}

interface Size {
  width: number;
  height: number;
  widthDelta: number;
  heightDelta: number;
}

declare class IframeView {
  settings: IframeViewOptions;
  id: string;
  section: Section;
  index: number;
  element: HTMLElement;
  added: boolean;
  displayed: boolean;
  rendered: boolean;
  fixedWidth: number;
  fixedHeight: number;
  epubcfi: EpubCFI;
  layout: Layout;
  pane: Pane | undefined;
  highlights: Record<string, HighlightMark>;
  underlines: Record<string, UnderlineMark>;
  marks: Record<string, Mark>;
  window: Window | undefined;
  document: Document | undefined;
  contents: Contents | undefined;
  rendering: boolean;
  writingMode: string;
  iframe: HTMLIFrameElement;
  lockedWidth: number;
  lockedHeight: number;
  _width: number;
  _height: number;
  _expanding: boolean;
  _needsReframe: boolean;
  prevBounds: Size | undefined;
  elementBounds: DOMRect;
  blobUrl: string | undefined;
  supportsSrcdoc: boolean;
  stopExpanding: boolean;
  sectionRender: Promise<any>;

  constructor(section: Section, options?: IframeViewOptions);

  container(axis?: string): HTMLElement;
  create(): HTMLIFrameElement;
  render(request: any, show?: boolean): Promise<void>;
  reset(): void;
  size(_width?: number, _height?: number): void;
  lock(what: string, width?: number, height?: number): void;
  expand(force?: boolean): void;
  reframe(width: number, height: number): void;
  load(contents: string): Promise<Contents>;
  onLoad(event: Event, promise: any): void;
  setLayout(layout: Layout): void;
  setAxis(axis: string): void;
  setWritingMode(mode: string): void;
  addListeners(): void;
  removeListeners(layoutFunc?: Function): void;
  display(request: any): Promise<IframeView>;
  show(): void;
  hide(): void;
  offset(): { top: number; left: number };
  width(): number;
  height(): number;
  position(): DOMRect;
  locationOf(target: string | Range): { left: number; top: number };
  onDisplayed(view: IframeView): void;
  onResize(view: IframeView, e: Size): void;
  bounds(force?: boolean): DOMRect;
  highlight(
    cfiRange: string,
    data?: Record<string, any>,
    cb?: (e: Event) => void,
    className?: string,
    styles?: HighlightStyles,
  ): Highlight;
  underline(
    cfiRange: string,
    data?: Record<string, any>,
    cb?: (e: Event) => void,
    className?: string,
    styles?: UnderlineStyles,
  ): Underline;
  mark(
    cfiRange: string,
    data?: Record<string, any>,
    cb?: (e: Event) => void,
  ): HTMLElement | undefined;
  placeMark(element: HTMLElement, range: Range): void;
  unhighlight(cfiRange: string): void;
  ununderline(cfiRange: string): void;
  unmark(cfiRange: string): void;
  destroy(): void;

  on(event: string, callback: (...args: any[]) => void): void;
  off(event: string, callback: (...args: any[]) => void): void;
  emit(event: string, ...args: any[]): void;
}

export default IframeView;
