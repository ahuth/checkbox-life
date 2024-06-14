import clsx from 'clsx';
import type {Dispatch, State} from '../reducer';
import Controls from './Controls';

type Props = {
  dispatch: Dispatch;
  state: State;
};

export default function Editor({dispatch, state}: Props) {
  const disabled = state.onLine != null;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="editor">
        <h2>Editor</h2>
      </label>
      <Controls dispatch={dispatch} />
      <div className="flex">
        <div className={clsx(state.onLine == null && 'invisible')}>
          <div className="relative" style={{top: (state.onLine ?? 0) * 24}}>
            ➔
          </div>
        </div>
        <textarea
          className={clsx(
            'w-56',
            !disabled && 'bg-slate-700',
            disabled && 'cursor-not-allowed bg-slate-600',
          )}
          disabled={disabled ? true : undefined}
          id="editor"
          onChange={(e) =>
            dispatch({type: 'CODE_TYPED', value: e.target.value})
          }
          rows={10}
          value={state.code}
        />
      </div>
    </div>
  );
}
