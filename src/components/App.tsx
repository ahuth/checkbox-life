import {useEffect, useState} from 'react';
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

function randomize(values: number[]) {
  return values.map(() => Math.round(Math.random()));
}

function clear() {
  return initialValues;
}

export default function App() {
  const [values, setValues] = useState(initialValues);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    function run() {
      if (playing) {
        setValues(next);
        id = window.requestAnimationFrame(run);
      }
    }

    let id = window.requestAnimationFrame(run);

    return () => window.cancelAnimationFrame(id);
  }, [playing]);

  return (
    <main className="p-2">
      <div className="flex flex-wrap gap-1">
        <Button onClick={() => setValues(next)}>Step</Button>
        <Button onClick={() => setPlaying((p) => !p)}>
          {playing ? 'Stop' : 'Play'}
        </Button>
        <Button onClick={() => setValues(clear)}>Clear</Button>
        <Button onClick={() => setValues(randomize)}>Randomize</Button>
        <a
          className="text-blue-600 underline"
          href="https://github.com/ahuth/checkbox-life"
        >
          Source code
        </a>
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
