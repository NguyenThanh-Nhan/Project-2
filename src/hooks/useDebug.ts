import { useState, useEffect } from "react";

/**
 *
 * @param value String
 * @param delay Time delay
 * @returns String
 */

function useDebug(value: string, delay: number) {
  const [debugValue, setDebugValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebugValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debugValue;
}

export default useDebug;
