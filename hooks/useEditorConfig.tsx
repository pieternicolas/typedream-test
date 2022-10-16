import { KeyboardEvent, useCallback } from 'react';
import { Editor } from 'slate';
import {
  DefaultElement,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';

import { KEYBINDINGS } from 'containers/Editor/constants';

const renderElement = (props: RenderElementProps) => {
  const { element, children, attributes } = props;

  switch (element.type) {
    case 'paragraph':
      return <p {...attributes}>{children}</p>;

    case 'h1':
      return (
        <h1 className="text-3xl" {...attributes}>
          {children}
        </h1>
      );

    case 'h2':
      return (
        <h2 className="text-2xl" {...attributes}>
          {children}
        </h2>
      );

    case 'h3':
      return (
        <h3 className="text-xl" {...attributes}>
          {children}
        </h3>
      );

    case 'h4':
      return (
        <h4 className="text-lg" {...attributes}>
          {children}
        </h4>
      );

    default:
      return <DefaultElement {...props} />;
  }
};

const renderLeaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  let el = <>{children}</>;

  if (leaf.bold) {
    el = <strong>{el}</strong>;
  }

  if (leaf.code) {
    el = <code>{el}</code>;
  }

  if (leaf.italic) {
    el = <em>{el}</em>;
  }

  if (leaf.underline) {
    el = <u>{el}</u>;
  }

  return <span {...attributes}>{el}</span>;
};

const useEditorConfig = (editor: Editor) => {
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) =>
      KEYBINDINGS.onKeyDown(editor, event),
    [editor]
  );

  return { renderElement, renderLeaf, onKeyDown };
};

export default useEditorConfig;
