import { useState, useCallback } from "react";
import { debounce } from "lodash";

export const useDebounce = (defaultValue, delay = 500, options = defaultOptions) => {
  const [value, setValueImmediately] = useState(defaultValue);
  const [debouncing, setDebouncing] = useState(false);
  const [signal, setSignal] = useState(Date.now());

  const setValue = useCallback((value) => {
    setValueImmediately(value);
    setDebouncing(true);
    triggerUpdate();
  }, []);

  const triggerUpdate = useCallback(
    debounce(
      () => {
        setDebouncing(false);
        setSignal(Date.now());
      },
      delay,
      options
    ),
    []
  );

  return [
    value,
    setValue,
    {
      signal,
      debouncing,
    },
  ];
};

const defaultOptions = { leading: false, trailing: true };
