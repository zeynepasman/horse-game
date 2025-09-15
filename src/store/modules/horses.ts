// store/modules/horses.ts
import type { Module } from "vuex";
import { HorsesModuleState } from "../../types/states/horseState";
import { generateHorses } from "../../utils/horse-utils";
import { Horse } from "../../types/models/horse.model";

const horsesModule: Module<HorsesModuleState, any> = {
  namespaced: true,

  state: (): HorsesModuleState => ({
    horses: generateHorses(),
    allHorses: [],
    initHorses: () => {},
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
