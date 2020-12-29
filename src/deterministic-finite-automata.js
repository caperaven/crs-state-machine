import {StateMachineBase} from "./state-machine-base.js";

/**
 * Deterministic finite automata.
 * State machine with strongly defined states, inputs and relationships.
 */
export class DeterministicFiniteAutomata extends StateMachineBase {
    constructor() {
        super();
        this._inputRelations = new Map();
    }

    dispose() {
        this._inputRelations.clear();
        this._inputRelations = null;
        super.dispose();
    }

    /**
     * Also known as state event table.
     * Define the relationship between the state and the input.
     * For this state when you get this input change the state to that state.
     *
     *     await machine.defineInputRelations("a", {
     *        0: "c",   // for state "a", if the input is 0, change state to "c"
     *        1: "b",   // for state "a", if the input is 1, change state to "b"
     *    });
     *
     * @param state
     * @param relationsObject
     * @returns {Promise<void>}
     */
    async defineInputRelations(state, relationsObject) {
        this._inputRelations.set(state, relationsObject);
    }

    /**
     * This is the driving function.
     * When the input changes the state will change depending the relationship defined.
     * @param value {any} the input value expected by the state machine.
     * @returns {Promise<boolean>}
     */
    async input(value) {
        const obj = this._inputRelations.get(this.currentState.key);
        const target = obj[value];

        if (target == null) {
            return false;
        }

        return this.gotoState(target);
    }
}