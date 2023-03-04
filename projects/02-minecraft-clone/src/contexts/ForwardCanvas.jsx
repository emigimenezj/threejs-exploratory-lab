import { Canvas } from '@react-three/fiber';

import { CubesProvider } from './providers/CubesProvider';
import { PlayerProvider } from './providers/PlayerProvider';

export function ForwardCanvas({ children }) {

  return (
    <Canvas>
      <CubesProvider>
        <PlayerProvider>
          { children }
        </PlayerProvider>
      </CubesProvider>
    </Canvas>
  );
}
