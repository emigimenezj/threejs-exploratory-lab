import { useContext } from 'react';
import { CubesContext } from '../contexts';

import { Cube } from './Cube';

export function Cubes() {

  const { cubes } = useContext(CubesContext);

  return cubes.map( ({id, pos, texture}) => (
    <Cube
      key={id}
      position={pos}
      texture={texture}
    />
  ));
}
