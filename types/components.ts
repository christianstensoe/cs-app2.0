import { ReactNode } from "react";

export interface LayoutProps {
  children: ReactNode;
}

export interface NavItemProps {
  href: string;
  label: string;
  icon?: ReactNode;
}

export interface ThemeProviderProps {
  children: ReactNode;
  attribute?: string;
  defaultTheme?: string;
  enableSystem?: boolean;
}

export interface FooterProps {
  className?: string;
}
