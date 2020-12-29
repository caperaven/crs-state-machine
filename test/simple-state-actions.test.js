import {SimpleStateMachine} from "./../src/simple-state-machine.js";
import {StateBase} from "./../src/state-base.js";

let machine;
let p1Value;
let p2Value;

beforeEach(async () => {
    const state1 = new StateBase("state1");
    await state1.addAction("log", (p1, p2) => {
        p1Value= `${p1} v1`;
        p2Value = `${p2} v1`;
    });

    const state2 = new StateBase("state2");
    await state2.addAction("log", (p1, p2) => {
        p1Value= `${p1} v2`;
        p2Value = `${p2} v2`;
    });

    machine = new SimpleStateMachine();
    await machine.addState(state1);
    await machine.addState(state2);
    await machine.start("state1");
})

afterEach(() => {
    machine.dispose();
});

test("SimpleStateMachine - perform action", async () => {
    await machine.callAction("log", ["a", "b"]);
    expect(p1Value).toEqual("a v1");
    expect(p2Value).toEqual("b v1");

    await machine.gotoState("state2");
    await machine.callAction("log", ["a", "b"]);
    expect(p1Value).toEqual("a v2");
    expect(p2Value).toEqual("b v2");
})