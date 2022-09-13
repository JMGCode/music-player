import { useState } from "react";

const useThrottle = (callback: Function, delay = 1000) => {
  const [shouldWait, setShouldWait] = useState(false);
  const [waitingArgs, setWaitingArgs] = useState<any>(null);

  const timeoutFunc = () => {
    if (waitingArgs == null) {
      setShouldWait(false);
    } else {
      callback(waitingArgs);
      setWaitingArgs(null);
      setShouldWait(false);
      setTimeout(timeoutFunc, delay);
    }
  };

  return (...args: any) => {
    if (shouldWait) {
      setWaitingArgs(args);
      return;
    }

    callback(...args);
    setShouldWait(true);

    setTimeout(timeoutFunc, delay);
  };
};

export default useThrottle;
