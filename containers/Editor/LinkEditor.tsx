import { FC, useRef, useEffect, useState, useCallback } from 'react';
import { BaseRange, Editor, Element, Transforms } from 'slate';
import { ReactEditor, useSlateStatic } from 'slate-react';
import isUrl from 'is-url';

import Button from 'components/Button';

interface LinkEditorProps {
  selectionForLink?: BaseRange;
  offsets?: {
    x: number;
    y: number;
  };
  justChangedLink?: () => void;
}

const LinkEditor: FC<LinkEditorProps> = ({
  offsets,
  selectionForLink,
  justChangedLink,
}) => {
  const editor = useSlateStatic();
  const linkEditorRef = useRef<HTMLDivElement>(null);

  const linkElement = Editor.above(editor, {
    at: selectionForLink,
    match: (n: any) => n.type === 'link',
  });
  const linkNode = linkElement?.[0] as Element;
  const linkPath = linkElement?.[1];

  const [linkURL, setLinkURL] = useState(linkNode.url);

  useEffect(() => {
    setLinkURL(linkNode.url);
  }, [linkNode]);

  useEffect(() => {
    const linkEditorEl = linkEditorRef.current;
    if (linkEditorEl == null) {
      return;
    }

    const linkDOMNode = ReactEditor.toDOMNode(editor, linkNode);
    const {
      x: nodeX,
      height: nodeHeight,
      y: nodeY,
    } = linkDOMNode.getBoundingClientRect();

    linkEditorEl.style.display = 'block';
    linkEditorEl.style.top = `${nodeY + nodeHeight - Number(offsets?.y)}px`;
    linkEditorEl.style.left = `${nodeX - Number(offsets?.x)}px`;
  }, [editor, offsets?.x, offsets?.y]);

  const onApplyClick = useCallback(() => {
    Transforms.setNodes(editor, { url: linkURL }, { at: linkPath });
    justChangedLink?.();
  }, [editor, linkURL, linkPath]);

  if (!offsets) {
    return <></>;
  }

  return (
    <>
      <div
        ref={linkEditorRef}
        className="test absolute p-2 z-20 bg-white border border-gray-400 rounded-md rounded-tl-none"
      >
        <input
          type="text"
          value={linkURL}
          className="py-2 px-3 border-2 rounded border-gray-600"
          onChange={(e) => setLinkURL(e.target.value)}
        />

        <Button
          className="ml-2 disabled:bg-gray-600 disabled:cursor-not-allowed"
          disabled={!isUrl(linkURL ?? '')}
          onClick={onApplyClick}
        >
          Apply
        </Button>
      </div>
    </>
  );
};

export default LinkEditor;
