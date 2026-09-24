# ALPHA-24 — Financial Services Website

A professional single-page financial-services website built with React, TypeScript, Vite, and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Local Development

Start the local development server:

```bash
npm run dev
```

### Type Checking

Ensure there are no TypeScript errors:

```bash
npm run typecheck
```

### Build for Production

Generate a production-ready build in the `dist` directory:

```bash
npm run build
```

### Preview Production Build

Preview the generated production build locally:

```bash
npm run preview
```

## Deployment

This website is configured to be deployed on Netlify. 

- **Build command:** `npm run build`
- **Publish directory:** `dist`

### Netlify Forms
The enquiry form uses Netlify Forms for handling submissions. Note that form submissions are processed **after deployment to Netlify** and will not work fully in the local development environment. 

The notification emails will be dynamically formatted and sent to the configured email address in your Netlify Site Settings > Form Notifications.
