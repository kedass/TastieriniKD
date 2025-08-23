import { KeyData, GridSize } from '../types';
import Key from './Key';

interface KeypadProps {
  keys: KeyData[];
  gridSize: GridSize;
  handleKeyClick: (id: number) => void;
  keypadType: 'numeric' | 'alphanumeric' | 'inputBar';
  inputValue?: string;
  handleKeypadInput?: (label: string) => void;
}

const Keypad: React.FC<KeypadProps> = ({ keys, gridSize, handleKeyClick, keypadType, inputValue, handleKeypadInput }) => {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
    gap: '10px',
  };

  return (
    <div className="w-full max-w-4xl p-4 bg-gray-800 rounded-lg shadow-lg">
      {keypadType === 'inputBar' && (
        <div className="mb-4">
          <input
            type="text"
            value={inputValue}
            readOnly
            className="w-full p-2 text-2xl bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400"
            placeholder="L'input apparirà qui..."
          />
        </div>
      )}
      <div style={gridStyle}>
        {keys.map(key => (
          <Key
            key={key.id}
            label={key.label}
            color={key.color}
            image={key.image}
            onClick={() => {
              if (keypadType === 'inputBar' && handleKeypadInput) {
                handleKeypadInput(key.label);
              } else {
                handleKeyClick(key.id);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Keypad;


export default Keypad;
