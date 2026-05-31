import { useState, useCallback } from 'react';

// In-memory storage (persists during session, resets on app restart)
// For a production app, replace with AsyncStorage or MMKV
const memoryStore: Record<string, string> = {};

export function useStorage<T>(key: string, initialValue: T): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = memoryStore[key];
    if (item) {
      try { return JSON.parse(item); } catch { return initialValue; }
    }
    return initialValue;
  });

  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    setStoredValue((prev) => {
      const newValue = value instanceof Function ? value(prev) : value;
      memoryStore[key] = JSON.stringify(newValue);
      return newValue;
    });
  }, [key]);

  return [storedValue, setValue];
}
