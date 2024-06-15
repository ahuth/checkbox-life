import {useReducer} from 'react';

const initialValues = new Array(100).fill(false);

export default function App() {
  const [values, dispatch] = useReducer(function (
    prevState: boolean[],
    action: {type: 'toggle'; index: number},
  ) {
    if (action.type === 'toggle') {
      const nextState = prevState.slice();
      nextState[action.index] = !nextState[action.index];
      return nextState;
    }

    return prevState;
  }, initialValues);

  return (
    <main>
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
