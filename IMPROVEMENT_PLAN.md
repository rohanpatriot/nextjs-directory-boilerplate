# Boilerplate Content Improvement Plan

**Issue**: Replace stories with projects and enhance example content

## Overview
Replace the religious/moral stories content type with a more relevant **projects** showcase, and improve article examples to better demonstrate the boilerplate's capabilities for developers.

## Problems with Current Implementation

### Stories Content Type
- **Niche content**: Religious/moral tales (David & Mephibosheth, George Washington) don't represent typical use cases
- **Specialized fields**: `virtue` field is too specific for general-purpose boilerplate
- **Broken assets**: References non-existent images (`david.png`, `george.png`)
- **External dependencies**: Audio files hosted externally won't work for cloned repos
- **Limited relevance**: Not representative of what developers build with Next.js

### Articles Content Type
- **Generic placeholders**: Too basic, don't demonstrate real-world usage
- **Self-referential**: Talks about "the directory" rather than showing actual blog content
- **Minimal metadata**: Doesn't showcase full content system capabilities

## Proposed Solution

### 1. Replace "stories" with "projects"
A portfolio/project showcase content type with:
- `title`, `summary`, `date`, `author`
- `technologies` (array of technologies used)
- `github`, `demo` (optional URLs)
- `image` (project screenshot)
- `featured` (boolean for highlighting)
- `tags` for categorization

**Benefits**:
- More relevant to developers (target audience)
- Common use case for Next.js sites
- Demonstrates full feature set
- Complements articles (blog + portfolio)

### 2. Improve Article Examples
Create realistic blog content:
- Next.js 15 development tips
- Web development tutorials
- Technology topics
- Proper code examples with syntax highlighting
- Better metadata and SEO optimization

### 3. Asset Cleanup
- Remove references to non-existent images
- Add proper placeholder images or use Next.js Image placeholder props
- Ensure all referenced assets exist

## Implementation Checklist

- [ ] Review Next.js 15 documentation for best practices
- [ ] Update `src/config/content.config.ts` to replace stories with projects
- [ ] Delete old story MDX files
- [ ] Create 3-4 realistic project examples
- [ ] Rewrite article examples with developer-focused content
- [ ] Update documentation in `docs/` folder
- [ ] Update README with new examples
- [ ] Clean up image references and assets
- [ ] Test locally with `pnpm dev`

## Expected Outcomes

1. **Better developer experience**: New users see relevant, inspiring examples
2. **Clearer use cases**: Portfolio/blog combo is more obvious
3. **Working out-of-the-box**: No broken image references or external dependencies
4. **Better documentation**: Examples that teach Next.js best practices

## References
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [MDX Documentation](https://mdxjs.com/)
