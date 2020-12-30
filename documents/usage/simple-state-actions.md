# Simple state actions

```js
let machine;

async function init() {
    const state1 = new crs.state.StateBase("state1");
    await state1.addAction("log", (p1, p2) => console.log(p1, p2));

    const state2 = new crs.state.StateBase("state2");
    await state2.addAction("log", (p1, p2) => console.error(p1, p2));

    machine = new crs.state.SimpleStateMachine();
    await machine.addState(state1);
    await machine.addState(state2);
    await machine.start("state1");
}

async function performInput() {
    await machine.callAction("log", ["Hello", "World"]);
    await machine.gotoState("state2");
    await machine.callAction("log", ["Hello", "World"]);
}

init().then(performInput);
```

The above example creates a simple state machine where each state acts as a provider.  
Both states has an action called "log", but the implementation of that action is different.  
Though this is a simple example, it shows how you can have a function that does different things depending on what the state is.