import { FC, useCallback } from 'react';
import { BaseRange } from 'slate';
import { useSlateStatic } from 'slate-react';
import clsx from 'clsx';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import Div from 'components/Div';
import Button from 'components/Button';
import Icon from 'components/Icon';

import Popup from 'helpers/popup';

import {
  CHARACTER_STYLES,
  PARAGRAPH_STYLES,
  PARAGRAPH_STYLES_ARR,
} from './constants';
import {
  getActiveStyles,
  getTextBlockStyle,
  resetDocument,
  toggleBlockType,
  toggleStyle,
} from './utils';

type ToolbarProps = {
  selection?: BaseRange | null;
};

const Toolbar: FC<ToolbarProps> = () => {
  const editor = useSlateStatic();

  const onResetClick = () => {
    Popup.fire({
      title: <p>Reset to default state?</p>,
      confirmButtonText: 'Yes',
    }).then((res) => {
      if (res.isConfirmed) {
        resetDocument(editor);
      }
    });
  };

  const onBlockTypeChange = useCallback(
    (targetType: string) => {
      if (targetType === PARAGRAPH_STYLES.Multiple) {
        return;
      }
      toggleBlockType(editor, targetType);
    },
    [editor]
  );

  const blockType = getTextBlockStyle(editor);

  return (
    <>
      <Div className="flex gap-4 justify-center py-4 mb-4 border-b sticky top-0 bg-white z-10">
        {PARAGRAPH_STYLES_ARR.map((item) => (
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

        <Button
          className="bg-rose-500 border-rose-500 hover:border-gray-400"
          onClick={onResetClick}
        >
          <Icon icon={solid('trash')} />
        </Button>
      </Div>
    </>
  );
};

export default Toolbar;
