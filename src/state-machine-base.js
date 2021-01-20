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
        if (this.currentState != null) {
            this.currentState.exit(this);
            this.currentState = null;
        }

        this._states.forEach((value, key) => value.dispose());
        this._states.clear();
        this._states = null;
        this._disposed = true;
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
    async addState(stateObject) {
        this._states.set(stateObject.key, stateObject);
    }

    /**
     * Add a collection of states
     * @param stateObjects {array} collection of StateBase objects
     * @returns {Promise<void>}
     */
    async addStates(stateObjects) {
        for (let state of stateObjects) {
            await this.addState(state);
        }
    }

    /**
     *  Go to a defined state
     * @param key
     * @returns {Promise<boolean>} change the state of the machine to a given state, returns false if you can't exit the current state or can't enter the defined state.
     */
    async gotoState(key) {
        if (key.indexOf("/") != -1) return this._gotoStatePath(key);

        if (this.currentState != null) {
            this.currentState.exit(this);
        }

        if (this._states.has(key) == false) {
            this.messages.push(`no state: ${key}`);
            return false;
        }

        this.currentState = this._states.get(key);
        await this.currentState.enter(this);

        return true;
    }

    async _gotoStatePath(key) {
        const parts = key.split("/");

        await this.gotoState(parts[0]);
        key = key.replace(`${parts[0]}/`, "");
        await this.currentState.gotoState(key);
    }

    /**
     * Set the start and end state.
     * This also starts the machine, ready for input.
     * @param startKey {any} key defining the start state
     * @param endKey {any} key defining the end state
     * @returns {Promise<boolean>}
     */
    async start(startKey, endKey = null) {
        this._startKey = startKey;
        this._endKey = endKey;
        return await this.gotoState(startKey);
    }
}