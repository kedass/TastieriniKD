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
  backgroundType: string; /* Nuovo nome per il tipo di sfondo */
  backgroundColor1: string; /* Colore 1 per sfondi */
  backgroundColor2: string; /* Colore 2 per gradienti */
  backgroundImage: string; /* Data URL per immagine */
  questionTransparentBg: boolean; /* Sfondo trasparente per la domanda */
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
  backgroundType,
  backgroundColor1,
  backgroundColor2,
  backgroundImage,
  questionTransparentBg,
  isPreview = true,
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

  const getBackgroundStyle = () => {
    switch (backgroundType) {
      case 'solid':
        return { backgroundColor: backgroundColor1 };
      case 'gradient':
        return { backgroundImage: `linear-gradient(to bottom right, ${backgroundColor1}, ${backgroundColor2})` };
      case 'pattern':
        return {
          backgroundImage: `radial-gradient(circle, ${backgroundColor1} 1px, transparent 1px), radial-gradient(circle, ${backgroundColor1} 1px, ${backgroundColor2} 1px)`,
          backgroundSize: '20px 20px',
        };
      case 'image':
        return { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' };
      default:
        return { backgroundColor: 'var(--color-background-medium)' };
    }
  };

  return (
    <div 
      className="border rounded p-4"
      style={{
        minHeight: '400px',
        fontFamily: font,
        ...getBackgroundStyle(),
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
      
      {question && (
        <p 
          className="text-center p-2 rounded mb-3"
          style={{
            color: 'var(--color-text-dark)',
            backgroundColor: questionTransparentBg ? 'transparent' : 'rgba(255, 255, 255, 0.7)',
            padding: '8px 12px', /* Aumenta padding */
            borderRadius: '4px', /* Bordi arrotondati */
            display: 'inline-block', /* Per adattarsi al contenuto */
            margin: '0 auto 1rem auto', /* Centra e aggiunge margine */
          }}
        >
          {question}
        </p>
      )}

      {feedback.message && (
        <div 
          className="text-center p-2 rounded mb-3"
          style={{
            color: feedback.color,
            backgroundColor: transparentBg ? 'transparent' : 'rgba(255, 255, 255, 0.7)',
            padding: '8px 12px', /* Aumenta padding */
            borderRadius: '4px', /* Bordi arrotondati */
            display: 'inline-block', /* Per adattarsi al contenuto */
            margin: '0 auto 1rem auto', /* Centra e aggiunge margine */
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