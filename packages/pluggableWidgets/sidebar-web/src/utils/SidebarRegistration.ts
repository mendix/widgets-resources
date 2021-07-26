export interface SidebarRegistration {
    name: string;
    toggleExpanded: () => void;
}

export function registerSidebar(registration: SidebarRegistration): () => void {
    const registerLocation = "com.mendix.widgets.web.sidebar.register";

    if (!(window as any)[registerLocation]) {
        (window as any)[registerLocation] = new Map();
    }

    // Widget names aren't unique, so we need to check
    if ((window as any)[registerLocation].has(registration.name)) {
        throw Error(
            "There are multiple sidebar widgets on this page that have the same name. Please give every sidebar a unique name."
        );
    }

    (window as any)[registerLocation].set(registration.name, registration.toggleExpanded);

    return () => (window as any)[registerLocation].delete(registration.name);
}
