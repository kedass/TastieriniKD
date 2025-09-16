import { useState, useEffect } from 'react';
import Keypad from './components/Keypad';
import SettingsPanel from './components/SettingsPanel';
import EditKeyModal from './components/EditKeyModal';
import LegalFooter from './components/LegalFooter';
import QuizViewer from './components/QuizViewer';
import { KeyData, GridSize, KeypadType } from './types';
import { saveState, loadState } from './utils/localStorage';
import pako from 'pako';
import { Buffer } from 'buffer';

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

// Polyfill per il buffer in ambiente browser
window.Buffer = window.Buffer || Buffer;

const App = () => {
  const isViewMode = window.location.pathname === '/view';

  // State Principale
  const [keypadType, setKeypadType] = useState<KeypadType>('numeric');
  const [keys, setKeys] = useState<KeyData[]>([]);
  const [gridSize, setGridSize] = useState<GridSize>({ rows: 4, cols: 3 });
  const [selectedKey, setSelectedKey] = useState<KeyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  // State per il Quiz
  const [quizTitle, setQuizTitle] = useState('Titolo del Quiz');
  const [quizQuestion, setQuizQuestion] = useState('Scrivi qui la tua domanda');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [correctMessage, setCorrectMessage] = useState('Risposta Corretta!');
  const [incorrectMessage, setIncorrectMessage] = useState('Risposta Errata, riprova.');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateKeys = (type: KeypadType): { keys: KeyData[], gridSize: GridSize } => {
    let newKeys: KeyData[] = [];
    let newGridSize: GridSize = { rows: 4, cols: 3 };

    switch (type) {
      case 'numeric':
        newGridSize = { rows: 4, cols: 3 };
        const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '', '0', 'Canc'];
        newKeys = labels.map((label, i) => ({
          id: i, 
          label: label, 
          color: label === 'Canc' ? '#a0aec0' : '#4a5568' 
        }));
        break;
      case 'alphanumeric':
        newGridSize = { rows: 5, cols: 10 };
        const numLabels = '1234567890';
        const alphaLabels = 'QWERTYUIOPASDFGHJKLZXCVBNM';
        const specialKeys = ['Canc'];
        const combinedLabels = [...numLabels.split(''), ...alphaLabels.split(''), ...specialKeys];
        newKeys = combinedLabels.map((label, i) => ({
          id: i,
          label: label,
          color: label === 'Canc' ? '#a0aec0' : '#4a5568',
        }));
        break;
      case 'inputBar':
        newGridSize = { rows: 5, cols: 11 };
        const inputLabels: (Omit<KeyData, 'id'>)[] = [
          { label: '1', color: '#4a5568' }, { label: '2', color: '#4a5568' }, { label: '3', color: '#4a5568' },
          { label: '4', color: '#4a5568' }, { label: '5', color: '#4a5568' }, { label: '6', color: '#4a5568' },
          { label: '7', color: '#4a5568' }, { label: '8', color: '#4a5568' }, { label: '9', color: '#4a5568' },
          { label: '0', color: '#4a5568' }, { label: 'Canc', color: '#a0aec0', colSpan: 1 },
          { label: 'Q', color: '#4a5568' }, { label: 'W', color: '#4a5568' }, { label: 'E', color: '#4a5568' },
          { label: 'R', color: '#4a5568' }, { label: 'T', color: '#4a5568' }, { label: 'Y', color: '#4a5568' },
          { label: 'U', color: '#4a5568' }, { label: 'I', color: '#4a5568' }, { label: 'O', color: '#4a5568' },
          { label: 'P', color: '#4a5568' }, { label: '' , color: 'transparent', colSpan: 1},
          { label: 'A', color: '#4a5568' }, { label: 'S', color: '#4a5568' }, { label: 'D', color: '#4a5568' },
          { label: 'F', color: '#4a5568' }, { label: 'G', color: '#4a5568' }, { label: 'H', color: '#4a5568' },
          { label: 'J', color: '#4a5568' }, { label: 'K', color: '#4a5568' }, { label: 'L', color: '#4a5568' },
          { label: '' , color: 'transparent', colSpan: 2},
          { label: 'Z', color: '#4a5568' }, { label: 'X', color: '#4a5568' }, { label: 'C', color: '#4a5568' },
          { label: 'V', color: '#4a5568' }, { label: 'B', color: '#4a5568' }, { label: 'N', color: '#4a5568' },
          { label: 'M', color: '#4a5568' }, { label: '' , color: 'transparent', colSpan: 4},
          { label: 'Spazio', color: '#718096', colSpan: 11 },
        ];
        newKeys = inputLabels.map((key, i) => ({ ...key, id: i }));
        break;
      case 'custom':
        break;
    }
    return { keys: newKeys, gridSize: newGridSize };
  };

  useEffect(() => {
    const loadedState = loadState();
    if (loadedState) {
      setKeys(loadedState.keys);
      setGridSize(loadedState.gridSize);
      setKeypadType(loadedState.keypadType || 'numeric');
      setBackgroundImage(loadedState.backgroundImage || null);
      setQuizTitle(loadedState.quizTitle || 'Titolo del Quiz');
      setQuizQuestion(loadedState.quizQuestion || 'Scrivi qui la tua domanda');
      setCorrectAnswer(loadedState.correctAnswer || '');
      setCorrectMessage(loadedState.correctMessage || 'Risposta Corretta!');
      setIncorrectMessage(loadedState.incorrectMessage || 'Risposta Errata, riprova.');
    } else {
      const { keys: initialKeys, gridSize: initialGridSize } = generateKeys(keypadType);
      setKeys(initialKeys);
      setGridSize(initialGridSize);
    }
  }, []);

  useEffect(() => {
    if (keypadType !== 'custom') {
      const { keys: newKeys, gridSize: newGridSize } = generateKeys(keypadType);
      setKeys(newKeys);
      setGridSize(newGridSize);
      setInputValue('');
    }
  }, [keypadType]);


  useEffect(() => {
    saveState({ 
      keys, 
      gridSize, 
      keypadType, 
      backgroundImage, 
      quizTitle, 
      quizQuestion, 
      correctAnswer, 
      correctMessage, 
      incorrectMessage 
    });
  }, [keys, gridSize, keypadType, backgroundImage, quizTitle, quizQuestion, correctAnswer, correctMessage, incorrectMessage]);


  const handleKeyClick = (id: number) => {
    const key = keys.find(k => k.id === id);
    if (key) {
      setSelectedKey(key);
      setIsModalOpen(true);
    }
  };

  const handleKeypadInput = (keyLabel: string) => {
    if (keyLabel === 'Canc') {
      setInputValue(prev => prev.slice(0, -1));
    } else if (keyLabel === 'Spazio') {
      setInputValue(prev => prev + ' ');
    } else {
      setInputValue(prev => prev + keyLabel);
    }
  };

  const handleSaveKey = (updatedKey: KeyData) => {
    setKeys(keys.map(k => k.id === updatedKey.id ? updatedKey : k));
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedKey(null);
  };

  const handleGridSizeChange = (rows: number, cols: number) => {
    setGridSize({ rows, cols });
    setKeypadType('custom');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeBackgroundImage = () => {
    setBackgroundImage(null);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result;
        if (typeof text === 'string') {
          const importedState = JSON.parse(text);
          if (importedState.keys && importedState.gridSize) {
            setKeys(importedState.keys);
            setGridSize(importedState.gridSize);
            setKeypadType(importedState.keypadType || 'numeric');
            setBackgroundImage(importedState.backgroundImage || null);
          }
        }
      } catch (error) {
        console.error("Errore durante l'importazione del file JSON:", error);
        alert("Il file importato non è un JSON valido.");
      }
    };
    reader.readAsText(file);
  };

  const handleKeyImageUpload = (file: File, keyId: number) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const newKeys = keys.map(key => {
        if (key.id === keyId) {
          return { ...key, image: reader.result as string };
        }
        return key;
      });
      setKeys(newKeys);
      if (selectedKey && selectedKey.id === keyId) {
        setSelectedKey({ ...selectedKey, image: reader.result as string });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleShare = () => {
    try {
      const stateToSave = {
        keys,
        gridSize,
        keypadType,
        backgroundImage,
        quizTitle,
        quizQuestion,
        correctAnswer,
        correctMessage,
        incorrectMessage
      };
      const jsonString = JSON.stringify(stateToSave);
      const compressed = pako.deflate(jsonString);
      // Converte in Base64 e poi lo rende sicuro per gli URL manualmente
      const encoded = Buffer.from(compressed).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

      const url = `${window.location.origin}/view?data=${encoded}`;
      setGeneratedLink(url);
    } catch (error) {
      console.error("Errore durante la creazione del link:", error);
      alert(`Si è verificato un errore durante la creazione del link. Dettagli: ${error}`);
    }
  };

  if (isViewMode) {
    return <QuizViewer />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4 font-sans">
      <header className="w-full text-center mb-6">
        <h1 className="text-5xl font-bold text-cyan-400">Tastierini KD</h1>
        <p className="text-gray-400">Crea e personalizza il tuo tastierino virtuale</p>
      </header>

      <main className="flex flex-col md:flex-row w-full max-w-7xl gap-8">
        <div className="w-full md:w-1/3">
          <SettingsPanel
            gridSize={gridSize}
            onGridSizeChange={handleGridSizeChange}
            onFileUpload={handleFileUpload}
            onExport={handleShare}
            onImport={handleImport}
            onKeypadTypeChange={setKeypadType}
            currentType={keypadType}
            removeBackgroundImage={removeBackgroundImage}
            hasBackgroundImage={!!backgroundImage}
            quizTitle={quizTitle}
            onQuizTitleChange={setQuizTitle}
            quizQuestion={quizQuestion}
            onQuizQuestionChange={setQuizQuestion}
            correctAnswer={correctAnswer}
            onCorrectAnswerChange={setCorrectAnswer}
            correctMessage={correctMessage}
            onCorrectMessageChange={setCorrectMessage}
            incorrectMessage={incorrectMessage}
            onIncorrectMessageChange={setIncorrectMessage}
            generatedLink={generatedLink}
          />
        </div>
        <div className="w-full md:w-2/3 flex flex-col gap-4">
          <div className="p-4 bg-gray-800 rounded-lg border border-gray-700">
            <input 
              type="text"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              placeholder="Titolo del Quiz"
              className="w-full p-2 text-2xl bg-transparent border-b-2 border-gray-600 focus:border-cyan-500 outline-none text-white placeholder-gray-500"
            />
            <textarea
              value={quizQuestion}
              onChange={(e) => setQuizQuestion(e.target.value)}
              placeholder="Scrivi qui la tua domanda..."
              className="w-full p-2 mt-2 text-md bg-transparent focus:outline-none text-gray-300 placeholder-gray-500 resize-none"
              rows={2}
            />
          </div>

          <div className="w-full h-full" style={{ backgroundImage: `url(${backgroundImage || ''})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
             <Keypad 
                keys={keys} 
                gridSize={gridSize} 
                handleKeyClick={handleKeyClick} 
                keypadType={keypadType}
                inputValue={inputValue}
                handleKeypadInput={handleKeypadInput}
              />
          </div>
        </div>
      </main>
      
      {isModalOpen && selectedKey && (
        <EditKeyModal
          keyData={selectedKey}
          onSave={handleSaveKey}
          onClose={handleCloseModal}
          onKeyImageUpload={handleKeyImageUpload}
        />
      )}

      <LegalFooter />
    </div>
  );
}

export default App;
