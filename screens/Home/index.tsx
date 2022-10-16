import { FC, useState } from 'react';

import Div from 'components/Div';

import Editor from 'containers/Editor';
import { initialValue } from 'containers/Editor/constants';

const Home: FC = () => {
  const [editorValue, setEditorValue] = useState(initialValue);

  return (
    <>
      <Div className="w-screen h-screen bg-gray-300">
        <Div className="container mx-auto py-10 bg-white h-full px-6 drop-shadow">
          <Editor value={editorValue} />
        </Div>
      </Div>
    </>
  );
};

export default Home;
