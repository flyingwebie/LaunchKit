import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { getBlogPost, listBlogPosts } from '@/libs/mdx';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type BlogPostPageProps = {
  params: Promise<{ articleId: string }>;
};

export async function generateStaticParams() {
  const posts = await listBlogPosts();
  return posts.map((post) => ({
    articleId: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { articleId } = await params;

  try {
    const { metadata } = await getBlogPost(articleId);

    return {
      title: metadata.title,
      description: metadata.description,
      keywords: metadata.tags,
      authors: metadata.author ? [{ name: metadata.author }] : undefined,
      openGraph: {
        title: metadata.title,
        description: metadata.description,
        type: 'article',
        publishedTime: metadata.publishedOn?.toISOString(),
        modifiedTime: metadata.updatedOn?.toISOString(),
        authors: metadata.author ? [metadata.author] : undefined,
        tags: metadata.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: metadata.title,
        description: metadata.description,
      },
    };
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { articleId } = await params;

  try {
    const { metadata } = await getBlogPost(articleId);

    // Dynamically import the MDX component
    const MDXContent = dynamic(
      () => import(`@/app/blog/_content/${articleId}.mdx`)
    );

    const formattedDate = metadata.publishedOn
      ? new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(metadata.publishedOn)
      : null;

    return (
      <section className="relative py-24">
        <div className="relative z-10 max-w-4xl mx-auto px-8">
          <div className="flex items-start gap-2 mb-8">
            <Link href="/blog">
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span className="text-lg">Back to Blog</span>
              </div>
            </Link>
          </div>
          {/* Article Header */}
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6 text-base-content">
              {metadata.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/70 mb-6">
              {metadata.author && (
                <span>
                  By <strong>{metadata.author}</strong>
                </span>
              )}
              {formattedDate && <span>{formattedDate}</span>}
            </div>

            {metadata.tags && metadata.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {metadata.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-base-200 text-base-content rounded-full border border-base-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Content */}
          <article className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-pre:bg-gray-900 prose-pre:text-gray-100">
            <MDXContent />
          </article>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Error loading blog post:', error);
    notFound();
  }
}
