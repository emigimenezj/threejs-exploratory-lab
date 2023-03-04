import { PlayerContext } from '..';

export function PlayerProvider({ children }) {

  const data = 'hola';

  return (
    <PlayerContext.Provider value={data}>
      { children }
    </PlayerContext.Provider>
  );
}