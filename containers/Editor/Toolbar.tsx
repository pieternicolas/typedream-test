import { FC, useCallback } from 'react';
import { BaseRange } from 'slate';
import { useSlateStatic } from 'slate-react';
import clsx from 'clsx';

import Div from 'components/Div';
import Button from 'components/Button';
import Icon from 'components/Icon';

import { CHARACTER_STYLES, PARAGRAPH_STYLES } from './constants';
import {
  getActiveStyles,
  getTextBlockStyle,
  toggleBlockType,
  toggleStyle,
} from './utils';

type ToolbarProps = {
  selection?: BaseRange | null;
};

const Toolbar: FC<ToolbarProps> = ({}) => {
  const editor = useSlateStatic();

  const onBlockTypeChange = useCallback(
    (targetType: string) => {
      if (targetType === 'multiple') {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const blockType = getTextBlockStyle(editor);

  return (
    <>
      <Div className="flex gap-4 justify-center mb-4">
        {PARAGRAPH_STYLES.map((item) => (
          <Button
            key={item}
            className={clsx(
              {
                '!bg-gray-300': blockType === item,
              },
              'capitalize'
            )}
            onClick={() => onBlockTypeChange(item)}
          >
            {item}
          </Button>
        ))}

        {CHARACTER_STYLES.map((item) => (
          <Button
            key={item.name}
            className={clsx({
              '!bg-gray-300': getActiveStyles(editor).has(item.name),
            })}
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
