import { FC } from 'react';
import { Descendant } from 'slate';

import Editor from 'containers/Editor';
import { initialValue } from 'containers/Editor/constants';

import useLocalStorage from 'hooks/useLocalStorage';

import throttle from 'helpers/throttle';

const Home: FC = () => {
  const [editorValue, setEditorValue] = useLocalStorage('editor', initialValue);

  return (
    <>
      <div className="w-full h-full min-h-screen bg-gray-300">
        <div className="container mx-auto p-6 bg-white h-full drop-shadow">
          <Editor
            value={editorValue}
            onChange={throttle((value: Descendant[]) => setEditorValue(value))}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
