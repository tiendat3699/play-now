import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay: number): T {
    const [debounceValue, setDebounceValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebounceValue(value), delay);
        return () => clearTimeout(handler);
    });
    return debounceValue;
}

export default useDebounce;
