import {StateMachineBase} from "./../src/state-machine-base.js";
import {StateBase} from "../src/state-base.js";

class StrapExitState extends StateBase {
    async exit(parent) {
        await parent.addMessage("trap exit");
        return false;
    }
}

let machine;

beforeEach(async () => {
    machine = new StateMachineBase();
});

afterEach(() => {
    machine.dispose();
});

test("StateMachineBase - messages", async () => {
    await machine.addMessage("hello world");
    expect(machine.messages.length).toEqual(1);
    expect(machine.messages[0]).toEqual("hello world");
    await machine.clearMessages();
    expect(machine.messages.length).toEqual(0);
})

test("StateMachineBase - gotoState - wrong state", async () => {
    await machine.clearMessages();
    const result = await machine.gotoState("some-state");
    expect(result).toBeFalsy();
    expect(machine.messages.length).toEqual(1);
    expect(machine.messages[0]).toEqual("no state: some-state");
})

test("StateMachineBase - gotoState - wrong state", async () => {
    await machine.addState(new StrapExitState("trap"));
    machine.start("trap");
    const result = await machine.gotoState("some-state");
    expect(result).toBeFalsy();
    expect(machine.messages[0]).toEqual("trap exit");
})
