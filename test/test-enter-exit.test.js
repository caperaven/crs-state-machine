import {HierarchicalStateBase} from "../src/hierarchical-state-base.js";
import {SimpleStateMachine} from "../src/simple-state-machine.js";
import {StateBase} from "../src/state-base.js";

let instance;
let drawState;
let selectState;

class TestState extends StateBase {
    async enter(parent) {
        this._enterCount = (this._enterCount || 0) + 1;
        return super.enter(parent);
    }

    async exit(parent) {
        this._exitCount = (this._exitCount || 0) + 1;
        return super.exit(parent);
    }
}

class RectangleState extends TestState {
    constructor() {
        super();
        this._key = "rectangle";
    }

    async enter(parent) {
        return super.enter(parent);
    }

    async exit(parent) {
        return super.exit(parent);
    }
}

class SingleState extends TestState {
    constructor() {
        super();
        this._key = "single";
    }

    async enter(parent) {
        return super.enter(parent);
    }

    async exit(parent) {
        return super.exit(parent);
    }
}

class TestHierarchicalState extends HierarchicalStateBase {
    async enter(parent) {
        this._enterCount = (this._enterCount || 0) + 1;
        return super.enter(parent);
    }

    async exit(parent) {
        this._exitCount = (this._exitCount || 0) + 1;
        return super.exit(parent);
    }
}

class DrawState extends TestHierarchicalState {
    constructor() {
        super();
        this._key = "draw";
    }

    async enter(parent) {
        return super.enter(parent);
    }

    async exit(parent) {
        return super.exit(parent);
    }
}

class SelectState extends TestHierarchicalState {
    constructor() {
        super();
        this._key = "select";
    }

    async enter(parent) {
        return super.enter(parent);
    }

    async exit(parent) {
        return super.exit(parent);
    }
}

beforeEach(async () => {
    drawState = new DrawState();
    await drawState.addState(new RectangleState());

    selectState = new SelectState();
    await selectState.addState(new SingleState());

    instance = new SimpleStateMachine();
    await instance.addStates([new StateBase("none"), drawState, selectState]);
    await instance.start("none");
})

afterEach(async() => {
    instance.dispose();
})

async function assertState(state, enterCount, exitCount) {
    expect(state._enterCount).toEqual(enterCount);
    expect(state._exitCount).toEqual(exitCount);
}

test("test enter and exit on path", async () => {
    await instance.gotoState("draw/rectangle");
    await assertState(drawState, 1, undefined);
    await assertState(drawState._states.get("rectangle"), 1, undefined);
    await assertState(selectState, undefined, undefined);
    await assertState(selectState._states.get("single"), undefined, undefined);

    await instance.gotoState("select/single");
    await assertState(drawState, 1, 1);
    await assertState(drawState._states.get("rectangle"), 1, 1);
    await assertState(selectState, 1, undefined);
    await assertState(selectState._states.get("single"), 1, undefined);

    await instance.gotoState("draw/rectangle");
    await assertState(drawState, 2, 1);
    await assertState(drawState._states.get("rectangle"), 2, 1);
    await assertState(selectState, 1, 1);
    await assertState(selectState._states.get("single"), 1, 1);
})


