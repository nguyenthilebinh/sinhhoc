import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BooksPage } from './pages/BooksPage';
import { LessonPage } from './pages/LessonPage';
import { ExplorePage } from './pages/ExplorePage';
import { SearchPage } from './pages/SearchPage';
import { ProgressPage } from './pages/ProgressPage';
import { Cell3DStudio } from './components/biology/Cell3DStudio';
import { SlideViewerPage } from './pages/SlideViewerPage';
import { QuizBankPage } from './pages/QuizBankPage';
import { TeacherProfilePage } from './pages/TeacherProfilePage';
import { AchievementsModal } from './components/gamification/AchievementsModal';
import { UserProgress } from './types';

const STORAGE_KEY = 'biolab_user_progress_v1';
const THEME_KEY = 'biolab_theme_v1';

const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: ['sinh10-ch01-l01'],
  exploredDiagrams: ['cell-structure-01'],
  completedQuizzes: { 'quiz-cell-01': 100 },
  streakDays: 3,
  lastActiveDate: new Date().toISOString().split('T')[0],
  xp: 150,
  unlockedBadges: ['badge-cell']
};

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedBookId, setSelectedBookId] = useState<string>('sinh10');
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);

  // Day/Night Theme State ('dark' | 'light')
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (e) {
      console.error(e);
    }
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user progress', e);
    }
    return DEFAULT_PROGRESS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userProgress));
    } catch (e) {
      console.error('Failed to save user progress', e);
    }
  }, [userProgress]);

  const handleSelectBook = (bookId: string) => {
    setSelectedBookId(bookId);
    setActiveTab('books');
  };

  const handleOpenLesson = (lessonId: string) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lesson');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteLesson = (lessonId: string, xpEarned: number) => {
    setUserProgress(prev => {
      const isAlreadyCompleted = prev.completedLessons.includes(lessonId);
      if (isAlreadyCompleted) return prev;

      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        xp: prev.xp + xpEarned
      };
    });
  };

  const handleResetProgress = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tiến độ học tập và làm lại từ đầu?')) {
      setUserProgress(DEFAULT_PROGRESS);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        userProgress={userProgress}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomePage
            onSelectBook={handleSelectBook}
            onNavigateTab={setActiveTab}
            onOpenLesson={handleOpenLesson}
          />
        )}

        {activeTab === 'books' && (
          <BooksPage
            selectedBookId={selectedBookId}
            onSelectBook={setSelectedBookId}
          />
        )}

        {activeTab === '3d-cell' && (
          <div className="container" style={{ padding: '20px 20px' }}>
            <Cell3DStudio />
          </div>
        )}

        {activeTab === 'slides' && <SlideViewerPage />}

        {activeTab === 'quiz-bank' && <QuizBankPage />}

        {activeTab === 'teacher' && <TeacherProfilePage />}

        {activeTab === 'lesson' && selectedLessonId && (
          <LessonPage
            lessonId={selectedLessonId}
            onBackToBooks={() => setActiveTab('books')}
            onCompleteLesson={handleCompleteLesson}
            isCompleted={userProgress.completedLessons.includes(selectedLessonId)}
          />
        )}

        {activeTab === 'explore' && <ExplorePage />}

        {activeTab === 'search' && <SearchPage onOpenLesson={handleOpenLesson} />}

        {activeTab === 'progress' && (
          <ProgressPage
            userProgress={userProgress}
            onResetProgress={handleResetProgress}
            onOpenLesson={handleOpenLesson}
          />
        )}
      </main>

      <Footer />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        userProgress={userProgress}
      />
    </div>
  );
};
