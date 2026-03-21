import React, { useState, useEffect, useMemo } from 'react';
import { PDFDownloadLink, usePDF } from '@react-pdf/renderer';
import { ResumeData, initialResumeData } from './types';
import { ResumeForm } from './components/ResumeForm';
import { ResumePDF } from './components/ResumePDF';
import { PDFViewerComponent } from './components/PDFViewerComponent';
import { generateLatex } from './services/latexService';
import { Download, Loader2, Eye, Edit3, Code2, Copy, Check } from 'lucide-react';

export default function App() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [debouncedData, setDebouncedData] = useState<ResumeData>(initialResumeData);
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'latex'>('edit');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedData(resumeData), 500);
    return () => clearTimeout(timer);
  }, [resumeData]);

  const latexSource = useMemo(() => generateLatex(debouncedData), [debouncedData]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(latexSource);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      alert('Could not copy LaTeX to clipboard. You can still select and copy manually.');
    }
  };

  const resumeDocument = useMemo(() => <ResumePDF data={debouncedData} />, [debouncedData]);
  const [pdfInstance] = usePDF({ document: resumeDocument });

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 flex items-center justify-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/1/19/IIT_Hyderabad_logo.png" 
                alt="IITH Logo" 
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-iith-blue">IITH Resume Builder</h1>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">IIT Hyderabad Format</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="h-6 w-px bg-zinc-200 mx-1" />

            <div className="flex bg-zinc-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode('edit')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'edit' ? 'bg-iith-blue shadow-sm text-white' : 'text-zinc-500 hover:text-iith-blue'
                }`}
              >
                <Edit3 className="w-4 h-4" />
                Edit
              </button>
              <button
                onClick={() => setViewMode('preview')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'preview' ? 'bg-iith-blue shadow-sm text-white' : 'text-zinc-500 hover:text-iith-blue'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={() => setViewMode('latex')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  viewMode === 'latex' ? 'bg-iith-blue shadow-sm text-white' : 'text-zinc-500 hover:text-iith-blue'
                }`}
              >
                <Code2 className="w-4 h-4" />
                LaTeX
              </button>
            </div>

            <PDFDownloadLink
              document={<ResumePDF data={debouncedData} />}
              fileName={`${debouncedData.name.replace(/\s+/g, '_')}_Resume_IITH.pdf`}
              className="flex items-center gap-2 px-4 py-2 bg-iith-blue text-white rounded-lg text-sm font-medium hover:bg-iith-blue/90 transition-all shadow-sm"
            >
              {({ loading }) => (
                <>
                  <Download className="w-4 h-4" />
                  {loading ? 'Preparing...' : 'Download PDF'}
                </>
              )}
            </PDFDownloadLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Form Section */}
          <div className={`${viewMode === 'edit' ? 'lg:col-span-7' : 'hidden lg:block lg:col-span-5'} transition-all duration-300`}>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900">Resume Details</h2>
              <p className="text-zinc-500">Fill in your information and review the live preview.</p>
            </div>
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>

          {/* Preview/LaTeX Section */}
          <div className={`${viewMode !== 'edit' ? 'lg:col-span-12' : 'lg:col-span-5'} sticky top-24 h-[calc(100vh-8rem)] transition-all duration-300`}>
            <div className="bg-zinc-900 rounded-2xl overflow-hidden h-full shadow-2xl border border-zinc-800 flex flex-col">
              <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/50">
                <div className="flex items-center gap-2 text-zinc-400">
                  {viewMode === 'latex' ? <Code2 className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  <span className="text-sm font-medium uppercase tracking-wider">
                    {viewMode === 'latex' ? 'LaTeX Source' : 'Live Preview'}
                  </span>
                </div>
                {viewMode === 'latex' && (
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-md text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                )}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/40" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40" />
                </div>
              </div>
              <div className="flex-1 bg-zinc-800 p-4 overflow-hidden">
                <div className="w-full h-full rounded-lg overflow-hidden bg-white relative">
                  {viewMode === 'latex' ? (
                    <pre className="w-full h-full p-6 bg-zinc-950 text-emerald-500 font-mono text-xs overflow-auto selection:bg-emerald-500/20">
                      {latexSource}
                    </pre>
                  ) : pdfInstance.loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50">
                      <Loader2 className="w-8 h-8 animate-spin text-zinc-400 mb-4" />
                      <p className="text-sm text-zinc-500">Generating preview...</p>
                    </div>
                  ) : pdfInstance.error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 p-6 text-center">
                      <p className="text-red-500 mb-2">Error generating PDF</p>
                      <p className="text-sm text-zinc-500">{String(pdfInstance.error)}</p>
                    </div>
                  ) : pdfInstance.url ? (
                    <PDFViewerComponent url={pdfInstance.url} />
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
