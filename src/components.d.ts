/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface GoogleMapComponent {
        "apiKey": string;
    }
}
declare global {
    interface HTMLGoogleMapComponentElement extends Components.GoogleMapComponent, HTMLStencilElement {
    }
    var HTMLGoogleMapComponentElement: {
        prototype: HTMLGoogleMapComponentElement;
        new (): HTMLGoogleMapComponentElement;
    };
    interface HTMLElementTagNameMap {
        "google-map-component": HTMLGoogleMapComponentElement;
    }
}
declare namespace LocalJSX {
    interface GoogleMapComponent {
        "apiKey"?: string;
    }
    interface IntrinsicElements {
        "google-map-component": GoogleMapComponent;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "google-map-component": LocalJSX.GoogleMapComponent & JSXBase.HTMLAttributes<HTMLGoogleMapComponentElement>;
        }
    }
}
