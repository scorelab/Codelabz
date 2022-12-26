import { defineConfig } from 'vite'
import fs from 'fs/promises'
import react from '@vitejs/plugin-react'
// https://vitejs.dev/config/


export default defineConfig({
    esbuild: {
        loader: "jsx",
        include: /src\/.*\.jsx?$/,
        // loader: "tsx",
        // include: /src\/.*\.[tj]sx?$/,
        exclude: [],
    },
    optimizeDeps: {
        esbuildOptions: {
            plugins: [
                {
                    name: "load-js-files-as-jsx",
                    setup(build) {
                        build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => ({
                            loader: "jsx",
                            contents: await fs.readFile(args.path, "utf8"),
                        }));
                    },

                },
            ],
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                javascriptEnabled: true,
                modifyVars: {
                    // "@primary-color": "#3AAFA9",
                    '@primary-color': '#455A64',
                    '@font-family': "'Poppins', sans-serif",
                    '@font-size-base': '14px',
                    '@border-radius-base': '5px',
                },
            }
        }
    },
    plugins: [react()],
})
