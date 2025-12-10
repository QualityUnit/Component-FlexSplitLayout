import { h } from "@stencil/core";
export class FlexResizer {
    constructor() {
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
        return h("div", { key: '4e2e9539fcfe4abdc147f7e6a24803bdcd46d6ca' });
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
    /**
     * Public method to refresh the component layout and restore saved sizes
     */
    async refresh() {
        this.initialize();
    }
    initialize() {
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
    connectedCallback() {
        this.initialize();
    }
    watchName(name) {
        this.localStorageKey = "flex-resizer-" + name;
        this.initialize();
    }
    watchDisabled(disabled) {
        let element = this.normalizeDepth();
        if (disabled) {
            this.a.style["flex-grow"] = null;
            this.b.style["flex-grow"] = null;
        }
        else {
            this.initialize();
        }
        element.style.display = disabled ? "none" : "block";
    }
    static get is() { return "flex-resizer"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "$": ["flex-resizer.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["flex-resizer.css"]
        };
    }
    static get properties() {
        return {
            "depth": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "depth",
                "defaultValue": "0"
            },
            "overrideIframe": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "override-iframe",
                "defaultValue": "true"
            },
            "name": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "name",
                "defaultValue": "\"\""
            },
            "save": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "save",
                "defaultValue": "true"
            },
            "disabled": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "attribute": "disabled",
                "defaultValue": "false"
            }
        };
    }
    static get methods() {
        return {
            "refresh": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Public method to refresh the component layout and restore saved sizes",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "name",
                "methodName": "watchName"
            }, {
                "propName": "disabled",
                "methodName": "watchDisabled"
            }];
    }
    static get listeners() {
        return [{
                "name": "mousedown",
                "method": "resizeStart",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "touchstart",
                "method": "resizeStart",
                "target": undefined,
                "capture": false,
                "passive": true
            }];
    }
}
//# sourceMappingURL=flex-resizer.js.map
