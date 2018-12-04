import { Component, ComponentType, createElement } from "react";
import { GoogleMapsProps } from "./GoogleMap";

export interface GoogleApiWrapperState {
    scriptsLoaded?: boolean;
    alertMessage?: string;
}

const googleApiWrapper = (script: string) => <P extends GoogleMapsProps>(wrappedComponent: ComponentType<P>) => {
    class GoogleApiWrapperComponent extends Component<P, GoogleApiWrapperState> {
        readonly state: GoogleApiWrapperState = { scriptsLoaded: false, alertMessage: "" };

        render() {
            const props = { ...this.state, ...this.props as GoogleMapsProps };

            return createElement(wrappedComponent, { ...props as any });
        }

        componentDidMount() {
            if (typeof window.google === "undefined") {
                this.loadScript(script);
            } else {
                this.setState({ scriptsLoaded: true });
            }
        }

        private addScript = (googleScript: string) => {
            const googleApiID = "_com.mendix.widget.custom.Maps.Maps";
            if (!(window as any)[googleApiID]) {
                (window as any)[googleApiID] = new Promise((resolve, reject) => {
                    const refNode = window.document.getElementsByTagName("script")[0];
                    const scriptElement = document.createElement("script");
                    scriptElement.async = true;
                    scriptElement.defer = true;
                    scriptElement.type = "text/javascript";
                    scriptElement.id = "googleScript";
                    scriptElement.src = googleScript + this.props.mapsToken + `&libraries=places`;
                    scriptElement.onerror = (err) => reject(`There is no internet connection ${err}`);
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
        }

        private loadScript = (googleScript: string) => {
            this.addScript(googleScript)
                .then(() => this.setState({ scriptsLoaded: true }))
                .catch((error: string) => this.setState({ alertMessage: `Failed due to ${error}` }));
        }

    }

    return GoogleApiWrapperComponent;
};

export default googleApiWrapper;
