"use client";

import { ReactNode } from "react";
import { ModeProvider } from "./mode/ModeContext";
import { DataProvider } from "./data/DataContext";

// Add other providers here as needed

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ModeProvider>
      <DataProvider>{children}</DataProvider>
    </ModeProvider>
  );
};
