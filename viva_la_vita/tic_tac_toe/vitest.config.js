import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],  // Ensures Vitest can parse React components correctly
  test: {
    globals: true,
    environment: "jsdom", // Enables a browser-like environment
    include: ["test/*.test.js"] // ✅ Ensures Vitest runs tests inside `test/`
  }
});
