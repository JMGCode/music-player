import { useEffect, useState } from "react";

const useObservableIntersection = (fn: any, options: any) => {
  const [observable, setObservable] = useState<IntersectionObserver>();

  useEffect(() => {
    const observer = new IntersectionObserver(fn, options);

    setObservable(observer);
    return () => observable?.disconnect();
  }, []);

  return observable;
};
export default useObservableIntersection;

/**
 * 
 *   var observer = new IntersectionObserver(
    function (entries) {
      if (entries[0].intersectionRatio === 0) {
        document
          .querySelector("#nav-container")
          ?.classList.add("nav-container-sticky");
      } else if (entries[0].intersectionRatio === 1) {
        document
          .querySelector("#nav-container")
          ?.classList.remove("nav-container-sticky");
      }
    },
    {
      threshold: 1,
    }
  );

  observer.observe(document.querySelector("#track-table"));
 */
