export declare class FlexResizer {
  depth: number;
  overrideIframe: boolean;
  name: string;
  save: boolean;
  el: HTMLElement;
  disabled: boolean;
  private resizing;
  private a;
  private b;
  private aOriginalGrow;
  private bOriginalGrow;
  private psize;
  private nsize;
  private totalHeight;
  private totalFlexGrow;
  private resizeCurrentPos;
  private startPos;
  private getElementSize;
  private getPosition;
  private direction;
  constructor();
  render(): any;
  resizeStart(event: MouseEvent | TouchEvent): void;
  handleKeyDown(ev: KeyboardEvent): void;
  cancelResize(): void;
  private localStorageKey;
  resizeEnd(): void;
  resize(event: MouseEvent): void;
  computeSize(element: HTMLElement): number;
  handleResizeEvent(event: TouchEvent | MouseEvent): Touch | MouseEvent;
  normalizeDepth(): HTMLElement;
  connectedCallback(): void;
  watchName(name: string): void;
  watchDisabled(disabled: boolean): void;
}
