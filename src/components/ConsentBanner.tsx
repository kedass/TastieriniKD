'use client';

import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Link from 'next/link';

const ConsentBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consentGiven = localStorage.getItem('legal_consent_given');
    if (!consentGiven) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('legal_consent_given', 'true');
    setShow(false);
  };

  return (
    <Modal show={show} backdrop="static" keyboard={false} centered contentClassName="bg-dark text-light border-primary">
      <Modal.Header className="border-bottom border-primary">
        <Modal.Title className="text-primary">Informativa Legale</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Questo sito utilizza cookie e raccoglie dati per migliorare la tua esperienza. Per continuare, devi accettare le nostre politiche.</p>
        <p>Puoi leggere le nostre informative qui:</p>
        <ul>
          <li><Link href="/legal/privacy" onClick={() => setShow(false)} className="text-primary">Privacy Policy</Link></li>
          <li><Link href="/legal/terms" onClick={() => setShow(false)} className="text-primary">Termini di Servizio</Link></li>
          <li><Link href="/legal/cookies" onClick={() => setShow(false)} className="text-primary">Cookie Policy</Link></li>
        </ul>
      </Modal.Body>
      <Modal.Footer className="border-top border-primary">
        <Button variant="primary" onClick={handleAccept}>
          Accetto
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConsentBanner;
