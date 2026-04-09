import PdfViewerClientPage from "@/app/components/PdfViewerClientPage";

export default async function PdfViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ pdf?: string }>;
}) {
  const { pdf } = await searchParams;
  return <PdfViewerClientPage pdfUrl={pdf} />;
}
