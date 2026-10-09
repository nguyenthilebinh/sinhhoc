import React, { useState } from 'react';
import { QUIZZES } from '../../data/interactiveData';
import { HelpCircle, CheckCircle2, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InteractiveQuizProps {
  quizId: string;
  onCompleteQuiz?: (score: number) => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({
  quizId,
  onCompleteQuiz
}) => {
  const quiz = QUIZZES[quizId] || QUIZZES['quiz-cell-01'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < quiz.questions.length) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      const finalPercentage = Math.round(((score + (selectedOption === currentQuestion.correctIndex ? 1 : 0)) / quiz.questions.length) * 100);
      if (finalPercentage >= 80) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
      if (onCompleteQuiz) {
        onCompleteQuiz(finalPercentage);
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const finalScore = score;
    const total = quiz.questions.length;
    const percentage = Math.round((finalScore / total) * 100);

    return (
      <div className="glass-card" style={{ padding: '32px', margin: '24px 0', textAlign: 'center' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: percentage >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
          color: percentage >= 80 ? 'var(--accent-emerald)' : 'var(--accent-amber)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px auto'
        }}>
          <Award size={36} />
        </div>

        <h3 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>Kết Quả Bài Trắc Nghiệm</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '16px' }}>{quiz.title}</p>

        <div style={{ fontSize: '2.5rem', fontWeight: 800, color: percentage >= 80 ? 'var(--accent-emerald)' : 'var(--accent-cyan)', marginBottom: '12px' }}>
          {finalScore} / {total} <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>({percentage}%)</span>
        </div>

        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '24px' }}>
          {percentage === 100 ? '🎉 Xuất sắc! Bạn đã nắm vững toàn bộ kiến thức bài học.' :
           percentage >= 70 ? '👏 Rất tốt! Bạn đã hiểu hầu hết kiến thức trọng tâm.' :
           '💪 Đừng lo lắng! Hãy đọc lại nội dung bài học và thử lại nhé.'}
        </p>

        <button
          onClick={handleRestart}
          style={{
            padding: '10px 24px',
            borderRadius: '10px',
            background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #3b82f6 100%)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <RotateCcw size={16} /> Làm lại bài kiểm tra
        </button>
      </div>
    );
  }

  return (
    <div className="glass-card" style={{ padding: '24px', margin: '24px 0' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div className="badge badge-purple">
          <HelpCircle size={14} /> Trắc Nghiệm Củng Cố
        </div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Câu {currentIndex + 1} / {quiz.questions.length}
        </div>
      </div>

      <h4 style={{ fontSize: '1.15rem', marginBottom: '20px', lineHeight: 1.5, color: '#fff' }}>
        {currentQuestion.question}
      </h4>

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
        {currentQuestion.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isCorrect = idx === currentQuestion.correctIndex;
          
          let optionStyle: React.CSSProperties = {
            padding: '14px 18px',
            borderRadius: '12px',
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-main)',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '0.95rem',
            transition: 'all 0.2s ease',
            cursor: isAnswered ? 'default' : 'pointer'
          };

          if (isAnswered) {
            if (isCorrect) {
              optionStyle.background = 'rgba(16, 185, 129, 0.15)';
              optionStyle.borderColor = '#10b981';
              optionStyle.color = '#34d399';
            } else if (isSelected) {
              optionStyle.background = 'rgba(244, 63, 94, 0.15)';
              optionStyle.borderColor = '#f43f5e';
              optionStyle.color = '#fb7185';
            }
          } else if (isSelected) {
            optionStyle.borderColor = 'var(--accent-cyan)';
            optionStyle.background = 'rgba(6, 182, 212, 0.15)';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              style={optionStyle}
              disabled={isAnswered}
            >
              <span>{String.fromCharCode(65 + idx)}. {option}</span>
              {isAnswered && isCorrect && <CheckCircle2 size={18} color="#34d399" />}
              {isAnswered && isSelected && !isCorrect && <XCircle size={18} color="#f43f5e" />}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          background: selectedOption === currentQuestion.correctIndex ? 'rgba(16, 185, 129, 0.1)' : 'rgba(244, 63, 94, 0.1)',
          border: `1px solid ${selectedOption === currentQuestion.correctIndex ? 'rgba(16, 185, 129, 0.3)' : 'rgba(244, 63, 94, 0.3)'}`,
          marginBottom: '20px',
          fontSize: '0.9rem'
        }}>
          <strong style={{ display: 'block', marginBottom: '4px', color: selectedOption === currentQuestion.correctIndex ? '#34d399' : '#fb7185' }}>
            {selectedOption === currentQuestion.correctIndex ? '✓ Chính xác!' : '✕ Chưa đúng!'}
          </strong>
          {currentQuestion.explanation}
        </div>
      )}

      {/* Footer Next Button */}
      {isAnswered && (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleNext}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-cyan) 0%, #3b82f6 100%)',
              color: '#fff',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            {currentIndex + 1 === quiz.questions.length ? 'Xem kết quả' : 'Câu tiếp theo'} <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
