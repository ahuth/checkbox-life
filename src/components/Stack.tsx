import type {State} from '../reducer';

type Props = {
  state: State;
};

export default function Stack({state}: Props) {
  return (
    <div>
      <h2>Stack</h2>
      <ol
        className="list-inside list-decimal border-t-4 border-indigo-500 font-mono"
        start={0}
      >
        {state.stack.map((val, i) => {
          return <li key={i}>{val}</li>;
        })}
      </ol>
    </div>
  );
}
