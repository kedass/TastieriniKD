export interface KeyData {
  id: number;
  label: string;
  color: string;
  image?: string;
}

export interface GridSize {
  rows: number;
  cols: number;
}

export type KeypadType = 'numeric' | 'alphanumeric' | 'inputBar';
