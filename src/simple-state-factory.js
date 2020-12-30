import {SimpleStateMachine} from "./simple-state-machine.js"
import {HierarchicalStateBase} from "./hierarchical-state-base.js";
import {StateBase} from "./state-base.js";

export class SimpleStateFactory {
    static async create(states, startState) {
        const result = new SimpleStateMachine();

        for (let state of states) {
            await createState(result, state);
        }

        await result.start(startState);

        return result;
    }

    static async addAction(machine, state, actionName, actionFn) {
        const instance = await getState(machine, state);
        await instance.addAction(actionName, actionFn);
    };
}

async function createState(machine, state) {
    if (state.indexOf("/") == -1) {
        await createSimpleState(machine, state);
    }
    else {
        await createHierarchicalState(machine, state);
    }
}

async function createSimpleState(machine, state) {
    await machine.addState(new StateBase(state));
}

async function createHierarchicalState(machine, state) {
    const parts = state.split("/");

    let result = machine._states.get(parts[0]);
    if (result == null) {
        result = new HierarchicalStateBase(parts[0]);
    }

    state = state.replace(`${parts[0]}/`, "");
    await createState(result, state);
    await machine.addState(result);
}

async function getState(machine, state) {
    if (state.indexOf("/") == -1) {
        return machine._states.get(state);
    }

    const parts = state.split("/");
    const result = machine._states.get(parts[0]);
    state = state.replace(`${parts[0]}/`, "");
    return await getState(result, state);
}