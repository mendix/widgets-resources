import { Widget } from "./Helpers";

export function NativeHomePage() {
    return {
        async goToWidgetsHomePage() {
            await Widget("bottomBarItem$Widgets").getElement().tap();
        }
    };
}
