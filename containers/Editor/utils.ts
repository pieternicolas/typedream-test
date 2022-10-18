import {
  BaseRange,
  BaseSelection,
  Editor,
  Element,
  Range,
  Transforms,
} from 'slate';

import { initialValue, PARAGRAPH_STYLES } from './constants';

export const getActiveStyles = (editor: Editor): Set<string> => {
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

export const getTextBlockStyle = (editor: Editor) => {
  const selection = editor.selection;

  if (selection == null) {
    return null;
  }

  const [start, end] = Range.edges(selection);

  let startTopLevelBlockIndex = start.path[0];
  const endTopLevelBlockIndex = end.path[0];

  let blockType = null;
  while (startTopLevelBlockIndex <= endTopLevelBlockIndex) {
    const [node]: any = Editor.node(editor, [startTopLevelBlockIndex]);

    if (blockType == null) {
      blockType = node.type;
    } else if (blockType !== node.type) {
      return PARAGRAPH_STYLES.Multiple;
    }
    startTopLevelBlockIndex++;
  }

  return blockType;
};

export const toggleBlockType = (editor: Editor, blockType: string) => {
  const currentBlockType = getTextBlockStyle(editor);
  const changeTo =
    currentBlockType === blockType ? PARAGRAPH_STYLES.Paragraph : blockType;

  if (changeTo === PARAGRAPH_STYLES.Section) {
    Transforms.wrapNodes(
      editor,
      {
        type: PARAGRAPH_STYLES.Section,
        children: [],
      },
      {
        at: editor.selection as any,
        match: (n) => Editor.isBlock(editor, n),
      }
    );
  } else {
    if (currentBlockType === PARAGRAPH_STYLES.Section) {
      Transforms.unwrapNodes(editor, {
        at: editor.selection as BaseRange,
        match: (n: any) => {
          return n.type === PARAGRAPH_STYLES.Section;
        },
      });
    } else {
      Transforms.setNodes(
        editor,
        {
          type: changeTo,
        },
        {
          at: editor.selection as any,
          match: (n) => Editor.isBlock(editor, n),
        }
      );
    }
  }
};

export const isLinkNodeAtSelection = (
  editor: Editor,
  selection: BaseSelection
): Boolean => {
  if (selection == null) {
    return false;
  }

  return (
    Editor.above(editor, {
      at: selection,
      match: (n: any) => n.type === PARAGRAPH_STYLES.Link,
    }) != null
  );
};

export const toggleLinkAtSelection = (
  editor: Editor,
  selection: BaseSelection
) => {
  if (!isLinkNodeAtSelection(editor, selection)) {
    const isSelectionCollapsed = Range.isCollapsed(selection as BaseRange);
    if (isSelectionCollapsed) {
      Transforms.insertNodes(
        editor,
        {
          type: PARAGRAPH_STYLES.Link,
          url: '#',
          children: [{ text: 'link' }],
        },
        { at: selection as BaseRange }
      );
    } else {
      Transforms.wrapNodes(
        editor,
        { type: PARAGRAPH_STYLES.Link, url: '#', children: [{ text: '' }] },
        { split: true, at: selection as BaseRange }
      );
    }
  } else {
    Transforms.unwrapNodes(editor, {
      match: (n: any) => Element.isElement(n) && n.type === 'link',
    });
  }
};

export const resetDocument = (editor: Editor) => {
  const totalNodes = editor.children.length;

  for (let i = 0; i < totalNodes - 1; i++) {
    Transforms.removeNodes(editor, {
      at: [totalNodes - i - 1],
    });
  }

  for (const value of initialValue) {
    Transforms.insertNodes(editor, value, {
      at: [editor.children.length],
    });
  }

  Transforms.removeNodes(editor, {
    at: [0],
  });
};
