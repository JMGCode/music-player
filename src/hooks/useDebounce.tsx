import { useState } from "react";

// const useDebounce = (callback: Function, delay = 1000) => {
//   const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();
//   return (...args: any) => {
//     if (timeoutId) clearTimeout(timeoutId);
//     const nTime = setTimeout(() => {
//       callback(...args);
//     }, delay);

//     setTimeoutId(nTime);
//   };
// };

const useDebounce = () => {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout>();

  const dispatch = (callback: Function, delay = 1000, ...args: any) => {
    if (timeoutId) clearTimeout(timeoutId);
    const timer = setTimeout(() => {
      callback();
    }, delay);
    setTimeoutId(timer);
  };

  return dispatch;
};
export default useDebounce;
