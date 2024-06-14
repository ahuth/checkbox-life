import type {Dispatch} from '../reducer';

type Props = {
  dispatch: Dispatch;
};

export default function Controls({dispatch}: Props) {
  return (
    <ul className="flex gap-2">
      <li>
        <button
          className="bg-slate-700 p-1 hover:bg-slate-600 active:translate-y-1 active:bg-slate-500"
          onClick={() => dispatch({type: 'STOP_CLICKED'})}
        >
          <span aria-hidden>🛑</span> Stop
        </button>
      </li>
      <li>
        <button
          className="bg-slate-700 p-1 hover:bg-slate-600 active:translate-y-1 active:bg-slate-500"
          onClick={() => dispatch({type: 'STEP_CLICKED'})}
        >
          <span aria-hidden>▶️</span> Step
        </button>
      </li>
    </ul>
  );
}
