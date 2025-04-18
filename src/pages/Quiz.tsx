import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { QuizState } from '../types/quiz';
import ProgressBar from '../components/ProgressBar';
import { Loader2 } from 'lucide-react';

export default function Quiz() {
  const navigate = useNavigate();
  const [state, setState] = useState<QuizState>({
    currentQuestion: 0,
    questions: [],
    score: 0,
    showResults: false,
    answers: [],
    loading: true,
  });

  useEffect(() => {
    const playerName = localStorage.getItem('playerName');
    if (!playerName) {
      navigate('/');
      return;
    }

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=medium');
        setState((prev) => ({
          ...prev,
          questions: response.data.results,
          loading: false,
        }));
      } catch (error) {
        console.error('Error fetching questions:', error);
        setState((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchQuestions();
  }, [navigate]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = state.questions[state.currentQuestion];
    const isCorrect = answer === currentQuestion.correct_answer;

    setState((prev) => ({
      ...prev,
      score: isCorrect ? prev.score + 1 : prev.score,
      currentQuestion: prev.currentQuestion + 1,
      answers: [...prev.answers, answer],
    }));

    if (state.currentQuestion === state.questions.length - 1) {
      navigate('/results', {
        state: {
          score: isCorrect ? state.score + 1 : state.score,
          total: state.questions.length,
          questions: state.questions,
          userAnswers: [...state.answers, answer],
        },
      });
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-green-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <Loader2 className="w-10 h-10 animate-spin text-purple-600 mx-auto" />
          <p className="text-center mt-4 text-purple-800 font-medium">Chargement des questions...</p>
        </div>
      </div>
    );
  }

  if (state.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 font-semibold mb-2">Échec du chargement</p>
          <p className="text-gray-600">Impossible de charger les questions. Veuillez réessayer plus tard.</p>
        </div>
      </div>
    );
  }

  const currentQuestion = state.questions[state.currentQuestion];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer].sort(() => Math.random() - 0.5);

  return (
    // [code non modifié sauf pour les classes Tailwind]
<div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-500 flex items-center justify-center p-6">
  <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full">
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-orange-700 font-bold">
          Question {state.currentQuestion + 1}/{state.questions.length}
        </span>
        <span className="text-orange-700 font-bold">
          Score: {state.score}
        </span>
      </div>
      <ProgressBar current={state.currentQuestion + 1} total={state.questions.length} />
    </div>

    <div className="mb-8">
      <div className="bg-orange-50 p-5 rounded-xl mb-6">
        <h2 className="text-xl font-bold text-orange-900">{decodeURIComponent(currentQuestion.question)}</h2>
      </div>
      <div className="grid gap-3">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(answer)}
            className="w-full text-left p-5 rounded-xl border-2 border-yellow-100 bg-white hover:bg-yellow-50 hover:border-yellow-300 active:bg-yellow-100 transition-all duration-200 shadow-sm hover:shadow-md text-gray-800 font-medium"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0 w-8 h-8 mr-3 rounded-full bg-yellow-100 flex items-center justify-center text-gray-800 font-bold">
                {String.fromCharCode(65 + index)}
              </div>
              <span>{decodeURIComponent(answer)}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  </div>
</div>
  );
}