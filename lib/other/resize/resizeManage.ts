import resizeObserver from './resizeObserver';
import debounce from 'lodash-es/debounce';


type SizeType = { width: number; height: number };
type SizeFnType = (size?: SizeType) => void;
type OptionTypes = {
    debounceTime?: number;
    immediate?: boolean;
};

// type AnyFunction = (...args: any[]) => any;

interface ResizeElementOptionInterface {
    debounceTime?: number;
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
    immediate?: boolean;
}

const isHTMLElement = (obj: any) => {
    if (obj && window.HTMLElement) {
        return obj instanceof window.HTMLElement;
    }
    if (obj && obj.nodeType === 1) {
        return true;
    }
    return obj === window || obj === document;
};



const getNewCallback = function (cb: SizeFnType, options: ResizeElementOptionInterface) {
    if (typeof cb !== 'function') {
        throw new Error('callback is not function');
    }

    return debounce(cb, options.debounceTime, {
        leading: options.leading ?? false,
        trailing: options.trailing ?? true,
        maxWait: options.maxWait,
    });
};

const resizeElement = function (
    element: HTMLElement | null,
    callback: SizeFnType,
    options: OptionTypes = { debounceTime: 300, immediate: true },
) {
    if (!element || !isHTMLElement(element)) {
        throw new Error('element is not HTMLElement');
    }

    const newCallback = getNewCallback(callback, options);

    resizeObserver.observe(element, newCallback, options);

    return () => {
        resizeObserver.unobserve(element, newCallback);
    };
};

export type { OptionTypes, SizeType, SizeFnType, ResizeElementOptionInterface };
export { resizeElement };

export default resizeElement;
