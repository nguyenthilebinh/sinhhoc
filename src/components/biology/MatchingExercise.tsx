import React, { useState } from 'react';
import { MATCHINGS } from '../../data/interactiveData';
import { MatchingPair } from '../../types';
import { Link2, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MatchingExerciseProps {
  matchingId: string;
}

export const MatchingExercise: React.FC<MatchingExerciseProps> = ({ matchingId }) => {
  const matching = MATCHINGS[matchingId] || MATCHINGS['matching-organelles-01'];
  
  const [selectedTerm, setSelectedTerm] = useState<MatchingPair | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<{ termId: string; defId: string } | null>(null);

  // Shuffle definitions for the right column once
  const [shuffledDefs] = useState(() => {
    return [...matching.pairs].sort(() => Math.random() - 0.5);
  });

  const handleTermClick = (pair: MatchingPair) => {
    if (matchedIds.has(pair.id)) return;
    setSelectedTerm(pair);
    setWrongPair(null);
  };

  const handleDefClick = (defPair: MatchingPair) => {
    if (!selectedTerm || matchedIds.has(defPair.id)) return;

    if (selectedTerm.id === defPair.id) {
      // Correct match!
      const nextMatched = new Set(matchedIds).add(selectedTerm.id);
      setMatchedIds(nextMatched);
      setSelectedTerm(null);
      setWrongPair(null);

      if (nextMatched.size === matching.pairs.length) {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      }
    } else {
      // Wrong match
      setWrongPair({ termId: selectedTerm.id, defId: defPair.id });
      setTimeout(() => {
        setWrongPair(null);
        setSelectedTerm(null);
      }, 1000);
    }
  };

  const handleReset = () => {
    setSelectedTerm(null);
    setMatchedIds(new Set());
    setWrongPair(null);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', margin: '24px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div>
          <div className="badge badge-cyan" style={{ marginBottom: '6px' }}>
            <Link2 size={14} /> Bài Tập Ghép Nối 2D
          </div>
          <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{matching.title}</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{matching.instruction}</p>
        </div>

        {matchedIds.size > 0 && (
          <button
            onClick={handleReset}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: 'var(--text-muted)',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <RotateCcw size={14} /> Làm lại
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Left Column: Terms */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-cyan)' }}>Bào quan / Khái niệm:</span>
          {matching.pairs.map((pair) => {
            const isMatched = matchedIds.has(pair.id);
            const isSelected = selectedTerm?.id === pair.id;
            const isWrong = wrongPair?.termId === pair.id;

            return (
              <button
                key={pair.id}
                onClick={() => handleTermClick(pair)}
                disabled={isMatched}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: isMatched ? 'rgba(16, 185, 129, 0.15)' :
                              isWrong ? 'rgba(244, 63, 94, 0.2)' :
                              isSelected ? 'rgba(6, 182, 212, 0.25)' : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${isMatched ? '#10b981' : isWrong ? '#f43f5e' : isSelected ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                  color: isMatched ? '#34d399' : '#fff',
                  textAlign: 'left',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: isMatched ? 'default' : 'pointer'
                }}
              >
                <span>{pair.term}</span>
                {isMatched && <CheckCircle2 size={16} color="#34d399" />}
              </button>
            );
          })}
        </div>

        {/* Right Column: Shuffled Definitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-purple)' }}>Chức năng sinh học:</span>
          {shuffledDefs.map((defPair) => {
            const isMatched = matchedIds.has(defPair.id);
            const isWrong = wrongPair?.defId === defPair.id;

            return (
              <button
                key={defPair.id}
                onClick={() => handleDefClick(defPair)}
                disabled={isMatched}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  background: isMatched ? 'rgba(16, 185, 129, 0.15)' :
                              isWrong ? 'rgba(244, 63, 94, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  border: `1px solid ${isMatched ? '#10b981' : isWrong ? '#f43f5e' : 'var(--border-subtle)'}`,
                  color: isMatched ? '#34d399' : 'var(--text-main)',
                  textAlign: 'left',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: isMatched ? 'default' : selectedTerm ? 'pointer' : 'not-allowed'
                }}
              >
                <span>{defPair.definition}</span>
                {isMatched && <CheckCircle2 size={16} color="#34d399" />}
              </button>
            );
          })}
        </div>
      </div>

      {matchedIds.size === matching.pairs.length && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.2)',
          color: '#34d399',
          textAlign: 'center',
          fontWeight: 600,
          fontSize: '0.95rem'
        }}>
          🎉 Hoàn thành xuất sắc! Bạn đã ghép nối đúng tất cả các bào quan.
        </div>
      )}
    </div>
  );
};
