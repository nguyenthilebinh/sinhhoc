import React, { useState } from 'react';
import { DIAGRAMS } from '../../data/interactiveData';
import { Hotspot } from '../../types';
import { Sparkles, Info, CheckCircle, RotateCcw, HelpCircle } from 'lucide-react';

interface InteractiveDiagramProps {
  diagramId: string;
  onExploreHotspot?: (hotspotId: string) => void;
}

export const InteractiveDiagram: React.FC<InteractiveDiagramProps> = ({
  diagramId,
  onExploreHotspot
}) => {
  const diagram = DIAGRAMS[diagramId] || DIAGRAMS['cell-structure-01'];
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(diagram.hotspots[0] || null);
  const [hoveredHotspot, setHoveredHotspot] = useState<Hotspot | null>(null);
  const [exploredIds, setExploredIds] = useState<Set<string>>(new Set([diagram.hotspots[0]?.id || '']));
  const [quizMode, setQuizMode] = useState<boolean>(false);
  const [quizTarget, setQuizTarget] = useState<Hotspot | null>(null);
  const [quizMessage, setQuizMessage] = useState<string | null>(null);

  const handleSelect = (hotspot: Hotspot) => {
    if (quizMode) {
      if (quizTarget && hotspot.id === quizTarget.id) {
        setQuizMessage(`✓ Đúng rồi! Đây chính là ${hotspot.name}`);
      } else {
        setQuizMessage(`✕ Chưa chính xác! Bạn vừa bấm vào ${hotspot.name}. Thử lại nhé!`);
      }
      return;
    }

    setSelectedHotspot(hotspot);
    setExploredIds(prev => new Set(prev).add(hotspot.id));
    if (onExploreHotspot) {
      onExploreHotspot(hotspot.id);
    }
  };

  const startQuizMode = () => {
    const randomTarget = diagram.hotspots[Math.floor(Math.random() * diagram.hotspots.length)];
    setQuizTarget(randomTarget);
    setQuizMode(true);
    setQuizMessage(null);
  };

  const activeDisplay = hoveredHotspot || selectedHotspot;

  return (
    <div className="clean-card mobile-padding-sm" style={{ padding: '24px', margin: '24px 0', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span className="btn-clean" style={{ marginBottom: '6px', fontSize: '0.75rem', padding: '2px 8px' }}>
            <Sparkles size={14} /> Sơ Đồ Tương Tác 2D
          </span>
          <h3 style={{ fontSize: '1.25rem' }}>{diagram.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{diagram.description}</p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => { setQuizMode(false); setQuizMessage(null); }}
            className={`btn-clean ${!quizMode ? 'btn-clean-active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            Khám phá
          </button>
          <button
            onClick={startQuizMode}
            className={`btn-clean ${quizMode ? 'btn-clean-active' : ''}`}
            style={{ fontSize: '0.8rem', padding: '6px 12px' }}
          >
            <HelpCircle size={14} /> Thử thách vị trí
          </button>
        </div>
      </div>

      {quizMode && quizTarget && (
        <div style={{
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-main)',
          marginBottom: '16px',
          fontSize: '0.9rem'
        }}>
          🎯 <strong>Nhiệm vụ:</strong> Hãy bấm vào vị trí của <strong>{quizTarget.name}</strong> trên sơ đồ!
          {quizMessage && (
            <div style={{ marginTop: '8px', fontWeight: 600, color: quizMessage.startsWith('✓') ? '#34d399' : '#f43f5e' }}>
              {quizMessage}
            </div>
          )}
        </div>
      )}

      {/* Main Interactive Diagram Layout */}
      <div className="grid-diagram">
        {/* SVG Canvas Container */}
        <div 
          style={{
            position: 'relative',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-main)',
            aspectRatio: '4/3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden'
          }}
        >
          {diagram.type === 'cell' ? (
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
              {/* Cell Outer Membrane */}
              <ellipse 
                cx="200" cy="150" rx="170" ry="120" 
                fill="#0f1f38" 
                stroke={hoveredHotspot?.id === 'membrane' || selectedHotspot?.id === 'membrane' ? '#06b6d4' : '#1e3a5f'} 
                strokeWidth={hoveredHotspot?.id === 'membrane' || selectedHotspot?.id === 'membrane' ? "5" : "3"} 
              />
              <ellipse cx="200" cy="150" rx="160" ry="110" fill="rgba(6, 182, 212, 0.05)" />

              {/* Chloroplast */}
              <g onClick={() => handleSelect(diagram.hotspots.find(h => h.id === 'chloroplast')!)} style={{ cursor: 'pointer' }}>
                <ellipse cx="100" cy="210" rx="30" ry="18" fill="#065f46" stroke="#10b981" strokeWidth="2" />
                <line x1="85" y1="210" x2="115" y2="210" stroke="#34d399" strokeWidth="2" />
                <line x1="90" y1="205" x2="110" y2="205" stroke="#34d399" strokeWidth="2" />
                <line x1="90" y1="215" x2="110" y2="215" stroke="#34d399" strokeWidth="2" />
              </g>

              {/* Mitochondria */}
              <g onClick={() => handleSelect(diagram.hotspots.find(h => h.id === 'mitochondria')!)} style={{ cursor: 'pointer' }}>
                <rect x="270" y="170" width="50" height="30" rx="15" fill="#881337" stroke="#f43f5e" strokeWidth="2" transform="rotate(-15, 295, 185)" />
                <path d="M 278 185 Q 288 175 295 185 T 312 185" fill="none" stroke="#fb7185" strokeWidth="2" transform="rotate(-15, 295, 185)" />
              </g>

              {/* Golgi */}
              <g onClick={() => handleSelect(diagram.hotspots.find(h => h.id === 'golgi')!)} style={{ cursor: 'pointer' }}>
                <path d="M 240 85 Q 260 75 280 85 M 235 95 Q 260 85 285 95 M 240 105 Q 260 95 280 105" fill="none" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />
              </g>

              {/* Nucleus */}
              <g onClick={() => handleSelect(diagram.hotspots.find(h => h.id === 'nucleus')!)} style={{ cursor: 'pointer' }}>
                <circle cx="200" cy="144" r="45" fill="#581c87" stroke="#a855f7" strokeWidth="3" />
                <circle cx="200" cy="144" r="18" fill="#3b0764" stroke="#c084fc" strokeWidth="2" />
                <circle cx="190" cy="135" r="2" fill="#e9d5ff" />
                <circle cx="210" cy="150" r="3" fill="#e9d5ff" />
              </g>

              {/* Ribosomes */}
              <g onClick={() => handleSelect(diagram.hotspots.find(h => h.id === 'ribosome')!)} style={{ cursor: 'pointer' }}>
                <circle cx="120" cy="100" r="4" fill="#fbbf24" />
                <circle cx="130" cy="110" r="4" fill="#fbbf24" />
                <circle cx="115" cy="120" r="4" fill="#fbbf24" />
              </g>

              {/* Hotspot Markers */}
              {diagram.hotspots.map((hotspot) => {
                const isSelected = selectedHotspot?.id === hotspot.id;
                const isHovered = hoveredHotspot?.id === hotspot.id;
                const isExplored = exploredIds.has(hotspot.id);

                return (
                  <g 
                    key={hotspot.id} 
                    transform={`translate(${(hotspot.x / 100) * 400}, ${(hotspot.y / 100) * 300})`}
                    onClick={() => handleSelect(hotspot)}
                    onMouseEnter={() => setHoveredHotspot(hotspot)}
                    onMouseLeave={() => setHoveredHotspot(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle 
                      r={isSelected || isHovered ? "14" : "10"} 
                      fill={hotspot.color || 'var(--accent-cyan)'} 
                      fillOpacity={isSelected || isHovered ? "0.9" : "0.7"}
                      stroke="#fff" 
                      strokeWidth="2" 
                    />
                    <circle 
                      r={isSelected || isHovered ? "22" : "14"} 
                      fill="none" 
                      stroke={hotspot.color || 'var(--accent-cyan)'} 
                      strokeWidth="1.5" 
                      strokeDasharray="3 3"
                    />
                    {isExplored && (
                      <text x="0" y="3.5" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">✓</text>
                    )}
                  </g>
                );
              })}
            </svg>
          ) : (
            /* DNA Helix SVG Diagram */
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: '100%' }}>
              <path d="M 100 50 Q 200 150 300 50 T 100 250" fill="none" stroke="#06b6d4" strokeWidth="4" />
              <path d="M 100 150 Q 200 50 300 150 T 100 250" fill="none" stroke="#3b82f6" strokeWidth="4" />
              <line x1="140" y1="90" x2="140" y2="135" stroke="#fbbf24" strokeWidth="3" />
              <line x1="200" y1="140" x2="200" y2="100" stroke="#10b981" strokeWidth="3" />
              <line x1="260" y1="90" x2="260" y2="135" stroke="#ec4899" strokeWidth="3" />

              {diagram.hotspots.map((hotspot) => (
                <g 
                  key={hotspot.id} 
                  transform={`translate(${(hotspot.x / 100) * 400}, ${(hotspot.y / 100) * 300})`}
                  onClick={() => handleSelect(hotspot)}
                  onMouseEnter={() => setHoveredHotspot(hotspot)}
                  onMouseLeave={() => setHoveredHotspot(null)}
                  style={{ cursor: 'pointer' }}
                >
                  <circle r="12" fill={hotspot.color || '#06b6d4'} stroke="#fff" strokeWidth="2" />
                </g>
              ))}
            </svg>
          )}
        </div>

        {/* Info Detail Panel */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '20px',
          border: '1px solid var(--border-main)'
        }}>
          {activeDisplay ? (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: activeDisplay.color || 'var(--text-main)'
                }} />
                <h4 style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>{activeDisplay.name}</h4>
              </div>

              <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.5 }}>
                {activeDisplay.description}
              </div>

              <div style={{
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-main)',
                marginBottom: '12px',
                fontSize: '0.82rem'
              }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>⚡ Chức năng sinh học:</strong>
                {activeDisplay.function}
              </div>

              <div style={{
                padding: '12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-main)',
                fontSize: '0.82rem'
              }}>
                <strong style={{ color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>💡 Ý nghĩa quan trọng:</strong>
                {activeDisplay.importance}
              </div>
            </div>
          ) : (
            <div style={{ color: 'var(--text-muted)', textAlign: 'center', margin: 'auto' }}>
              <Info size={32} style={{ marginBottom: '8px', opacity: 0.5 }} />
              <p>Bấm hoặc di chuột vào các điểm màu trên sơ đồ để xem thông tin chi tiết.</p>
            </div>
          )}

          {/* Mini progress inside diagram */}
          <div style={{
            marginTop: '16px',
            paddingTop: '12px',
            borderTop: '1px solid var(--border-main)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}>
            <span>Đã khám phá: {exploredIds.size}/{diagram.hotspots.length} bào quan</span>
            {exploredIds.size === diagram.hotspots.length && (
              <span style={{ color: 'var(--text-main)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <CheckCircle size={14} /> Hoàn thành sơ đồ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
