import { useEffect } from "react";
import useNotification from "./useNotification";

type Callback = (value: any) => void;

const useValidation = (value: any, validator: Callback) => {
  const { notification, setErrorNotification, clearNotification } =
    useNotification();

  useEffect(() => {
    clearNotification();
    try {
      validator(value);
    } catch (error: any) {
      setErrorNotification(error.message);
    }
  }, [value]);

  return notification;
};

export default useValidation;
