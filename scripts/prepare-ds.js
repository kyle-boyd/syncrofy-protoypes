import { existsSync, cpSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = join(__dirname, '..');
const designSystemSrc = join(projectRoot, '..', 'syncrofy-ds', 'src');
const designSystemDest = join(projectRoot, 'design-system');

// Only copy if the design system exists and hasn't been copied yet
if (existsSync(designSystemSrc) && !existsSync(designSystemDest)) {
  console.log('Copying design system for build...');
  cpSync(designSystemSrc, designSystemDest, { recursive: true });
  console.log('Design system copied successfully');
} else if (!existsSync(designSystemSrc)) {
  console.warn('Warning: Design system not found at', designSystemSrc);
  console.warn('If deploying to Vercel, ensure the design system is available as a git submodule or included in the repository.');
}

