import { theme as tailwindTheme } from "tailwindcss/defaultConfig";
import type { Theme } from "@mui/material/styles";
import { MergedPalette } from "src/types/merged-palette";
import { Typography } from "@mui/material/styles/createTypography";

/**
 * Converts the theme's fontWeight into tailwind's fontWeight option format.
 */
export const mergeFontWeight = (muiTheme: Theme) => {
  if (!muiTheme?.typography) {
    throw new Error("muiTheme.typography is undefined");
  }

  const fontWeightKeys = Object.keys(muiTheme?.typography).filter((key) =>
    key.startsWith("fontWeight"),
  ) as Array<keyof Typography>;

  return Object.fromEntries(
    fontWeightKeys.map((key) => [
      key.replace("fontWeight", "").toLowerCase(),
      (muiTheme.typography[key] as number).toString(),
    ]),
  );
};

/**
 * Converts the theme's palette into a single object.
 *
 * Spread this object into the tailwind theme's colors object.
 */
export const mergePalette = (muiTheme: Theme) => {
  if (!muiTheme?.palette) {
    throw new Error("muiTheme.palette is undefined");
  }

  const {
    primary,
    secondary,
    error,
    warning,
    info,
    success,
    grey,
    divider,
    background,
  } = muiTheme.palette;

  return {
    primary,
    secondary,
    error,
    warning,
    info,
    success,
    grey,
    divider,
    background,
  } as unknown as MergedPalette;
};

/**
 * Converts the theme's breakpoints into tailwind's screen option format.
 */
export const mergeScreens = (muiTheme: Theme) => {
  if (!muiTheme?.breakpoints) {
    throw new Error("muiTheme.breakpoints is undefined");
  }

  return Object.fromEntries(
    muiTheme.breakpoints.keys.map((key) => [
      key,
      `${muiTheme.breakpoints.values[key]}px`,
    ]),
  );
};

/**
 * Converts the theme's shadows into tailwind's dropShadow and boxShadow options.
 */
export const mergeShadows = (muiTheme: Theme) => {
  if (!muiTheme?.shadows) {
    throw new Error("muiTheme.shadows is undefined");
  }

  return Object.fromEntries(muiTheme.shadows.map((shadow, i) => [i, shadow]));
};

/**
 * Converts the theme's spacing into tailwind's spacing option format.
 */
export const mergeSpacing = (muiTheme: Theme) => {
  if (!muiTheme?.spacing) {
    throw new Error("muiTheme.spacing is undefined");
  }

  const spacingKeysWithoutPx = Object.keys(tailwindTheme?.spacing ?? {}).filter(
    (key) => key !== "px",
  );

  return Object.fromEntries(
    spacingKeysWithoutPx.map((key) => [key, muiTheme.spacing(+key)]),
  );
};
