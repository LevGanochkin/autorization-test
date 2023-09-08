import { useState } from 'react';
import CustomButton from '../button';
import './App.css';
import Modal from '../modal/index';

function App() {
  const [stage, setStage] = useState<0 | 1 | 2>(0);

  return (
    <>
      <CustomButton type="button" title="Авторизация" onClick={() => setStage(1)} />
      <Modal stage={stage} setStage={setStage} />
    </>
  );
}

export default App;
