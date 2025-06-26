import { notFound } from 'next/navigation';

type AuthorPageProps = {
  params: Promise<{ authorId: string }>;
};

export async function generateMetadata({ params }: AuthorPageProps) {
  const { authorId } = await params;

  return {
    title: `Author: ${authorId}`,
    description: `Articles by ${authorId}`,
  };
}

export default async function Author({ params }: AuthorPageProps) {
  const { authorId } = await params;

  // For now, redirect to main blog since we're using MDX system
  // This page can be enhanced later to work with MDX authors
  notFound();
}
