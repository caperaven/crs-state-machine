import {StateMachineBase} from "./state-machine-base.js";

export class SimpleStateMachine extends StateMachineBase {
    async callAction(key, parameters) {
        if (this.currentState != null) {
            await this.currentState.callAction(key, parameters);
        }
    }
}