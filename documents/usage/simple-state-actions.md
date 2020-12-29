# Simple state actions

```js
import {SimpleStateMachine} from "./src/simple-state-machine.js";
import {StateBase} from "./src/state-base.js";

const state1 = new StateBase("state1");
state1.addAction("log", (p1, p2) => console.log(p1, p2));

const state2 = new StateBase("state2");
state2.addAction("log", (p1, p2) => console.error(p1, p2));

let machine;

async function init() {
    machine = new SimpleStateMachine();
    await machine.addState(state1);
    await machine.addState(state2);
    await machine.start("state1");
}

async function performInput() {
    await machine.performAction("log", ["Hello", "World"]);
    await machine.gotoState("state2");
    await machine.performAction("log", ["Hello", "World"]);
}

init().then(performInput);
```

The above example creates a simple state machine where each state acts as a provider.  
Both states has an action called "log", but the implementation of that action is different.  
Though this is a simple example, it shows how you can have a function that does different things depending on what the state is.