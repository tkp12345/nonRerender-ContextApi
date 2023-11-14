import {useEffect, useMemo, useState} from "react";

export const useIsViewPort = (ref: React.RefObject<HTMLDivElement | null>) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
console.log('ref:',ref);
    const observer = useMemo(
        () =>
            new IntersectionObserver(([entry]) =>
                setIsIntersecting(entry.isIntersecting),
            ),
        [],
    );

    useEffect(() => {
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, observer]);

    return isIntersecting;
}