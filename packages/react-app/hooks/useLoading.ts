import { useCallback, useState } from "react";

const useLoading = (state: boolean = false) => {
  const [isLoading, setIsLoading] = useState<boolean>(state);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setIsLoading(false);
  }, []);

  return { isLoading, startLoading, stopLoading };
};

export default useLoading;
