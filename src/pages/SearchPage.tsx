import React, { useState } from 'react';
import { BOOKS_DATA } from '../data/booksData';
import { Lesson } from '../types';
import { Search, BookOpen, FileText, ChevronRight, Sparkles } from 'lucide-react';

interface SearchPageProps {
  onOpenLesson: (lessonId: string) => void;
}

export const SearchPage: React.FC<SearchPageProps> = ({ onOpenLesson }) => {
  const [query, setQuery] = useState('');

  // Collect all lessons across all books
  const allLessonsWithBook: { lesson: Lesson; bookTitle: string; bookCode: string; chapterTitle: string }[] = [];
  BOOKS_DATA.forEach(b => {
    b.chapters.forEach(c => {
      c.lessons.forEach(l => {
        allLessonsWithBook.push({
          lesson: l,
          bookTitle: b.title,
          bookCode: b.code,
          chapterTitle: c.title
        });
      });
    });
  });

  const filteredResults = query.trim() === '' ? [] : allLessonsWithBook.filter(item => {
    const q = query.toLowerCase();
    const titleMatch = item.lesson.title.toLowerCase().includes(q);
    const summaryMatch = item.lesson.summary.toLowerCase().includes(q);
    const chapterMatch = item.chapterTitle.toLowerCase().includes(q);
    const sectionMatch = item.lesson.sections.some(s => s.content?.toLowerCase().includes(q));

    return titleMatch || summaryMatch || chapterMatch || sectionMatch;
  });

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '850px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div className="badge badge-purple" style={{ marginBottom: '8px' }}>
          <Search size={14} /> Công Cụ Tra Cứu Giáo Khoa
        </div>
        <h1 style={{ fontSize: '2.2rem', marginBottom: '8px' }}>Tìm Kiếm Kiến Thức Sinh Học</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Nhập từ khóa (ví dụ: <em>tế bào, ti thể, ADN, quang hợp, nguyên phân</em>) để tra cứu bài học.
        </p>
      </div>

      {/* Search Input Box */}
      <div 
        className="glass-card" 
        style={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          border: '1px solid var(--accent-cyan-glow)',
          boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)'
        }}
      >
        <Search size={22} color="var(--accent-cyan)" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên bài học, từ khóa sinh học hoặc nội dung sách..."
          style={{
            flex: 1,
            background: 'none',
            border: 'none',
            outline: 'none',
            color: '#fff',
            fontSize: '1.05rem',
            padding: '12px 0'
          }}
          autoFocus
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)', background: 'none' }}
          >
            Xóa
          </button>
        )}
      </div>

      {/* Recommended Keywords */}
      {!query && (
        <div>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Từ khóa phổ biến:</h4>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {['Tế bào nhân thực', 'Ti thể', 'ADN', 'Nguyên phân', 'Lục thể', 'Quang hợp', 'Dịch mã'].map((kw) => (
              <button
                key={kw}
                onClick={() => setQuery(kw)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '99px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-main)',
                  fontSize: '0.85rem'
                }}
              >
                {kw}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results List */}
      {query && (
        <div>
          <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
            Tìm thấy <strong>{filteredResults.length}</strong> kết quả phù hợp cho "{query}"
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {filteredResults.map((res) => (
              <div
                key={res.lesson.id}
                onClick={() => onOpenLesson(res.lesson.id)}
                className="glass-card glass-card-interactive"
                style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '16px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className="badge badge-cyan">{res.bookCode}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{res.chapterTitle}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', color: '#fff', marginBottom: '4px' }}>{res.lesson.title}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>
                    {res.lesson.summary}
                  </p>
                </div>

                <ChevronRight size={20} color="var(--accent-cyan)" />
              </div>
            ))}

            {filteredResults.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Không tìm thấy bài học nào phù hợp với từ khóa này.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
