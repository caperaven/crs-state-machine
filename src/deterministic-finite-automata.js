import {StateMachineBase} from "./state-machine-base.js";

export class DeterministicFiniteAutomata extends StateMachineBase {
    constructor() {
        super();
        this._inputRelations = new Map();
    }

    dispose() {
        this._inputRelations.clear();
        this._inputRelations = null;
    }

    async defineInputRelations(state, relationsObject) {
        this._inputRelations.set(state, relationsObject);
    }

    async input(value) {
        const obj = this._inputRelations.get(this.currentStateKey);
        if (obj == null) {
            await this.addMessage(`no relation defined for ${this.currentStateKey}`);
            return false;
        }

        const target = obj[value];
        if (target == null) {
            return false;
        }

        return this.gotoState(target);
    }
}