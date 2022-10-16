import { ComponentProps, FC, useCallback, useMemo } from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';

import useEditorConfig from 'hooks/useEditorConfig';
import useEditorSelection from 'hooks/useEditorSelection';

import Toolbar from './Toolbar';

export interface EditorProps extends ComponentProps<typeof Slate> {}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(createEditor()), []);

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
      <Slate editor={editor} value={value} onChange={handleChange}>
        <Toolbar selection={selection} />

        <Editable
          onKeyDown={onKeyDown}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
        />
      </Slate>
    </>
  );
};

export default Editor;
