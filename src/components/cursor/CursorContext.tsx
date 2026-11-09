import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { CursorVariant, CursorState, CursorContextValue } from '../../types';

const defaultState: CursorState = {
  variant: 'default',
  text: undefined,
  isHovered: false,
};

const CursorContext = createContext<CursorContextValue>({
  cursorState: defaultState,
  setCursorVariant: () => {},
  resetCursor: () => {},
});

export const useCursor = () => useContext(CursorContext);

export const CursorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cursorState, setCursorState] = useState<CursorState>(defaultState);

  const setCursorVariant = useCallback((variant: CursorVariant, text?: string) => {
    setCursorState({
      variant,
      text,
      isHovered: variant !== 'default',
    });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState(defaultState);
  }, []);

  const value = useMemo(
    () => ({ cursorState, setCursorVariant, resetCursor }),
    [cursorState, setCursorVariant, resetCursor]
  );

  return <CursorContext.Provider value={value}>{children}</CursorContext.Provider>;
};

/**
 * Reusable helper hook to bind custom cursor behaviors to any DOM element
 */
export function useCursorTrigger(variant: CursorVariant, text?: string) {
  const { setCursorVariant, resetCursor } = useCursor();

  return {
    onMouseEnter: () => setCursorVariant(variant, text),
    onMouseLeave: () => resetCursor(),
  };
}
