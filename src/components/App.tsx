import {useReducer} from 'react';
import Button from './Button';
import {step} from '../step';

const initialValues = new Array(100).fill(false);

export default function App() {
  const [values, dispatch] = useReducer(function (
    prevState: boolean[],
    action: {type: 'toggle'; index: number} | {type: 'step'},
  ) {
    if (action.type === 'toggle') {
      const nextState = prevState.slice();
      nextState[action.index] = !nextState[action.index];
      return nextState;
    }

    if (action.type === 'step') {
      return step(prevState, 10);
    }

    return prevState;
  }, initialValues);

  return (
    <main>
      <div>
        <Button onClick={() => dispatch({type: 'step'})}>Step</Button>
      </div>
      <ol className="grid grid-cols-[repeat(10,20px)]">
        {values.map((value, i) => {
          return (
            <li key={i} className="w-fit">
              <input
                type="checkbox"
                checked={value}
                onChange={() => dispatch({type: 'toggle', index: i})}
              />
            </li>
          );
        })}
      </ol>
    </main>
  );
}
