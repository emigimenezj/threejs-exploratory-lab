import { Sky } from '@react-three/drei';
import { Physics } from '@react-three/cannon';

import { Ground } from './components/Ground';
import { FPV as Fpv } from './components/FPV';
import { Player } from './components/Player';
import { Cubes } from './components/Cubes';

import { ForwardCanvas } from './contexts/ForwardCanvas';

function App() {

  return (
    <>
      <ForwardCanvas>
        <Sky sunPosition={[100,100,20]}/>
        <ambientLight intensity={0.5} />
        <Fpv />
        <Physics>
          <Player />
          <Cubes />
          <Ground /> 
        </Physics>
      </ForwardCanvas>
      <div className="pointer">+</div>
    </>
  );
}

export default App
