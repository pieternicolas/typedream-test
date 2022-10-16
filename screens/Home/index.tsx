import { FC } from 'react';
import { Descendant } from 'slate';

import Div from 'components/Div';

import Editor from 'containers/Editor';
import { initialValue } from 'containers/Editor/constants';

import useLocalStorage from 'hooks/useLocalStorage';

import throttle from 'helpers/throttle';

const Home: FC = () => {
  const [editorValue, setEditorValue] = useLocalStorage('editor', initialValue);

  return (
    <>
      <Div className="w-full h-full min-h-screen bg-gray-300">
        <Div className="container mx-auto p-6 bg-white h-full drop-shadow">
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
