import { Horse } from "../models/horse.model";
import { Result, Round } from "../models/race.model";


export interface RaceState {
  allRounds: Round[];
  raceInProgress: boolean;
  raceHorses: Horse[];
  results: Result[];
}
