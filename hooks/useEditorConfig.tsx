import { KeyboardEvent, useCallback } from 'react';
import { Editor } from 'slate';
import {
  DefaultElement,
  RenderElementProps,
  RenderLeafProps,
} from 'slate-react';

import { KEYBINDINGS, PARAGRAPH_STYLES } from 'containers/Editor/constants';

const renderElement = (props: RenderElementProps) => {
  const { element, children, attributes } = props;

  switch (element.type) {
    case PARAGRAPH_STYLES.Paragraph:
      return <p {...attributes}>{children}</p>;

    case PARAGRAPH_STYLES.H1:
      return (
        <h1 className="text-3xl" {...attributes}>
          {children}
        </h1>
      );

    case PARAGRAPH_STYLES.H2:
      return (
        <h2 className="text-2xl" {...attributes}>
          {children}
        </h2>
      );

    case PARAGRAPH_STYLES.H3:
      return (
        <h3 className="text-xl" {...attributes}>
          {children}
        </h3>
      );

    case PARAGRAPH_STYLES.H4:
      return (
        <h4 className="text-lg" {...attributes}>
          {children}
        </h4>
      );

    case PARAGRAPH_STYLES.Section:
      return (
        <div className="mb-2 p-2 border" {...attributes}>
          {children}
        </div>
      );

    case PARAGRAPH_STYLES.Link:
      return (
        <a
          href={element.url}
          className="underline text-blue-500"
          {...attributes}
        >
          {children}
        </a>
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

  editor.isInline = (element) => ['link'].includes(element.type);

  return { renderElement, renderLeaf, onKeyDown };
};

export default useEditorConfig;
