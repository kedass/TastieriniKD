import { useState, useEffect, ChangeEvent } from "react";
import { KeyData } from "../types";

interface EditKeyModalProps {
  keyData: KeyData;
  onSave: (updatedKey: KeyData) => void;
  onClose: () => void;
  onKeyImageUpload: (file: File, keyId: number) => void;
}

function EditKeyModal({ keyData, onSave, onClose, onKeyImageUpload }: EditKeyModalProps) {
  const [label, setLabel] = useState(keyData.label);
  const [color, setColor] = useState(keyData.color);

  useEffect(() => {
    setLabel(keyData.label);
    setColor(keyData.color);
  }, [keyData]);

  const handleSave = () => {
    onSave({ ...keyData, label, color });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onKeyImageUpload(file, keyData.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md text-white">
        <h3 className="text-lg font-semibold mb-4">Modifica Tasto</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-400">Etichetta</label>
            <input 
              type="text" 
              id="label" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)} 
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" 
            />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-400">Colore Sfondo</label>
            <input 
              type="color" 
              id="color" 
              value={color} 
              onChange={(e) => setColor(e.target.value)} 
              className="mt-1 block w-full h-10" 
            />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-400">Immagine Tasto</label>
            <input 
              type="file" 
              id="image" 
              accept=".png, .jpg, .jpeg" 
              onChange={handleImageChange} 
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100"
            />
            {keyData.image && (
              <button 
                onClick={() => onSave({ ...keyData, image: undefined })} 
                className="mt-2 text-xs text-red-400 hover:text-red-600"
              >
                Rimuovi immagine
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500">Annulla</button>
          <button onClick={handleSave} className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700">Salva</button>
        </div>
      </div>
    </div>
  );
}

export default EditKeyModal;