import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/invitation/',
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    watch: {
      ignored: ['**/*.tmp', '**/~$*', '**/docx_qa/**', '**/.git/**']
    }
  }
});
