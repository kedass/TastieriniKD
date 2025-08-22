import React, { useState, useEffect } from "react";
import Keypad from "./components/Keypad";
import SettingsPanel from "./components/SettingsPanel";
import EditKeyModal from "./components/EditKeyModal";

// Define the type for a single key's data
export interface KeyData {
  id: number;
  label: string;
  color: string;
  image?: string;
}

// Define the type for the entire saved state
interface AppState {
  grid: { rows: number; cols: number };
  keys: KeyData[];
  keypadBackground?: string;
}

// --- LocalStorage Utilities ---
const LOCAL_STORAGE_KEY = 'tastierini-kd-state';

const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
  } catch (e) {
    console.warn("Failed to save app state:", e);
  }
};

const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Failed to load app state:", e);
    return undefined;
  }
};
// ------------------------------

const generateKeys = (rows: number, cols: number): KeyData[] => {
  return Array.from({ length: rows * cols }, (_, i) => ({
    id: i,
    label: `Tasto ${i + 1}`,
    color: '#e5e7eb',
  }));
};

function App() {
  const [initialState] = useState(loadState());
  const [grid, setGrid] = useState(initialState?.grid || { rows: 3, cols: 3 });
  const [keys, setKeys] = useState<KeyData[]>(initialState?.keys || generateKeys(grid.rows, grid.cols));
  const [keypadBackground, setKeypadBackground] = useState<string | undefined>(initialState?.keypadBackground);
  const [editingKey, setEditingKey] = useState<KeyData | null>(null);

  // Effect to save state whenever grid, keys, or background change
  useEffect(() => {
    saveState({ grid, keys, keypadBackground });
  }, [grid, keys, keypadBackground]);

  const handleGridChange = (newRows: number, newCols: number) => {
    const newTotal = newRows * newCols;
    const currentTotal = keys.length;
    setGrid({ rows: newRows, cols: newCols });
    if (newTotal > currentTotal) {
      const additionalKeys = Array.from({ length: newTotal - currentTotal }, (_, i) => ({
        id: currentTotal + i,
        label: `Tasto ${currentTotal + i + 1}`,
        color: '#e5e7eb',
      }));
      setKeys(prevKeys => [...prevKeys, ...additionalKeys]);
    } else if (newTotal < currentTotal) {
      setKeys(prevKeys => prevKeys.slice(0, newTotal));
    }
  };

  const handleEditKey = (key: KeyData) => setEditingKey(key);
  const handleCloseModal = () => setEditingKey(null);

  const handleSaveKey = (updatedKey: KeyData) => {
    setKeys(keys.map(k => k.id === updatedKey.id ? updatedKey : k));
    handleCloseModal();
  };

  const handleExport = () => {
    const stateToExport: AppState = { grid, keys, keypadBackground };
    const dataStr = JSON.stringify(stateToExport, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', 'tastierino.json');
    linkElement.click();
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (!event.target.files) return;
    fileReader.readAsText(event.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const result = e.target?.result;
        if (typeof result !== 'string') throw new Error("File could not be read");
        const importedState: AppState = JSON.parse(result);
        if (importedState.grid && importedState.keys) {
          setGrid(importedState.grid);
          setKeys(importedState.keys);
          setKeypadBackground(importedState.keypadBackground);
        } else {
          alert("File JSON non valido.");
        }
      } catch (error) {
        alert("Errore durante l'importazione del file.");
      }
    };
    event.target.value = '';
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => setKeypadBackground(reader.result as string);
    e.target.value = '';
  };

  const handleRemoveBackground = () => setKeypadBackground(undefined);

  const keypadContainerStyle: React.CSSProperties = keypadBackground ? {
    backgroundImage: `url(${keypadBackground})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  } : {};

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      <header className="bg-white shadow-sm p-4">
        <h1 className="text-2xl font-bold text-orange-500">Tastierini KD</h1>
      </header>
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <SettingsPanel 
              onGridChange={handleGridChange} 
              initialGrid={grid} 
              onExport={handleExport}
              onImport={handleImport}
              onBackgroundChange={handleBackgroundChange}
              onRemoveBackground={handleRemoveBackground}
              hasBackground={!!keypadBackground}
            />
          </div>
          <div style={keypadContainerStyle} className="md:col-span-2 bg-white p-4 md:p-8 rounded-xl shadow-lg flex justify-center items-center transition-all">
            <Keypad keys={keys} cols={grid.cols} onKeyClick={handleEditKey} />
          </div>
        </div>
      </main>
      <footer className="bg-white mt-auto p-6 text-center border-t">
        <p className="text-xs text-gray-500 max-w-4xl mx-auto">
          “Tastierini KD” è un progetto amatoriale realizzato a scopo didattico e creativo. Il sito non raccoglie, memorizza o condivide alcun dato personale degli utenti. Le immagini caricate restano esclusivamente nel browser dell’utente e non vengono inviate a nessun server. Nessuna responsabilità legale, civile o penale può essere attribuita al creatore del sito o ai suoi familiari. L’uso è libero e personale.
        </p>
      </footer>
      <EditKeyModal isOpen={editingKey !== null} keyData={editingKey} onClose={handleCloseModal} onSave={handleSaveKey} />
    </div>
  )
}

export default App
