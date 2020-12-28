/**
 * Base class for states.
 * This includes:
 * 1. enter function when the state is activated
 * 2. exit function when you leave the state
 * 3. actions object for state actions if you need it
 */
export class StateBase {
    constructor() {
        this._actions = new Map();
    }

    dispose() {
        this._actions.clear();
        this._actions = null;
    }

    /**
     * Async function for when you enter the state
     * @returns {boolean} return false if you can't enter this state for some reason
     */
    async enter() {
        return true;
    }

    /**
     * Async function for hen you exit the state.
     * @returns {boolean} return false if you can't exit the state for some reason
     */
    async exit() {
        return true;
    }

    /**
     * Add a action to the state
     * @param key {any} function identifier
     * @param fn {function} function to execute
     * @returns {Promise<void>}
     */
    async addAction(key, fn) {
        this._actions.set(key, fn);
    }

    /**
     * Remove a action from the state
     * @param key {any} key the action was defined on
     * @returns {Promise<void>}
     */
    async removeAction(key) {
        this._actions.delete(key);
    }

    /**
     * Call a action on the state
     * @param key {any} key the action was defined on
     * @param parameters {array} parameters to pass on to the function
     * @returns {Promise<void>}
     */
    async callAction(key, parameters) {
        const fn = this._actions.get(key);
        if (fn != null) {
            fn(...parameters);
        }
    }
}