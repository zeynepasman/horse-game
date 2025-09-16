import type { Module } from "vuex";
import { generateHorses } from "@utils/horse-utils";
import { Horse, HorsesModuleState } from "@models/horse.model";
import { RootState } from "@store/index";

const horsesModule: Module<HorsesModuleState, RootState> = {
  namespaced: true,

  state: (): HorsesModuleState => ({
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

export default horsesModule;
