import { defineConfig } from "vite";
import zaloMiniApp from "zmp-vite-plugin";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // root: "./src", 
  base: "./",
  plugins: [zaloMiniApp({
    autoGenerateConfig: true,
  }), react()],
  build: {
    outDir: "dist", 
    emptyOutDir: true,
    assetsInlineLimit: 0,
  },
});
