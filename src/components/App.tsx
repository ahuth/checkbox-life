import {useReducer} from 'react';
import Button from './Button';
import {step} from '../step';

const initialValues = new Array<number>(625).fill(0);

export default function App() {
  const [values, dispatch] = useReducer(function (
    prevState: number[],
    action: {type: 'toggle'; index: number} | {type: 'step'},
  ) {
    if (action.type === 'toggle') {
      const nextState = prevState.slice();
      nextState[action.index] = nextState[action.index] ? 0 : 1;
      return nextState;
    }

    if (action.type === 'step') {
      return step(prevState, 25);
    }

    return prevState;
  }, initialValues);

  return (
    <main>
      <div>
        <Button onClick={() => dispatch({type: 'step'})}>Step</Button>
      </div>
      <ol className="grid grid-cols-[repeat(25,20px)]">
        {values.map((value, i) => {
          return (
            <li key={i} className="w-fit">
              <input
                type="checkbox"
                checked={value ? true : false}
                onChange={() => dispatch({type: 'toggle', index: i})}
              />
            </li>
          );
        })}
      </ol>
    </main>
  );
}
