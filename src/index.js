import {DeterministicFiniteAutomata} from "./deterministic-finite-automata.js";
import {HierarchicalStateBase} from "./hierarchical-state-base.js";
import {SimpleStateFactory} from "./simple-state-factory.js";
import {SimpleStateMachine} from "./simple-state-machine.js";
import {StateBase} from "./state-base.js";
import {StateMachineBase} from "./state-machine-base.js";

globalThis.crs = globalThis.crs || {};
globalThis.crs.state = {
    SimpleStateFactory: SimpleStateFactory,
    StateMachineBase: StateMachineBase,
    DeterministicFiniteAutomata: DeterministicFiniteAutomata,
    SimpleStateMachine: SimpleStateMachine,
    StateBase: StateBase,
    HierarchicalStateBase: HierarchicalStateBase,
}