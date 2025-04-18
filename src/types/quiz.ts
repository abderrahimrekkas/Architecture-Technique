export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizState {
  currentQuestion: number;
  questions: Question[];
  score: number;
  showResults: boolean;
  answers: string[];
  loading: boolean;
}
