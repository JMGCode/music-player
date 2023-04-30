import { FC, createContext, useContext, useEffect, useState } from "react";

import useBreakpoint from "./hooks/useBreakpoint";

export const PlayerContext = createContext<boolean>(true);
export const PlayerUpdateContext = createContext<any | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export function usePlayer() {
  return useContext(PlayerContext);
}

export function usePlayerUpdate() {
  return useContext(PlayerUpdateContext);
}

const PlayerProvider: FC<Props> = ({ children }) => {
  const [state, setState] = useState<boolean>(false);
  const breakpoint = useBreakpoint();
  const mobile = ["sm", "xs"];

  useEffect(() => {
    if (!mobile.includes(breakpoint)) {
      setState(true);
    } else {
      setState(false);
    }
  }, [breakpoint]);

  const toogleState = () => {
    setState((prev) => !prev);
  };
  return (
    <PlayerContext.Provider value={state}>
      <PlayerUpdateContext.Provider value={toogleState}>
        {children}
      </PlayerUpdateContext.Provider>
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
