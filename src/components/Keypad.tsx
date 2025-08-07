import React, { useState } from 'react';
import { KeypadConfig } from '../App';
import './Keypad.css';

interface KeypadProps {
  config: KeypadConfig;
}

const Keypad: React.FC<KeypadProps> = ({ config }) => {
  const [inputValue, setInputValue] = useState('');
  const [message, setMessage] = useState<{text: string, type: 'success' | 'error'} | null>(null);

  const handleKeyPress = (key: string) => {
    if (key === 'Spazio') {
      setInputValue(inputValue + ' ');
    } else {
      setInputValue(inputValue + key);
    }
  };

  const renderKeys = () => {
    let keys: string[] = [];
    if (config.keypadType === 'numeric') {
      keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Spazio'];
    } else if (config.keypadType === 'alphanumeric') {
      keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
      keys.push('Spazio');
    }

    return keys.map(key => (
      <button key={key} onClick={() => handleKeyPress(key)} className={`keypad-key ${key === 'Spazio' ? 'space' : ''}`}>
        {key}
      </button>
    ));
  };

  const keypadStyle = {
    fontFamily: config.font,
    background: config.background,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const messageStyle = {
    color: message?.type === 'success' ? config.successMessageColor : config.errorMessageColor,
    fontSize: `${message?.type === 'success' ? config.successMessageSize : config.errorMessageSize}px`,
  };

  return (
    <div className="keypad-container" style={keypadStyle}>
      <p style={{ fontFamily: config.font }}>{config.textAbove}</p>
      
      {config.keypadType !== 'codebar' ? (
        <>
          <div className="keypad-display">{inputValue}</div>
          <div className={`keypad-grid ${config.keypadType}`}>{renderKeys()}</div>
        </>
      ) : (
        <input 
          type="text" 
          className="code-bar-input"
          placeholder="Inserisci il codice..."
          style={{ fontFamily: config.font }}
        />
      )}

      <p style={{ fontFamily: config.font }}>{config.textBelow}</p>

      {message && <p className="message" style={messageStyle}>{message.text}</p>}
    </div>
  );
};

export default Keypad;