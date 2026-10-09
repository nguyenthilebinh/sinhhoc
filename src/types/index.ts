export interface Hotspot {
  id: string;
  name: string;
  x: number; // percentage or SVG coordinate
  y: number;
  description: string;
  function: string;
  importance: string;
  color?: string;
}

export interface DiagramData {
  id: string;
  title: string;
  description: string;
  type: 'cell' | 'dna' | 'mitosis' | 'leaf' | 'neuron';
  hotspots: Hotspot[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  id: string;
  title: string;
  questions: QuizQuestion[];
}

export interface TimelineStep {
  id: string;
  stage: string;
  title: string;
  description: string;
  keyEvents: string[];
  visualSvgType?: 'prophase' | 'metaphase' | 'anaphase' | 'telophase' | 'step1' | 'step2' | 'step3';
}

export interface TimelineData {
  id: string;
  title: string;
  description: string;
  steps: TimelineStep[];
}

export interface MatchingPair {
  id: string;
  term: string;
  definition: string;
}

export interface MatchingData {
  id: string;
  title: string;
  instruction: string;
  pairs: MatchingPair[];
}

export interface LessonContentSection {
  type: 'text' | 'interactive-diagram' | 'quiz' | 'reveal' | 'timeline' | 'matching';
  title?: string;
  content?: string;
  diagramId?: string;
  quizId?: string;
  timelineId?: string;
  matchingId?: string;
  revealItem?: {
    question: string;
    answer: string;
    hint?: string;
  };
}

export interface Lesson {
  id: string;
  bookId: 'sinh10' | 'sinh11' | 'sinh12';
  chapterId: string;
  title: string;
  summary: string;
  sourcePages: number[]; // Source page numbers in original PDF textbook
  pdfFileName: string;
  durationMinutes: number;
  sections: LessonContentSection[];
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Book {
  id: 'sinh10' | 'sinh11' | 'sinh12';
  code: string;
  title: string;
  grade: string;
  description: string;
  pdfFileName: string;
  color: string;
  accent: string;
  chapters: Chapter[];
}

export interface UserProgress {
  completedLessons: string[]; // lesson IDs
  exploredDiagrams: string[]; // diagram IDs
  completedQuizzes: Record<string, number>; // quizId -> score percentage
  streakDays: number;
  lastActiveDate: string;
  xp: number;
  unlockedBadges: string[];
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  requiredXp: number;
}
