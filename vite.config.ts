import { defineConfig } from "vitest/config"; // Use vitest/config instead of vite
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,       // allows "describe", "it", "expect" without imports
    environment: "jsdom" // simulates browser environment
  },
  resolve: {
    alias: {
      "@types": path.resolve(__dirname, "src/types"),
      "@models": path.resolve(__dirname, "src/types/models"),
      "@store": path.resolve(__dirname, "src/store"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@": path.resolve(__dirname, "src") // optional, keeps old @/ style
    }
  }
});
