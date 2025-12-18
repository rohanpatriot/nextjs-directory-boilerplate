# SEO

The boilerplate includes comprehensive SEO infrastructure out of the box.

## Overview

| Feature | URL | Description |
|---------|-----|-------------|
| Sitemap | `/sitemap.xml` | Dynamic XML sitemap |
| RSS Feed | `/feed.xml` | RSS 2.0 feed |
| Robots.txt | `/robots.txt` | Crawler rules |
| JSON-LD | Embedded | Structured data |

## Sitemap

The sitemap at `/sitemap.xml` is automatically generated and includes:

- Static pages (priority 1.0, daily updates)
- Content type listing pages (priority 0.9, daily updates)
- Individual content pages (priority 0.8, weekly updates)
- Tag pages (priority 0.6, weekly updates)

**File:** `src/app/sitemap.ts`

The sitemap uses the `lastModified` date from content metadata when available.

## RSS Feed

An RSS 2.0 feed is available at `/feed.xml` containing all content sorted by date (newest first).

**File:** `src/app/feed.xml/route.ts`

The feed includes:
- Title, link, and description
- Author name
- Tags as categories
- Publication date

Cache settings: 1-hour cache with stale-while-revalidate.

## Robots.txt

**File:** `src/app/robots.ts`

Default configuration:
```
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /private/
Sitemap: https://your-domain.com/sitemap.xml
```

## Metadata

**File:** `src/lib/metadata.ts`

### Base Metadata

Applied to all pages via the root layout:

```typescript
import { generateBaseMetadata } from '@/lib/metadata';

export const metadata = generateBaseMetadata();
```

Includes:
- Title template (`%s | Site Name`)
- Description
- Keywords
- Open Graph defaults
- Twitter card defaults
- RSS feed link
- Search engine verification codes

### Page Metadata

For custom pages:

```typescript
import { generatePageMetadata } from '@/lib/metadata';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn more about our company',
  canonical: 'https://your-domain.com/about',
  type: 'website',
});
```

### Content Metadata

For content detail pages (auto-generated):

```typescript
import { generateContentMetadata } from '@/lib/metadata';

export async function generateMetadata({ params }) {
  const item = await getContentBySlug(contentType, slug);
  return generateContentMetadata(item);
}
```

Automatically includes:
- Title from frontmatter
- Description from summary
- Featured image
- Publication date
- Author
- Tags

## JSON-LD Structured Data

**File:** `src/lib/structured-data.tsx`

### Available Schemas

#### Organization Schema
```typescript
import { generateOrganizationSchema, JsonLd } from '@/lib/structured-data';

<JsonLd data={generateOrganizationSchema()} />
```

#### WebSite Schema (with search action)
```typescript
import { generateWebSiteSchema, JsonLd } from '@/lib/structured-data';

<JsonLd data={generateWebSiteSchema()} />
```

#### Article Schema
```typescript
import { generateArticleSchema, JsonLd } from '@/lib/structured-data';

<JsonLd data={generateArticleSchema(item, 'Article')} />
// or
<JsonLd data={generateArticleSchema(item, 'BlogPosting')} />
```

#### Breadcrumb Schema
```typescript
import { generateBreadcrumbSchema, JsonLd } from '@/lib/structured-data';

<JsonLd data={generateBreadcrumbSchema([
  { name: 'Home', url: 'https://example.com' },
  { name: 'Articles', url: 'https://example.com/articles' },
  { name: 'My Article', url: 'https://example.com/articles/my-article' },
])} />
```

#### Collection Page Schema
```typescript
import { generateCollectionPageSchema, JsonLd } from '@/lib/structured-data';

<JsonLd data={generateCollectionPageSchema(
  'Articles',
  'Browse all articles',
  'https://example.com/articles',
  42 // item count
)} />
```

### Multiple Schemas

Combine multiple schemas on one page:

```typescript
<JsonLd data={[
  generateOrganizationSchema(),
  generateArticleSchema(item),
  generateBreadcrumbSchema(breadcrumbs),
]} />
```

## Configuration

SEO settings in `src/config/directory.config.ts`:

```typescript
export const seoConfig: SEOConfig = {
  // Required
  siteUrl: 'https://your-domain.com',
  siteName: 'Your Site Name',
  description: 'Site description',

  // Social
  twitterHandle: '@yourhandle',
  socialLinks: ['https://twitter.com/...'],

  // Images
  logo: '/logo.png',
  defaultOgImage: '/og-default.png',

  // Defaults
  defaultAuthor: 'Your Name',
  defaultKeywords: ['keyword1', 'keyword2'],

  // Verification
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};
```

## Open Graph Images

Place default Open Graph images in `/public`:

- `/og-default.png` - Default image (1200x630 recommended)
- `/logo.png` - Site logo

Content-specific images override the default when specified in frontmatter.

## Testing SEO

Tools for testing:
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Schema.org Validator](https://validator.schema.org/)
