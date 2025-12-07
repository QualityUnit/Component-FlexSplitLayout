import type { Components, JSX } from "../types/components";

interface FlexResizer extends Components.FlexResizer, HTMLElement {}
export const FlexResizer: {
    prototype: FlexResizer;
    new (): FlexResizer;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
