'use client';

import { useSearchParams } from 'next/navigation';
import KeypadPreview from '@/components/KeypadPreview';
import { Suspense } from 'react';

export default function KeypadPage() {
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

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Suspense fallback={<div>Caricamento tastierino...</div>}>
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
          isPreview={false}
        />
      </Suspense>
    </div>
  );
}
