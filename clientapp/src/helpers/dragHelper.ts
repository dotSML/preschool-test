import {useEffect} from 'react';

export function usePreventScroll(preventScrollRef: any) {
    useEffect(() => {
        const preventScrolling = (e: Event) => {
            if (preventScrollRef.current) {
                e.preventDefault()
            }
        }

        document.addEventListener('touchmove', preventScrolling, {
            passive: false,
        })
        return () => document.removeEventListener('touchmove', preventScrolling)
    }, [])
};

