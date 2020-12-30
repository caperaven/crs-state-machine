# State factory

This is a helper to make creating simple state machines.

```js
let machine;

async function init() {
    machine = await crs.state.SimpleStateFactory.create(["none", "draw/draw-box", "draw/draw-line", "draw/draw-poly"], "none")
    await crs.state.SimpleStateFactory.addAction(machine, "draw/draw-box", "draw", () => console.log("draw box"));
    await crs.state.SimpleStateFactory.addAction(machine, "draw/draw-line", "draw", () => console.log("draw line"));
    await crs.state.SimpleStateFactory.addAction(machine, "draw/draw-poly", "draw", () => console.log("draw poly"));
}

async function performInput() {
    await machine.gotoState("draw/draw-box");
    await machine.callAction("draw");

    await machine.gotoState("draw/draw-line");
    await machine.callAction("draw");

    await machine.gotoState("draw/draw-poly");
    await machine.callAction("draw");

    await machine.gotoState("none");
    await machine.callAction("draw");
}

init().then(performInput);
```