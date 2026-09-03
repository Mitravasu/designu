import type { ButtonHTMLAttributes } from 'react';

import './Button.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ className, ...props }: ButtonProps) {
  const classes = ['button', className].filter(Boolean).join(' ');

  return <button className={classes} {...props} />;
}
