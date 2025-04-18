import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, RefreshCw, Check, X, Home, ChevronDown, ChevronUp } from 'lucide-react';

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const playerName = localStorage.getItem('playerName');
  const { score, total, questions, userAnswers } = location.state || { score: 0, total: 0, questions: [], userAnswers: [] };
  const percentage = Math.round((score / total) * 100);
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);

  useEffect(() => {
    if (!playerName) {
      navigate('/');
    }
  }, [navigate, playerName]);

  const handlePlayAgain = () => {
    navigate('/quiz');
  };

  const handleHome = () => {
    navigate('/');
  };

  const toggleQuestion = (index: number) => {
    if (expandedQuestion === index) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(index);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-500 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <Trophy className="w-12 h-12 text-yellow-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Terminé!</h1>
            <p className="text-xl text-gray-600 mb-4">Bravo, {playerName}!</p>
            
            <div className="bg-gradient-to-r from-indigo-0 to-purple-0 rounded-xl p-6 w-full mb-6">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <p className="text-gray-800">Votre score</p>
                  <p className="text-2xl font-bold text-gray-800">{score}/{total} questions</p>
                </div>
                <div className="text-right">
                  <div className="text-5xl font-bold text-gray-800">{percentage}%</div>
                  {percentage >= 70 ? (
                    <p className="text-green-500 font-medium">Excellent!</p>
                  ) : percentage >= 50 ? (
                    <p className="text-yellow-500 font-medium">Bien joué!</p>
                  ) : (
                    <p className="text-red-500 font-medium">Continue d'essayer!</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-4">Révision des questions</h2>
          
            {questions.map((question , index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <div 
                  className={`flex justify-between items-center p-4 cursor-pointer ${
                    userAnswers[index] === question.correct_answer 
                      ? 'bg-white-50 border-l-4 border-yellow-500' 
                      : 'bg-white-50 border-l-4 border-yellow-500'
                  }`}
                  onClick={() => toggleQuestion(index)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      userAnswers[index] === question.correct_answer 
                        ? 'bg-green-100 text-b-600' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {userAnswers[index] === question.correct_answer 
                        ? <Check className="w-5 h-5" /> 
                        : <X className="w-5 h-5" />
                      }
                    </div>
                    <div className="font-medium">Question {index + 1}</div>
                  </div>
                  {expandedQuestion === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {expandedQuestion === index && (
                  <div className="p-4 bg-white border-t border-gray-200">
                    <p className="font-medium text-gray-800 mb-4">
                      {decodeURIComponent(question.question)}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      {[...question.incorrect_answers, question.correct_answer]
                        .sort()
                        .map((answer, aIndex) => (
                          <div 
                            key={aIndex} 
                            className={`p-3 rounded-lg flex items-center ${
                              answer === question.correct_answer
                                ? 'bg-green-100 border border-green-300'
                                : answer === userAnswers[index]
                                  ? 'bg-red-100 border border-red-300'
                                  : 'bg-gray-50 border border-gray-200'
                            }`}
                          >
                            {answer === question.correct_answer && (
                              <Check className="w-5 h-5 text-green-600 mr-2 flex-shrink-0" />
                            )}
                            {answer === userAnswers[index] && answer !== question.correct_answer && (
                              <X className="w-5 h-5 text-red-600 mr-2 flex-shrink-0" />
                            )}
                            <span>{decodeURIComponent(answer)}</span>
                          </div>
                        ))
                      }
                    </div>
                    
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-1">Explication:</p>
                      <p>La bonne réponse est: {decodeURIComponent(question.correct_answer)}</p>
                      {userAnswers[index] !== question.correct_answer && (
                        <p className="mt-1">Vous avez répondu: {decodeURIComponent(userAnswers[index])}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={handlePlayAgain}
              className="flex items-center justify-center py-3 px-4 rounded-xl shadow-sm text-white bg-yellow-600 hover:bg-yellow-200 transition-colors font-medium"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Rejouer
            </button>
            <button
              onClick={handleHome}
              className="flex items-center justify-center py-3 px-4 rounded-xl shadow-sm text-white bg-yellow-600 hover:bg-yellow-100 border border-indigo-200 transition-colors font-medium"
            >
              <Home className="w-5 h-5 mr-2" />
              Accueil
            </button>
          </div>
        </div>
      </div>
  );
}