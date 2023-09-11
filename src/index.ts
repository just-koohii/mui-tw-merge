import { theme as tailwindTheme } from "tailwindcss/defaultConfig";
import { type Theme } from "@mui/material/styles";
import { Typography } from "@mui/material/styles/createTypography";
import { MergedPalette } from "./types/merged-palette";
import { toKebabCase } from "./utils/to-kebab-case";

/**
 * Converts the theme's fontWeight into tailwind's fontWeight option format.
 */
export const mergeFontWeight = (muiTheme: Theme): Record<string, string> => {
  if (!muiTheme?.typography) {
    throw new Error("muiTheme.typography is undefined");
  }

  const fontWeightKeys = Object.keys(muiTheme.typography).filter((key) =>
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

/**
 * Converts the theme's easing functions into tailwind's transitionTimingFunction option format.
 */
export const mergeTransitionEasing = (muiTheme: Theme) => {
  if (!muiTheme?.transitions?.easing) {
    throw new Error("muiTheme.transitions.easing is undefined");
  }

  return Object.fromEntries(
    Object.entries(muiTheme.transitions.easing).map(([key, value]) => [
      toKebabCase(key.replace("easing", "")),
      value,
    ]),
  );
};

/**
 * Converts the theme's easing durations into tailwind's transitionDuration option format.
 */
export const mergeTransitionDuration = (muiTheme: Theme) => {
  if (!muiTheme?.transitions?.duration) {
    throw new Error("muiTheme.transitions.duration is undefined");
  }

  return Object.fromEntries(
    Object.entries(muiTheme.transitions.duration).map(([key, value]) => [
      toKebabCase(key),
      value,
    ]),
  );
};
