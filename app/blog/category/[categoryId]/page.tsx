import { notFound } from 'next/navigation';

type CategoryPageProps = {
  params: Promise<{ categoryId: string }>;
};

export async function generateMetadata({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  return {
    title: `Category: ${categoryId}`,
    description: `Articles in the ${categoryId} category`,
  };
}

export default async function Category({ params }: CategoryPageProps) {
  const { categoryId } = await params;

  // For now, redirect to main blog since we're using MDX system
  // This page can be enhanced later to work with MDX categories
  notFound();
}
