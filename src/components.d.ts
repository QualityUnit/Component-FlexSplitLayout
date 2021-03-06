/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface FlexResizer {
        "depth": number;
        "disabled": boolean;
        "name": string;
        "overrideIframe": boolean;
        "save": boolean;
    }
}
declare global {
    interface HTMLFlexResizerElement extends Components.FlexResizer, HTMLStencilElement {
    }
    var HTMLFlexResizerElement: {
        prototype: HTMLFlexResizerElement;
        new (): HTMLFlexResizerElement;
    };
    interface HTMLElementTagNameMap {
        "flex-resizer": HTMLFlexResizerElement;
    }
}
declare namespace LocalJSX {
    interface FlexResizer {
        "depth"?: number;
        "disabled"?: boolean;
        "name"?: string;
        "overrideIframe"?: boolean;
        "save"?: boolean;
    }
    interface IntrinsicElements {
        "flex-resizer": FlexResizer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "flex-resizer": LocalJSX.FlexResizer & JSXBase.HTMLAttributes<HTMLFlexResizerElement>;
        }
    }
}
