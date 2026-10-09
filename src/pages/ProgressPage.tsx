import React from 'react';
import { UserProgress } from '../types';
import { BOOKS_DATA } from '../data/booksData';
import { Award, Flame, Zap, BookOpen, CheckCircle2, RotateCcw } from 'lucide-react';

interface ProgressPageProps {
  userProgress: UserProgress;
  onResetProgress: () => void;
  onOpenLesson: (lessonId: string) => void;
}

export const ProgressPage: React.FC<ProgressPageProps> = ({
  userProgress,
  onResetProgress,
  onOpenLesson
}) => {
  // Compute total lesson stats
  let totalLessons = 0;
  BOOKS_DATA.forEach(b => {
    b.chapters.forEach(c => {
      totalLessons += c.lessons.length;
    });
  });

  const completionPercentage = Math.round((userProgress.completedLessons.length / (totalLessons || 1)) * 100);

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="badge badge-emerald" style={{ marginBottom: '8px' }}>
          <Award size={14} /> Hồ Sơ & Tiến Độ Cá Nhân
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Nhật Ký Học Tập Sinh Học</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Theo dõi tiến độ hoàn thành các bài học, tổng điểm kinh nghiệm và huy chương đã đạt được.
        </p>
      </div>

      {/* Main Stats Header Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <Flame size={32} color="#fbbf24" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24' }}>{userProgress.streakDays} Ngày</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Chuỗi ngày học tập</div>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <Zap size={32} color="#c084fc" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#c084fc' }}>{userProgress.xp} XP</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tổng điểm kinh nghiệm</div>
        </div>

        <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
          <BookOpen size={32} color="var(--accent-cyan)" style={{ marginBottom: '8px' }} />
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
            {userProgress.completedLessons.length} / {totalLessons}
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Bài học đã đọc ({completionPercentage}%)</div>
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="glass-card" style={{ padding: '28px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Tổng Tiến Độ Khám Phá Giáo Khoa</h3>
        <div style={{
          width: '100%',
          height: '16px',
          borderRadius: '99px',
          background: 'rgba(255, 255, 255, 0.1)',
          overflow: 'hidden',
          marginBottom: '12px'
        }}>
          <div style={{
            width: `${completionPercentage}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #06b6d4 0%, #10b981 100%)',
            borderRadius: '99px',
            transition: 'width 0.5s ease-out'
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span>0%</span>
          <span>{completionPercentage}% Hoàn thành</span>
          <span>100%</span>
        </div>
      </div>

      {/* Book Breakdown */}
      <h3 style={{ fontSize: '1.3rem', marginBottom: '16px' }}>Tiến Độ Theo Cấp Sách</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
        {BOOKS_DATA.map((book) => {
          let bookLessonsCount = 0;
          let bookCompletedCount = 0;

          book.chapters.forEach(c => {
            c.lessons.forEach(l => {
              bookLessonsCount++;
              if (userProgress.completedLessons.includes(l.id)) {
                bookCompletedCount++;
              }
            });
          });

          const pct = Math.round((bookCompletedCount / (bookLessonsCount || 1)) * 100);

          return (
            <div key={book.id} className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div>
                  <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{book.title}</h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Đã hoàn thành {bookCompletedCount}/{bookLessonsCount} bài học
                  </span>
                </div>
                <span className="badge badge-cyan">{pct}%</span>
              </div>

              <div style={{
                width: '100%',
                height: '8px',
                borderRadius: '99px',
                background: 'rgba(255, 255, 255, 0.08)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: 'var(--accent-cyan)',
                  borderRadius: '99px'
                }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="glass-card" style={{ padding: '24px', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
        <h4 style={{ fontSize: '1.0rem', color: '#f43f5e', marginBottom: '8px' }}>Quản Lý Dữ Liệu Bộ Nhớ</h4>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
          Tiến độ học tập được lưu tự động trên trình duyệt web của bạn (Local Storage).
        </p>

        <button
          onClick={onResetProgress}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            background: 'rgba(244, 63, 94, 0.15)',
            color: '#fb7185',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <RotateCcw size={14} /> Đặt lại tiến độ học tập
        </button>
      </div>
    </div>
  );
};
