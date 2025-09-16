import { createStore, Store } from "vuex";
import { Horse } from "@models/horse.model";
import { RootState } from "@store/index";
import horseModule from "@store/modules/horse";

describe("Horses Vuex Module", () => {
  let store: Store<RootState>;

  beforeEach(() => {
    store = createStore<RootState>({
      modules: {
        horse: { ...horseModule, namespaced: true },
      },
    });
  });

  it("initializes with generated horses", () => {
    const state = store.state.horse;
    expect(state.horses.length).toBeGreaterThan(0);
    expect(state.horses[0]).toHaveProperty("id");
    expect(state.horses[0]).toHaveProperty("name");
  });

  it("getter allHorses returns horses array", () => {
    const all = store.getters["horse/allHorses"];
    expect(Array.isArray(all)).toBe(true);
    expect(all.length).toBe(store.state.horse.horses.length);
  });

  it("mutation setHorses updates state", () => {
    const newHorses: Horse[] = [
      { roundIndex: 101, id: 101, name: "TestHorse", color: "black", condition: 90, progress: 0 },
    ];
    store.commit("horse/setHorses", newHorses);
    expect(store.state.horse.horses).toEqual(newHorses);
  });

  it("action initHorses calls setHorses mutation", () => {
    store.commit("horse/setHorses", []);

    expect(store.state.horse.horses.length).toBe(0);

    store.dispatch("horse/initHorses");

    const allHorses = store.getters["horse/allHorses"];
    expect(allHorses.length).toBeGreaterThan(0); // generateHorses created them
  });
});
