import type {Dispatch as ReactDispatch} from 'react';
import {parse, execute, type Stack, type Instruction} from './cpu';

export const initialState = {
  code: 'push 1\npush 2\npush 3\nadd\npush 4\nsub\nadd',
  index: 0,
  instructions: [] as Instruction[],
  onLine: null as number | null,
  stack: [] as Stack,
};

export type State = typeof initialState;
export type Dispatch = ReactDispatch<Action>;

type Action =
  | {type: 'CODE_TYPED'; value: string}
  | {type: 'STEP_CLICKED'}
  | {type: 'STOP_CLICKED'};

export function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'CODE_TYPED':
      return {...state, index: 0, onLine: null, code: action.value};
    case 'STEP_CLICKED': {
      // First click, so no instructions are executed, yet.
      if (state.onLine == null) {
        return {...state, instructions: parse(state.code), onLine: 0};
      }
      // No more instructions to execute.
      if (state.index === state.instructions.length) {
        return state;
      }
      // Execute an instruction.
      const nextStack = execute(state.instructions[state.index], state.stack);
      return {
        ...state,
        index: state.index + 1,
        onLine: state.instructions[state.index + 1]?.line ?? state.onLine + 1,
        stack: nextStack,
      };
    }
    case 'STOP_CLICKED':
      return {...state, index: 0, onLine: null, stack: []};
    default:
      return state;
  }
}
