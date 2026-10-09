import React, { useState } from 'react';
import { TIMELINES } from '../../data/interactiveData';
import { Activity, ChevronRight, CheckCircle2 } from 'lucide-react';

interface BiologyTimelineProps {
  timelineId: string;
}

export const BiologyTimeline: React.FC<BiologyTimelineProps> = ({ timelineId }) => {
  const timeline = TIMELINES[timelineId] || TIMELINES['timeline-mitosis-01'];
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const currentStep = timeline.steps[activeStepIndex];

  return (
    <div className="glass-card" style={{ padding: '24px', margin: '24px 0' }}>
      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '6px' }}>
          <Activity size={14} /> Tiến Trình Sinh Học 2D
        </div>
        <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>{timeline.title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{timeline.description}</p>
      </div>

      {/* Stepper Navigation Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: '24px',
        padding: '0 10px'
      }}>
        {/* Connecting line */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '40px',
          right: '40px',
          height: '2px',
          background: 'var(--border-subtle)',
          zIndex: 0,
          transform: 'translateY(-50%)'
        }} />

        {timeline.steps.map((step, idx) => {
          const isActive = idx === activeStepIndex;
          const isPassed = idx < activeStepIndex;

          return (
            <button
              key={step.id}
              onClick={() => setActiveStepIndex(idx)}
              style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: isActive ? 'linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-cyan) 100%)' :
                            isPassed ? 'rgba(16, 185, 129, 0.3)' : 'var(--bg-surface)',
                border: `2px solid ${isActive ? '#fff' : isPassed ? '#10b981' : 'var(--border-subtle)'}`,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.9rem',
                boxShadow: isActive ? '0 0 15px rgba(16, 185, 129, 0.4)' : 'none'
              }}>
                {isPassed ? '✓' : idx + 1}
              </div>
              <span style={{
                fontSize: '0.75rem',
                color: isActive ? '#fff' : 'var(--text-muted)',
                fontWeight: isActive ? 600 : 400
              }}>
                {step.stage.split(' ')[0]} {step.stage.split(' ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Step Content Visual & Detail */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(200px, 260px) 1fr',
        gap: '20px',
        background: 'rgba(15, 23, 42, 0.6)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid var(--border-subtle)'
      }}>
        {/* SVG Graphic representation of stage */}
        <div style={{
          background: '#090d16',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          border: '1px solid var(--border-subtle)'
        }}>
          <svg viewBox="0 0 150 150" style={{ width: '100%', height: '100%', maxHeight: '180px' }}>
            <circle cx="75" cy="75" r="60" fill="#0f172a" stroke="var(--accent-cyan)" strokeWidth="2" strokeDasharray={activeStepIndex === 3 ? "5 5" : "none"} />
            
            {activeStepIndex === 0 && (
              // Prophase: condensing chromosomes
              <g>
                <circle cx="75" cy="75" r="35" fill="none" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
                <path d="M 60 65 L 75 80 M 60 80 L 75 65" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                <path d="M 85 70 L 95 85 M 85 85 L 95 70" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {activeStepIndex === 1 && (
              // Metaphase: lined up in equator
              <g>
                <line x1="75" y1="25" x2="75" y2="125" stroke="#334155" strokeWidth="1.5" strokeDasharray="2 2" />
                <path d="M 68 50 L 82 50 M 75 43 L 75 57" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                <path d="M 68 75 L 82 75 M 75 68 L 75 82" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                <path d="M 68 100 L 82 100 M 75 93 L 75 107" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />
              </g>
            )}

            {activeStepIndex === 2 && (
              // Anaphase: separating to poles
              <g>
                <path d="M 40 50 L 30 50" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                <path d="M 110 50 L 120 50" stroke="#f43f5e" strokeWidth="4" strokeLinecap="round" />
                <path d="M 40 75 L 30 75" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                <path d="M 110 75 L 120 75" stroke="#a855f7" strokeWidth="4" strokeLinecap="round" />
                <line x1="30" y1="75" x2="120" y2="75" stroke="#38bdf8" strokeWidth="1" strokeDasharray="2 2" />
              </g>
            )}

            {activeStepIndex === 3 && (
              // Telophase: two daughter cells
              <g>
                <circle cx="50" cy="75" r="28" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
                <circle cx="100" cy="75" r="28" fill="#1e293b" stroke="#34d399" strokeWidth="2" />
              </g>
            )}
          </svg>
        </div>

        {/* Text descriptions */}
        <div>
          <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-emerald)', marginBottom: '4px' }}>
            {currentStep.stage}: {currentStep.title}
          </h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '12px' }}>
            {currentStep.description}
          </p>

          <strong style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            📌 Diễn biến sinh học trọng tâm:
          </strong>
          <ul style={{ paddingLeft: '18px', fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {currentStep.keyEvents.map((evt, i) => (
              <li key={i}>{evt}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
