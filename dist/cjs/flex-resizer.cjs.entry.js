'use strict';

var index = require('./index-miHPKMQ3.js');

const flexResizerCss = () => `.sc-flex-resizer-h{display:block}div.sc-flex-resizer{height:100%;width:100%}.column-resizer.sc-flex-resizer{cursor:row-resize}.row-resizer.sc-flex-resizer{cursor:col-resize}`;

const FlexResizer = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.depth = 0;
        this.overrideIframe = true;
        this.name = "";
        this.save = true;
        this.disabled = false;
        this.resizing = false;
        this.direction = 1;
        this.localStorageKey = "flex-resizer-" + this.name;
        this.resizeStart = this.resizeStart.bind(this);
        this.resize = this.resize.bind(this);
        this.resizeEnd = this.resizeEnd.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    render() {
        return index.h("div", { key: '54788d664370c38a7af54555088dd2fc7b42fd22' });
    }
    resizeStart(event) {
        let element = this.normalizeDepth();
        this.a = element.previousElementSibling;
        this.b = element.nextElementSibling;
        if (this.a === null || this.resizing) {
            console.log("Nothing to resize");
            return;
        }
        this.totalFlexGrow = parseFloat(getComputedStyle(this.a)["flex-grow"]) + parseFloat(getComputedStyle(this.b)["flex-grow"]);
        this.aOriginalGrow = getComputedStyle(this.a)["flex-grow"];
        this.bOriginalGrow = getComputedStyle(this.b)["flex-grow"];
        if (this.totalFlexGrow === 0) {
            console.log("Cannot resize - no flex-grow");
            return;
        }
        let flexDirection = "" + getComputedStyle(element.parentElement).flexDirection;
        switch (flexDirection) {
            case "column-reverse":
            case "column":
                this.getElementSize = e => e.clientHeight;
                this.getPosition = e => e.screenY;
                break;
            case "row-reverse":
            default:
                this.getElementSize = e => e.clientWidth;
                this.getPosition = e => e.screenX;
        }
        this.direction = flexDirection.endsWith("-reverse") ? -1 : 1;
        this.psize = this.computeSize(this.a);
        this.startPos = this.getPosition(this.handleResizeEvent(event));
        this.resizeCurrentPos = this.startPos;
        this.nsize = this.computeSize(this.b);
        this.totalHeight = this.psize + this.nsize;
        document.body.style.cursor = this.cursor;
        this.resizing = true;
        event.preventDefault();
        if (this.overrideIframe) {
            for (let iframe of document.getElementsByTagName("iframe")) {
                iframe.style.pointerEvents = "none";
            }
        }
        window.addEventListener("mousemove", this.resize);
        window.addEventListener("touchmove", this.resize);
        window.addEventListener("mouseup", this.resizeEnd);
        window.addEventListener("touchend", this.resizeEnd);
        window.addEventListener("keydown", this.handleKeyDown);
    }
    handleKeyDown(ev) {
        if (ev.key === "Escape") {
            this.cancelResize();
        }
    }
    cancelResize() {
        this.a.style["flex-grow"] = this.aOriginalGrow;
        this.b.style["flex-grow"] = this.bOriginalGrow;
        this.resizeEnd();
    }
    resizeEnd() {
        if (this.save) {
            localStorage.setItem(this.localStorageKey + "a", this.a.style["flex-grow"]);
            localStorage.setItem(this.localStorageKey + "b", this.b.style["flex-grow"]);
        }
        window.removeEventListener("mousemove", this.resize);
        window.removeEventListener("mouseup", this.resizeEnd);
        window.removeEventListener("keydown", this.handleKeyDown);
        window.removeEventListener("touchmove", this.resize);
        window.removeEventListener("touchend", this.resizeEnd);
        this.resizing = false;
        document.body.style.cursor = 'default';
        if (this.overrideIframe) {
            for (let iframe of document.getElementsByTagName("iframe")) {
                iframe.style.pointerEvents = "auto";
            }
        }
    }
    resize(event) {
        event.preventDefault();
        let pos = this.getPosition(this.handleResizeEvent(event));
        let delta = (pos - this.resizeCurrentPos) * this.direction;
        this.psize += delta;
        this.nsize -= delta;
        if (this.psize < 0) {
            this.nsize += this.psize;
            pos -= this.psize;
            this.psize = 0;
        }
        if (this.nsize < 0) {
            this.psize += this.nsize;
            pos += this.nsize;
            this.nsize = 0;
        }
        let prevGrowNew = this.totalFlexGrow * (this.psize / (this.totalHeight));
        let nextGrowNew = this.totalFlexGrow * (this.nsize / (this.totalHeight));
        this.resizeCurrentPos = pos;
        this.a.style["flex-grow"] = prevGrowNew;
        this.b.style["flex-grow"] = nextGrowNew;
    }
    computeSize(element) {
        let style = getComputedStyle(element);
        let delta = 0;
        let basis = "" + style["flex-basis"];
        let value = parseFloat(basis);
        if (basis.endsWith("px")) {
            delta -= value;
        }
        if (basis.endsWith("%")) {
            delta -= this.getElementSize(element.parentElement) * value / 100;
        }
        return this.getElementSize(element) + delta;
    }
    handleResizeEvent(event) {
        if (window.TouchEvent && event instanceof TouchEvent) {
            return event.touches.item(0);
        }
        if (window.MouseEvent && event instanceof MouseEvent) {
            return event;
        }
    }
    normalizeDepth() {
        let element = this.el;
        for (let i = 0; i < this.depth; i++) {
            element = element.parentElement;
        }
        return element;
    }
    connectedCallback() {
        const element = this.normalizeDepth();
        if (getComputedStyle(element.parentElement)["flex-direction"] == "column" || getComputedStyle(element.parentElement)["flex-direction"] == "column-reverse") {
            this.el.classList.remove("row-resizer");
            this.el.classList.add("column-resizer");
            this.cursor = "row-resize";
        }
        else {
            this.el.classList.remove("column-resizer");
            this.el.classList.add("row-resizer");
            this.cursor = "col-resize";
        }
        if (this.disabled) {
            element.style.display = "none";
            return;
        }
        this.a = element.previousElementSibling;
        this.b = element.nextElementSibling;
        let savedA = localStorage.getItem(this.localStorageKey + "a");
        if (savedA == null || !this.save) {
            return;
        }
        this.a.style["flex-grow"] = savedA;
        this.b.style["flex-grow"] = localStorage.getItem(this.localStorageKey + "b");
    }
    watchName(name) {
        this.localStorageKey = "flex-resizer-" + name;
        this.connectedCallback();
    }
    watchDisabled(disabled) {
        let element = this.normalizeDepth();
        if (disabled) {
            this.a.style["flex-grow"] = null;
            this.b.style["flex-grow"] = null;
        }
        else {
            this.connectedCallback();
        }
        element.style.display = disabled ? "none" : "block";
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "name": ["watchName"],
        "disabled": ["watchDisabled"]
    }; }
};
FlexResizer.style = flexResizerCss();

exports.flex_resizer = FlexResizer;
//# sourceMappingURL=flex-resizer.entry.cjs.js.map
