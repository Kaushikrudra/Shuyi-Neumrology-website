export type BlockType = 'text' | 'image' | 'cta';

export interface TextBlockContent {
  heading?: string;
  body: string;
}

export interface ImageBlockContent {
  imageUrl: string;
  altText: string;
  caption?: string;
}

export interface CtaBlockContent {
  headline: string;
  buttonText: string;
  buttonLink: string;
}

export interface CmsBlock {
  id: string;
  type: BlockType;
  content: Record<string, any>;
  order: number;
}

export type CmsPageStatus = 'draft' | 'published';

export interface CmsPageData {
  id: string;
  slug: string;
  title: string;
  blocks: CmsBlock[];
  status: CmsPageStatus;
  createdAt: string;
  updatedAt: string;
}

/**
 * List of reserved slugs that cannot be used by CMS pages
 * to avoid collision with predefined Next.js application routes.
 */
export const RESERVED_SLUGS = [
  'admin',
  'api',
  'login',
  'signup',
  'dashboard',
  'preview',
  'pricing',
  'faq',
  'about',
  'files',
  'favicon.ico',
];

/**
 * Converts text into a clean URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except hyphens
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}

/**
 * Creates an empty default block with appropriate structure.
 */
export function createDefaultBlock(type: BlockType, order: number): CmsBlock {
  const id = `blk_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  switch (type) {
    case 'text':
      return {
        id,
        type: 'text',
        content: {
          heading: '',
          body: '',
        },
        order,
      };
    case 'image':
      return {
        id,
        type: 'image',
        content: {
          imageUrl: '',
          altText: '',
          caption: '',
        },
        order,
      };
    case 'cta':
      return {
        id,
        type: 'cta',
        content: {
          headline: 'Ready to Discover Your Path?',
          buttonText: 'Get Started Now',
          buttonLink: '/preview',
        },
        order,
      };
  }
}
