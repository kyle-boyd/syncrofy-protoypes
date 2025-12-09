# Syncrofy Prototypes

This repository contains prototype web applications built using the Syncrofy Design System.

## Overview

This project is set up to use components and design tokens from the local Syncrofy Design System located at `../syncrofy-ds`. The design system provides a comprehensive set of React components built on Material UI with custom theming.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the next available port).

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
syncrofy-protoypes/
├── src/
│   ├── App.tsx          # Main app component with ThemeProvider
│   ├── main.tsx         # React entry point
│   ├── pages/           # Prototype pages
│   │   └── Home.tsx     # Example prototype page
│   └── vite-env.d.ts    # Vite type definitions
├── index.html           # HTML entry point
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── vite.config.ts       # Vite configuration
└── README.md            # This file
```

## Using Design System Components

Components from the design system can be imported using the `@ds` alias:

```tsx
import { Button, Input, Modal } from '@ds/components/atoms/Button';
import { theme } from '@ds/theme';
```

The design system is organized using atomic design principles:
- **Atoms**: Basic components (Button, Input, Badge, etc.)
- **Molecules**: Composite components (Dropdown, SegmentedControl, etc.)
- **Organisms**: Complex components (Modal, Table, Navigation, etc.)

## Available Components

The design system includes a wide range of components:

### Atoms
- Avatar, Badge, Breadcrumbs, Button, Checkbox, Chips, DatePicker, Divider
- Icon, IconButton, Input, Link, Logo, PasswordInput, Radio, Search
- SegmentedControlItem, Slot, Spinner, Tag, Toggle, ToggleButton, Tooltip

### Molecules
- ButtonGroup, Dropdown, ListItem, SegmentedControl, SnackBar, Stepper, Tabs, Typeahead

### Organisms
- Accordion, Modal, Navigation, Pagination, Table

## Theme

The design system theme is automatically applied via the `ThemeProvider` in `App.tsx`. The theme includes:
- Custom color palette
- Typography settings
- Component styling overrides
- Custom elevation/shadow values

## Development

This project uses:
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Material UI** - Base component library
- **Emotion** - CSS-in-JS styling

## Creating New Prototypes

To create a new prototype:

1. Create a new file in `src/pages/` (e.g., `MyPrototype.tsx`)
2. Import and use design system components
3. Add routing or navigation to access your prototype

Example:

```tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import { Button } from '@/ds/components/atoms/Button';

function MyPrototype() {
  return (
    <Container>
      <Typography variant="h1">My Prototype</Typography>
      <Button variant="contained">Click me</Button>
    </Container>
  );
}

export default MyPrototype;
```

## License

ISC

