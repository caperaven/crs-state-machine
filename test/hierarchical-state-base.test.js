import {HierarchicalStateBase} from "../src/hierarchical-state-base.js";
import {SimpleStateMachine} from "../src/simple-state-machine.js";
import {StateBase} from "../src/state-base.js";

let instance;
let actionText;

beforeEach(async () => {
    const drawBoxState = new StateBase("draw-box");
    await drawBoxState.addAction("draw", () => actionText = "draw box");

    const drawLineState = new StateBase("draw-line");
    await drawLineState.addAction("draw", () => actionText = "draw line");

    const drawPolyState = new StateBase("draw-poly");
    await drawPolyState.addAction("draw", () => actionText = "draw poly");

    const drawState = new HierarchicalStateBase("draw");
    await drawState.addStates([drawBoxState, drawLineState, drawPolyState]);
    await drawState.start("draw-box");

    const noneState = new StateBase("none");

    instance = new SimpleStateMachine();
    await instance.addStates([noneState, drawState]);
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