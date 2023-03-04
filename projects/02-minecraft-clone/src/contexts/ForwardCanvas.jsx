import { Canvas } from '@react-three/fiber';

import { CubesProvider } from './providers/CubesProvider';

export function ForwardCanvas({ children }) {

  return (
    <Canvas>
      <CubesProvider>
          { children }
      </CubesProvider>
    </Canvas>
  );
}
