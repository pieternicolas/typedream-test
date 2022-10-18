import { useCallback, useRef, useState } from 'react';
import { BaseSelection, Editor } from 'slate';
import isEqual from 'react-fast-compare';

const useEditorSelection = (
  editor: Editor
): [
  BaseSelection | null,
  BaseSelection | null,
  (newSelection: BaseSelection) => void
] => {
  const [selection, setSelection] = useState(editor.selection);
  const previousSelection = useRef<BaseSelection | null>(null);

  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection) => {
      if (isEqual(selection, newSelection)) {
        return;
      }

      previousSelection.current = selection;
      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [previousSelection.current, selection, setSelectionOptimized];
};

export default useEditorSelection;
