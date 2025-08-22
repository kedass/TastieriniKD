import Key from './Key';
import { KeyData } from '../App';

interface KeypadProps {
  keys: KeyData[];
  cols: number;
  onKeyClick: (key: KeyData) => void;
}

function Keypad({ keys, cols, onKeyClick }: KeypadProps) {
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
    gap: '1rem',
  };

  return (
    <div style={gridStyle} className="p-4 bg-gray-100 rounded-lg w-full">
      {keys.map((keyData) => (
        <Key key={keyData.id} keyData={keyData} onClick={onKeyClick} />
      ))}
    </div>
  );
}

export default Keypad;
