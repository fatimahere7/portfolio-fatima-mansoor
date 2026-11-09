export type CursorVariant = 'default' | 'link' | 'image' | 'project' | 'button' | 'text';

export interface CursorState {
  variant: CursorVariant;
  text?: string;
  isHovered: boolean;
}

export interface CursorContextValue {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;
  resetCursor: () => void;
}

export type GridVariant = 'default' | 'dense' | 'minimal' | 'architectural';

export interface ScrollContextValue {
  scrollY: number;
  scrollProgress: number;
  isScrolling: boolean;
  scrollTo: (target: number | string, options?: ScrollToOptions) => void;
}
