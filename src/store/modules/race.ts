import { Module } from "vuex";
import { Horse } from "@models/horse.model";
import { RaceState } from "@models/race.model";
import { RootState } from "@store/index";

const roundDistances = [1200, 1400, 1600, 1800, 2000, 2200];

const race: Module<RaceState, RootState> = {
  namespaced: true,
  state: () => ({
    rounds: [],
    currentRound: 0, 
    raceStarted: false,
    results: [],
  }),
  mutations: {
    generateRounds(state: RaceState, selectedHorses: Horse[]) {
      state.rounds = roundDistances.map((distance, index) => ({
        roundIndex: index + 1,
        distance,
        horses: selectedHorses.map((horse: Horse) => ({ ...horse, progress: 0 })), // reset progress each round
        results: null,
      }));
      state.currentRound = 0;
    },
    setRaceStarted(state: RaceState, started: boolean) {
      state.raceStarted = started;
    },
    setCurrentRound(state: RaceState, round: number) {
      state.currentRound = round;
    },
    clearResults(state: RaceState) {
      state.results = []; // Reset the results array
    },
    saveRoundResults(
      state: RaceState,
      { roundIndex, placements }: { roundIndex: number; placements: Horse[] }
    ) {
      state.results.push({ roundIndex, placements });
    },
    resetProgress(state: RaceState, roundIndex: number) {
      state.rounds[roundIndex].horses.forEach((horse: Horse) => (horse.progress = 0));
    },
  },
  actions: {
    startProgram({ commit, rootGetters }) {
      const horses: Horse[] = rootGetters["horse/allHorses"];
      if (!horses || horses.length === 0) return;

      const shuffled = [...horses].sort(() => 0.5 - Math.random());
      const selectedHorses = shuffled.slice(0, 10);

      commit("generateRounds", selectedHorses);
    },

    startRound({ commit }, roundIndex: number) {
      commit("setCurrentRound", roundIndex);
      commit("resetProgress", roundIndex);
      commit("setRaceStarted", true);
    },

    simulateRace({ state, commit }) {
      const round = state.rounds[state.currentRound];
      if (!round) return;
      let allFinished = true;

      round.horses.forEach((horse: Horse) => {
        if (horse.progress < 100) {
          const baseSpeed = horse.condition / 20;
          const distanceFactor = 1600 / round.distance; 
          const speed = baseSpeed * distanceFactor;

          horse.progress = Math.min(horse.progress + speed, 100);
        }
        if (horse.progress < 100) allFinished = false;
      });
      if (allFinished) {
        const placements = [...round.horses].sort(
          (a, b) => b.progress - a.progress
        );
        console.log("Round finished. Placements:", placements);
        commit("saveRoundResults", {
          roundIndex: round.roundIndex,
          placements,
        });
      }
      if (round.horses.every((horse: Horse) => horse.progress >= 100)) {
        commit("setRaceStarted", false);
      }
    },
  },
  getters: {
    allRounds: (state) => state.rounds,
    raceHorses: (state) =>
      state.rounds.length > 0 ? state.rounds[state.currentRound].horses : [],
    raceInProgress: (state) => {
      const round = state.rounds[state.currentRound];
      return round ? round.horses.some((horse: Horse) => horse.progress < 100) : false;
    },
    results: (state) => state.results,
  },
};

export default race;
