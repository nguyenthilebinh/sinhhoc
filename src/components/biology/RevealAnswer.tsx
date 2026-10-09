import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';

interface RevealAnswerProps {
  question: string;
  answer: string;
  hint?: string;
}

export const RevealAnswer: React.FC<RevealAnswerProps> = ({ question, answer, hint }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [showHint, setShowHint] = useState(false);

  return (
    <div className="glass-card" style={{ padding: '20px', margin: '20px 0' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{ flex: 1 }}>
          <div className="badge badge-amber" style={{ marginBottom: '8px' }}>
            <Lightbulb size={14} /> Thử Thách Tư Duy
          </div>
          <h4 style={{ fontSize: '1.05rem', color: '#fff', marginBottom: '8px' }}>{question}</h4>
        </div>

        <button
          onClick={() => setIsRevealed(!isRevealed)}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: isRevealed ? 'rgba(255, 255, 255, 0.1)' : 'rgba(6, 182, 212, 0.2)',
            color: isRevealed ? 'var(--text-muted)' : 'var(--accent-cyan)',
            border: `1px solid ${isRevealed ? 'var(--border-subtle)' : 'var(--accent-cyan)'}`,
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <Eye size={14} />
          {isRevealed ? 'Ẩn đáp án' : 'Xem đáp án'}
          {isRevealed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {hint && !isRevealed && (
        <div style={{ marginTop: '8px' }}>
          <button
            onClick={() => setShowHint(!showHint)}
            style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', background: 'none', textDecoration: 'underline' }}
          >
            {showHint ? 'Ẩn gợi ý' : '💡 Xem gợi ý'}
          </button>
          {showHint && (
            <div style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {hint}
            </div>
          )}
        </div>
      )}

      {isRevealed && (
        <div style={{
          marginTop: '16px',
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          color: '#e2e8f0',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
          animation: 'fadeIn 0.3s ease-in-out'
        }}>
          <strong style={{ color: '#34d399', display: 'block', marginBottom: '4px' }}>✓ ĐÁP ÁN VÀ GIẢI THÍCH:</strong>
          {answer}
        </div>
      )}
    </div>
  );
};
