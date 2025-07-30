import React, { useState } from 'react';
import { Button, Row, Col } from 'react-bootstrap';

interface NumericKeypadProps {
  secretCode: string;
  onSuccess: () => void;
  onError: () => void;
}

const NumericKeypad: React.FC<NumericKeypadProps> = ({ secretCode, onSuccess, onError }) => {
  const [input, setInput] = useState('');
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  const handleNumberClick = (number: string) => {
    setInput(input + number);
  };

  const handleClearClick = () => {
    setInput('');
  };

  const handleOkClick = () => {
    if (input === secretCode) {
      onSuccess();
    } else {
      onError();
    }
    setInput('');
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-3" style={{ width: '200px' }}>
        <input type="text" className="form-control text-center" value={input} readOnly style={{ backgroundColor: 'var(--color-background-light)', color: 'var(--color-text-light)', borderColor: 'var(--color-primary)' }} />
      </div>
      <Row className="g-2" style={{ width: '200px' }}>
        {numbers.map((number) => (
          <Col key={number} xs={4}>
            <Button variant="light" className="w-100" onClick={() => handleNumberClick(number)} style={{ backgroundColor: 'var(--color-background-light)', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}>
              {number}
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

export default NumericKeypad;