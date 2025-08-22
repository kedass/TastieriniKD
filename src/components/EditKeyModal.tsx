import { useState, useEffect } from "react";
import { KeyData } from "../App";

interface EditKeyModalProps {
  isOpen: boolean;
  keyData: KeyData | null;
  onClose: () => void;
  onSave: (newKeyData: KeyData) => void;
}

function EditKeyModal({ isOpen, keyData, onClose, onSave }: EditKeyModalProps) {
  const [formData, setFormData] = useState<Omit<KeyData, 'id'>>({ label: '', color: '', image: undefined });

  useEffect(() => {
    if (keyData) {
      setFormData({ label: keyData.label, color: keyData.color, image: keyData.image });
    }
  }, [keyData]);

  if (!isOpen || !keyData) return null;

  const handleSave = () => {
    onSave({ ...keyData, ...formData });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      alert("Formato file non supportato. Usa PNG o JPG.");
      return;
    }
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (file.size > maxSize) {
      alert("L'immagine è troppo grande. Massimo 3MB.");
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
    };
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: undefined }));
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Modifica Tasto</h3>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="label" className="block text-sm font-medium text-gray-700">Etichetta</label>
            <input type="text" id="label" name="label" value={formData.label} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
          </div>
          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700">Colore Sfondo</label>
            <input type="color" id="color" name="color" value={formData.color} onChange={handleChange} className="mt-1 block w-full h-10" />
          </div>
          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Immagine Tasto</label>
            <input type="file" id="image" name="image" accept=".png, .jpg, .jpeg" onChange={handleImageChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"/>
            {formData.image && (
              <button onClick={removeImage} className="mt-2 text-xs text-red-500 hover:text-red-700">Rimuovi immagine</button>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Annulla</button>
          <button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">Salva</button>
        </div>
      </div>
    </div>
  );
}

export default EditKeyModal;
