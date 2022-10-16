import { FC, HTMLAttributes } from 'react';

export type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  as?: 'span' | 'paragraph';
  bold?: boolean;
  textCutoff?: boolean;
};

const Text: FC<TextProps> = ({ children, as, bold, ...props }) => {
  if (as === 'span') {
    return (
      <span {...props}>{bold ? <strong>{children}</strong> : children}</span>
    );
  }

  return <p {...props}>{bold ? <strong>{children}</strong> : children}</p>;
};

export default Text;
