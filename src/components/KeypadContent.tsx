'use client';

import { useSearchParams } from 'next/navigation';
import KeypadPreview from './KeypadPreview';

const KeypadContent = () => {
  const searchParams = useSearchParams();

  const keypadType = searchParams.get('keypadType') || 'Numerico';
  const question = searchParams.get('question') || '';
  const secretCode = searchParams.get('secretCode') || '';
  const caseSensitive = searchParams.get('caseSensitive') === 'true';
  const font = searchParams.get('font') || 'Arial';
  const successMessage = searchParams.get('successMessage') || 'Corretto!';
  const successColor = searchParams.get('successColor') || '#00ff00';
  const errorMessage = searchParams.get('errorMessage') || 'Errato, riprova.';
  const errorColor = searchParams.get('errorColor') || '#ff0000';
  const transparentBg = searchParams.get('transparentBg') === 'true';
  const keypadSize = parseInt(searchParams.get('keypadSize') || '100');
  const backgroundType = searchParams.get('backgroundType') || 'solid';
  const backgroundColor1 = searchParams.get('backgroundColor1') || '#FFFFFF';
  const backgroundColor2 = searchParams.get('backgroundColor2') || '#FF8C00';
  const backgroundImage = searchParams.get('backgroundImage') || '';
  const questionTransparentBg = searchParams.get('questionTransparentBg') === 'true';

  return (
    <KeypadPreview 
      keypadType={keypadType} 
      question={question} 
      font={font} 
      secretCode={secretCode}
      caseSensitive={caseSensitive}
      successMessage={successMessage}
      successColor={successColor}
      errorMessage={errorMessage}
      errorColor={errorColor}
      transparentBg={transparentBg}
      keypadSize={keypadSize}
      backgroundType={backgroundType}
      backgroundColor1={backgroundColor1}
      backgroundColor2={backgroundColor2}
      backgroundImage={backgroundImage}
      questionTransparentBg={questionTransparentBg}
      isPreview={false}
    />
  );
};

export default KeypadContent;
