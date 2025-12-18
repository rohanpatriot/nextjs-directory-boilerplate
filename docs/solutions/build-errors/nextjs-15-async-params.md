---
title: "Next.js 15 Async Params Breaking Change"
category: "build-errors"
tags: ["nextjs", "typescript", "async", "params", "upgrade"]
date: "2024-12-17"
solved_by: "Claude Code"
severity: "high"
---

## Problem

After upgrading from Next.js 14 to Next.js 15, the build fails with TypeScript errors on all dynamic route pages:

```
Type error: Type '{ params: { slug: string; }; }' does not satisfy the constraint 'PageProps'.
  Types of property 'params' are incompatible.
    Type '{ slug: string; }' is missing the following properties from type 'Promise<any>': then, catch, finally, [Symbol.toStringTag]
```

Routes affected:
- `src/app/[contentType]/page.tsx`
- `src/app/[contentType]/[slug]/page.tsx`
- `src/app/tags/[tag]/page.tsx`

## Root Cause

Next.js 15 changed route parameters to be **async by default**. The `params` object is now a `Promise` that must be awaited before accessing properties.

**Before (Next.js 14):**
```typescript
interface PageProps {
  params: { slug: string };
}

export default function Page({ params }: PageProps) {
  const { slug } = params; // Direct access
}
```

**After (Next.js 15):**
```typescript
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // Must await
}
```

## Solution

### Step 1: Update interface definitions

Change all `params` types from direct objects to `Promise`:

```typescript
// Before
interface PageProps {
  params: { slug: string };
}

// After
interface PageProps {
  params: Promise<{ slug: string }>;
}
```

### Step 2: Make components async and await params

```typescript
// Before
export default function Page({ params }: PageProps) {
  const { slug } = params;
  // ...
}

// After
export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  // ...
}
```

### Step 3: Update generateMetadata functions

The same change applies to `generateMetadata`:

```typescript
export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params; // Must await here too
  // ...
}
```

### Full Example

```typescript
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ contentType: string; slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { contentType, slug } = await params;
  const item = await getContentBySlug(contentType, slug);

  if (!item) {
    return { title: 'Not Found' };
  }

  return {
    title: item.meta.title,
    description: item.meta.summary,
  };
}

export default async function ContentDetailPage({ params }: PageProps) {
  const { contentType, slug } = await params;
  const item = await getContentBySlug(contentType, slug);

  if (!item) {
    notFound();
  }

  return <div>{/* render content */}</div>;
}
```

## Prevention

1. **Read migration guides** before upgrading major versions
2. **Check release notes** for breaking changes
3. **Run build after upgrade** to catch type errors early
4. **Search for `params:` pattern** in route files when upgrading Next.js

## Related

- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
- [Next.js 15 Release Notes](https://nextjs.org/blog/next-15)
- [App Router Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)
