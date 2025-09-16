import React from 'react';
import { GridSize, KeypadType } from '../types';

interface SettingsPanelProps {
  gridSize: GridSize;
  onGridSizeChange: (rows: number, cols: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExport: () => void;
  onImport: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeypadTypeChange: (type: KeypadType) => void;
  currentType: KeypadType;
  removeBackgroundImage: () => void;
  hasBackgroundImage: boolean;
  // Props per il Quiz
  quizTitle: string;
  onQuizTitleChange: (value: string) => void;
  quizQuestion: string;
  onQuizQuestionChange: (value: string) => void;
  correctAnswer: string;
  onCorrectAnswerChange: (value: string) => void;
  correctMessage: string;
  onCorrectMessageChange: (value: string) => void;
  incorrectMessage: string;
  onIncorrectMessageChange: (value: string) => void;
  generatedLink: string;
}

function SettingsPanel({ 
  gridSize, 
  onGridSizeChange, 
  onFileUpload, 
  onExport, 
  onImport, 
  onKeypadTypeChange, 
  currentType,
  removeBackgroundImage,
  hasBackgroundImage,
  quizTitle,
  onQuizTitleChange,
  quizQuestion,
  onQuizQuestionChange,
  correctAnswer,
  onCorrectAnswerChange,
  correctMessage,
  onCorrectMessageChange,
  incorrectMessage,
  onIncorrectMessageChange,
  generatedLink
}: SettingsPanelProps) {

  const handleRowsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRows = parseInt(e.target.value, 10);
    if (newRows > 0) {
      onGridSizeChange(newRows, gridSize.cols);
    }
  };

  const handleColsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCols = parseInt(e.target.value, 10);
    if (newCols > 0) {
      onGridSizeChange(gridSize.rows, newCols);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onKeypadTypeChange(e.target.value as KeypadType);
  };

  

  const importInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 bg-gray-800 rounded-lg border border-gray-700 h-full flex flex-col text-white">
      <h3 className="font-semibold text-lg mb-4">Impostazioni</h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="keypadType" className="block text-sm font-medium text-gray-400">Tipo Tastierino</label>
          <select id="keypadType" name="keypadType" value={currentType} onChange={handleTypeChange} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm">
            <option value="custom">Personalizzato</option>
            <option value="numeric">Numerico</option>
            <option value="alphanumeric">Alfanumerico</option>
            <option value="inputBar">Barra di Inserimento</option>
          </select>
        </div>
        <hr className="border-gray-600"/>
        <div>
          <label htmlFor="rows" className="block text-sm font-medium text-gray-400">Righe</label>
          <input type="number" id="rows" name="rows" value={gridSize.rows} onChange={handleRowsChange} min={1} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
        </div>
        <div>
          <label htmlFor="cols" className="block text-sm font-medium text-gray-400">Colonne</label>
          <input type="number" id="cols" name="cols" value={gridSize.cols} onChange={handleColsChange} min={1} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
        </div>
        <hr className="border-gray-600"/>
        <div>
          <label htmlFor="keypadBg" className="block text-sm font-medium text-gray-400">Sfondo Tastierino</label>
          <input type="file" id="keypadBg" accept=".png, .jpg, .jpeg" onChange={onFileUpload} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"/>
          {hasBackgroundImage && (
              <button onClick={removeBackgroundImage} className="mt-2 text-xs text-red-400 hover:text-red-600">Rimuovi sfondo</button>
          )}
        </div>
        <hr className="border-gray-600"/>

        {/* Sezione Quiz */}
        <div>
          <h4 className="font-semibold text-md mb-3 text-cyan-400">Impostazioni Quiz</h4>
          <div className="space-y-3">
            <div>
              <label htmlFor="quizTitle" className="block text-sm font-medium text-gray-400">Titolo del Quiz</label>
              <input type="text" id="quizTitle" value={quizTitle} onChange={(e) => onQuizTitleChange(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="quizQuestion" className="block text-sm font-medium text-gray-400">Domanda del Quiz</label>
              <textarea id="quizQuestion" value={quizQuestion} onChange={(e) => onQuizQuestionChange(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm resize-none" />
            </div>
            <div>
              <label htmlFor="correctAnswer" className="block text-sm font-medium text-gray-400">Risposta Corretta</label>
              <input type="text" id="correctAnswer" value={correctAnswer} onChange={(e) => onCorrectAnswerChange(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="correctMessage" className="block text-sm font-medium text-gray-400">Messaggio di Successo</label>
              <input type="text" id="correctMessage" value={correctMessage} onChange={(e) => onCorrectMessageChange(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
            <div>
              <label htmlFor="incorrectMessage" className="block text-sm font-medium text-gray-400">Messaggio di Errore</label>
              <input type="text" id="incorrectMessage" value={incorrectMessage} onChange={(e) => onIncorrectMessageChange(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm" />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-auto pt-6 space-y-2">
        <button onClick={onExport} className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
          Crea Link Quiz
        </button>
        {generatedLink && (
          <div className="mt-4 p-3 bg-gray-900 rounded-lg border border-cyan-500">
            <label className="block text-sm font-medium text-gray-300">Link Generato:</label>
            <div className="flex items-center mt-1">
              <input type="text" readOnly value={generatedLink} className="w-full px-2 py-1 bg-gray-700 border border-gray-600 rounded-md text-white text-sm" />
              <button onClick={() => navigator.clipboard.writeText(generatedLink)} className="ml-2 px-3 py-1 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 text-sm">Copia</button>
            </div>
          </div>
        )}
        <input type="file" accept=".json" onChange={onImport} ref={importInputRef} className="hidden" />
        <button onClick={() => importInputRef.current?.click()} className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors">
          Importa JSON
        </button>
      </div>
    </div>
  );
}

export default SettingsPanel;