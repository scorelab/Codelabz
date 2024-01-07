import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {}
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
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      'jss-plugin-{}': 'jss-plugin-global' // Add the actual path to the module in your project here
    },
  },
  build: {
    rollupOptions: {
      external: ['jss-plugin-{}','jss-plugin-ven  dor-prefixer'] // Add the module here
    }
  },
  plugins: [react()],
})
