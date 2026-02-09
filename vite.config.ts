import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs/promises";
import { existsSync } from "fs";

// https://vitejs.dev/config/
const copyPhpBackend = () => ({
  name: "copy-php-backend",
  apply: "build",
  async closeBundle() {
    const sourceDir = path.resolve(__dirname, "php-backend");
    if (!existsSync(sourceDir)) {
      return;
    }
    const targetDir = path.resolve(__dirname, "dist", "api");
    await fs.mkdir(targetDir, { recursive: true });
    await fs.cp(sourceDir, targetDir, { recursive: true });
  },
});

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), mode === "development" && componentTagger(), copyPhpBackend()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
