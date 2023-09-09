import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    bail: 0,
    environment: "node",
    include: ["__tests__/**/*.spec.ts"],
    reporters: ["verbose", "html"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      reporter: ["text", "html"],
    },
  },
});
