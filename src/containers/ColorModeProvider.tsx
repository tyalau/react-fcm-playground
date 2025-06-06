import { ThemeProvider } from 'next-themes'
import type { ThemeProviderProps } from 'next-themes'

export type ColorModeProviderProps = ThemeProviderProps

export const ColorModeProvider = (props: ColorModeProviderProps) => {
  return <ThemeProvider attribute="class" disableTransitionOnChange {...props} />
}
