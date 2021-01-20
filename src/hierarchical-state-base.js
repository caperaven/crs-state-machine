import {SimpleStateMachine} from "./simple-state-machine.js";

/**
 * A hierarchical state is a state that allows sub states.
 * It's nothing more than and simple state machine masquerading as a state.
 */
export class HierarchicalStateBase extends SimpleStateMachine {
    get key() {
        return this._key;
    }

    constructor(key) {
        super();
        this._key = key;
    }

    /**
     * Async function for when you enter the state
     * @parent {StateMachineBase} the state machine the state is attached too
     * @returns {boolean} return false if you can't enter this state for some reason
     */
    async enter(parent) {
        return true;
    }

    /**
     * Async function for hen you exit the state.
     * @parent {StateMachineBase} the state machine the state is attached too
     * @returns {boolean} return false if you can't exit the state for some reason
     */
    async exit(parent) {
        if (this.currentState && this.currentState.exited != true) {
            this.currentState.exit(parent);
            this.currentState.exited = true;
        }

        return true;
    }
}