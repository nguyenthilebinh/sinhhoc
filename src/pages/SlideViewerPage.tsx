import React, { useState, useEffect } from 'react';
import { Download, FileText } from 'lucide-react';

export interface SlideItem {
  id: string;
  bookCode: string;
  title: string;
  chapter: string;
  fileName: string;
}

export const SlideViewerPage: React.FC = () => {
  const [slideCatalog, setSlideCatalog] = useState<SlideItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [activeDeck, setActiveDeck] = useState<SlideItem | null>(null);

  // Fetch slide catalog dynamically from document/slide/slides_manifest.json
  useEffect(() => {
    fetch('./document/slide/slides_manifest.json')
      .then(res => {
        if (!res.ok) throw new Error('Cannot load slides_manifest.json');
        return res.json();
      })
      .then((data: SlideItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setSlideCatalog(data);
          setActiveDeck(data[0]);
        }
      })
      .catch(err => console.error('Error fetching slides_manifest.json:', err));
  }, []);

  if (slideCatalog.length === 0 || !activeDeck) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="clean-card" style={{ padding: '32px' }}>
          Đang nạp danh mục slide bài giảng...
        </div>
      </div>
    );
  }

  const filteredCatalog = selectedGrade === 'ALL'
    ? slideCatalog
    : slideCatalog.filter(s => s.bookCode === selectedGrade);

  const pdfUrl = `./document/slide/${activeDeck.fileName.split('/').map(s => encodeURIComponent(s)).join('/')}`;

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      {/* Grade Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'Tất Cả' },
          { id: 'SINH 10', label: 'Sinh Học 10' },
          { id: 'SINH 11', label: 'Sinh Học 11' },
          { id: 'SINH 12', label: 'Sinh Học 12' }
        ].map((grade) => (
          <button
            key={grade.id}
            onClick={() => setSelectedGrade(grade.id)}
            className={`btn-clean ${selectedGrade === grade.id ? 'btn-clean-active' : ''}`}
          >
            {grade.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '20px' }}>
        {/* Sidebar: Slide list */}
        <div className="clean-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={18} /> Danh Sách Slide
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredCatalog.map((deck) => {
              const isSelected = deck.id === activeDeck.id;

              return (
                <div
                  key={deck.id}
                  onClick={() => setActiveDeck(deck)}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '12px',
                    borderColor: isSelected ? 'var(--border-highlight)' : 'var(--border-main)',
                    background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                  }}
                >
                  <span className="btn-clean" style={{ padding: '2px 6px', fontSize: '0.68rem', marginBottom: '4px' }}>
                    {deck.bookCode}
                  </span>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                    {deck.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area: PDF Slide Frame (Fit to Width) */}
        <div className="clean-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Toolbar: Minimal Title */}
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeDeck.chapter}</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '2px 0 0 0' }}>{activeDeck.title}</h2>
          </div>

          {/* Embedded Native PDF Viewer Frame (Fit to Width presentation style) */}
          <div style={{
            height: '660px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-main)',
            background: 'var(--bg-surface)'
          }}>
            <iframe
              key={activeDeck.id}
              src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              title={activeDeck.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
