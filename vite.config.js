import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
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
  server: {
    host: true
  },
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    global: {}
  }
})
