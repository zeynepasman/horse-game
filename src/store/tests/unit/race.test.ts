import { createStore, Store } from "vuex";
import { Horse } from "@models/horse.model";
import race from "@store/modules/race";
import { RootState } from "@store/index";

describe("Race Vuex Module", () => {
  let store: Store<RootState>;

  const mockHorses: Horse[] = Array.from({ length: 12 }, (_, i) => ({
    roundIndex: i,
    id: i + 1,
    name: `Horse ${i + 1}`,
    color: "red",
    condition: 80,
    progress: 0
  }));

  beforeEach(() => {
    store = createStore({
      modules: {
        race: { ...race, namespaced: true },
        horse: {
          namespaced: true,
          getters: {
            allHorses: () => mockHorses
          }
        }
      }
    });
  });

  it("generates rounds with selected horses", () => {
    store.commit("race/generateRounds", mockHorses.slice(0, 5));
    const rounds = store.getters["race/allRounds"];
    expect(rounds.length).toBeGreaterThan(0);
    expect(rounds[0].horses[0].progress).toBe(0);
  });

  it("sets race started", () => {
    store.commit("race/setRaceStarted", true);
    expect(store.state.race.raceStarted).toBe(true);
  });

  it("saves round results", () => {
    const placements = mockHorses.slice(0, 3);
    store.commit("race/saveRoundResults", { roundIndex: 1, placements });
    const results = store.getters["race/results"];
    expect(results.length).toBe(1);
    expect(results[0].placements).toEqual(placements);
  });

  it("startProgram selects 10 horses and generates rounds", () => {
    store.dispatch("race/startProgram");
    const rounds = store.getters["race/allRounds"];
    expect(rounds.length).toBeGreaterThan(0);
    expect(rounds[0].horses.length).toBe(10);
  });

  it("startRound sets current round and race started", () => {
    store.dispatch("race/startProgram");
    store.dispatch("race/startRound", 0);
    expect(store.state.race.currentRound).toBe(0);
    expect(store.state.race.raceStarted).toBe(true);
  });

  it("getter raceInProgress reflects state", () => {
    store.dispatch("race/startProgram");
    store.dispatch("race/startRound", 0);
    const inProgress = store.getters["race/raceInProgress"];
    expect(typeof inProgress).toBe("boolean");
  });
});
