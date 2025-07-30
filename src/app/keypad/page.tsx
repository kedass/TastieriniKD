'use client';

import { Suspense } from 'react';
import KeypadContent from '@/components/KeypadContent';

export default function KeypadPage() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Suspense fallback={<div>Caricamento tastierino...</div>}>
        <KeypadContent />
      </Suspense>
    </div>
  );
}