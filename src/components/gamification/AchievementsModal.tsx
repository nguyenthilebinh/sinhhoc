import React from 'react';
import { UserProgress, Badge } from '../../types';
import { X, Trophy, Flame, Zap, Award, CheckCircle } from 'lucide-react';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProgress: UserProgress;
}

const BADGES: Badge[] = [
  {
    id: 'badge-cell',
    title: 'Nhà Tế Bào Học',
    description: 'Khám phá tất cả các bào quan trong sơ đồ tế bào 2D.',
    icon: '🧫',
    unlocked: true,
    requiredXp: 50
  },
  {
    id: 'badge-genetics',
    title: 'Chuyên Gia Di Truyền',
    description: 'Hoàn thành bài trắc nghiệm ADN & Cơ chế di truyền với điểm 100%.',
    icon: '🧬',
    unlocked: true,
    requiredXp: 100
  },
  {
    id: 'badge-mitosis',
    title: 'Bậc Thầy Phân Bào',
    description: 'Khám phá xong tiến trình các kỳ nguyên phân.',
    icon: '🔬',
    unlocked: true,
    requiredXp: 150
  },
  {
    id: 'badge-botany',
    title: 'Nhà Sinh Học Thực Vật',
    description: 'Tìm hiểu xong cơ chế quang hợp và trao đổi chất ở thực vật.',
    icon: '🌱',
    unlocked: false,
    requiredXp: 300
  },
  {
    id: 'badge-master',
    title: 'Đại Sứ Sinh Học',
    description: 'Đạt chuỗi học 7 ngày và vượt qua 10 bài kiểm tra.',
    icon: '🏆',
    unlocked: false,
    requiredXp: 500
  }
];

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  userProgress
}) => {
  if (!isOpen) return null;

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
          maxWidth: '650px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: '28px',
          border: '1px solid var(--border-glow)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={24} color="#fbbf24" />
            <h3 style={{ fontSize: '1.3rem', margin: 0 }}>Huy Chương & Thành Tích Học Tập</h3>
          </div>

          <button
            onClick={onClose}
            style={{ padding: '6px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: '#fff' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
          marginBottom: '24px',
          textAlign: 'center'
        }}>
          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
            <Flame size={20} color="#fbbf24" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#fbbf24' }}>{userProgress.streakDays}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Chuỗi Ngày Học</div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
            <Zap size={20} color="#c084fc" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#c084fc' }}>{userProgress.xp}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Điểm XP tích lũy</div>
          </div>

          <div style={{ padding: '14px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
            <Award size={20} color="#34d399" style={{ marginBottom: '4px' }} />
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{userProgress.completedLessons.length}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Bài học đã khám phá</div>
          </div>
        </div>

        {/* Badges List */}
        <h4 style={{ fontSize: '1.0rem', marginBottom: '12px', color: 'var(--text-muted)' }}>Danh sách danh hiệu:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {BADGES.map((badge) => {
            const isUnlocked = userProgress.xp >= badge.requiredXp || badge.unlocked;

            return (
              <div
                key={badge.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '14px 18px',
                  borderRadius: '12px',
                  background: isUnlocked ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 0.4)',
                  border: `1px solid ${isUnlocked ? 'var(--accent-cyan-glow)' : 'var(--border-subtle)'}`,
                  opacity: isUnlocked ? 1 : 0.6
                }}
              >
                <div style={{ fontSize: '2rem' }}>{badge.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h5 style={{ fontSize: '1.0rem', color: isUnlocked ? '#fff' : 'var(--text-muted)', margin: 0 }}>
                      {badge.title}
                    </h5>
                    {isUnlocked ? (
                      <span className="badge badge-emerald" style={{ fontSize: '0.7rem' }}>Đã mở khóa</span>
                    ) : (
                      <span className="badge" style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)' }}>
                        Yêu cầu {badge.requiredXp} XP
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {badge.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
