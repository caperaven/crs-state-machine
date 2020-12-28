import {DeterministicFiniteAutomata} from "./../src/deterministic-finite-automata.js";
import {StateBase} from "./../src/state-base.js";

let machine;

beforeEach(async () => {
    const a = new StateBase("a");
    const b = new StateBase("b");
    const c = new StateBase("c");
    const d = new StateBase("d");

    machine = new DeterministicFiniteAutomata();
    await machine.addStates([a, b, c, d]);

    await machine.defineInputRelations("a", {
        0: "c",
        1: "b",
    });

    await machine.defineInputRelations("b", {
        0: "d",
        1: "a"
    })

    await machine.defineInputRelations("c", {
        0: "a",
        1: "d"
    })

    await machine.defineInputRelations("d", {
        0: "b",
        1: "c"
    })

    await machine.start("a", "d");
});

afterEach(() => {
    if (machine._disposed != true) {
        machine.dispose();
    }
});

test("DeterministicFiniteAutomata - step", async () => {
    expect(machine.currentState.key).toEqual("a");

    await machine.input(1);
    expect(machine.currentState.key).toEqual("b");

    await machine.input(1);
    expect(machine.currentState.key).toEqual("a");

    await machine.input(0);
    expect(machine.currentState.key).toEqual("c");

    await machine.input(1);
    expect(machine.currentState.key).toEqual("d");
});

test("DeterministicFiniteAutomata - dispose", async () => {
    machine.dispose();
    expect(machine.currentState).toBeNull();
    expect(machine._inputRelations).toBeNull();
    expect(machine._states).toBeNull();
})

test("DeterministicFiniteAutomata - wrong state input", async () => {
    const success = await machine.input(2);
    expect(success).toBeFalsy();
})