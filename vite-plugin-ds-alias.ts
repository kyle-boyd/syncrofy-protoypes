import type { Plugin } from 'vite';
import path from 'path';
import { existsSync } from 'fs';

/**
 * Vite plugin to handle design system's internal @/ imports
 * When processing files from the design system, rewrites @/ imports to resolve
 * to the design system's src directory instead of our project's src
 */
export function designSystemAlias(): Plugin {
  // Check for local copy first (for builds), then fall back to relative path (for dev)
  const localDsPath = path.resolve(__dirname, './design-system');
  const relativeDsPath = path.resolve(__dirname, '../syncrofy-ds/src');
  const designSystemSrc = existsSync(localDsPath) ? localDsPath : relativeDsPath;
  
  return {
    name: 'design-system-alias',
    enforce: 'pre',
    resolveId(id, importer) {
      // Only process @/ imports that come from design system files
      if (id.startsWith('@/') && importer) {
        const normalizedImporter = path.normalize(importer);
        const normalizedDsSrc = path.normalize(designSystemSrc);
        
        // Check if the importer is from the design system
        if (normalizedImporter.includes(normalizedDsSrc)) {
          // Resolve @/ imports relative to design system src
          const relativePath = id.replace('@/', '');
          const baseResolved = path.resolve(designSystemSrc, relativePath);
          
          // Try to resolve with extensions
          const extensions = ['.ts', '.tsx', '.js', '.jsx', ''];
          for (const ext of extensions) {
            const withExt = ext ? baseResolved + ext : baseResolved;
            if (existsSync(withExt) || existsSync(withExt + '/index.ts') || existsSync(withExt + '/index.tsx')) {
              return withExt;
            }
          }
          
          // If no file found, return the base path and let Vite handle it
          return baseResolved;
        }
      }
      return null;
    },
  };
}

