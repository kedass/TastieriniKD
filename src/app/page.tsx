'use client';

import KeypadPreview from '@/components/KeypadPreview';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

export default function Home() {
  const [keypadType, setKeypadType] = useState('Numerico');
  const [question, setQuestion] = useState('');
  const [secretCode, setSecretCode] = useState('');
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [font, setFont] = useState('Arial');
  const [keypadSize, setKeypadSize] = useState(100);
  const [background, setBackground] = useState('Sfondo 1'); // Può essere un URL o un Data URL
  const [successMessage, setSuccessMessage] = useState('Corretto!');
  const [successColor, setSuccessColor] = useState('#00ff00');
  const [errorMessage, setErrorMessage] = useState('Errato, riprova.');
  const [errorColor, setErrorColor] = useState('#ff0000');
  const [transparentBg, setTransparentBg] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackground(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateLink = () => {
    const params = new URLSearchParams();
    params.append('keypadType', keypadType);
    params.append('question', question);
    params.append('secretCode', secretCode);
    params.append('caseSensitive', String(caseSensitive));
    params.append('font', font);
    params.append('keypadSize', String(keypadSize));
    params.append('background', background);
    params.append('successMessage', successMessage);
    params.append('successColor', successColor);
    params.append('errorMessage', errorMessage);
    params.append('errorColor', errorColor);
    params.append('transparentBg', String(transparentBg));

    const link = `${window.location.origin}/keypad?${params.toString()}`;
    setGeneratedLink(link);
  };
  return (
    <Container fluid className="p-4" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Row>
        <Col md={4}>
          <h2 style={{ color: 'var(--foreground)' }}>Personalizza il tuo Tastierino</h2>
          <hr style={{ borderColor: 'var(--foreground)' }} />

          <Form>
            {/* Tipo di Tastierino */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Tipo di Tastierino</Form.Label>
              <Form.Select value={keypadType} onChange={(e) => setKeypadType(e.target.value)}>
                <option>Numerico</option>
                <option>Alfanumerico</option>
                <option>Barra di inserimento</option>
              </Form.Select>
            </Form.Group>

            {/* Domanda (opzionale) */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Domanda (opzionale)</Form.Label>
              <Form.Control type="text" placeholder="Es: Qual è la parola segreta?" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </Form.Group>

            {/* Codice Segreto */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Codice Segreto</Form.Label>
              <Form.Control type="text" placeholder="Inserisci la risposta corretta" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} />
            </Form.Group>

            {/* Sensibile alle maiuscole/minuscole */}
            {keypadType === 'Barra di inserimento' && (
              <Form.Group className="mb-3">
                <Form.Check type="switch" label="Sensibile alle maiuscole/minuscole" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} style={{ color: 'var(--foreground)' }} />
              </Form.Group>
            )}

            <hr style={{ borderColor: 'var(--foreground)' }} />

            <h4 style={{ color: 'var(--foreground)' }}>Stile</h4>

            {/* Font */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Font</Form.Label>
              <Form.Select value={font} onChange={(e) => setFont(e.target.value)}>
                <option>Arial</option>
                <option>Courier New</option>
                <option>Times New Roman</option>
              </Form.Select>
            </Form.Group>

            {/* Dimensioni Tastierino */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Dimensioni Tastierino</Form.Label>
              <Form.Range value={keypadSize} onChange={(e) => setKeypadSize(parseInt(e.target.value))} />
            </Form.Group>

            {/* Sfondo */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Sfondo</Form.Label>
              <Form.Select value={background} onChange={(e) => setBackground(e.target.value)}>
                <option value="Sfondo 1">Sfondo 1</option>
                <option value="Sfondo 2">Sfondo 2</option>
                <option value="Carica immagine">Carica immagine</option>
              </Form.Select>
              {background === 'Carica immagine' && (
                <Form.Control type="file" className="mt-2" onChange={handleImageUpload} accept="image/*" />
              )}
            </Form.Group>

            <hr style={{ borderColor: 'var(--foreground)' }} />

            <h4 style={{ color: 'var(--foreground)' }}>Messaggi di Feedback</h4>

            {/* Messaggio di Successo */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Messaggio di Successo</Form.Label>
              <Form.Control type="text" value={successMessage} onChange={(e) => setSuccessMessage(e.target.value)} />
            </Form.Group>

            {/* Colore Testo Successo */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Colore Testo Successo</Form.Label>
              <Form.Control type="color" value={successColor} onChange={(e) => setSuccessColor(e.target.value)} />
            </Form.Group>

            {/* Messaggio di Errore */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Messaggio di Errore</Form.Label>
              <Form.Control type="text" value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} />
            </Form.Group>

            {/* Colore Testo Errore */}
            <Form.Group className="mb-3">
              <Form.Label style={{ color: 'var(--foreground)' }}>Colore Testo Errore</Form.Label>
              <Form.Control type="color" value={errorColor} onChange={(e) => setErrorColor(e.target.value)} />
            </Form.Group>

            {/* Sfondo Trasparente */}
            <Form.Group className="mb-3">
              <Form.Check type="switch" label="Sfondo messaggio trasparente" checked={transparentBg} onChange={(e) => setTransparentBg(e.target.checked)} style={{ color: 'var(--foreground)' }} />
            </Form.Group>

            <hr style={{ borderColor: 'var(--foreground)' }} />

            <Button variant="primary" onClick={handleGenerateLink} style={{ backgroundColor: 'var(--foreground)', borderColor: 'var(--foreground)' }}>
              Genera Link
            </Button>

            {generatedLink && (
              <div className="mt-3">
                <Form.Label style={{ color: 'var(--foreground)' }}>Link Generato:</Form.Label>
                <Form.Control type="text" value={generatedLink} readOnly />
              </div>
            )}
          </Form>
        </Col>

        <Col md={8}>
          <KeypadPreview 
            keypadType={keypadType} 
            question={question} 
            font={font} 
            secretCode={secretCode}
            caseSensitive={caseSensitive}
            successMessage={successMessage}
            successColor={successColor}
            errorMessage={errorMessage}
            errorColor={errorColor}
            transparentBg={transparentBg}
            keypadSize={keypadSize}
            background={background}
          />
        </Col>
      </Row>
    </Container>
  );
}
}
