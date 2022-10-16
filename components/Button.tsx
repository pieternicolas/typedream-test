import { FC, HTMLAttributes, useMemo } from 'react';
import clsx from 'clsx';

type ButtonProps = HTMLAttributes<HTMLButtonElement> & {};

const Button: FC<ButtonProps> = ({ className, children, ...props }) => {
  const classes = useMemo(
    () =>
      clsx(
        'px-3 py-2 border border-gray-400 rounded-lg bg-white hover:bg-gray-300 transition-colors',
        className
      ),
    [className]
  );

  return (
    <>
      <button className={classes} {...props}>
        {children}
      </button>
    </>
  );
};

export default Button;
