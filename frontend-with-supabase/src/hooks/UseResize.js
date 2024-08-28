import React, { useEffect, useState } from "react";

const useResize = () => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // clean up function
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export default useResize;
