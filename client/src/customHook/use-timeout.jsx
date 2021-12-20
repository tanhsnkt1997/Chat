import { useEffect, useRef } from "react";

export const useTimeout = () => {
  const timeout = useRef();
  useEffect(
    () => () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
        timeout.current = null;
      }
    },
    []
  );
  return timeout;
};
