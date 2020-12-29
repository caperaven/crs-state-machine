import {StateMachineBase} from "./state-machine-base.js";

export class SimpleStateMachine extends StateMachineBase {
    async performAction(key, parameters) {
        if (this.currentState != null) {
            await this.currentState.callAction(key, parameters);
        }
    }
}