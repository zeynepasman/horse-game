import type { Module } from "vuex";
import { generateHorses } from "@utils/horse-utils";
import { Horse, HorseModuleState } from "@models/horse.model";
import { RootState } from "@store/index";

const horseModule: Module<HorseModuleState, RootState> = {
  namespaced: true,

  state: (): HorseModuleState => ({
    horses: generateHorses(),
  }),

  getters: {
    allHorses: (state): Horse[] => state.horses,
  },

  actions: {
    initHorses({ commit }) {
      commit("setHorses", generateHorses());
    },
  },

  mutations: {
    setHorses(state, horses: Horse[]) {
      state.horses = horses;
    },
  },
};

export default horseModule;
