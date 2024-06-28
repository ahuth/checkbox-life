import {useEffect, useReducer} from 'react';
import Button from './Button';
import {initialState, reducer} from '../reducer';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    function run() {
      if (state.playing) {
        dispatch({type: 'TICK'});
        id = window.requestAnimationFrame(run);
      }
    }

    let id = window.requestAnimationFrame(run);

    return () => window.cancelAnimationFrame(id);
  }, [state.playing]);

  return (
    <main className="p-2">
      <div className="flex flex-wrap gap-1">
        <Button onClick={() => dispatch({type: 'CLICKED_NEXT'})}>Step</Button>
        <Button onClick={() => dispatch({type: 'CLICKED_RUN'})}>
          {state.playing ? 'Stop' : 'Play'}
        </Button>
        <Button onClick={() => dispatch({type: 'CLICKED_CLEAR'})}>Clear</Button>
        <Button onClick={() => dispatch({type: 'CLICKED_RANDOMIZE'})}>
          Randomize
        </Button>
        <a
          className="text-blue-600 underline"
          href="https://github.com/ahuth/checkbox-life"
        >
          Source code
        </a>
      </div>
      <ol className="grid grid-cols-[repeat(25,20px)]">
        {state.values.map((value, i) => {
          return (
            <li key={i}>
              <input
                type="checkbox"
                checked={value ? true : false}
                onChange={() => dispatch({type: 'CLICKED_TOGGLE', index: i})}
              />
            </li>
          );
        })}
      </ol>
    </main>
  );
}
