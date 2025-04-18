import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain } from 'lucide-react';

export default function Welcome() {
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedName = localStorage.getItem('playerName');
    if (savedName) {
      setPlayerName(savedName);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim()) {
      setError('Please enter your name to continue');
      return;
    }
    localStorage.setItem('playerName', playerName);
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-yellow-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center mb-8">
          <Brain className="w-16 h-16 text-blue-600 mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">Welcome to Trivia Quiz</h1>
          <p className="text-gray-600 mt-2 text-center">Test your knowledge with our interactive quiz!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="mt-1 block w-full rounded-md border-yellow-300 shadow-sm focus:border-yellow-100 focus:ring-yellow-100 p-2 border"
              placeholder="Enter your name"
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
          >
            Start Quiz
          </button>
        </form>
      </div>
    </div>
  );
}