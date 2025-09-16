import { Horse } from "./horse.model";


export interface Round {
  roundIndex: number;
  distance: number;
  horses: Horse[];
  results: RaceResult | null;
}

export interface RaceResult {
  roundIndex: number;
  placements: Horse[];
}

export interface RaceState {
  rounds: Round[];
  currentRound: number; // Ensure this property exists
  raceStarted: boolean;
  results: RaceResult[];
}