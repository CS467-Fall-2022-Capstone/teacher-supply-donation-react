import { useState } from 'react'

// Custom Hook for LocalStorage
export const useLocalStorage = (keyName, defaultValue) => {
    const [storedValue, setStoredValue] = useState(() => {
      try {
        const value = localStorage.getItem(keyName);
        if (value) {
          // Return Teacher Auth JSON
          return JSON.parse(value);
        } else {
          // Return null if no user
          localStorage.setItem(keyName, JSON.stringify(defaultValue));
          return defaultValue;
        }
      } catch (err) {
        return defaultValue;
      }
    });
    const setValue = (newValue) => {
      try {
        localStorage.setItem(keyName, JSON.stringify(newValue));
      } catch (err) {}
      setStoredValue(newValue);
    };
    return [storedValue, setValue];
  };