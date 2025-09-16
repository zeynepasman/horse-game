import { createStore } from "vuex";
import race from "./modules/race";
import { RaceState } from "@models/race.model";
import { HorseModuleState } from "@models/horse.model";
import horse from "./modules/horse";


export interface RootState {
  race: RaceState;
  horse: HorseModuleState;
}

export default createStore<RootState>({
  modules: {
    horse,
    race,
  },
});
