import { BaseEditor, BaseText, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

type CustomElement = {
  type: string;
  children: CustomText[] | CustomElement[];
  url?: string;
};

type CustomText = BaseText & {
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  underline?: boolean;
};

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
