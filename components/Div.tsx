import { FC, HTMLAttributes } from 'react';

export type DivProps = HTMLAttributes<HTMLDivElement> & {
  as?: 'section' | 'div';
};

const Div: FC<DivProps> = ({ children, as, ...props }) => {
  if (as === 'section') {
    return <section {...props}>{children}</section>;
  }

  return <div {...props}>{children}</div>;
};

export default Div;
