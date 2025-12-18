# Documentation

Welcome to the Next.js Directory/Blog Boilerplate documentation.

## Quick Links

- [Getting Started](getting-started.md) - Installation and first steps
- [Content System](content-system.md) - Adding and managing content
- [Configuration](configuration.md) - Site and content config reference
- [SEO](seo.md) - Sitemap, RSS, metadata, and structured data
- [Dark Mode](dark-mode.md) - Theming and customization
- [Components](components.md) - Available UI components
- [Deployment](deployment.md) - Deploying to production

## Overview

This boilerplate provides a flexible, config-driven system for building content-driven websites. Key features:

- **Unified Content System** - Manage multiple content types (articles, stories, custom types) from a single configuration
- **SEO-First Design** - Automatic sitemap, RSS feed, and JSON-LD structured data
- **Dark Mode** - System preference detection with manual toggle
- **Type-Safe** - Full TypeScript support throughout

## Architecture

```
content/              # Your MDX content files
src/
  app/               # Next.js App Router pages
  components/        # React components
  config/            # Configuration files
  lib/
    content/         # Content loading system
```

The content system reads MDX files from the `content/` directory, parses frontmatter metadata, and serves them through dynamic routes.

## Support

- [GitHub Issues](https://github.com/rohanpatriot/nextjs-directory-boilerplate/issues)
- [GitHub Discussions](https://github.com/rohanpatriot/nextjs-directory-boilerplate/discussions)
