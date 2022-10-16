import throttle from 'helpers/throttle';
import { useState } from 'react';

function useLocalStorage<T>(key: string, initialValue?: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const valueFromStorage = window.localStorage.getItem(key);

      return valueFromStorage ? JSON.parse(valueFromStorage) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = throttle((value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  });

  const resetValues = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(key);
    }
  };

  return [storedValue, setValue, resetValues] as const;
}

export default useLocalStorage;
