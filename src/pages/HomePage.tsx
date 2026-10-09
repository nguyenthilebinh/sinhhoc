import React from 'react';
import { BOOKS_DATA } from '../data/booksData';

interface HomePageProps {
  onSelectBook: (bookId: string) => void;
  onNavigateTab: (tab: string) => void;
  onOpenLesson: (lessonId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectBook,
  onNavigateTab,
  onOpenLesson
}) => {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ padding: '40px 0 30px 0' }}>
        <div className="container grid-hero">
          <div>
            <span className="btn-clean" style={{ marginBottom: '16px', fontSize: '0.8rem' }}>
              🔬 Nền Tảng Học Sinh Học Tương Tác 3D
            </span>

            <h1 style={{ fontSize: '2.8rem', lineHeight: 1.2, marginBottom: '20px' }}>
              Khám Phá Cấu Trúc Sinh Học Tương Tác.<br />
              Đơn Giản & Trực Quan.
            </h1>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', marginBottom: '28px', maxWidth: '540px', lineHeight: 1.6 }}>
              Không gian học tập tích hợp bộ sưu tập mô hình 3D (Tế bào động vật, thực vật, vi khuẩn, ADN), slide bài giảng và sách giáo khoa điện tử chuẩn THPT.
            </p>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigateTab('3d-cell')}
                className="btn-clean btn-clean-active"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                🧊 Mở Mô Hình 3D Studio
              </button>

              <button
                onClick={() => onNavigateTab('slides')}
                className="btn-clean"
                style={{ padding: '12px 24px', fontSize: '0.95rem' }}
              >
                📽️ Xem Slide Bài Giảng
              </button>
            </div>
          </div>

          {/* Quick Preview Card */}
          <div 
            className="clean-card"
            style={{
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              aspectRatio: '1.1',
              background: 'var(--bg-surface)'
            }}
          >
            <div style={{ fontSize: '4.5rem', marginBottom: '12px' }}>🧫</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Mô Hình 3D Tế Bào</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
              Bao gồm 8+ mô hình 3D: Tế bào Động vật, Thực vật, Vi khuẩn, Ti thể, Lục thể, ADN & Virus.
            </p>

            <button
              onClick={() => onNavigateTab('3d-cell')}
              className="btn-clean btn-clean-active"
              style={{ width: '100%' }}
            >
              Khám phá 3D Studio
            </button>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section style={{ padding: '30px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '2.0rem', marginBottom: '8px' }}>Tài Liệu Sách Giáo Khoa (PDF)</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {BOOKS_DATA.map((book) => (
              <div
                key={book.id}
                className="clean-card clean-card-interactive"
                onClick={() => onSelectBook(book.id)}
                style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="btn-clean" style={{ fontSize: '0.75rem', padding: '2px 8px' }}>{book.grade}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>PDF Chuẩn</span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{book.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px', lineHeight: 1.5 }}>
                    {book.description}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--border-main)', paddingTop: '12px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{book.chapters.length} Chương học</span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>Mở bài học ➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
