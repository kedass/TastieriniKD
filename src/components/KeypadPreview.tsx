import React, { useState } from 'react';
import InputField from './InputField';
import AlphanumericKeypad from './AlphanumericKeypad';
import NumericKeypad from './NumericKeypad';

interface KeypadPreviewProps {
  isPreview?: boolean;
  keypadType: string;
  question: string;
  font: string;
  secretCode: string;
  caseSensitive: boolean;
  successMessage: string;
  successColor: string;
  errorMessage: string;
  errorColor: string;
  transparentBg: boolean;
  keypadSize: number;
  background: string;
}

const KeypadPreview: React.FC<KeypadPreviewProps> = ({ 
  keypadType, 
  question, 
  font, 
  secretCode, 
  caseSensitive, 
  successMessage, 
  successColor, 
  errorMessage, 
  errorColor, 
  transparentBg, 
  keypadSize, 
  background, 
  isPreview = true
}) => {
  const [feedback, setFeedback] = useState({ message: '', color: '' });

  const handleSuccess = () => {
    setFeedback({ message: successMessage, color: successColor });
    setTimeout(() => setFeedback({ message: '', color: '' }), 2000);
  };

  const handleError = () => {
    setFeedback({ message: errorMessage, color: errorColor });
    setTimeout(() => setFeedback({ message: '', color: '' }), 2000);
  };

  return (
    <div 
      className="border rounded p-4"
      style={{
        minHeight: '400px',
        fontFamily: font,
        backgroundImage: (() => {
          if (background.startsWith('data:image')) return `url(${background})`;
          switch (background) {
            case 'Gradient Orange Black':
              return 'linear-gradient(to right, var(--color-primary), var(--color-background-dark))';
            case 'Gradient Radial':
              return 'radial-gradient(circle, var(--color-primary), var(--color-background-dark))';
            case 'Pattern Dots':
              return 'radial-gradient(circle, var(--color-primary) 1px, transparent 1px), radial-gradient(circle, var(--color-primary) 1px, var(--color-background-dark) 1px)';
            default:
              return '';
          }
        })(),
        backgroundSize: background === 'Pattern Dots' ? '20px 20px' : 'cover',
        backgroundPosition: 'center',
        backgroundColor: background.startsWith('data:image') ? 'transparent' : (background === 'Sfondo Grigio Chiaro' ? '#f0f0f0' : (background === 'Sfondo Grigio Scuro' ? '#e0e0e0' : 'var(--color-background-dark)')),
        transform: `scale(${keypadSize / 100})`,
        transformOrigin: 'top left',
      }}
    >
      {isPreview && <h3 style={{ color: 'var(--color-primary)' }}>Anteprima</h3>}
      
      {question && <p className="text-center" style={{ color: 'var(--color-text-light)' }}>{question}</p>}

      {feedback.message && (
        <div 
          className="text-center p-2 rounded mb-3"
          style={{
            color: feedback.color,
            backgroundColor: transparentBg ? 'transparent' : 'rgba(0, 0, 0, 0.5)'
          }}
        >
          {feedback.message}
        </div>
      )}

      {keypadType === 'Numerico' && <NumericKeypad secretCode={secretCode} onSuccess={handleSuccess} onError={handleError} />}
      {keypadType === 'Alfanumerico' && <AlphanumericKeypad secretCode={secretCode} caseSensitive={caseSensitive} onSuccess={handleSuccess} onError={handleError} />}
      {keypadType === 'Barra di inserimento' && <InputField secretCode={secretCode} caseSensitive={caseSensitive} onSuccess={handleSuccess} onError={handleError} />}
    </div>
  );
};

export default KeypadPreview;