import { KeyboardEvent } from 'react';
import { Descendant, Editor } from 'slate';
import isHotkey from 'is-hotkey';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { toggleStyle } from './utils';

export enum PARAGRAPH_STYLES {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  Paragraph = 'paragraph',
  Multiple = 'multiple',
  Section = 'section',
}

export const PARAGRAPH_STYLES_ARR = Object.values(PARAGRAPH_STYLES);

export const CHARACTER_STYLES = [
  { name: 'bold', icon: solid('bold') },
  { name: 'italic', icon: solid('italic') },
  { name: 'underline', icon: solid('underline') },
  { name: 'code', icon: solid('quote-left') },
] as const;

export const KEYBINDINGS = {
  onKeyDown: (editor: Editor, event: KeyboardEvent<HTMLDivElement>) => {
    if (isHotkey('mod+b', event)) {
      toggleStyle(editor, 'bold');
      return;
    }

    if (isHotkey('mod+i', event)) {
      toggleStyle(editor, 'italic');
      return;
    }

    if (isHotkey('mod+`', event)) {
      toggleStyle(editor, 'code');
      return;
    }

    if (isHotkey('mod+u', event)) {
      toggleStyle(editor, 'underline');
      return;
    }
  },
};

export const initialValue: Descendant[] = [
  {
    type: PARAGRAPH_STYLES.Paragraph,
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: PARAGRAPH_STYLES.H1,
    children: [{ text: 'Heading 1' }],
  },
  {
    type: PARAGRAPH_STYLES.H2,
    children: [{ text: 'Heading 2' }],
  },
  {
    type: PARAGRAPH_STYLES.Paragraph,
    children: [
      { text: 'Hello World! This is my paragraph inside a sample document.' },
      { text: 'Bold text.', bold: true, code: true },
      { text: 'Italic text.', italic: true },
      { text: 'Bold and underlined text.', bold: true, underline: true },
      { text: 'variableFoo', code: true },
    ],
  },
];
