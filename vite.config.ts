import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, readdirSync } from 'fs'

/**
 * Plugin to copy CSS files to dist directory
 */
function copyStylesPlugin(): Plugin {
  return {
    name: 'copy-styles',
    writeBundle() {
      const srcStylesDir = resolve(__dirname, 'src/styles')
      const distStylesDir = resolve(__dirname, 'dist/styles')

      // Create dist/styles directory if it doesn't exist
      if (!existsSync(distStylesDir)) {
        mkdirSync(distStylesDir, { recursive: true })
      }

      // Copy all CSS files from src/styles to dist/styles
      if (existsSync(srcStylesDir)) {
        const files = readdirSync(srcStylesDir)
        for (const file of files) {
          if (file.endsWith('.css')) {
            copyFileSync(
              resolve(srcStylesDir, file),
              resolve(distStylesDir, file)
            )
          }
        }
      }
    },
  }
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      include: ['src'],
      outDir: 'dist',
      rollupTypes: true,
    }),
    copyStylesPlugin(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'UntitledDesignSystem',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-aria-components', 'sonner'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
          'react-aria-components': 'ReactAriaComponents',
        },
      },
    },
  },
})
