import { by, element } from "detox";

export function TabContainer(testID: string) {
    return {
        getTabContainer() {
            return element(by.id(testID));
        },
        tab(tabName: string) {
            const tab = element(by.id(`${testID}$${tabName}`));

            return {
                getTab() {
                    return tab;
                },
                header() {
                    return element(by.id(`${testID}$${tabName}$tabHeader`));
                },
                async swipeLeft(speed?: Detox.Speed) {
                    await swipe("left", speed);
                },
                async swipeRight(speed?: Detox.Speed) {
                    await swipe("right", speed);
                }
            };

            async function swipe(direction: Detox.Direction, speed: Detox.Speed = "fast") {
                await element(by.id(`${testID}$sceneView`).withAncestor(by.id(`${testID}$${tabName}`))).swipe(
                    direction,
                    speed
                );
            }
        }
    };
}
