import { KeyboardEvent } from 'react';
import { Descendant, Editor } from 'slate';
import isHotkey from 'is-hotkey';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import { toggleStyle } from './utils';

export const PARAGRAPH_STYLES = [
  'h1',
  'h2',
  'h3',
  'h4',
  'paragraph',
  'multiple',
] as const;

export const CHARACTER_STYLES = [
  { name: 'bold', icon: solid('bold') },
  { name: 'italic', icon: solid('italic') },
  { name: 'underline', icon: solid('underline') },
  { name: 'code', icon: solid('code') },
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

    if (isHotkey('mod+j', event)) {
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
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
  {
    type: 'h1',
    children: [{ text: 'Heading 1' }],
  },
  {
    type: 'h2',
    children: [{ text: 'Heading 2' }],
  },
  {
    type: 'paragraph',
    children: [
      { text: 'Hello World! This is my paragraph inside a sample document.' },
      { text: 'Bold text.', bold: true, code: true },
      { text: 'Italic text.', italic: true },
      { text: 'Bold and underlined text.', bold: true, underline: true },
      { text: 'variableFoo', code: true },
    ],
  },
];
