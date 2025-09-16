import { createStore } from "vuex";
import race from "./modules/race";
import { RaceState } from "@models/race.model";
import { HorsesModuleState } from "@models/horse.model";
import horse from "./modules/horse";


export interface RootState {
  race: RaceState;
  horse: HorsesModuleState;
}

export default createStore<RootState>({
  modules: {
    horse,
    race,
  },
});
