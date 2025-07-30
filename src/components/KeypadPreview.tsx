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
            case 'Orange Grid':
              return 'linear-gradient(to right, var(--color-primary) 1px, transparent 1px), linear-gradient(to bottom, var(--color-primary) 1px, transparent 1px)';
            case 'Diagonal Stripes':
              return 'linear-gradient(45deg, var(--color-primary) 25%, transparent 25%, transparent 75%, var(--color-primary) 75%, var(--color-primary)), linear-gradient(45deg, var(--color-primary) 25%, transparent 25%, transparent 75%, var(--color-primary) 75%, var(--color-primary))';
            default:
              return '';
          }
        })(),
        backgroundSize: (() => {
          switch (background) {
            case 'Pattern Dots':
              return '20px 20px';
            case 'Orange Grid':
              return '20px 20px';
            case 'Diagonal Stripes':
              return '20px 20px';
            default:
              return 'cover';
          }
        })(),
        backgroundPosition: 'center',
        backgroundColor: background.startsWith('data:image') ? 'transparent' : (background === 'Sfondo Grigio Chiaro' ? 'var(--color-background-light)' : (background === 'Sfondo Grigio Scuro' ? 'var(--color-background-medium)' : 'var(--color-background-dark)')),
        transform: `scale(${keypadSize / 100})`,
        transformOrigin: 'top left',
        position: 'relative', /* Aggiunto per posizionare il watermark */
      }}
    >
      {/* Watermark TastieriniKD */}
      <div 
        style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          fontSize: '0.8em',
          color: 'rgba(255, 140, 0, 0.3)', /* Arancione semitrasparente */
          pointerEvents: 'none', /* Non interferisce con i click */
          zIndex: 100, /* Assicura che sia sopra gli altri elementi */
        }}
      >
        TastieriniKD
      </div>

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