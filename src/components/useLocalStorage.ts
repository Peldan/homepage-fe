import { useEffect, useState } from "react";

export function useLocalStorageState<T>(key: string, defaultValue: T) {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });
    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);
    return [value, setValue] as const;
}

function getStorageValue<T>(key: string, defaultValue: T) {
    const saved = localStorage.getItem(key);
    if (!saved) {
        return defaultValue;
    }
    const initial: T = JSON.parse(saved) as T;
    return initial;
}