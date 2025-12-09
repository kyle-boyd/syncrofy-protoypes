import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { designSystemAlias } from './vite-plugin-ds-alias';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic',
      include: /\.(tsx?|jsx?)$/,
    }),
    designSystemAlias(),
  ],
  resolve: {
    alias: {
      // Our project's src alias
      '@': path.resolve(__dirname, './src'),
      // Design system alias - use this to import from design system
      '@ds': path.resolve(__dirname, '../syncrofy-ds/src'),
      // Force single React instance to prevent "Invalid hook call" errors
      'react': path.resolve(__dirname, './node_modules/react'),
      'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
      // Force single emotion instance to prevent styling issues
      '@emotion/react': path.resolve(__dirname, './node_modules/@emotion/react'),
      '@emotion/styled': path.resolve(__dirname, './node_modules/@emotion/styled'),
    },
  },
  optimizeDeps: {
    // Ensure design system dependencies are optimized
    include: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      '@mui/material',
      '@mui/icons-material',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion',
    ],
  },
  esbuild: {
    jsx: 'automatic',
  },
});

