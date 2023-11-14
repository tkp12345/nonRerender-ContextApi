import {useRef} from "react";
import {useIsViewPort} from "@/src/hooks/use-is-view-port";


export function Test() {
    const ref1 = useRef<HTMLDivElement | null>(null);
    const ref2 = useRef<HTMLDivElement | null>(null);
    const isInViewport1 = useIsViewPort(ref1);
    console.log('isInViewport1: ', isInViewport1);

    const isInViewport2 = useIsViewPort(ref2);
    console.log('isInViewport2: ', isInViewport2);

    return (
        <div>
        <div className='w-full bg-green-500' ref={ref1!}>Top div {isInViewport1 && 'viewport  감지됬습니다 '}</div>

        <div style={{ height: '155rem' }} />

        <div ref={ref2!}>Bottom div {isInViewport2 && 'vireport  감지됬습니다'}</div>
        </div>
    );
}