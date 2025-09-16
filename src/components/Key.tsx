import { KeyData } from "../types";

interface KeyProps {
  keyData: KeyData;
  onClick: (key: KeyData) => void;
}

function Key({ keyData, onClick }: KeyProps) {
  const keyStyle: React.CSSProperties = {
    backgroundColor: keyData.color,
    position: 'relative',
    overflow: 'hidden',
    gridColumn: keyData.colSpan ? `span ${keyData.colSpan}` : 'span 1',
  };

  if (keyData.image) {
    keyStyle.backgroundImage = `url(${keyData.image})`;
    keyStyle.backgroundSize = 'cover';
    keyStyle.backgroundPosition = 'center';
  }

  return (
    <button 
      style={keyStyle}
      onClick={() => onClick(keyData)}
      className="font-bold py-4 px-6 rounded-lg shadow-md transition-all duration-150 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white relative"
    >
      {keyData.image && (
        <span className="absolute inset-0 bg-black opacity-30"></span>
      )}
      <span className="relative z-10 drop-shadow-md">
        {keyData.label}
      </span>
    </button>
  );
}

export default Key;