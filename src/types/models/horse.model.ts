
export interface Horse {
  roundIndex: number; 
  id: number;
  name: string;
  color: string;
  condition: number;
  progress: number;
  position?: number;
}

export interface HorseModuleState {
  horses: Horse[];
}