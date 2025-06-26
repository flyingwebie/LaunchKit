import fs from 'node:fs/promises';
import path from 'node:path';
import type { Metadata } from 'next/types';
import type { ComponentType } from 'react';

export type BlogPostMetadata = Metadata & {
  title: string;
  description: string;
  publishedOn?: Date;
  updatedOn?: Date;
  tags?: string[];
  author?: string;
  isPublished?: boolean;
};

export type BlogPostData = {
  slug: string;
  metadata: BlogPostMetadata;
  component?: ComponentType;
};

export const getBlogPost = async (slug: string): Promise<BlogPostData> => {
  try {
    const post = await import(`@/app/blog/_content/${slug}.mdx`);
    const data = post.metadata;

    if (!data.title || !data.description) {
      throw new Error(`Missing required metadata fields in: ${slug}`);
    }

    const metadata: BlogPostMetadata = {
      ...data,
      publishedOn: data.publishedOn ? new Date(data.publishedOn) : undefined,
      updatedOn: data.updatedOn ? new Date(data.updatedOn) : undefined,
    };

    return {
      slug,
      metadata,
      component: post.default,
    };
  } catch (error: any) {
    console.error(`Error loading blog post ${slug}:`, error?.message);
    throw new Error(`Blog post not found: ${slug}`);
  }
};

export const listBlogPosts = async (): Promise<
  Omit<BlogPostData, 'component'>[]
> => {
  try {
    const contentDir = path.join(process.cwd(), 'app/blog/_content');
    const files = await fs.readdir(contentDir);

    const mdxFiles = files.filter((file) => file.endsWith('.mdx'));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const { metadata } = await getBlogPost(slug);
        return {
          slug,
          metadata,
        };
      })
    );

    // Filter out unpublished posts and sort by publishedOn date (newest first)
    return posts
      .filter((post) => post.metadata.isPublished !== false)
      .sort((a, b) => {
        const dateA = a.metadata.publishedOn || new Date(0);
        const dateB = b.metadata.publishedOn || new Date(0);
        return dateB.getTime() - dateA.getTime();
      });
  } catch (error: any) {
    console.error('Error listing blog posts:', error?.message);
    return [];
  }
};
