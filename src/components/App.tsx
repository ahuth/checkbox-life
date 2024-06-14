import {useReducer} from 'react';

export default function App() {
  const [values, dispatch] = useReducer(
    function (prevState: boolean[], action: {type: 'toggle'; index: number}) {
      if (action.type === 'toggle') {
        const nextState = prevState.slice();
        nextState[action.index] = !nextState[action.index];
        return nextState;
      }

      return prevState;
    },
    [false, false, false, false, false, false, false, false, false, false],
  );

  return (
    <main>
      <ol>
        {values.map((value, i) => {
          return (
            <li key={i}>
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
