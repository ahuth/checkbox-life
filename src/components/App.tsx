import {useState} from 'react';
import Button from './Button';
import {step} from '../step';

const initialValues = new Array<number>(625).fill(0);

function next(values: number[]) {
  return step(values, Math.sqrt(initialValues.length));
}

function toggle(index: number, values: number[]) {
  const nextState = values.slice();
  nextState[index] = nextState[index] ? 0 : 1;
  return nextState;
}

export default function App() {
  const [values, setValues] = useState(initialValues);

  return (
    <main>
      <div>
        <Button onClick={() => setValues(next)}>Step</Button>
      </div>
      <ol className="grid grid-cols-[repeat(25,20px)]">
        {values.map((value, i) => {
          return (
            <li key={i}>
              <input
                type="checkbox"
                checked={value ? true : false}
                onChange={() => setValues(toggle.bind(null, i))}
              />
            </li>
          );
        })}
      </ol>
    </main>
  );
}
