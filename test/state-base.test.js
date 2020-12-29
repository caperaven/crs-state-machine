import {StateBase} from "../src/state-base.js";

let instance;

beforeEach(async () => {
    instance = new StateBase("state1");
});

afterEach(() => {
    instance.dispose();
});

test("StateBase - add and remove actions", async () => {
    await instance.addAction("test", () => {});
    expect(instance._actions.size).toEqual(1);
    await instance.removeAction("test");
    expect(instance._actions.size).toEqual(0);
});