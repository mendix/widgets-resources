import { createElement, ReactElement, ReactNode } from "react";
import classNames from "classnames";

interface GalleryProps<T> {
    className?: string;
    desktopItems: number;
    items: T[];
    itemRenderer: (
        renderWrapper: (children: ReactNode, className?: string, onClick?: () => void) => ReactElement,
        item: T
    ) => ReactNode;
    phoneItems: number;
    tabletItems: number;
}

export function Gallery<T>(props: GalleryProps<T>): ReactElement {
    return (
        <div
            className={classNames(
                "widget-gallery",
                props.className,
                `widget-gallery-lg-${props.desktopItems}`,
                `widget-gallery-md-${props.tabletItems}`,
                `widget-gallery-sm-${props.phoneItems}`
            )}
        >
            {props.items.map((item: T, index: number) =>
                props.itemRenderer((children, className, onClick) => {
                    return (
                        <div
                            key={`item_${index}`}
                            className={classNames("widget-gallery-item", className, {
                                "widget-gallery-clickable": !!onClick
                            })}
                            onClick={onClick}
                            onKeyDown={
                                onClick
                                    ? e => {
                                          if (e.key === "Enter" || e.key === " ") {
                                              e.preventDefault();
                                              onClick();
                                          }
                                      }
                                    : undefined
                            }
                            role={onClick ? "button" : undefined}
                            tabIndex={onClick ? 0 : undefined}
                        >
                            {children}
                        </div>
                    );
                }, item)
            )}
        </div>
    );
}
