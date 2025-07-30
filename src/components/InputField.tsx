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
        <FormControl placeholder="Inserisci la risposta..." value={input} onChange={handleInputChange} style={{ backgroundColor: '#333', color: '#ff8c00', borderColor: '#555' }} />
        <Button variant="success" onClick={handleSubmitClick} style={{ backgroundColor: '#ff8c00', color: '#333', borderColor: '#ff8c00' }}>Invia</Button>
      </InputGroup>
    </div>
  );
};

export default InputField;