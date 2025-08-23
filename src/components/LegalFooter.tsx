import React from 'react';

const LegalFooter: React.FC = () => {
  return (
    <footer className="w-full text-center mt-8 p-4 border-t border-gray-700">
      <p className="text-xs text-gray-500">
        Nota Legale: Questa applicazione è un progetto dimostrativo. Tutti i dati inseriti vengono salvati esclusivamente nel `localStorage` del tuo browser. Nessun dato viene raccolto, inviato o memorizzato su server remoti. L'utilizzo di questa applicazione è a tuo rischio.
      </p>
    </footer>
  );
};

export default LegalFooter;
