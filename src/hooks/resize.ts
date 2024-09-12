import resizeElement, { ResizeElementOptionInterface, SizeFnType } from "../other/resize/resizeManage";
import React from "react";

const useResize = (element: HTMLElement, cb: SizeFnType, options?: ResizeElementOptionInterface) => {

    const unResizeRef = React.useRef<() => void>(null);

    React.useCallback(() => {
        if (element) {
            unResizeRef.current = resizeElement(element, cb, options);
            return unResizeRef.current;
        }
        return () => {
            if (unResizeRef.current) {
                unResizeRef.current();
                unResizeRef.current = null;
            }
        };
    }, [element]);


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