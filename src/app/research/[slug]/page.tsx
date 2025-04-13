import { getPaperData, getAllPaperIds } from '@/lib/papers';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PageContainer from '@/components/Layout/PageContainer';
import ResearchPageContent from '@/components/research/ResearchPageContent';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const paperData = await getPaperData(params.slug);
  
  if (!paperData) {
    return {
      title: 'Paper Not Found',
    };
  }

  return {
    title: `${paperData.title} | Bthecause Research`,
    description: paperData.excerpt,
    openGraph: {
      title: paperData.title,
      description: paperData.excerpt,
      images: [
        {
          url: paperData.image,
          width: 1200,
          height: 630,
          alt: paperData.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: paperData.title,
      description: paperData.excerpt,
      images: [paperData.image],
    },
  };
}

export async function generateStaticParams() {
  const paths = await getAllPaperIds();
  return paths.map((slug) => ({
    slug,
  }));
}

export default async function ResearchPaper({ params }: { params: { slug: string } }) {
  const paperData = await getPaperData(params.slug);

  if (!paperData) {
    notFound();
  }

  return (
    <PageContainer>
      <ResearchPageContent paperData={paperData} />
    </PageContainer>
  );
}
