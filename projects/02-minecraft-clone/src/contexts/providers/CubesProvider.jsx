import { CubesContext } from '..';

export function CubesProvider({ children }) {

  const cubes = [{
    id: 1,
    pos: [1, 1, 1],
    texture: 'dirt'
  }];

  return (
    <CubesContext.Provider value={cubes}>
      { children }
    </CubesContext.Provider>
  );
}