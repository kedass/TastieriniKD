import { useState, useEffect } from 'react';
import Keypad from './components/Keypad';
import SettingsPanel from './components/SettingsPanel';
import EditKeyModal from './components/EditKeyModal';
import LegalFooter from './components/LegalFooter';
import { KeyData, GridSize } from './types';
import { saveState, loadState } from './utils/localStorage';

function App() {
  const [keypadType, setKeypadType] = useState<'numeric' | 'alphanumeric' | 'inputBar'>('numeric');
  const [keys, setKeys] = useState<KeyData[]>([]);
  const [gridSize, setGridSize] = useState<GridSize>({ rows: 4, cols: 3 });
  const [selectedKey, setSelectedKey] = useState<KeyData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');

  const generateKeys = (type: 'numeric' | 'alphanumeric' | 'inputBar'): { keys: KeyData[], gridSize: GridSize } => {
    let newKeys: KeyData[] = [];
    let newGridSize: GridSize = { rows: 4, cols: 3 };

    switch (type) {
      case 'numeric':
        newGridSize = { rows: 4, cols: 3 };
        newKeys = Array.from({ length: 12 }, (_, i) => {
          const labels = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
          return { id: i, label: labels[i], color: '#4a5568' };
        });
        break;
      case 'alphanumeric':
        newGridSize = { rows: 5, cols: 10 };
        const alphaLabels = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('');
        newKeys = Array.from({ length: 26 }, (_, i) => ({
          id: i,
          label: alphaLabels[i],
          color: '#4a5568',
        }));
        break;
      case 'inputBar':
        newGridSize = { rows: 5, cols: 11 };
        const inputLabels = [
          '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Canc',
          'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
          'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
          'Z', 'X', 'C', 'V', 'B', 'N', 'M',
          'Spazio'
        ];
        newKeys = inputLabels.map((label, i) => ({
          id: i,
          label: label,
          color: '#4a5568',
        }));
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
    } else {
      const { keys: initialKeys, gridSize: initialGridSize } = generateKeys(keypadType);
      setKeys(initialKeys);
      setGridSize(initialGridSize);
    }
  }, []);

  useEffect(() => {
    const { keys: newKeys, gridSize: newGridSize } = generateKeys(keypadType);
    setKeys(newKeys);
    setGridSize(newGridSize);
    setInputValue(''); // Resetta l'input quando il tipo cambia
  }, [keypadType]);


  useEffect(() => {
    saveState({ keys, gridSize, keypadType, backgroundImage });
  }, [keys, gridSize, keypadType, backgroundImage]);


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
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setBackgroundImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleExport = () => {
    const stateToSave = {
      keys,
      gridSize,
      keypadType,
      backgroundImage,
    };
    const dataStr = JSON.stringify(stateToSave, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'tastierino-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleImport = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result;
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
    };
    reader.readAsDataURL(file);
  };


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
            onExport={handleExport}
            onImport={handleImport}
            onKeypadTypeChange={setKeypadType}
            currentType={keypadType}
          />
        </div>
        <div className="w-full md:w-2/3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
           <Keypad 
              keys={keys} 
              gridSize={gridSize} 
              handleKeyClick={handleKeyClick} 
              keypadType={keypadType}
              inputValue={inputValue}
              handleKeypadInput={handleKeypadInput}
            />
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
