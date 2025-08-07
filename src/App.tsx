import React, { useState } from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Controls from './components/Controls';
import Keypad from './components/Keypad';
import Legal from './components/Legal';
import './App.css';

export interface KeypadConfig {
  keypadType: 'alphanumeric' | 'numeric' | 'codebar';
  textAbove: string;
  textBelow: string;
  font: string;
  background: string;
  isCaseSensitive: boolean;
  successMessageColor: string;
  successMessageSize: number;
  errorMessageColor: string;
  errorMessageSize: number;
}

function App() {
  const [activePage, setActivePage] = useState('home');
  const [config, setConfig] = useState<KeypadConfig>({
    keypadType: 'alphanumeric',
    textAbove: 'Inserisci il codice',
    textBelow: '',
    font: 'Arial',
    background: '#ffffff', // Sfondo bianco di default
    isCaseSensitive: false,
    successMessageColor: '#28a745',
    successMessageSize: 16,
    errorMessageColor: '#dc3545',
    errorMessageSize: 16,
  });

  const renderPage = () => {
    if (activePage === 'legal') {
      return <Legal />;
    }
    return (
      <Row>
        <Col md={4} className="controls-section">
          <Controls config={config} setConfig={setConfig} />
        </Col>
        <Col md={8} className="keypad-section">
          <Keypad config={config} />
        </Col>
      </Row>
    );
  };

  return (
    <div className="App">
      <header className="bg-dark text-white p-3 mb-4">
        <Container className="d-flex justify-content-between align-items-center">
          <h1 className="m-0" style={{ color: '#FF8C00' }}>Tastierini KD</h1>
          <Nav>
            <Nav.Link onClick={() => setActivePage('home')} style={{ color: 'white' }}>Home</Nav.Link>
            <Nav.Link onClick={() => setActivePage('legal')} style={{ color: 'white' }}>Note Legali</Nav.Link>
          </Nav>
        </Container>
      </header>
      <Container fluid>
        {renderPage()}
      </Container>
    </div>
  );
}

export default App;