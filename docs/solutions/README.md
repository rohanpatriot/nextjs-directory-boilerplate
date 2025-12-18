# Solutions Documentation

This directory contains documented solutions to problems encountered during development. Each solution compounds team knowledge—the first time you solve a problem takes research, but documented solutions make future occurrences take minutes.

## Usage

When you solve a non-trivial problem, document it here using the `/workflows:compound` command or manually create a file.

## Directory Structure

```
docs/solutions/
├── build-errors/       # Compilation, bundling, TypeScript errors
├── test-failures/      # Test setup, mocking, assertion failures
├── runtime-errors/     # Exceptions, crashes, unexpected behavior
├── configuration/      # Setup, environment, tooling issues
├── performance-issues/ # Slow queries, memory leaks, rendering
└── patterns/           # Best practices, architecture decisions
```

## YAML Frontmatter Schema

Each solution file should include this frontmatter:

```yaml
---
title: "Problem Title"
category: "build-errors|test-failures|runtime-errors|configuration|performance-issues|patterns"
tags: ["nextjs", "typescript", "mdx"]
date: "YYYY-MM-DD"
solved_by: "Name"
severity: "low|medium|high|critical"
---
```

## Section Template

```markdown
## Problem

[Observable symptoms and exact error messages]

## Root Cause

[Technical explanation of why this happened]

## Solution

[Step-by-step fix with code examples]

## Prevention

[How to avoid this in the future]

## Related

[Links to related docs, issues, or solutions]
```

## Example

```markdown
---
title: "Next.js 15 Async Params Breaking Change"
category: "build-errors"
tags: ["nextjs", "typescript", "async"]
date: "2024-12-17"
solved_by: "Hunter"
severity: "high"
---

## Problem

Build fails with type error: `params` must be awaited before accessing properties.

## Root Cause

Next.js 15 changed route params to be async. The type signature changed from `{ params: { slug: string } }` to `{ params: Promise<{ slug: string }> }`.

## Solution

1. Update interface:
   ```typescript
   interface PageProps {
     params: Promise<{ slug: string }>;
   }
   ```

2. Await params in component:
   ```typescript
   const { slug } = await params;
   ```

## Prevention

Check Next.js migration guide when upgrading major versions.

## Related

- [Next.js 15 Migration Guide](https://nextjs.org/docs/app/building-your-application/upgrading/version-15)
```

## Searching Solutions

Use grep to search for solutions:

```bash
# Find solutions by tag
grep -r "tags:.*typescript" docs/solutions/

# Find solutions by error message
grep -r "ENOENT" docs/solutions/
```
