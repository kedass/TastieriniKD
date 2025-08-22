import { KeyData, KeypadType } from "../App";

interface KeyProps {
  keyData: KeyData;
  onClick: (key: KeyData) => void;
  keypadType: KeypadType;
  onKeypadInput?: (value: string) => void; // For inputBar type
}

function Key({ keyData, onClick, keypadType, onKeypadInput }: KeyProps) {
  const keyStyle: React.CSSProperties = {
    backgroundColor: keyData.color,
    position: 'relative',
    overflow: 'hidden',
  };

  if (keyData.image) {
    keyStyle.backgroundImage = `url(${keyData.image})`;
    keyStyle.backgroundSize = 'cover';
    keyStyle.backgroundPosition = 'center';
  }

  const handleClick = () => {
    if (keypadType === 'inputBar' && onKeypadInput) {
      onKeypadInput(keyData.label);
    } else {
      onClick(keyData);
    }
  };

  return (
    <button 
      style={keyStyle}
      onClick={handleClick}
      className="font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      <span 
        className="absolute inset-0 bg-black opacity-20 hover:opacity-10 transition-opacity duration-150"
        style={{ visibility: keyData.image ? 'visible' : 'hidden' }}
      ></span>
      <span className="relative z-10 text-white drop-shadow-md">
        {keyData.label}
      </span>
    </button>
  );
}

export default Key;
