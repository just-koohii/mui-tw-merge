# mui-tw-merge

<div align="center" style="display: flex; flex-direction: column; align-items: center; margin-bottom: 16px;">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg">
      <img alt="Tailwind CSS" src="https://raw.githubusercontent.com/tailwindlabs/tailwindcss/HEAD/.github/logo-light.svg" width="350" height="70" style="max-width: 100%;">
    </picture>
    <img width="150" src="/.github/plus.svg" alt="Plus">
    <img width="150" src="https://raw.githubusercontent.com/mui/material-ui/master/docs/public/static/logo.svg" alt="MUI logo">
</div>

<p align="center">
  Utility functions to merge MUI's theme into TailwindCSS
</p>


<p align="center">
    <img src="https://img.shields.io/npm/dt/mui-tw-merge.svg" alt="Total Downloads" />
    <img src="https://img.shields.io/npm/v/mui-tw-merge.svg" alt="Latest Release" />
    <a href="https://github.com/just-koohii/mui-tw-merge/blob/master/LICENSE"><img src="https://img.shields.io/npm/l/mui-tw-merge.svg" alt="License"></a>
</p>

## Installation

### 1. Install @mui/material and tailwindcss:

**npm:**

```bash
npm i @mui/material @emotion/react @emotion/styled
```

```bash
npm i -D tailwindcss postcss autoprefixer
```

**yarn:**

```bash
yarn add @mui/material @emotion/react @emotion/styled
```

```bash
yarn i -D tailwindcss postcss autoprefixer
```


**pnpm:**

```bash
pnpm i @mui/material @emotion/react @emotion/styled
```

```bash
pnpm i -D tailwindcss postcss autoprefixer
```


### 2. Install mui-tw-merge as a dev dependency:

**npm:**

```bash
npm i -D mui-tw-merge
```

**yarn:**

```bash
yarn add -D mui-tw-merge
```

**pnpm:**

```bash
pnpm i -D mui-tw-merge
```

## Usage

### 1. Create a new Material UI theme in tailwind.config.ts

```ts
import { Config } from "tailwindcss";
import { createTheme } from "@mui/material/styles";
import {
  mergeSpacing,
  mergeScreens,
  mergePalette,
  mergeShadows,
  mergeTransitionEasing,
  mergeTransitionDuration,
} from "mui-tw-merge";

const materialTheme = createTheme({ /* your MUI theme config */ })

const config: Config = {
  content: [],
  theme: {
    extend: {
      spacing: mergeSpacing(materialTheme),
      screens: mergeScreens(materialTheme),
      colors: mergePalette(materialTheme),
      boxShadow: mergeShadows(materialTheme),
      dropShadow: mergeShadows(materialTheme),
      transitionTimingFunction: mergeTransitionEasing(materialTheme),
      transitionDuration: mergeTransitionDuration(materialTheme),
    },
  },
};

export default config;
```

### 2. Use MUI theme's properties as tailwind classes

```tsx
import Button from "@mui/material/Button";

export const MyComponent = () => {
  return (
    <div className="flex flex-col gap-3">
      <p className="mb-1">My margin-bottom is theme.spacing(1)</p>

      <button type="button" className="bg-primary-main">
        My background-color is theme.palette.primary.main
      </button>

      <Button className="duration-shortest ease-sharp transition-shadow hover:shadow-18">
        It also works with MUI Components
      </Button>
    </div>
  );
};

```