# Deterministic finite automata

```js
import {DeterministicFiniteAutomata} from "./src/deterministic-finite-automata.js";
import {StateBase} from "./src/state-base.js";

let machine;

async function init() {
    // 1. define the states
    const a = new StateBase("a");
    const b = new StateBase("b");
    const c = new StateBase("c");
    const d = new StateBase("d");

    // 2. create state machine and add states
    machine = new DeterministicFiniteAutomata();
    await machine.addStates([a, b, c, d]);

    // 3. define input relations for each state
    await machine.defineInputRelations("a", {
        0: "c", // if the state is "a" and the input is 0, change state to "c"
        1: "b", // if the state is "a" and the input is 1, change state to "b"
    });

    await machine.defineInputRelations("b", {
        0: "d", // if the state is "b" and the input is 0, change state to "d"
        1: "a"  // if the state is "b" and the input is 1, change state to "a"
    })

    await machine.defineInputRelations("c", {
        0: "a", // if the state is "c" and the input is 0, change state to "a"
        1: "d"  // if the state is "c" and the input is 1, change state to "d"
    })

    await machine.defineInputRelations("d", {
        0: "b", // if the state is "d" and the input is 0, change state to "b"
        1: "c"  // if the state is "d" and the input is 1, change state to "c"
    })

    // 4. start the state machine with a start and end state
    await machine.start("a", "d");
}

// Perform inputs and log out the current state key showing the state changes.
async function performInput() {
    console.log(machine.currentState.key);
    await machine.input(1);
    console.log(machine.currentState.key);
    await machine.input(1);
    console.log(machine.currentState.key);
    await machine.input(0);
    console.log(machine.currentState.key);
    await machine.input(1);
    console.log(machine.currentState.key);

    // result = "a b a c d"
}

init().then(performInput);
```