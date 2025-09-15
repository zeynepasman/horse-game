import { Horse } from "../models/horse.model";

export interface HorsesModuleState {
  horses: Horse[];
  allHorses: Horse[];
  initHorses: () => void;
}
