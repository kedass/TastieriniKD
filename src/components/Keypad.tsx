import Key from './Key';
import { KeyData, KeypadType } from '../App';

interface KeypadProps {
  keys: KeyData[];
  cols: number;
  onKeyClick: (key: KeyData) => void;
  keypadType: KeypadType;
  onKeypadInput?: (value: string) => void; // For inputBar type
}

function Keypad({ keys, cols, onKeyClick, keypadType, onKeypadInput }: KeypadProps) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '1rem',
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full">
      {keypadType === 'inputBar' && (
        <input 
          type="text" 
          readOnly 
          value=""
          placeholder="Input here..."
          className="w-full p-3 mb-4 text-lg text-center bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none"
        />
      )}
      <div style={gridStyle}>
        {keys.map((keyData) => (
          <Key 
            key={keyData.id} 
            keyData={keyData} 
            onClick={onKeyClick} 
            onKeypadInput={onKeypadInput} 
            keypadType={keypadType}
          />
        ))}
      </div>
    </div>
  );
}

export default Keypad;
