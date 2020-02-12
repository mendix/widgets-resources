import { Component, ComponentType, createElement, ReactNode } from "react";
import { GoogleMapsProps } from "./GoogleMap";

export interface GoogleApiWrapperState {
    scriptsLoaded?: boolean;
    alertMessage?: string;
}

const googleApiWrapper: Function = (script: string) => <P extends GoogleMapsProps>(
    wrappedComponent: ComponentType<P>
) => {
    class GoogleApiWrapperComponent extends Component<P, GoogleApiWrapperState> {
        readonly state: GoogleApiWrapperState = { scriptsLoaded: false, alertMessage: "" };

        render(): ReactNode {
            if (!this.state.scriptsLoaded) {
                return null;
            }
            const props = { ...this.state, ...(this.props as GoogleMapsProps) };

            return createElement(wrappedComponent, { ...(props as any) });
        }

        componentDidMount(): void {
            if (typeof window.google === "undefined" || (window.google && typeof google.maps === "undefined")) {
                this.loadScript(script);
            } else {
                // eslint-disable-next-line react/no-did-mount-set-state
                this.setState({ scriptsLoaded: true });
            }
        }

        private addScript: Function = (googleScript: string): void => {
            const googleApiID = "_com.mendix.widget.custom.Maps.Maps";
            if (!(window as any)[googleApiID]) {
                (window as any)[googleApiID] = new Promise((resolve, reject) => {
                    const refNode = window.document.getElementsByTagName("script")[0];
                    const scriptElement = document.createElement("script");
                    scriptElement.async = true;
                    scriptElement.defer = true;
                    scriptElement.type = "text/javascript";
                    scriptElement.id = "googleScript";
                    scriptElement.src = googleScript + this.props.mapsToken + "&libraries=places";
                    scriptElement.onerror = error => reject(new Error(`There is no internet connection ${error}`));
                    scriptElement.onload = () => {
                        if (typeof google === "object" && typeof google.maps === "object") {
                            resolve();
                        }
                    };
                    if (refNode && refNode.parentNode) {
                        refNode.parentNode.insertBefore(scriptElement, refNode);
                    }
                });
            }

            return (window as any)[googleApiID];
        };

        private loadScript = (googleScript: string): void => {
            this.addScript(googleScript)
                .then(() => this.setState({ scriptsLoaded: true }))
                .catch((error: Error) =>
                    this.setState({ alertMessage: `Failed load external maps script, due to ${error.message}` })
                );
        };
    }

    return GoogleApiWrapperComponent;
};

export default googleApiWrapper;
