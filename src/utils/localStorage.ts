import { KeyData, GridSize, KeypadType } from '../types';

export interface AppState {
  keys: KeyData[];
  gridSize: GridSize;
  keypadType: KeypadType;
  backgroundImage: string | null;
  // Campi del quiz
  quizTitle?: string;
  quizQuestion?: string;
  correctAnswer?: string;
  correctMessage?: string;
  incorrectMessage?: string;
}

export const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem('tastieriniState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state: AppState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('tastieriniState', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};
