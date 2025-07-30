import React, { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

interface InputFieldProps {
  secretCode: string;
  caseSensitive: boolean;
  onSuccess: () => void;
  onError: () => void;
}

const InputField: React.FC<InputFieldProps> = ({ secretCode, caseSensitive, onSuccess, onError }) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmitClick = () => {
    const finalInput = caseSensitive ? input : input.toLowerCase();
    const finalSecretCode = caseSensitive ? secretCode : secretCode.toLowerCase();

    if (finalInput === finalSecretCode) {
      onSuccess();
    } else {
      onError();
    }
    setInput('');
  };

  return (
    <div className="d-flex justify-content-center">
      <InputGroup style={{ width: '300px' }}>
        <FormControl placeholder="Inserisci la risposta..." value={input} onChange={handleInputChange} style={{ backgroundColor: 'var(--color-background-light)', color: 'var(--color-text-light)', borderColor: 'var(--color-border)' }} />
        <Button variant="success" onClick={handleSubmitClick} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-dark)', borderColor: 'var(--color-primary)' }}>Invia</Button>
      </InputGroup>
    </div>
  );
};

export default InputField;