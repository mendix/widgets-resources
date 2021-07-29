export function registerSidebarToggle(toggle: () => void): () => void {
    const sidebarToggleLocation = "com.mendix.widgets.web.sidebar.toggle";

    if ((window as any)[sidebarToggleLocation]) {
        throw Error(
            "Multiple sidebar widgets on a page isn't supported. Please model your page in such a way that there is just one sidebar."
        );
    }

    (window as any)[sidebarToggleLocation] = toggle;

    return () => ((window as any)[sidebarToggleLocation] = undefined);
}
