type sizeType = { width: number; height: number };
type sizeFnType = (size?: sizeType) => void;

type optionTypes = {
    immediate?: boolean;
};

class ResizeObserverClass {
    static instance: ResizeObserverClass;

    mapElement!: WeakMap<
        HTMLElement,
        {
            size?: sizeType;
            callback: sizeFnType[];
            immediate?: boolean;
        }
    >;

    observer!: ResizeObserver;

    constructor() {
        if (ResizeObserverClass.instance) {
            return ResizeObserverClass.instance;
        }
        ResizeObserverClass.instance = this;
        this.observer = new ResizeObserver(this.resizeElement);
        this.mapElement = new WeakMap();
    }

    isHTMLElement = (obj: any) => {
        if (obj && window.HTMLElement) {
            return obj instanceof window.HTMLElement;
        }
        if (obj && obj.nodeType === 1) {
            return true;
        }
        return obj === window || obj === document;
    };

    observe = (element: HTMLElement, callback: sizeFnType, options: optionTypes) => {
        if (!element || !this.isHTMLElement(element)) {
            throw new Error('element is not HTMLElement');
        }

        if (this.mapElement.has(element)) {
            this.mapElement.get(element)!.callback.push(callback);

            if (options?.immediate) {
                callback({
                    width: element.offsetWidth,
                    height: element.offsetHeight,
                });
            }
        } else {
            const info = {
                callback: [callback],
                immediate: !!options?.immediate,
            };
            this.mapElement.set(element, info);
            this.observer.observe(element, { box: 'border-box' });
        }
    };

    resizeElement = (entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.target) {
                const info = this.mapElement.get(entry.target);

                const needTrigger = (!info?.size && info?.immediate) || info?.size;

                info!.size = {
                    width: entry.target.offsetWidth,
                    height: entry.target.offsetHeight,
                };

                if (needTrigger) {
                  this.triggerCallback(entry.target);
                }
            }
        });
    };

    triggerCallback = (element: HTMLElement) => {
        const info = this.mapElement.get(element);
        if (info) {
            info.callback.forEach((callback) => {
                callback(info.size);
            });
        }
    };

    unobserve = (element: HTMLElement, callback: sizeFnType) => {
        const info = this.mapElement.get(element);
        if (info) {
            info.callback = info.callback.filter((item) => item !== callback);
            if (info.callback.length === 0) {
                this.observer.unobserve(element);
                this.mapElement.delete(element);
            }
        }
    };
}

const resizeObserver = new ResizeObserverClass();
ResizeObserverClass.instance = resizeObserver;

// (window as any).resizeObserver = resizeObserver;

Object.freeze(resizeObserver);
Object.freeze(ResizeObserverClass.instance);

export default resizeObserver;
