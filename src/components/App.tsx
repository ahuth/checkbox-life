import {useReducer} from 'react';
import Editor from './Editor';
import Instructions from './Instructions';
import Stack from './Stack';
import {reducer, initialState} from '../reducer';

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="flex h-screen gap-2 bg-black p-4 text-white">
      <div className="flex flex-col gap-2">
        <Editor dispatch={dispatch} state={state} />
        <Instructions />
      </div>
      <Stack state={state} />
    </main>
  );
}
