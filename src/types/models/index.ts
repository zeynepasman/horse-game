export interface Horse {
  id: number;
  name: string;
  color: string;
  condition: string;
}

export interface RootState {
  horses: {
    allHorses: Horse[];
  };
}
