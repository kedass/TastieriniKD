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
  const [background, setBackground] = useState('solid'); // Tipo di sfondo
  const [backgroundColor1, setBackgroundColor1] = useState('#FFFFFF'); // Colore 1 per sfondi
  const [backgroundColor2, setBackgroundColor2] = useState('#FF8C00'); // Colore 2 per gradienti
  const [backgroundImage, setBackgroundImage] = useState(''); // Data URL per immagine
  const [questionTransparentBg, setQuestionTransparentBg] = useState(false); // Sfondo trasparente per la domanda
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
        setBackgroundImage(reader.result as string);
        setBackground('image'); // Imposta il tipo su immagine quando si carica
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
    params.append('backgroundType', background);
    params.append('backgroundColor1', backgroundColor1);
    params.append('backgroundColor2', backgroundColor2);
    params.append('backgroundImage', backgroundImage);
    params.append('successMessage', successMessage);
    params.append('successColor', successColor);
    params.append('errorMessage', errorMessage);
    params.append('errorColor', errorColor);
    params.append('transparentBg', String(transparentBg));
    params.append('questionTransparentBg', String(questionTransparentBg));

    const link = `${window.location.origin}/keypad?${params.toString()}`;
    setGeneratedLink(link);
  };
  return (
    <Container fluid className="p-4">
      <Row className="justify-content-center">
        <Col md={4} className="p-4 rounded-lg shadow-lg bg-background-medium">
          <h2>Personalizza il tuo Tastierino</h2>
          <hr />

          <Form>
            {/* Tipo di Tastierino */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo di Tastierino</Form.Label>
              <Form.Select value={keypadType} onChange={(e) => setKeypadType(e.target.value)}>
                <option>Numerico</option>
                <option>Alfanumerico</option>
                <option>Barra di inserimento</option>
              </Form.Select>
            </Form.Group>

            {/* Domanda (opzionale) */}
            <Form.Group className="mb-3">
              <Form.Label>Domanda (opzionale)</Form.Label>
              <Form.Control type="text" placeholder="Es: Qual è la parola segreta?" value={question} onChange={(e) => setQuestion(e.target.value)} />
            </Form.Group>

            {/* Sfondo Trasparente Domanda */}
            <Form.Group className="mb-3">
              <Form.Check type="switch" label="Sfondo trasparente domanda" checked={questionTransparentBg} onChange={(e) => setQuestionTransparentBg(e.target.checked)} />
            </Form.Group>

            {/* Codice Segreto */}
            <Form.Group className="mb-3">
              <Form.Label>Codice Segreto</Form.Label>
              <Form.Control type="text" placeholder="Inserisci la risposta corretta" value={secretCode} onChange={(e) => setSecretCode(e.target.value)} />
            </Form.Group>

            {/* Sensibile alle maiuscole/minuscole */}
            {keypadType === 'Barra di inserimento' && (
              <Form.Group className="mb-3">
                <Form.Check type="switch" label="Sensibile alle maiuscole/minuscole" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} />
              </Form.Group>
            )}

            <hr />

            <h4>Stile</h4>

            {/* Font */}
            <Form.Group className="mb-3">
              <Form.Label>Font</Form.Label>
              <Form.Select value={font} onChange={(e) => setFont(e.target.value)}>
                <option>Arial</option>
                <option>Courier New</option>
                <option>Times New Roman</option>
              </Form.Select>
            </Form.Group>

            {/* Dimensioni Tastierino */}
            <Form.Group className="mb-3">
              <Form.Label>Dimensioni Tastierino</Form.Label>
              <Form.Range value={keypadSize} onChange={(e) => setKeypadSize(parseInt(e.target.value))} />
            </Form.Group>

            {/* Sfondo */}
            <Form.Group className="mb-3">
              <Form.Label>Tipo Sfondo</Form.Label>
              <Form.Select value={background} onChange={(e) => setBackground(e.target.value)}>
                <option value="solid">Tinta Unita</option>
                <option value="gradient">Gradiente</option>
                <option value="pattern">Pattern</option>
                <option value="image">Immagine Personalizzata</option>
              </Form.Select>
            </Form.Group>

            {background === 'solid' && (
              <Form.Group className="mb-3">
                <Form.Label>Colore Sfondo</Form.Label>
                <Form.Control type="color" value={backgroundColor1} onChange={(e) => setBackgroundColor1(e.target.value)} />
              </Form.Group>
            )}

            {background === 'gradient' && (
              <>
                <Form.Group className="mb-3">
                  <Form.Label>Colore Inizio Gradiente</Form.Label>
                  <Form.Control type="color" value={backgroundColor1} onChange={(e) => setBackgroundColor1(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Colore Fine Gradiente</Form.Label>
                  <Form.Control type="color" value={backgroundColor2} onChange={(e) => setBackgroundColor2(e.target.value)} />
                </Form.Group>
              </>
            )}

            {background === 'image' && (
              <Form.Group className="mb-3">
                <Form.Label>Carica Immagine</Form.Label>
                <Form.Control type="file" className="mt-2" onChange={handleImageUpload} accept="image/*" />
              </Form.Group>
            )}

            <hr />

            <h4>Messaggi di Feedback</h4>

            {/* Messaggio di Successo */}
            <Form.Group className="mb-3">
              <Form.Label>Messaggio di Successo</Form.Label>
              <Form.Control type="text" value={successMessage} onChange={(e) => setSuccessMessage(e.target.value)} />
            </Form.Group>

            {/* Colore Testo Successo */}
            <Form.Group className="mb-3">
              <Form.Label>Colore Testo Successo</Form.Label>
              <Form.Control type="color" value={successColor} onChange={(e) => setSuccessColor(e.target.value)} />
            </Form.Group>

            {/* Messaggio di Errore */}
            <Form.Group className="mb-3">
              <Form.Label>Messaggio di Errore</Form.Label>
              <Form.Control type="text" value={errorMessage} onChange={(e) => setErrorMessage(e.target.value)} />
            </Form.Group>

            {/* Colore Testo Errore */}
            <Form.Group className="mb-3">
              <Form.Label>Colore Testo Errore</Form.Label>
              <Form.Control type="color" value={errorColor} onChange={(e) => setErrorColor(e.target.value)} />
            </Form.Group>

            {/* Sfondo Trasparente */}
            <Form.Group className="mb-3">
              <Form.Check type="switch" label="Sfondo messaggio trasparente" checked={transparentBg} onChange={(e) => setTransparentBg(e.target.checked)} />
            </Form.Group>

            <hr />

            <Button variant="primary" onClick={handleGenerateLink}>
              Genera Link
            </Button>

            {generatedLink && (
              <div className="mt-3">
                <Form.Label>Link Generato:</Form.Label>
                <Form.Control type="text" value={generatedLink} readOnly />
              </div>
            )}
          </Form>
        </Col>

        <Col md={8} className="p-4 rounded-lg shadow-lg bg-background-medium">
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
            backgroundType={background}
            backgroundColor1={backgroundColor1}
            backgroundColor2={backgroundColor2}
            backgroundImage={backgroundImage}
            questionTransparentBg={questionTransparentBg}
          />
        </Col>
      </Row>
    </Container>
  );
}
