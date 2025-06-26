import { listBlogPosts } from '@/libs/mdx';
import Link from 'next/link';
import config from '@/config';
import { getSEOTags } from '@/libs/seo';

export const metadata = getSEOTags({
  title: `${config.appName} Blog | Stripe Chargeback Protection`,
  description:
    'Learn how to prevent chargebacks, how to accept payments online, and keep your Stripe account in good standing',
  canonicalUrlRelative: '/blog',
});

export default async function Blog() {
  const posts = await listBlogPosts();
  const postsToDisplay = posts.slice(0, 6);

  return (
    <>
      <section className="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
        <h1 className="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
          The {config.appName} Blog
        </h1>
        <p className="text-lg opacity-80 leading-relaxed">
          Learn how to ship your startup in days, not weeks. And get the latest
          updates about the boilerplate
        </p>
      </section>

      <section className="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
        {postsToDisplay.map((post) => (
          <article
            key={post.slug}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-8 rounded-lg border border-base-200"
          >
            <div className="card-body">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.metadata.tags?.map((tag) => (
                  <span key={tag} className="badge badge-primary badge-outline">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="card-title text-xl font-bold mb-3">
                <Link
                  href={`/blog/${post.slug}`}
                  className="link-hover"
                  title={post.metadata.title}
                >
                  {post.metadata.title}
                </Link>
              </h2>

              <p className="text-base-content/80 mb-4 line-clamp-3">
                {post.metadata.description}
              </p>

              <div className="flex items-center justify-between text-sm text-base-content/60">
                {post.metadata.author && <span>By {post.metadata.author}</span>}
                {post.metadata.publishedOn && (
                  <time dateTime={post.metadata.publishedOn.toISOString()}>
                    {new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }).format(post.metadata.publishedOn)}
                  </time>
                )}
              </div>

              <div className="card-actions justify-end mt-4">
                <Link
                  href={`/blog/${post.slug}`}
                  className="btn btn-primary btn-sm"
                >
                  Read More
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>

      {posts.length === 0 && (
        <section className="text-center py-12">
          <p className="text-base-content/60">No blog posts found.</p>
        </section>
      )}
    </>
  );
}
