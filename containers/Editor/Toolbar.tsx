import { FC } from 'react';
import { useSlateStatic } from 'slate-react';
import clsx from 'clsx';

import Div from 'components/Div';
import Button from 'components/Button';
import Icon from 'components/Icon';

import { CHARACTER_STYLES, PARAGRAPH_STYLES } from './constants';
import { getActiveStyles, toggleStyle } from './utils';

const Toolbar: FC = () => {
  const editor = useSlateStatic();

  return (
    <>
      <Div className="flex gap-4 justify-center mb-4">
        {PARAGRAPH_STYLES.map((item) => (
          <Button key={item}>{item}</Button>
        ))}
        {CHARACTER_STYLES.map((item) => (
          <Button
            key={item.name}
            className={clsx(
              getActiveStyles(editor).has(item.name) && 'bg-slate-500'
            )}
            onMouseDown={(event) => {
              event.preventDefault();
              toggleStyle(editor, item.name);
            }}
          >
            <Icon icon={item.icon} />
          </Button>
        ))}
      </Div>
    </>
  );
};

export default Toolbar;
