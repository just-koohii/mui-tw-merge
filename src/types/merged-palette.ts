/**
 * Merged palette type, overrides the default MUI palette type.
 * Typescript forced my hand there
 */
export type MergedPalette = {
  primary: Record<string, string>;
  secondary: Record<string, string>;
  error: Record<string, string>;
  warning: Record<string, string>;
  info: Record<string, string>;
  success: Record<string, string>;
  grey: Record<string, string>;
  divider: string;
  background: Record<string, string>;
};
