import { useCallback, useState } from "react";

interface LightboxState {
    lightboxIsOpen: boolean;
    openLightbox: () => void;
    closeLightbox: () => void;
}

export const useLightboxState = (): LightboxState => {
    const [lightboxIsOpen, setLightboxIsOpen] = useState(false);

    const openLightbox = useCallback(() => {
        setLightboxIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setLightboxIsOpen(false);
    }, []);

    return { lightboxIsOpen, openLightbox, closeLightbox };
};
