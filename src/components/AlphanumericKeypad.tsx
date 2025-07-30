import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

interface AlphanumericKeypadProps {
  secretCode: string;
  caseSensitive: boolean;
  onSuccess: () => void;
  onError: () => void;
}

const AlphanumericKeypad: React.FC<AlphanumericKeypadProps> = ({ secretCode, caseSensitive, onSuccess, onError }) => {
  const [input, setInput] = useState('');
  const keys = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
    ' '
  ];

  const handleKeyClick = (key: string) => {
    setInput(input + key);
  };

  const handleClearClick = () => {
    setInput('');
  };

  const handleOkClick = () => {
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
    <div className="d-flex flex-column align-items-center">
      <div className="mb-3" style={{ width: '300px' }}>
        <input type="text" className="form-control text-center" value={input} readOnly style={{ backgroundColor: 'var(--color-background-light)', color: 'var(--color-text-light)', borderColor: 'var(--color-primary)' }} />
      </div>
      <Row className="g-2" style={{ width: '300px' }}>
        {keys.map((key) => (
          <Col key={key} xs={2}>
            <Button variant="light" className="w-100" onClick={() => handleKeyClick(key)} style={{ backgroundColor: 'var(--color-background-light)', color: 'var(--color-text-light)', borderColor: 'var(--color-border)' }}>
              {key === ' ' ? 'Spazio' : key}
            </Button>
          </Col>
        ))}
        <Col xs={4}>
          <Button variant="warning" className="w-100" onClick={handleClearClick} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-dark)', borderColor: 'var(--color-primary)' }}>
            Canc
          </Button>
        </Col>
        <Col xs={4}>
          <Button variant="success" className="w-100" onClick={handleOkClick} style={{ backgroundColor: 'var(--color-primary)', color: 'var(--color-text-dark)', borderColor: 'var(--color-primary)' }}>
            OK
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default AlphanumericKeypad;