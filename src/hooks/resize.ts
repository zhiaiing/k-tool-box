import resizeElement, { ResizeElementOptionInterface, SizeFnType } from "../other/resize/resizeManage";
import React from "react";

const useResize = (target: HTMLElement | { current?: HTMLElement }, cb: SizeFnType, options?: ResizeElementOptionInterface) => {

    const unResizeRef = React.useRef<() => void>(null);

    React.useLayoutEffect(() => {
        const targetEl = (target && 'current' in target ? target.current : target) as HTMLElement;
        if (targetEl) {
            unResizeRef.current = resizeElement(targetEl, cb, options);
        }
        return () => {
            if (unResizeRef.current) {
                unResizeRef.current();
                unResizeRef.current = null;
            }
        };
    }, [target, cb, options]);


    React.useEffect(() => {
        return () => {
            if (unResizeRef.current) {
                unResizeRef.current();
                unResizeRef.current = null;
            }
        }
    }, [])
}

export default useResize;