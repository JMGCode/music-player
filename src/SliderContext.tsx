import { FC, createContext, useContext, useEffect, useState } from "react";

import useBreakpoint from "./hooks/useBreakpoint";

export const SiderContext = createContext<boolean>(true);
export const SiderUpdateContext = createContext<any | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export function useSider() {
  return useContext(SiderContext);
}

export function useSiderUpdate() {
  return useContext(SiderUpdateContext);
}

const SiderProvider: FC<Props> = ({ children }) => {
  const breakpoint = useBreakpoint();
  const mobile = ["sm", "xs"];
  const [state, setState] = useState<boolean>(window.innerWidth > 768);

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
    <SiderContext.Provider value={state}>
      <SiderUpdateContext.Provider value={toogleState}>
        {children}
      </SiderUpdateContext.Provider>
    </SiderContext.Provider>
  );
};

export default SiderProvider;
