import {HierarchicalStateBase} from "../src/hierarchical-state-base.js";
import {SimpleStateMachine} from "../src/simple-state-machine.js";
import {StateBase} from "../src/state-base.js";

let instance;
let actionText;
let boxState;
let lineState;
let polyState;

beforeEach(async () => {
    boxState = new StateBase("draw-box");
    await boxState.addAction("draw", () => actionText = "draw box");

    lineState = new StateBase("draw-line");
    await lineState.addAction("draw", () => actionText = "draw line");

    polyState = new StateBase("draw-poly");
    await polyState.addAction("draw", () => actionText = "draw poly");

    const drawState = new HierarchicalStateBase("draw");
    await drawState.addStates([boxState, lineState, polyState]);
    await drawState.start("draw-box");

    const defaultState = new HierarchicalStateBase("default");
    await defaultState.addState(new StateBase("none"));

    const noneState = new StateBase("none");

    instance = new SimpleStateMachine();
    await instance.addStates([noneState, drawState, defaultState]);
    await instance.start("none");
});

afterEach(() => {
    instance.dispose();
});

test("HierarchicalStateBase", async () => {
    await instance.gotoState("draw/draw-box");
    await instance.callAction("draw");
    expect(actionText).toEqual("draw box");

    await instance.gotoState("draw/draw-line");
    await instance.callAction("draw");
    expect(actionText).toEqual("draw line");

    await instance.gotoState("draw/draw-poly");
    await instance.callAction("draw");
    expect(actionText).toEqual("draw poly");

    actionText = "";
    await instance.gotoState("none");
    await instance.callAction("draw");
    expect(actionText).toEqual("");
});