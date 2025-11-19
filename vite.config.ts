import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const plugins: PluginOption[] = [react()];

  // Only add Replit plugins in development and when REPL_ID is defined
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    try {
      const runtimeErrorOverlayModule = await import("@replit/vite-plugin-runtime-error-modal");
      plugins.push(runtimeErrorOverlayModule.default() as PluginOption);
      
      const cartographerModule = await import("@replit/vite-plugin-cartographer");
      plugins.push(cartographerModule.cartographer() as PluginOption);
    } catch (e) {
      // Ignore if Replit plugins are not available (e.g., in Vercel)
    }
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
      assetsInclude: ["**/*.jpeg", "**/*.jpg", "**/*.png", "**/*.gif", "**/*.webp"],
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
