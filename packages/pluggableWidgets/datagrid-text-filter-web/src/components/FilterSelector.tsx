import { createElement, ReactElement, RefObject, useEffect, useRef, useState } from "react";

const options = [
    { value: "contains", label: "Contains" },
    { value: "startsWith", label: "Starts with" },
    { value: "endsWith", label: "Ends with" },
    { value: "greater", label: "Greater" },
    { value: "greaterEqual", label: "Greater equal" },
    { value: "equal", label: "Equal" },
    { value: "notEqual", label: "Not equal" },
    { value: "smaller", label: "Smaller" },
    { value: "smallerEqual", label: "Smaller equal" }
];

export function FilterSelector({ onChange }: { onChange: (value: string) => void }): ReactElement {
    const [value, setValue] = useState(options[0]);
    const [show, setShow] = useState(false);
    const listRef = useRef<HTMLUListElement>(null);
    useOnClickOutside(listRef, () => setShow(false));
    return (
        <div className="filter-selector">
            <div className="filter-selector-content">
                <button
                    className={`btn btn-default filter-selector-button ${value.value}`}
                    onClick={() => {
                        setShow(show => !show);
                    }}
                >
                    &nbsp;
                </button>
                {show && (
                    <ul className="filter-selectors" ref={listRef}>
                        {options.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => {
                                    setValue(option);
                                    onChange(option.value);
                                }}
                                className={value.value === option.value ? "filter-selected" : ""}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

export function useOnClickOutside(ref: RefObject<HTMLUListElement>, handler: () => void): void {
    useEffect(() => {
        const listener = (event: MouseEvent & { target: Node | null }): void => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler();
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}
