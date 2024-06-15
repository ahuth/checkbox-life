import clsx from 'clsx';
import type {ButtonHTMLAttributes} from 'react';

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({className, ...props}: Props) {
  return (
    <button
      className={clsx(
        'rounded bg-white px-2 py-1 text-xs font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
        className,
      )}
      {...props}
    />
  );
}
