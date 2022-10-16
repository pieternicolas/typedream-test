import { FC, useState } from 'react';
import { Descendant } from 'slate';

import Div from 'components/Div';

import Editor from 'containers/Editor';
import { initialValue } from 'containers/Editor/constants';

import throttle from 'helpers/throttle';

const Home: FC = () => {
  const [editorValue, setEditorValue] = useState(initialValue);

  return (
    <>
      <Div className="w-screen h-screen bg-gray-300">
        <Div className="container mx-auto py-10 bg-white h-full px-6 drop-shadow">
          <Editor
            value={editorValue}
            onChange={throttle((value: Descendant[]) => setEditorValue(value))}
          />
        </Div>
      </Div>
    </>
  );
};

export default Home;
