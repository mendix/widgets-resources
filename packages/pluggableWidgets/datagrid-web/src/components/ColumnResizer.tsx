import { createElement, ReactElement, useCallback, useEffect, useRef, useState, MouseEvent, TouchEvent } from "react";

export function ColumnResizer({
    minWidth = 50,
    setColumnWidth
}: {
    minWidth?: number;
    setColumnWidth: (width: number) => void;
}): ReactElement {
    const [isResizing, setIsResizing] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [currentWidth, setCurrentWidth] = useState(0);
    const resizerReference = useRef<HTMLDivElement>(null);

    const onStartDrag = useCallback(
        (e: TouchEvent<HTMLDivElement> & MouseEvent<HTMLDivElement>): void => {
            const mouseX = e.touches ? e.touches[0].screenX : e.screenX;
            setStartPosition(mouseX);
            setIsResizing(true);
            if (resizerReference.current) {
                const column = resizerReference.current.parentElement as HTMLDivElement;
                setCurrentWidth(column.clientWidth);
            }
        },
        [resizerReference.current]
    );
    const onEndDrag = useCallback((): void => {
        setIsResizing(false);
        setCurrentWidth(0);
    }, []);
    const onMouseMove = useCallback(
        (e: TouchEvent & MouseEvent & Event): void => {
            if (!isResizing) {
                return;
            }
            const mouseX = e.touches ? e.touches[0].screenX : e.screenX;

            if (currentWidth) {
                const moveDifference = startPosition - mouseX;
                let newWidth = currentWidth - moveDifference;
                if (newWidth < minWidth) {
                    newWidth = minWidth;
                }
                setColumnWidth(newWidth);
            }
        },
        [isResizing, currentWidth, startPosition]
    );

    useEffect(() => {
        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onEndDrag);

        document.addEventListener("touchmove", onMouseMove);
        document.addEventListener("touchend", onEndDrag);
        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onEndDrag);

            document.removeEventListener("touchmove", onMouseMove);
            document.removeEventListener("touchend", onEndDrag);
        };
    }, [isResizing, resizerReference.current]); // Required dependencies because of the callback's references

    return (
        <div ref={resizerReference} onMouseDown={onStartDrag} onTouchStart={onStartDrag} className="column-resizer">
            <div className="column-resizer-bar" />
        </div>
    );
}
