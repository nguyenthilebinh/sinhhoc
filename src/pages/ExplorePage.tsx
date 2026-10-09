import React, { useState } from 'react';
import { InteractiveDiagram } from '../components/biology/InteractiveDiagram';
import { BiologyTimeline } from '../components/biology/BiologyTimeline';
import { MatchingExercise } from '../components/biology/MatchingExercise';
import { Sparkles, Dna, Atom, Heart, Activity, Globe } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('cell');

  const CATEGORIES = [
    { id: 'cell', title: 'Tế Bào Học', icon: '🧫', color: 'badge-emerald', description: 'Cấu trúc và chức năng các bào quan tế bào nhân thực & nhân sơ.' },
    { id: 'genetics', title: 'Di Truyền Học', icon: '🧬', color: 'badge-cyan', description: 'ADN, ARN, cấu trúc xoắn đôi và cơ chế tái bản.' },
    { id: 'mitosis', title: 'Phân Bào & Sinh Học', icon: '🔬', color: 'badge-purple', description: 'Chu kỳ tế bào, tiến trình nguyên phân & giảm phân.' },
    { id: 'matching', title: 'Thử Thách Ghép Nối', icon: '🔗', color: 'badge-amber', description: 'Trò chơi tương tác nối bào quan với chức năng sinh học.' }
  ];

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '8px' }}>
          <Sparkles size={14} /> Không Gian Khám Phá Tương Tác 2D
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Khám Phá Khái Niệm Sinh Học</h1>
        <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
          Tự do tìm hiểu các chủ đề sinh học qua các mô hình tương tác 2D trực quan.
        </p>
      </div>

      {/* Category Tabs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="glass-card glass-card-interactive"
              style={{
                padding: '20px',
                border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                background: isActive ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                transform: isActive ? 'scale(1.02)' : 'none'
              }}
            >
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{cat.icon}</div>
              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '4px' }}>{cat.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.4 }}>
                {cat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Selected Category Interactive Viewer Container */}
      <div style={{ marginTop: '20px' }}>
        {activeCategory === 'cell' && (
          <InteractiveDiagram diagramId="cell-structure-01" />
        )}

        {activeCategory === 'genetics' && (
          <InteractiveDiagram diagramId="dna-helix-01" />
        )}

        {activeCategory === 'mitosis' && (
          <BiologyTimeline timelineId="timeline-mitosis-01" />
        )}

        {activeCategory === 'matching' && (
          <MatchingExercise matchingId="matching-organelles-01" />
        )}
      </div>
    </div>
  );
};
