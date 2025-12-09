import { existsSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const submodulePath = join(projectRoot, 'design-system', 'src');
const designSystemSrc = join(projectRoot, '..', 'syncrofy-ds', 'src');
const designSystemDest = join(projectRoot, 'design-system');

// Check if submodule is already set up
if (existsSync(submodulePath)) {
  console.log('Design system submodule found at design-system/src');
  // Submodule is already set up, no need to copy
} else if (existsSync(designSystemSrc) && !existsSync(designSystemDest)) {
  // Fallback: copy from relative path if submodule doesn't exist
  console.log('Copying design system for build...');
  cpSync(designSystemSrc, designSystemDest, { recursive: true });
  console.log('Design system copied successfully');
} else if (!existsSync(submodulePath) && !existsSync(designSystemSrc)) {
  console.warn('Warning: Design system not found.');
  console.warn('Expected locations:');
  console.warn('  - design-system/src (git submodule)');
  console.warn('  - ../syncrofy-ds/src (relative path)');
  console.warn('If deploying to Vercel, ensure the design system is set up as a git submodule.');
  console.warn('See SETUP_SUBMODULE.md for instructions.');
}

