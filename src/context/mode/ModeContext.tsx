'use client';

import { createContext, useState, useEffect, useMemo, ReactNode } from 'react';

type Mode = 'academic' | 'tech';

interface ModeContextProps {
  mode: Mode;
  toggleMode: () => void;
}

export const ModeContext = createContext<ModeContextProps | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>('academic');

  useEffect(() => {
    const stored = localStorage.getItem('mode') as Mode | null;
    if (stored) setMode(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => (prev === 'academic' ? 'tech' : 'academic'));
  };

  const value = useMemo(() => ({ mode, toggleMode }), [mode]);

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
};
