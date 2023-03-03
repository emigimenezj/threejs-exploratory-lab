import { Cube } from './Cube';



export function Cubes() {

  const cubes = [{
    id: 1,
    pos: [1, 1, 1],
    texture: 'dirt'
  }];

  return cubes.map( ({id, pos, texture}) => (
    <Cube
      key={id}
      position={pos}
      texture={texture}
    />
  ));
}
