import { useCallback, useState } from 'react';
import { BaseRange, BaseSelection, Editor } from 'slate';
import isEqual from 'react-fast-compare';

const useEditorSelection = (
  editor: Editor
): [BaseRange | null, (newSelection: BaseSelection) => void] => {
  const [selection, setSelection] = useState(editor.selection);

  const setSelectionOptimized = useCallback(
    (newSelection: BaseSelection) => {
      console.log(newSelection);

      if (isEqual(selection, newSelection)) {
        return;
      }

      setSelection(newSelection);
    },
    [setSelection, selection]
  );

  return [selection, setSelectionOptimized];
};

export default useEditorSelection;
