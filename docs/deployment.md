# Deployment

## Vercel (Recommended)

The easiest way to deploy is using Vercel:

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frohanpatriot%2Fnextjs-directory-boilerplate&project-name=nextjs-directory-boilerplate&repository-name=nextjs-directory-boilerplate&skippable-integrations=1)

### Manual Deploy

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Configure environment variables
4. Deploy

### Environment Variables

Set these in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL (e.g., `https://your-domain.com`) |
| `GOOGLE_SITE_VERIFICATION` | No | Google Search Console verification code |

## Other Platforms

### Netlify

1. Connect your repository
2. Build command: `pnpm build`
3. Publish directory: `.next`
4. Add environment variables

Note: You may need to add a `netlify.toml`:

```toml
[build]
  command = "pnpm build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

### Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]
```

For standalone output, add to `next.config.ts`:

```typescript
const nextConfig = {
  output: 'standalone',
};
```

Build and run:

```bash
docker build -t my-site .
docker run -p 3000:3000 my-site
```

### Static Export

For static hosting (GitHub Pages, S3, etc.):

1. Add to `next.config.ts`:

```typescript
const nextConfig = {
  output: 'export',
};
```

2. Build:

```bash
pnpm build
```

3. Deploy the `out/` directory

Note: Static export doesn't support:
- Dynamic routes with server-side features
- API routes
- Incremental Static Regeneration

## Build Configuration

### next.config.ts Options

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode
  reactStrictMode: true,

  // Image optimization domains
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'your-cdn.com',
      },
    ],
  },

  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ];
  },

  // Header configuration
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
```

## Pre-Deployment Checklist

- [ ] Update `NEXT_PUBLIC_SITE_URL` to production URL
- [ ] Configure `seoConfig` in `src/config/directory.config.ts`
- [ ] Add production Open Graph image at `/public/og-default.png`
- [ ] Add favicon at `/public/favicon.ico`
- [ ] Test sitemap at `/sitemap.xml`
- [ ] Test RSS feed at `/feed.xml`
- [ ] Verify dark mode works correctly
- [ ] Run `pnpm build` locally to check for errors
- [ ] Test on mobile devices

## Performance

### Built-in Optimizations

- **Static Generation**: Pages are pre-rendered at build time
- **Image Optimization**: Automatic via Next.js Image component
- **Code Splitting**: Automatic per-page code splitting
- **Turbopack**: Fast development builds

### Additional Optimizations

1. **Analyze Bundle Size**:

```bash
pnpm add -D @next/bundle-analyzer
```

```typescript
// next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

export default withBundleAnalyzer(nextConfig);
```

```bash
ANALYZE=true pnpm build
```

2. **Cache Headers**: Vercel automatically sets optimal cache headers for static assets.

## Monitoring

### Vercel Analytics

Enable in your Vercel project settings or:

```bash
pnpm add @vercel/analytics
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking

Consider adding Sentry or similar:

```bash
pnpm add @sentry/nextjs
```

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

### DNS Configuration

Typical setup:
- `A` record: `76.76.21.21` (Vercel)
- `CNAME` for `www`: `cname.vercel-dns.com`

## Troubleshooting

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next node_modules
pnpm install
pnpm build
```

### Environment Variables Not Working

- Verify variables are set in deployment platform
- Client-side variables must start with `NEXT_PUBLIC_`
- Redeploy after changing variables

### Images Not Loading

- Check `next.config.ts` for allowed image domains
- Verify paths are correct (relative to `/public`)
- Check file exists and is properly formatted
