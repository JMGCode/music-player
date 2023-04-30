import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<string>("");

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth } = window;
      let newBreakpoint = "";

      if (innerWidth >= 1200) {
        newBreakpoint = "xl";
      } else if (innerWidth >= 992) {
        newBreakpoint = "lg";
      } else if (innerWidth >= 768) {
        newBreakpoint = "md";
      } else if (innerWidth >= 576) {
        newBreakpoint = "sm";
      } else {
        newBreakpoint = "xs";
      }

      setBreakpoint(newBreakpoint);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return breakpoint;
};

export default useBreakpoint;
