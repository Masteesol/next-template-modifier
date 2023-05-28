import { useState } from 'react';

const useLocalStorage = (key: string, initialValue: any) => {
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window !== 'undefined') {
            try {
                const item = window.localStorage.getItem(key);
                return item ? JSON.parse(item) : initialValue;
            } catch (error) {
                console.log(error);
                return initialValue;
            }
        } else {
            return initialValue;
        }
    });

    const setValue = (value: any) => {
        if (typeof window !== 'undefined') {
            try {
                setStoredValue(value);
                window.localStorage.setItem(key, JSON.stringify(value));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return [storedValue, setValue];
};

export default useLocalStorage;