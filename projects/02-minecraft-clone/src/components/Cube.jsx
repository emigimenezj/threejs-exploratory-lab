import { useBox } from '@react-three/cannon';
import * as textures from '../images/textures';

export function Cube({ id, position, texture }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    position
  }));

  const activeTexture = textures[texture];

  return (
    <mesh ref={ref}>
      <boxGeometry attach='geometry' />
      <meshStandardMaterial map={activeTexture} attach='material' />
    </mesh>
  );
}