import { ComponentProps, FC, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import useEditorConfig from 'hooks/useEditorConfig';
import useEditorSelection from 'hooks/useEditorSelection';

import Toolbar from './Toolbar';
import Div from 'components/Div';

export interface EditorProps
  extends Omit<ComponentProps<typeof Slate>, 'editor' | 'children'> {}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [selection, setSelection] = useEditorSelection(editor);

  const handleChange = useCallback(
    (document: Descendant[]) => {
      onChange?.(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  return (
    <>
      <Div className="relative">
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Toolbar selection={selection} />

          <Editable
            onKeyDown={onKeyDown}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </Slate>
      </Div>
    </>
  );
};

export default Editor;
