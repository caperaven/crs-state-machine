import {SimpleStateFactory} from "./../src/simple-state-factory.js";

let machine;
let fnValue;

beforeEach(async () => {
    machine = await SimpleStateFactory.create(["none", "draw/draw-box", "draw/draw-line", "draw/draw-poly"], "none")
    await SimpleStateFactory.addAction(machine, "draw/draw-box", "draw", () => fnValue = "draw box");
    await SimpleStateFactory.addAction(machine, "draw/draw-line", "draw", () => fnValue = "draw line");
    await SimpleStateFactory.addAction(machine, "draw/draw-poly", "draw", () => fnValue = "draw poly");
})

afterEach(() => {
    machine.dispose();
});

test("SimpleStateFactory - create machine", async () => {
    await machine.gotoState("draw/draw-box");
    await machine.callAction("draw");
    expect(fnValue).toEqual("draw box");

    await machine.gotoState("draw/draw-line");
    await machine.callAction("draw");
    expect(fnValue).toEqual("draw line");

    await machine.gotoState("draw/draw-poly");
    await machine.callAction("draw");
    expect(fnValue).toEqual("draw poly");

    fnValue = "";
    await machine.gotoState("none");
    await machine.callAction("draw");
    expect(fnValue).toEqual("");
})