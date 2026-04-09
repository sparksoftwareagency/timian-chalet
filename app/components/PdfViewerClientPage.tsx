"use client";

import { FlipbookViewer } from "react-pdf-flipbook-viewer";

const FALLBACK_MASSAGE_FLYER_PATH = "/massage_flyer.pdf";

export default function PdfViewerClientPage({ pdfUrl }: { pdfUrl?: string }) {
  const viewerPdfUrl = pdfUrl || FALLBACK_MASSAGE_FLYER_PATH;

  return (
    <main className="min-h-screen w-full bg-[#16110c] text-white">
      <style>{`
        .fullscreen-flyer-viewer {
          width: 100% !important;
          height: 100vh !important;
          min-height: 100vh !important;
          background-color: #16110c !important;
        }
        .fullscreen-flyer-viewer > div {
          height: 100% !important;
        }
        .fullscreen-flyer-viewer.bg-gray-800,
        .fullscreen-flyer-viewer .bg-gray-700,
        .fullscreen-flyer-viewer .bg-gray-800 {
          background-color: #16110c !important;
        }
        .fullscreen-flyer-viewer .mb-1 {
          display: none !important;
        }
      `}</style>

      <FlipbookViewer
        pdfUrl={viewerPdfUrl}
        disableShare
        className="fullscreen-flyer-viewer"
      />
    </main>
  );
}
