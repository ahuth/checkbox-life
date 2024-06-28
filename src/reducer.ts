import {step} from './step';

export const initialState = {
  playing: false,
  values: new Array<number>(25 * 25).fill(0),
};

type Action =
  | {type: 'CLICKED_CLEAR'}
  | {type: 'CLICKED_NEXT'}
  | {type: 'CLICKED_RANDOMIZE'}
  | {type: 'CLICKED_RUN'}
  | {type: 'CLICKED_TOGGLE'; index: number}
  | {type: 'TICK'};

export function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case 'CLICKED_CLEAR':
      return initialState;
    case 'CLICKED_NEXT':
      return {
        playing: false,
        values: step(state.values, Math.sqrt(state.values.length)),
      };
    case 'CLICKED_RANDOMIZE':
      return {
        ...state,
        values: state.values.map(() => Math.round(Math.random())),
      };
    case 'CLICKED_RUN':
      return {
        ...state,
        playing: !state.playing,
      };
    case 'CLICKED_TOGGLE': {
      const nextValues = state.values.slice();
      nextValues[action.index] = nextValues[action.index] ? 0 : 1;
      return {
        ...state,
        values: nextValues,
      };
    }
    case 'TICK':
      return {
        ...state,
        values: step(state.values, Math.sqrt(state.values.length)),
      };
    default:
      return state;
  }
}
