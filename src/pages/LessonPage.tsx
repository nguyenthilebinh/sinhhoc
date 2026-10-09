import React, { useState } from 'react';
import { BOOKS_DATA } from '../data/booksData';
import { Lesson, LessonContentSection } from '../types';
import { InteractiveDiagram } from '../components/biology/InteractiveDiagram';
import { InteractiveQuiz } from '../components/biology/InteractiveQuiz';
import { RevealAnswer } from '../components/biology/RevealAnswer';
import { BiologyTimeline } from '../components/biology/BiologyTimeline';
import { MatchingExercise } from '../components/biology/MatchingExercise';
import { PdfViewerModal } from '../components/biology/PdfViewerModal';
import { ArrowLeft, BookOpen, FileText, CheckCircle2, Sparkles, Clock, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LessonPageProps {
  lessonId: string;
  onBackToBooks: () => void;
  onCompleteLesson: (lessonId: string, xpEarned: number) => void;
  isCompleted: boolean;
}

export const LessonPage: React.FC<LessonPageProps> = ({
  lessonId,
  onBackToBooks,
  onCompleteLesson,
  isCompleted
}) => {
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);

  // Find lesson from BOOKS_DATA
  let currentLesson: Lesson | null = null;
  let currentBookCode = '';

  for (const book of BOOKS_DATA) {
    for (const chapter of book.chapters) {
      const found = chapter.lessons.find(l => l.id === lessonId);
      if (found) {
        currentLesson = found;
        currentBookCode = book.code;
        break;
      }
    }
  }

  if (!currentLesson) {
    return (
      <div className="container" style={{ padding: '60px 24px', textAlign: 'center' }}>
        <h2>Không tìm thấy bài học</h2>
        <button onClick={onBackToBooks} style={{ marginTop: '16px', padding: '10px 20px', background: 'var(--accent-cyan)', borderRadius: '8px', color: '#fff' }}>
          Quay lại danh sách sách
        </button>
      </div>
    );
  }

  const handleFinishLesson = () => {
    onCompleteLesson(lessonId, 50);
    confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
  };

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      {/* Top Header & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <button
          onClick={onBackToBooks}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.9rem',
            color: 'var(--text-muted)',
            background: 'none'
          }}
        >
          <ArrowLeft size={16} /> Quay lại bài học
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsPdfModalOpen(true)}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              background: 'rgba(6, 182, 212, 0.15)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              fontSize: '0.85rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileText size={16} /> Đối Chiếu Sách Gốc PDF (Trang {currentLesson.sourcePages.join(', ')})
          </button>

          {isCompleted && (
            <span className="badge badge-emerald">
              <CheckCircle2 size={14} /> Đã hoàn thành
            </span>
          )}
        </div>
      </div>

      {/* Lesson Header Banner */}
      <div className="glass-card" style={{ padding: '32px', marginBottom: '32px' }}>
        <div className="badge badge-cyan" style={{ marginBottom: '12px' }}>
          {currentBookCode} • {currentLesson.durationMinutes} phút học
        </div>

        <h1 style={{ fontSize: '2.2rem', marginBottom: '12px', lineHeight: 1.25 }}>
          {currentLesson.title}
        </h1>

        <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
          {currentLesson.summary}
        </p>
      </div>

      {/* Dynamic Render Sections Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {currentLesson.sections.map((sec, idx) => {
          if (sec.type === 'text') {
            return (
              <div key={idx} className="glass-card" style={{ padding: '28px' }}>
                {sec.title && (
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--accent-cyan)', marginBottom: '12px' }}>
                    {sec.title}
                  </h3>
                )}
                <div style={{ fontSize: '1.0rem', lineHeight: 1.7, color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
                  {sec.content}
                </div>
              </div>
            );
          }

          if (sec.type === 'interactive-diagram' && sec.diagramId) {
            return <InteractiveDiagram key={idx} diagramId={sec.diagramId} />;
          }

          if (sec.type === 'quiz' && sec.quizId) {
            return <InteractiveQuiz key={idx} quizId={sec.quizId} />;
          }

          if (sec.type === 'reveal' && sec.revealItem) {
            return (
              <RevealAnswer
                key={idx}
                question={sec.revealItem.question}
                answer={sec.revealItem.answer}
                hint={sec.revealItem.hint}
              />
            );
          }

          if (sec.type === 'timeline' && sec.timelineId) {
            return <BiologyTimeline key={idx} timelineId={sec.timelineId} />;
          }

          if (sec.type === 'matching' && sec.matchingId) {
            return <MatchingExercise key={idx} matchingId={sec.matchingId} />;
          }

          return null;
        })}
      </div>

      {/* Bottom Completion Action */}
      <div className="glass-card" style={{ marginTop: '40px', padding: '32px', textAlign: 'center', background: 'radial-gradient(circle at center, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.9))' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Bạn Đã Học Xong Bài Học Này?</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          Đánh dấu hoàn thành để ghi nhận tiến độ và tích lũy +50 XP.
        </p>

        <button
          onClick={handleFinishLesson}
          disabled={isCompleted}
          style={{
            padding: '12px 28px',
            borderRadius: '12px',
            background: isCompleted ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, var(--accent-emerald) 0%, var(--accent-cyan) 100%)',
            color: isCompleted ? '#34d399' : '#fff',
            fontWeight: 700,
            fontSize: '1.0rem',
            border: `1px solid ${isCompleted ? '#10b981' : 'transparent'}`,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            cursor: isCompleted ? 'default' : 'pointer'
          }}
        >
          <CheckCircle2 size={18} />
          {isCompleted ? 'Bài học đã hoàn thành (+50 XP)' : 'Đánh dấu Hoàn Thành Bài Học'}
        </button>
      </div>

      {/* Source PDF Modal */}
      <PdfViewerModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        pdfFileName={currentLesson.pdfFileName}
        sourcePages={currentLesson.sourcePages}
        lessonTitle={currentLesson.title}
      />
    </div>
  );
};
