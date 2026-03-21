import React, { useState, useEffect, useRef } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Loader2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

// Configure worker
pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

interface PDFViewerComponentProps {
  url: string;
}

export const PDFViewerComponent: React.FC<PDFViewerComponentProps> = ({ url }) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth - 32); // padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    const observer = new ResizeObserver(updateWidth);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col h-full bg-zinc-100" ref={containerRef}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-zinc-200 shadow-sm z-10">
        <div className="flex items-center gap-2">
          <button
            disabled={pageNumber <= 1}
            onClick={() => setPageNumber(prev => prev - 1)}
            title="Previous page"
            className="p-1.5 rounded-md hover:bg-zinc-100 disabled:opacity-30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-zinc-600">
            Page {pageNumber} of {numPages || '--'}
          </span>
          <button
            disabled={pageNumber >= numPages}
            onClick={() => setPageNumber(prev => prev + 1)}
            title="Next page"
            className="p-1.5 rounded-md hover:bg-zinc-100 disabled:opacity-30 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setScale(prev => Math.max(0.5, prev - 0.1))}
            className="p-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <span className="text-xs font-medium text-zinc-600 w-10 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale(prev => Math.min(2.0, prev + 0.1))}
            className="p-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-zinc-200 mx-1" />
          <button
            onClick={() => setScale(1.0)}
            className="p-1.5 rounded-md hover:bg-zinc-100 transition-colors"
            title="Reset Zoom"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Document Area */}
      <div className="flex-1 overflow-auto p-4 flex justify-center items-start scrollbar-thin scrollbar-thumb-zinc-300">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mb-4" />
              <p className="text-sm text-zinc-500">Loading PDF document...</p>
            </div>
          }
          error={
            <div className="p-8 text-center">
              <p className="text-red-500 font-medium">Failed to load PDF</p>
              <p className="text-xs text-zinc-500 mt-2">Try downloading the file instead.</p>
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            width={containerWidth > 0 ? containerWidth : undefined}
            className="shadow-xl border border-zinc-200 rounded-sm"
            renderAnnotationLayer={true}
            renderTextLayer={true}
          />
        </Document>
      </div>
    </div>
  );
};
