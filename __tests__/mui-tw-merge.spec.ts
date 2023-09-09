import { type Theme, createTheme } from "@mui/material/styles";
import {
  mergeFontWeight,
  mergePalette,
  mergeScreens,
  mergeShadows,
  mergeSpacing,
} from "../src";
import { theme as defaultTailwindTheme } from "tailwindcss/defaultConfig";
import { Typography } from "@mui/material/styles/createTypography";
import resolveConfig from "tailwindcss/resolveConfig";
import { Config } from "tailwindcss";

describe("mui-tw-merge", () => {
  const theme = createTheme();

  describe("mergePalette", () => {
    it("should return an object containing the theme's palette in tailwind format", () => {
      const mergedPalette = mergePalette(theme);

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
      } = theme.palette;

      const mergedConfig: Config = resolveConfig({
        content: [],
        theme: {
          extend: {
            colors: mergedPalette,
          },
        },
      });

      expect(mergedPalette).toStrictEqual({
        primary,
        secondary,
        error,
        warning,
        info,
        success,
        grey,
        divider,
        background,
      });

      expect(mergedConfig?.theme?.colors).toStrictEqual(
        expect.objectContaining(mergedPalette),
      );
    });

    it("should thrown an error if the theme's palette is undefined", () => {
      expect(() => {
        mergePalette({} as Theme);
      }).toThrowError("muiTheme.palette is undefined");
    });
  });

  describe("mergeScreens", () => {
    it("should return an object containing the theme breakpoints in tailwind format", () => {
      const mergedScreens = mergeScreens(theme);

      const breakpointObj: Record<string, string> = {};

      theme.breakpoints.keys.forEach((key) => {
        breakpointObj[key] = expect.any(String);
      });

      const mergedConfig: Config = resolveConfig({
        content: [],
        theme: {
          extend: {
            screens: mergedScreens,
          },
        },
      });

      expect(mergedScreens).toStrictEqual(breakpointObj);

      expect(mergedConfig?.theme?.screens).toStrictEqual(
        expect.objectContaining(mergedScreens),
      );
    });

    it("should thrown an error if the theme's breakpoints is undefined", () => {
      expect(() => {
        mergeScreens({} as Theme);
      }).toThrowError("muiTheme.breakpoints is undefined");
    });
  });

  describe("mergeShadows", () => {
    it("should return an object containing the theme's shadows in tailwind format", () => {
      const mergedShadows = mergeShadows(theme);

      const shadowObj: Record<string, string> = {};

      theme.shadows.forEach((_, i) => {
        shadowObj[i] = expect.any(String);
      });

      const mergedConfig: Config = resolveConfig({
        content: [],
        theme: {
          extend: {
            boxShadow: mergedShadows,
            dropShadow: mergedShadows,
          },
        },
      });

      expect(mergedShadows).toStrictEqual(shadowObj);

      expect(mergedConfig?.theme?.boxShadow).toStrictEqual(
        expect.objectContaining(mergedShadows),
      );

      expect(mergedConfig?.theme?.dropShadow).toStrictEqual(
        expect.objectContaining(mergedShadows),
      );
    });

    it("should thrown an error if the theme's shadows is undefined", () => {
      expect(() => {
        mergeShadows({} as Theme);
      }).toThrowError("muiTheme.shadows is undefined");
    });
  });

  describe("mergeSpacing", () => {
    it("should return an object containing the theme spacing in tailwind format", () => {
      const mergedSpacing = mergeSpacing(theme);

      const spacingKeysWithoutPx = Object.keys(
        defaultTailwindTheme?.spacing ?? {},
      ).filter((key) => key !== "px");

      const spacingObj: Record<string, string> = {};

      spacingKeysWithoutPx.forEach((key) => {
        spacingObj[key] = expect.any(String);
      });

      const mergedConfig: Config = resolveConfig({
        content: [],
        theme: {
          extend: {
            spacing: mergedSpacing,
          },
        },
      });

      expect(mergedSpacing).toStrictEqual(spacingObj);

      expect(mergedConfig?.theme?.spacing).toStrictEqual(
        expect.objectContaining(mergedSpacing),
      );
    });

    it("should thrown an error if the theme's spacing is undefined", () => {
      expect(() => {
        mergeSpacing({} as Theme);
      }).toThrowError("muiTheme.spacing is undefined");
    });
  });

  describe("mergeFontWeight", () => {
    it("should return an object containing the theme's typography in tailwind format", () => {
      const mergedFontWeight = mergeFontWeight(theme);

      const fontWeightObj: Record<string, string> = {};

      const fontWeightKeys = Object.keys(theme?.typography).filter((key) =>
        key.startsWith("fontWeight"),
      ) as Array<keyof Typography>;

      fontWeightKeys.forEach((key) => {
        fontWeightObj[key.replace("fontWeight", "").toLowerCase()] =
          expect.any(String);
      });

      const mergedConfig: Config = resolveConfig({
        content: [],
        theme: {
          extend: {
            fontWeight: mergedFontWeight,
          },
        },
      });

      expect(mergedFontWeight).toStrictEqual(fontWeightObj);

      expect(mergedConfig?.theme?.fontWeight).toStrictEqual(
        expect.objectContaining(mergedFontWeight),
      );
    });

    it("should thrown an error if the theme's typography is undefined", () => {
      expect(() => {
        mergeFontWeight({} as Theme);
      }).toThrowError("muiTheme.typography is undefined");
    });
  });
});
