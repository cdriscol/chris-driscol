import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
    appType: "mpa",
    plugins: [
        react(),
        {
            name: "resume-no-trailing-slash",
            apply: "serve",
            enforce: "pre",
            configureServer: function (server) {
                var handler = function (req, _res, next) {
                    var _a, _b;
                    var url = (_b = (_a = req.originalUrl) !== null && _a !== void 0 ? _a : req.url) !== null && _b !== void 0 ? _b : "";
                    if (url === "/resume" || url.startsWith("/resume?")) {
                        req.url = "/resume/index.html";
                        req.originalUrl = "/resume/index.html";
                    }
                    next();
                };
                server.middlewares.use(handler);
            },
        },
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                resume: resolve(__dirname, "resume/index.html"),
            },
        },
    },
    server: {
        port: 5173,
        proxy: {
            "/graphql": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
            "/llms.txt": {
                target: "http://localhost:3000",
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
