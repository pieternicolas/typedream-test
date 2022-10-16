import { Editor } from 'slate';

export const getActiveStyles = (editor: Editor) => {
  return new Set(Object.keys(Editor.marks(editor) ?? {}));
};

export const toggleStyle = (editor: Editor, style: string) => {
  const activeStyles = getActiveStyles(editor);

  if (activeStyles.has(style)) {
    Editor.removeMark(editor, style);
  } else {
    Editor.addMark(editor, style, true);
  }
};
