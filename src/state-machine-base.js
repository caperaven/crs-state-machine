/**
 * Base class for state machines.
 * This class includes a messages array that you can populate with information to determine what is going on in the state machine.
 * For example, if you can't exit the current state add a message using addMessage as to why.
 */
export class StateMachineBase {
    constructor() {
        this._states = new Map();
        this.messages = [];
    }

    dispose() {
        this.currentState = null;
        this._states.forEach((value, key) => value.dispose());
        this._states.clear();
    }

    /**
     * Add a message the the messages queue
     * @param message
     * @returns {Promise<void>}
     */
    async addMessage(message) {
        this.messages.push(message);
    }

    async clearMessages() {
        this.messages.length = 0;
    }

    /**
     * Add a new state to the state machine.
     * @param key {any} what is the key to use when referring to the state.
     * @param stateObject {StateBase} object inheriting from StateBase defining the state.
     */
    async addState(key, stateObject) {
        this._states.set(key, stateObject)
    }

    /**
     *  Go to a defined state
     * @param key
     * @returns {Promise<boolean>} change the state of the machine to a given state, returns false if you can't exit the current state or can't enter the defined state.
     */
    async gotoState(key) {
        let success = true;
        if (this.currentState != null) {
            success = await this.currentState.exit();
            if (success != true) return success;
        }

        const state = this._states.get(key);
        if (state == null) {
            await this.addMessage(`no state: ${key}`);
            return false;
        }

        await state.enter();
        return true;
    }
}