import React, { useState } from 'react';
import { BOOKS_DATA } from '../data/booksData';
import { Download, BookOpen } from 'lucide-react';

interface BooksPageProps {
  selectedBookId: string;
  onSelectBook: (bookId: string) => void;
}

export const BooksPage: React.FC<BooksPageProps> = ({
  selectedBookId,
  onSelectBook
}) => {
  const activeBook = BOOKS_DATA.find(b => b.id === selectedBookId) || BOOKS_DATA[0];
  const pdfUrl = `./document/book/${activeBook.pdfFileName}`;

  return (
    <div className="container" style={{ padding: '32px 20px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '20px' }}>
        {/* Sidebar: Book List */}
        <div className="clean-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={18} /> Danh Sách Sách
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {BOOKS_DATA.map((book) => {
              const isSelected = book.id === activeBook.id;

              return (
                <div
                  key={book.id}
                  onClick={() => onSelectBook(book.id)}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '12px',
                    borderColor: isSelected ? 'var(--border-highlight)' : 'var(--border-main)',
                    background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                  }}
                >
                  <span className="btn-clean" style={{ padding: '2px 6px', fontSize: '0.68rem', marginBottom: '4px' }}>
                    {book.code}
                  </span>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                    {book.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content: Clean PDF Viewer Frame (Fit to Width) */}
        <div className="clean-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Header Toolbar: Minimal Title */}
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeBook.grade}</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '2px 0 0 0' }}>{activeBook.title}</h2>
          </div>

          {/* Embedded Native PDF Viewer Frame (Fit to Width) */}
          <div style={{
            height: '660px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-main)',
            background: 'var(--bg-surface)'
          }}>
            <iframe
              key={activeBook.id}
              src={`${pdfUrl}#toolbar=1&navpanes=0&view=FitH`}
              title={activeBook.title}
              style={{ width: '100%', height: '100%', border: 'none' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
