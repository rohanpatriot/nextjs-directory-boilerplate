import { ContentConfig } from '@/lib/content/types';

export const contentConfig: ContentConfig = {
  contentRoot: 'content',

  defaults: {
    pageSize: 9,
    sortField: 'date',
    sortOrder: 'desc',
  },

  features: {
    search: true,
    tags: true,
    pagination: true,
  },

  types: {
    articles: {
      slug: 'articles',
      name: 'Article',
      namePlural: 'Articles',
      directory: 'articles',
      requiredFields: ['title'],
      features: {
        images: true,
        tags: true,
        search: true,
        pagination: true,
      },
      defaultSort: {
        field: 'date',
        order: 'desc',
      },
      card: {
        showImage: true,
        showSummary: true,
        showTags: true,
        showDate: true,
      },
      detail: {
        showImage: true,
        showTags: true,
        showDate: true,
        showAuthor: true,
      },
    },

    guides: {
      slug: 'guides',
      name: 'Guide',
      namePlural: 'Guides',
      directory: 'guides',
      requiredFields: ['title'],
      features: {
        images: true,
        tags: true,
        search: true,
        pagination: true,
      },
      defaultSort: {
        field: 'date',
        order: 'desc',
      },
      card: {
        showImage: true,
        showSummary: true,
        showTags: true,
        showDate: true,
      },
      detail: {
        showImage: true,
        showTags: true,
        showDate: true,
        showAuthor: true,
      },
    },
  },
};
