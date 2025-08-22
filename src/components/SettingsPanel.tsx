import React from 'react';
import { KeypadType } from '../App';

interface SettingsPanelProps {
  initialGrid: { rows: number; cols: number };
  onGridChange: (rows: number, cols: number) => void;
  onExport: () => void;
  onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBackgroundChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveBackground: () => void;
  hasBackground: boolean;
  onKeypadTypeChange: (type: KeypadType) => void;
  initialKeypadType: KeypadType;
}

function SettingsPanel({ initialGrid, onGridChange, onExport, onImport, onBackgroundChange, onRemoveBackground, hasBackground, onKeypadTypeChange, initialKeypadType }: SettingsPanelProps) {

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    if (newRows > 0) {
      onGridChange(newRows, initialGrid.cols);
    }
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    if (newCols > 0) {
      onGridChange(initialGrid.rows, newCols);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onKeypadTypeChange(e.target.value as KeypadType);
  };

  const importInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 h-full flex flex-col">
      <h3 className="font-semibold text-lg mb-4">Impostazioni</h3>
      <div className="space-y-4">
        {/* Keypad Type Selection */}
        <div>
          <label htmlFor="keypadType" className="block text-sm font-medium text-gray-700">Tipo Tastierino</label>
          <select id="keypadType" name="keypadType" value={initialKeypadType} onChange={handleTypeChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
            <option value="custom">Personalizzato</option>
            <option value="numeric">Numerico</option>
            <option value="alphanumeric">Alfanumerico</option>
            <option value="inputBar">Barra di Inserimento</option>
          </select>
        </div>
        <hr />
        {/* Grid Settings */}
        <div>
          <label htmlFor="rows" className="block text-sm font-medium text-gray-700">Righe</label>
          <input type="number" id="rows" name="rows" value={initialGrid.rows} onChange={handleRowsChange} min={1} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="cols" className="block text-sm font-medium text-gray-700">Colonne</label>
          <input type="number" id="cols" name="cols" value={initialGrid.cols} onChange={handleColsChange} min={1} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
        </div>
        <hr />
        {/* Background Settings */}
        <div>
          <label htmlFor="keypadBg" className="block text-sm font-medium text-gray-700">Sfondo Tastierino</label>
          <input type="file" id="keypadBg" accept=".png, .jpg, .jpeg" onChange={onBackgroundChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
          {hasBackground && (
              <button onClick={onRemoveBackground} className="mt-2 text-xs text-red-500 hover:text-red-700">Rimuovi sfondo</button>
          )}
        </div>
      </div>

      <div className="mt-auto pt-6 space-y-2">
        <button onClick={onExport} className="w-full px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
          Esporta JSON
        </button>
        <input type="file" accept=".json" onChange={onImport} ref={importInputRef} className="hidden" />
        <button onClick={() => importInputRef.current?.click()} className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors">
          Importa JSON
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;
