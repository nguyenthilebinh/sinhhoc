import React from 'react';
import { UserProgress } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProgress: UserProgress;
  onOpenAchievements: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userProgress,
  onOpenAchievements,
  theme,
  onToggleTheme
}) => {
  const NAV_ITEMS = [
    { id: 'home', label: 'Trang Chủ' },
    { id: 'books', label: 'Sách' },
    { id: 'slides', label: 'Slide Bài Giảng' },
    { id: 'quiz-bank', label: 'Trắc Nghiệm' },
    { id: '3d-cell', label: 'Mô Hình 3D' },
    { id: 'teacher', label: 'Thông Tin Giáo Viên' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'var(--bg-card)',
      borderBottom: '1px solid var(--border-main)',
      transition: 'var(--transition)'
    }}>
      <div className="container navbar-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px'
      }}>
        {/* Top bar on Mobile / Brand title */}
        <div className="navbar-top-bar">
          <div
            onClick={() => setActiveTab('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
          >
            <img 
              src="./logo.png" 
              alt="BioLab 3D Logo" 
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                objectFit: 'cover',
                boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
              }} 
            />
            <div>
              <span style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                BioLab <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>3D</span>
              </span>
              <span style={{ fontSize: '0.65rem', display: 'block', color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '-4px' }}>
                Digital Textbook
              </span>
            </div>
          </div>

          <button
            onClick={onToggleTheme}
            className="btn-clean"
            style={{ padding: '6px 10px', fontSize: '0.8rem' }}
            title="Chuyển chế độ Sáng / Tối"
          >
            {theme === 'dark' ? '☀️ Ban ngày' : '🌙 Ban đêm'}
          </button>
        </div>

        {/* Scrollable Nav Tabs on Mobile */}
        <nav className="nav-scroll-mobile">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id || (item.id === 'books' && (activeTab === 'lesson' || activeTab === 'chapter'));

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`btn-clean ${isActive ? 'btn-clean-active' : ''}`}
                style={{ padding: '7px 12px', fontSize: '0.85rem' }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
