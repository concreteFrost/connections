import { useEffect, useRef } from "react";

const useGetValuesFromCache = (getFunc: () => void) => {
  const refreshInterval = 2000;
  const getFuncRef = useRef(getFunc);

  // Обновляем ref при каждом изменении getFunc
  useEffect(() => {
    getFuncRef.current = getFunc;
  }, [getFunc]);

  useEffect(() => {
    const refreshTimer = setInterval(() => {
      getFuncRef.current(); // Используем актуальную версию getFunc
    }, refreshInterval);

    return () => {
      clearInterval(refreshTimer);
    };
  }, [refreshInterval]);
};

export default useGetValuesFromCache;
