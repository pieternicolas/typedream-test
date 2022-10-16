import { FC, useState } from 'react';

import Div from 'components/Div';

import Editor from 'containers/Editor';
import { initialValue } from 'containers/Editor/constants';

const Home: FC = () => {
  const [editorValue, setEditorValue] = useState(initialValue);

  return (
    <>
      <Div className="container mx-auto py-10">
        <Editor value={editorValue} />
      </Div>
    </>
  );
};

export default Home;
