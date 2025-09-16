import { useState, useEffect } from 'react';
import { KeyData, GridSize, KeypadType } from '../types';
import Keypad from './Keypad';
import pako from 'pako';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Assicurati che il buffer sia disponibile globalmente
window.Buffer = window.Buffer || Buffer;

interface QuizState {
  keys: KeyData[];
  gridSize: GridSize;
  keypadType: KeypadType;
  backgroundImage: string | null;
  quizTitle: string;
  quizQuestion: string;
  correctAnswer: string;
  correctMessage: string;
  incorrectMessage: string;
}

const QuizViewer = () => {
  const [quizState, setQuizState] = useState<QuizState | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const data = urlParams.get('data');
      if (data) {
        const compressed = Buffer.from(data, 'base64url');
        const jsonString = pako.inflate(compressed, { to: 'string' });
        const state = JSON.parse(jsonString);
        setQuizState(state);
      } else {
        setFeedback('Dati del quiz non trovati.');
      }
    } catch (error) {
      console.error("Errore durante la decodifica del quiz:", error);
      setFeedback('Impossibile caricare il quiz. Il link potrebbe essere corrotto.');
    }
  }, []);

  const handleKeypadInput = (label: string) => {
    if (feedback) setFeedback(''); // Pulisce il feedback al nuovo input

    if (label === 'Canc') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (label === 'Spazio') {
      setUserAnswer(prev => prev + ' ');
    } else {
      setUserAnswer(prev => prev + label);
    }
  };

  const handleConfirm = () => {
    if (!quizState) return;
    if (userAnswer === quizState.correctAnswer) {
      setFeedback(quizState.correctMessage);
    } else {
      setFeedback(quizState.incorrectMessage);
    }
  };

  if (!quizState) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4 font-sans">
        <h1 className="text-3xl font-bold text-red-500">{feedback || 'Caricamento Quiz...'}</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 font-sans">
      <main className="w-full max-w-4xl flex flex-col gap-4">
        <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 text-center">
          <h1 className="text-4xl font-bold text-cyan-400">{quizState.quizTitle}</h1>
          <p className="mt-2 text-lg text-gray-300">{quizState.quizQuestion}</p>
        </div>

        {/* Display risposta utente */}
        <div className="p-3 bg-gray-700 rounded-lg text-center">
          <p className="text-2xl font-mono tracking-widest h-8">{userAnswer || '_'}</p>
        </div>

        <div className="w-full h-full" style={{ backgroundImage: `url(${quizState.backgroundImage || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <Keypad 
            keys={quizState.keys} 
            gridSize={quizState.gridSize} 
            handleKeyClick={() => {}} // In sola lettura, non fa nulla
            keypadType={quizState.keypadType}
            handleKeypadInput={handleKeypadInput}
          />
        </div>

        {/* Pulsante di Conferma */}
        <button 
          onClick={handleConfirm}
          className="w-full py-3 mt-4 text-xl font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors shadow-lg"
        >
          Conferma Risposta
        </button>

        {/* Area Feedback */}
        {feedback && (
          <div className={`mt-4 p-4 rounded-lg text-center text-xl font-bold ${feedback === quizState.correctMessage ? 'bg-green-500' : 'bg-red-500'}`}>
            {feedback}
          </div>
        )}
      </main>
    </div>
  );
};

export default QuizViewer;
