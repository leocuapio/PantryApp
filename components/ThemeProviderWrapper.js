// components/ThemeProviderWrapper.js
'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export default function ThemeProviderWrapper({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}