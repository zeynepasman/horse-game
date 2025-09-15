import { Horse } from "./horse.model";

export interface Round {
  roundIndex: number;
  distance: number;
  horses: Horse[];
  results: Result | null; 
}

export interface Result {
  roundIndex: number;
  placements: Horse[];
}

export interface RaceState {
  rounds: Round[];
  currentRound: number;
  raceStarted: boolean;
  results: Result[]; 
}
