import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { HelpCircle } from 'lucide-react';

export interface QuizDeckItem {
  id: string;
  bookCode: string;
  title: string;
  chapter: string;
  fileName: string;
}

export interface QuizQuestionItem {
  id: string;
  bookCode: string;
  chapter: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QuizBankPage: React.FC = () => {
  const [quizCatalog, setQuizCatalog] = useState<QuizDeckItem[]>([]);
  const [selectedGrade, setSelectedGrade] = useState<string>('ALL');
  const [activeDeck, setActiveDeck] = useState<QuizDeckItem | null>(null);
  const [questions, setQuestions] = useState<QuizQuestionItem[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch quiz deck catalog dynamically from document/quiz/quizzes_manifest.json
  useEffect(() => {
    fetch('./document/quiz/quizzes_manifest.json')
      .then(res => {
        if (!res.ok) throw new Error('Cannot load quizzes_manifest.json');
        return res.json();
      })
      .then((data: QuizDeckItem[]) => {
        if (Array.isArray(data) && data.length > 0) {
          setQuizCatalog(data);
          setActiveDeck(data[0]);
        }
      })
      .catch(err => console.error('Error loading quizzes_manifest.json:', err));
  }, []);

  // Fetch and parse the selected XLSX quiz file
  useEffect(() => {
    if (!activeDeck || !activeDeck.fileName) return;

    setIsLoading(true);
    setUserAnswers({});
    setShowResults({});

    const xlsxPath = `./document/quiz/${encodeURIComponent(activeDeck.fileName)}`;

    fetch(xlsxPath)
      .then(res => {
        if (!res.ok) throw new Error(`Cannot load XLSX file: ${xlsxPath}`);
        return res.arrayBuffer();
      })
      .then(buffer => {
        const workbook = XLSX.read(buffer, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const firstSheet = workbook.Sheets[firstSheetName];
        const rawData: any[] = XLSX.utils.sheet_to_json(firstSheet);

        if (Array.isArray(rawData) && rawData.length > 0) {
          const parsed: QuizQuestionItem[] = rawData.map((row, idx) => ({
            id: row.ID || `${activeDeck.id}-${idx}`,
            bookCode: row.BookCode || activeDeck.bookCode,
            chapter: row.Chapter || activeDeck.chapter,
            question: row.Question || 'Câu hỏi chưa có nội dung',
            options: [
              String(row.OptionA || 'Đáp án A'),
              String(row.OptionB || 'Đáp án B'),
              String(row.OptionC || 'Đáp án C'),
              String(row.OptionD || 'Đáp án D')
            ],
            correctIndex: typeof row.CorrectIndex === 'number' ? row.CorrectIndex : parseInt(row.CorrectIndex || 0, 10),
            explanation: row.Explanation || 'Chưa có giải thích chi tiết.'
          }));
          setQuestions(parsed);
        } else {
          setQuestions([]);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error parsing XLSX file:', err);
        setIsLoading(false);
        setQuestions([]);
      });
  }, [activeDeck]);

  if (quizCatalog.length === 0 || !activeDeck) {
    return (
      <div className="container" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div className="clean-card" style={{ padding: '32px' }}>
          Đang nạp danh mục bộ trắc nghiệm...
        </div>
      </div>
    );
  }

  const filteredCatalog = selectedGrade === 'ALL'
    ? quizCatalog
    : quizCatalog.filter(q => q.bookCode === selectedGrade);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    setShowResults(prev => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="container" style={{ padding: '32px 20px' }}>
      {/* Grade Filter Bar */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
        {[
          { id: 'ALL', label: 'Tất Cả' },
          { id: 'SINH 10', label: 'Sinh Học 10' },
          { id: 'SINH 11', label: 'Sinh Học 11' },
          { id: 'SINH 12', label: 'Sinh Học 12' }
        ].map((grade) => (
          <button
            key={grade.id}
            onClick={() => setSelectedGrade(grade.id)}
            className={`btn-clean ${selectedGrade === grade.id ? 'btn-clean-active' : ''}`}
          >
            {grade.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 280px) 1fr', gap: '20px' }}>
        {/* Sidebar: Quiz Decks list */}
        <div className="clean-card" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '12px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={18} /> Các Bộ Trắc Nghiệm
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredCatalog.map((deck) => {
              const isSelected = deck.id === activeDeck.id;

              return (
                <div
                  key={deck.id}
                  onClick={() => setActiveDeck(deck)}
                  className="clean-card clean-card-interactive"
                  style={{
                    padding: '12px',
                    borderColor: isSelected ? 'var(--border-highlight)' : 'var(--border-main)',
                    background: isSelected ? 'var(--bg-card-hover)' : 'var(--bg-card)'
                  }}
                >
                  <span className="btn-clean" style={{ padding: '2px 6px', fontSize: '0.68rem', marginBottom: '4px' }}>
                    {deck.bookCode}
                  </span>
                  <h4 style={{ fontSize: '0.88rem', color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                    {deck.title}
                  </h4>
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content Area: Questions for Selected Excel File */}
        <div className="clean-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header Toolbar */}
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{activeDeck.chapter}</span>
            <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '2px 0 0 0' }}>
              {activeDeck.title}
            </h2>
          </div>

          {isLoading ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              ⚡ Đang đọc dữ liệu câu hỏi từ file <code>{activeDeck.fileName}</code>...
            </div>
          ) : questions.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              Chưa có câu hỏi nào trong file Excel này.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {questions.map((quiz, idx) => {
                const selectedOpt = userAnswers[quiz.id];
                const isAnswered = showResults[quiz.id];

                return (
                  <div 
                    key={quiz.id} 
                    style={{
                      padding: '20px',
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-main)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span className="btn-clean" style={{ padding: '2px 8px', fontSize: '0.75rem' }}>
                        Câu {idx + 1} / {questions.length}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{quiz.chapter}</span>
                    </div>

                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', marginBottom: '16px', lineHeight: 1.5 }}>
                      {quiz.question}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
                      {quiz.options.map((opt, optionIdx) => {
                        const isSelected = selectedOpt === optionIdx;
                        const isCorrect = optionIdx === quiz.correctIndex;

                        let btnStyle: React.CSSProperties = {
                          justifyContent: 'flex-start',
                          textAlign: 'left',
                          padding: '10px 14px',
                          fontSize: '0.9rem'
                        };

                        let btnClass = 'btn-clean';

                        if (isAnswered) {
                          if (isCorrect) {
                            btnClass = 'btn-clean-active';
                            btnStyle.background = '#10b981';
                            btnStyle.color = '#ffffff';
                          } else if (isSelected && !isCorrect) {
                            btnStyle.background = '#ef4444';
                            btnStyle.color = '#ffffff';
                          }
                        }

                        return (
                          <button
                            key={optionIdx}
                            onClick={() => handleSelectOption(quiz.id, optionIdx)}
                            disabled={isAnswered}
                            className={btnClass}
                            style={btnStyle}
                          >
                            <strong>{String.fromCharCode(65 + optionIdx)}.</strong> {opt}
                          </button>
                        );
                      })}
                    </div>

                    {isAnswered && (
                      <div style={{
                        padding: '12px 16px',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-main)',
                        fontSize: '0.85rem'
                      }}>
                        <strong style={{ color: selectedOpt === quiz.correctIndex ? '#10b981' : '#ef4444', display: 'block', marginBottom: '4px' }}>
                          {selectedOpt === quiz.correctIndex ? '✓ Đáp án chính xác!' : '✕ Chưa chính xác!'}
                        </strong>
                        💡 <strong>Giải thích:</strong> {quiz.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
