import React from 'react';
import { Form, Card, Accordion } from 'react-bootstrap';
import { KeypadConfig } from '../App';

interface ControlsProps {
  config: KeypadConfig;
  setConfig: React.Dispatch<React.SetStateAction<KeypadConfig>>;
}

const Controls: React.FC<ControlsProps> = ({ config, setConfig }) => {

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === 'string') {
          setConfig({ ...config, background: `url(${event.target.result})` });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Personalizza il Tastierino</Card.Header>
      <Card.Body>
        <Accordion defaultActiveKey="0" alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Impostazioni Generali</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label>Tipo di Tastierino</Form.Label>
                <Form.Select value={config.keypadType} onChange={(e) => setConfig({ ...config, keypadType: e.target.value as any })}>
                  <option value="alphanumeric">Alfanumerico</option>
                  <option value="numeric">Numerico</option>
                  <option value="codebar">Barra per codice</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Testo Superiore</Form.Label>
                <Form.Control type="text" value={config.textAbove} onChange={(e) => setConfig({ ...config, textAbove: e.target.value })} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Testo Inferiore</Form.Label>
                <Form.Control type="text" value={config.textBelow} onChange={(e) => setConfig({ ...config, textBelow: e.target.value })} />
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1">
            <Accordion.Header>Stile e Aspetto</Accordion.Header>
            <Accordion.Body>
              <Form.Group className="mb-3">
                <Form.Label>Sfondo Predefinito</Form.Label>
                <Form.Select onChange={(e) => setConfig({ ...config, background: e.target.value })}>
                  <option value="#ffffff">Bianco</option>
                  <option value="#f0f0f0">Grigio Chiaro</option>
                  <option value="#333333">Nero</option>
                  <option value="linear-gradient(to right, #ff8c00, #ffa500)">Gradiente Arancione</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Carica Sfondo Personalizzato</Form.Label>
                <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Font</Form.Label>
                <Form.Select value={config.font} onChange={(e) => setConfig({ ...config, font: e.target.value })}>
                  <option>Arial</option>
                  <option>Courier New</option>
                  <option>Times New Roman</option>
                  <option>Verdana</option>
                  <option>Georgia</option>
                </Form.Select>
              </Form.Group>
            </Accordion.Body>
          </Accordion.Item>

          {config.keypadType === 'codebar' && (
            <Accordion.Item eventKey="2">
              <Accordion.Header>Impostazioni Codice</Accordion.Header>
              <Accordion.Body>
                <Form.Check 
                  type="switch"
                  id="case-sensitive-switch"
                  label="Codice sensibile a maiuscole/minuscole"
                  checked={config.isCaseSensitive}
                  onChange={(e) => setConfig({ ...config, isCaseSensitive: e.target.checked })}
                />
                <hr />
                <Form.Group className="mb-3">
                  <Form.Label>Colore Messaggio di Successo</Form.Label>
                  <Form.Control type="color" value={config.successMessageColor} onChange={(e) => setConfig({ ...config, successMessageColor: e.target.value })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Dimensione Messaggio (px)</Form.Label>
                  <Form.Control type="number" value={config.successMessageSize} onChange={(e) => setConfig({ ...config, successMessageSize: parseInt(e.target.value) })} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Colore Messaggio di Errore</Form.Label>
                  <Form.Control type="color" value={config.errorMessageColor} onChange={(e) => setConfig({ ...config, errorMessageColor: e.target.value })} />
                </Form.Group>
                 <Form.Group className="mb-3">
                  <Form.Label>Dimensione Messaggio (px)</Form.Label>
                  <Form.Control type="number" value={config.errorMessageSize} onChange={(e) => setConfig({ ...config, errorMessageSize: parseInt(e.target.value) })} />
                </Form.Group>
              </Accordion.Body>
            </Accordion.Item>
          )}
        </Accordion>
      </Card.Body>
    </Card>
  );
};

export default Controls;