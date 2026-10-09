import React from 'react';
import { X, FileText, ExternalLink, Download, AlertCircle } from 'lucide-react';

interface PdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfFileName: string;
  sourcePages: number[];
  lessonTitle: string;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  isOpen,
  onClose,
  pdfFileName,
  sourcePages,
  lessonTitle
}) => {
  if (!isOpen) return null;

  // Path to static book PDFs inside document/book/ directory
  const pdfUrl = pdfFileName.startsWith('./') || pdfFileName.startsWith('document/') ? `./${pdfFileName}` : `./document/book/${pdfFileName}`;

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(9, 13, 22, 0.85)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}
      onClick={onClose}
    >
      <div 
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '1000px',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid var(--border-glow)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '16px 24px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(14, 21, 38, 0.8)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--accent-cyan)'
            }}>
              <FileText size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Trang Sách Gốc (Đối Chiếu PDF)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                {pdfFileName} • Trang gốc: {sourcePages.join(', ')} • Bài: {lessonTitle}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                background: 'rgba(255,255,255,0.06)',
                color: 'var(--text-main)',
                border: '1px solid var(--border-subtle)'
              }}
            >
              <ExternalLink size={14} /> Mở cửa sổ mới
            </a>
            <button
              onClick={onClose}
              style={{
                padding: '8px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.1)',
                color: '#fff',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content Viewer */}
        <div style={{ flex: 1, background: '#1e293b', position: 'relative', overflow: 'hidden' }}>
          <iframe
            src={`${pdfUrl}#page=${sourcePages[0] || 1}`}
            title={`Nguồn Sách Gốc - ${pdfFileName}`}
            style={{
              width: '100%',
              height: '100%',
              border: 'none'
            }}
          />

        </div>
      </div>
    </div>
  );
};
