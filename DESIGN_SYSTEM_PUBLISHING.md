# Design System Publishing Guide

This document explains how to update and publish the Syncrofy Design System as an npm package, and how to consume it in this repository.

## Overview

The design system is now published as `@syncrofy/design-system` on npm. This replaces the previous approach of using git submodules or copying files directly.

## Publishing a New Version

### Prerequisites

1. Ensure you have an npm account with access to publish `@syncrofy/design-system`
2. Set up an npm token as a GitHub secret named `NPM_TOKEN` in the design system repository

### Steps to Publish

1. **Navigate to the design system repository** (`syncrofy-ds`)

2. **Make your changes** to components, theme, or other design system code

3. **Update the version** in `package.json`:
   ```bash
   npm version patch  # for bug fixes (0.1.0 -> 0.1.1)
   npm version minor  # for new features (0.1.0 -> 0.2.0)
   npm version major  # for breaking changes (0.1.0 -> 1.0.0)
   ```

4. **Commit and push the version change**:
   ```bash
   git add package.json package-lock.json
   git commit -m "Bump version to X.Y.Z"
   git push
   ```

5. **Create and push a git tag**:
   ```bash
   git tag vX.Y.Z
   git push origin vX.Y.Z
   ```

6. **GitHub Actions will automatically**:
   - Build the package
   - Run type checks
   - Publish to npm

The package will be available on npm within a few minutes.

## Consuming Updates in This Repository

### Initial Setup

The design system is already configured as a dependency in `package.json`:

```json
"@syncrofy/design-system": "^0.1.0"
```

### Updating to a New Version

1. **Update the version** in `package.json`:
   ```json
   "@syncrofy/design-system": "^0.2.0"
   ```

2. **Install the new version**:
   ```bash
   npm install
   ```

3. **Verify the update**:
   ```bash
   npm list @syncrofy/design-system
   ```

4. **Test your application**:
   ```bash
   npm run dev
   ```

### Using the Design System

Import components and theme from the package:

```tsx
// Import everything you need from the main entry
import { Button, Input, Modal, theme } from '@syncrofy/design-system';

// Or import theme separately
import { theme } from '@syncrofy/design-system';

// Or import just components
import { Button, Input } from '@syncrofy/design-system/components';
```

### Available Exports

- **Main entry** (`@syncrofy/design-system`): Exports all components and theme
- **Components** (`@syncrofy/design-system/components`): Exports only components
- **Theme** (`@syncrofy/design-system/theme`): Exports only theme utilities

## Migration from Old Approach

If you're migrating from the old submodule/copy approach:

1. ✅ All imports have been updated from `@ds/*` to `@syncrofy/design-system`
2. ✅ Vite configuration has been simplified (removed alias logic)
3. ✅ TypeScript configuration has been updated
4. ✅ The `prepare-ds` script is no longer needed

### What Changed

- **Imports**: Changed from `@ds/components/atoms/Button` to `@syncrofy/design-system`
- **Configuration**: Removed `@ds` alias from `vite.config.ts` and `tsconfig.json`
- **Dependencies**: Added `@syncrofy/design-system` to `package.json`

## Troubleshooting

### Package not found

If you get an error that the package cannot be found:

1. Verify the package exists on npm: https://www.npmjs.com/package/@syncrofy/design-system
2. Check that you're using the correct package name: `@syncrofy/design-system`
3. Ensure your npm registry is set correctly: `npm config get registry`

### Version conflicts

If you encounter peer dependency warnings:

1. Ensure your React, MUI, and Emotion versions match the design system's peer dependencies
2. Check `package.json` for version compatibility
3. Run `npm install` to resolve dependencies

### Build errors

If the build fails after updating:

1. Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
2. Check that the design system version you're using is actually published
3. Verify TypeScript types are being resolved correctly

## CI/CD Integration

### Design System Repository

The design system repository uses GitHub Actions to automatically publish when a version tag is pushed:

- Workflow: `.github/workflows/publish.yml`
- Trigger: Tags matching `v*.*.*` pattern
- Steps: Install → Type check → Build → Publish

### This Repository

No special CI configuration is needed. The design system is consumed as a regular npm dependency.

## Best Practices

1. **Version Management**: Use semantic versioning (semver) for releases
2. **Testing**: Test the design system package locally before publishing
3. **Documentation**: Update component documentation when making changes
4. **Breaking Changes**: Use major version bumps and document migration paths
5. **Dependency Updates**: Regularly update to the latest design system version

## Support

For issues or questions:
- Design System Repository: https://github.com/kyle-boyd/syncrofy-ds
- This Repository: Check the main README.md





