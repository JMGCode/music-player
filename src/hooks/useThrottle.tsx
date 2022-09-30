import { useRef } from "react";

const useThrottle = () => {
  const lastExecuted = useRef<number>(Date.now());
  const timeoutId = useRef<NodeJS.Timeout>();

  const dispatch = (callback: Function, interval = 1000, ...args: any) => {
    const currTime = Date.now();
    const timeSinceLastCall = currTime - lastExecuted.current;
    const delayRemaining = interval - timeSinceLastCall;

    if (delayRemaining < 0) {
      lastExecuted.current = Date.now();
      callback(...args);
    } else {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        callback(...args);
      }, delayRemaining);

      timeoutId.current = timerId;
    }
  };

  return dispatch;
};

export default useThrottle;
