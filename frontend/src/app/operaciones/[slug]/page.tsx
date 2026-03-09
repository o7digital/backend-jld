import { OperationsAreaWorkspace } from '@/components/jld/OperationsAreaWorkspace';
import { OPERATIONS_AREA_SLUGS } from '@/lib/jld-operations';

export function generateStaticParams() {
  return OPERATIONS_AREA_SLUGS.map((slug) => ({ slug }));
}

export default async function OperacionesDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return <OperationsAreaWorkspace slug={slug} />;
}
