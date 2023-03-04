import { CubesContext } from '..';

export function CubesProvider({ children }) {

  const initialState = {
      cubes: [{
      id: 1,
      pos: [1, 1, 1],
      texture: 'dirt'
    }, {
      id: 2,
      pos: [1, 5, 1],
      texture: 'log'
    }],
    addCube: (x, y, z) => {
      set
    },
    removeCube: () => {},
    setTexture: () => {},
    saveWorld: () => {},
    resetWorld: () => {},
  };

  return (
    <CubesContext.Provider value={initialState}>
      { children }
    </CubesContext.Provider>
  );
}