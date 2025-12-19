# Development Workflow Guide

This document explains how to work with the design system and prototypes repositories.

## Quick Links

- **Design System Package**: [@kyleboyd/design-system on npm](https://www.npmjs.com/package/@kyleboyd/design-system)
- **Design System Repo**: [syncrofy-ds](https://github.com/kyle-boyd/syncrofy-ds)
- **This Repo**: [syncrofy-prototypes](https://github.com/kyle-boyd/syncrofy-prototypes)

## Overview

- **syncrofy-ds**: Design system repository - contains all components, theme, and publishes to npm as `@kyleboyd/design-system`
- **syncrofy-prototypes**: Prototypes repository - consumes the design system from npm

---

## 1. Viewing Changes Locally in Both DS and Prototypes

### Option A: Using npm link (Recommended for rapid iteration)

This allows you to test design system changes in prototypes without publishing to npm.

**In syncrofy-ds:**
```bash
cd syncrofy-ds
npm run build  # Build the design system
npm link       # Create a global symlink
```

**In syncrofy-prototypes:**
```bash
cd syncrofy-prototypes
npm link @kyleboyd/design-system  # Link to local build
npm run dev  # Start dev server to see changes
```

**To unlink when done:**
```bash
cd syncrofy-prototypes
npm unlink @kyleboyd/design-system
npm install  # Restore npm package
```

### Option B: Using file: reference (Alternative)

Temporarily change `package.json` in prototypes:
```json
"@kyleboyd/design-system": "file:../syncrofy-ds"
```
Then run `npm install` in prototypes. **Remember to change it back before committing.**

### Viewing Design System Changes in Storybook:
```bash
cd syncrofy-ds
npm run storybook  # Runs on http://localhost:6006
```

### Viewing Prototype Changes:
```bash
cd syncrofy-prototypes
npm run dev  # Runs on http://localhost:5173 (or next available port)
```

---

## 2. Syncing Changes from DS to Prototypes Locally

### During Active Development (Before Publishing):

**Step 1: Make changes in syncrofy-ds**
```bash
cd syncrofy-ds
# Edit component files, theme, etc.
```

**Step 2: Build the design system**
```bash
cd syncrofy-ds
npm run build
```

**Step 3A: If using npm link (see Option A above)**
- Changes are automatically reflected when you rebuild
- Just run `npm run build` in syncrofy-ds again
- Refresh prototype dev server

**Step 3B: If using file: reference (see Option B above)**
```bash
cd syncrofy-prototypes
npm install  # Reinstalls from local syncrofy-ds
# Or just restart dev server if it watches for changes
```

**Step 4: Test in prototypes**
```bash
cd syncrofy-prototypes
npm run dev  # View changes in browser
```

---

## 3. Syncing Changes to GitHub / Vercel (Publishing Workflow)

### Publishing Design System Changes:

**Step 1: Test locally**
```bash
cd syncrofy-ds
npm run build        # Verify build works
npm run storybook    # Test in Storybook
```

**Step 2: Commit your changes**
```bash
cd syncrofy-ds
git add .
git commit -m "Description of changes"
git push origin main  # Or your branch name
```

**Step 3: Bump version and publish**
```bash
cd syncrofy-ds
# Choose version bump type:
# - patch: bug fixes (1.0.0 -> 1.0.1)
# - minor: new features (1.0.0 -> 1.1.0)
# - major: breaking changes (1.0.0 -> 2.0.0)
npm version patch     # or minor, or major
```

This command automatically:
- Updates version in `package.json`
- Creates a git commit with version change
- Creates a git tag (e.g., v1.0.1)

**Step 4: Push version tag**
```bash
git push origin main
git push origin --tags  # Pushes the version tag
```

**Step 5: GitHub Actions automatically publishes**
- GitHub Actions detects the version tag
- Builds the package
- Runs type checks
- Publishes to npm
- Usually takes 2-5 minutes

**Step 6: Verify publication**
```bash
npm view @kyleboyd/design-system version  # Check latest published version
```

Or visit: https://www.npmjs.com/package/@kyleboyd/design-system

### Updating Prototypes to Use New Design System Version:

**Step 1: Update package.json**
```bash
cd syncrofy-prototypes
# Edit package.json, change version:
# "@kyleboyd/design-system": "^1.0.1"  # or whatever new version
```

**Step 2: Install new version**
```bash
cd syncrofy-prototypes
npm install
```

**Step 3: Test locally**
```bash
cd syncrofy-prototypes
npm run dev  # Verify everything works
npm run build  # Verify build works
```

**Step 4: Commit and push**
```bash
cd syncrofy-prototypes
git add package.json package-lock.json
git commit -m "Update design system to v1.0.1"
git push origin main
```

**Step 5: Vercel automatically deploys**
- Vercel detects the push to main branch
- Runs `npm install` (gets new design system version)
- Builds the prototype
- Deploys to production
- Usually takes 2-3 minutes

**Check deployment status:**
- View in Vercel dashboard
- Or check deployment URL

---

## Workflow Summary

### Quick Reference:

**Local Development:**
- DS changes → Build DS → Link/test in prototypes → Iterate
- Use `npm link` for rapid iteration
- Use Storybook to test DS components in isolation

**Publishing:**
- DS changes → Commit → Bump version → Push tag → npm publish (auto)
- Prototypes → Update version → Install → Test → Commit → Deploy (auto)

**Testing Strategy:**
1. Test in Storybook (DS changes)
2. Test locally in prototypes (linked or file reference)
3. Test after npm publish (install from npm)
4. Verify on Vercel after deployment

---

## Common Commands

### Design System (syncrofy-ds)
```bash
npm run dev          # Run dev server
npm run build        # Build package for npm
npm run storybook    # View components in Storybook
npm version patch    # Bump patch version (1.0.0 -> 1.0.1)
npm version minor    # Bump minor version (1.0.0 -> 1.1.0)
npm version major    # Bump major version (1.0.0 -> 2.0.0)
npm link             # Create global symlink for local testing
```

### Prototypes (syncrofy-prototypes)
```bash
npm run dev          # Run dev server
npm run build        # Build for production
npm install          # Install/update dependencies
npm link @kyleboyd/design-system    # Link to local DS build
npm unlink @kyleboyd/design-system  # Unlink and restore npm package
```

---

## Troubleshooting

### Design System build fails
- Check TypeScript errors (though build should still work)
- Verify all dependencies are installed: `npm ci`
- Try cleaning: `rm -rf node_modules dist && npm install`

### Prototypes can't find design system package
- Verify package is published: https://www.npmjs.com/package/@kyleboyd/design-system
- Check package.json version matches published version
- Clear cache: `rm -rf node_modules package-lock.json && npm install`

### npm link issues
- Make sure you've run `npm link` in syncrofy-ds first
- Try unlinking and re-linking: `npm unlink @kyleboyd/design-system && npm link @kyleboyd/design-system`
- Check you're using the correct package name

### Vercel deployment fails
- Check build logs in Vercel dashboard
- Verify package.json has correct package name and version
- Ensure all imports use `@kyleboyd/design-system`

---

## Version Naming Conventions

- **Patch (1.0.0 → 1.0.1)**: Bug fixes, small tweaks
- **Minor (1.0.0 → 1.1.0)**: New features, new components
- **Major (1.0.0 → 2.0.0)**: Breaking changes, API changes

Use semantic versioning (semver) for all releases.

