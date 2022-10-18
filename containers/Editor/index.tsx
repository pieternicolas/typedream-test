import {
  ComponentProps,
  FC,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createEditor, Descendant } from 'slate';
import { Editable, Slate, withReact } from 'slate-react';
import { withHistory } from 'slate-history';

import useEditorConfig from 'hooks/useEditorConfig';
import useEditorSelection from 'hooks/useEditorSelection';

import { isLinkNodeAtSelection, resetDocument } from './utils';
import Toolbar from './Toolbar';
import LinkEditor from './LinkEditor';

interface EditorProps
  extends Omit<ComponentProps<typeof Slate>, 'editor' | 'children'> {}

const Editor: FC<EditorProps> = ({ value, onChange }) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const editorRef = useRef<HTMLDivElement>(null);
  const [hideLinkEditor, setHideLinkEditor] = useState<boolean>(false);

  const { renderElement, renderLeaf, onKeyDown } = useEditorConfig(editor);
  const [previousSelection, selection, setSelection] =
    useEditorSelection(editor);

  const handleChange = useCallback(
    (document: Descendant[]) => {
      onChange?.(document);
      setSelection(editor.selection);
    },
    [editor.selection, onChange, setSelection]
  );

  const handleOnReset = () => {
    resetDocument(editor);
  };

  const selectionForLink = useMemo(() => {
    if (isLinkNodeAtSelection(editor, selection)) {
      return selection;
    } else if (!selection && isLinkNodeAtSelection(editor, previousSelection)) {
      return previousSelection;
    }

    return null;
  }, [editor, previousSelection, selection]);

  return (
    <>
      <div className="relative" onMouseDown={() => setHideLinkEditor(false)}>
        <Slate editor={editor} value={value} onChange={handleChange}>
          <Toolbar selection={selection} handleOnReset={handleOnReset} />

          <div ref={editorRef} className="relative">
            {!hideLinkEditor && selectionForLink && (
              <LinkEditor
                selectionForLink={selectionForLink}
                offsets={
                  editorRef.current !== null
                    ? {
                        x: editorRef.current.getBoundingClientRect().x,
                        y: editorRef.current.getBoundingClientRect().y,
                      }
                    : undefined
                }
                justChangedLink={() => setHideLinkEditor(true)}
              />
            )}

            <Editable
              onKeyDown={onKeyDown}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
            />
          </div>
        </Slate>
      </div>
    </>
  );
};

export default Editor;
