import {
    useContext,
    useState,
    createElement,
    useCallback,
    useMemo,
    createContext,
    CSSProperties,
    ReactElement,
    ReactNode,
    KeyboardEventHandler
} from "react";
import classNames from "classnames";

import "../ui/RadioButtons.scss";

export type RadioGroupValue = number | undefined;
export interface RadioGroupCtx {
    currentIndex: number;
    numberOfItems: number;
    focusElementWithValue: (value: RadioGroupValue) => void;
    radioGroupScope: string;
}

const RadioGroupContext = createContext<RadioGroupCtx>({
    currentIndex: 0,
    numberOfItems: 0,
    focusElementWithValue: () => null,
    radioGroupScope: ""
});

export interface RadioProps {
    children: ReactNode;
    disabled: boolean;
    index: number;
    label?: string;
    onChange: (index: number) => void;
}

export interface RadioGroupProps {
    children: Array<ReactElement<RadioProps>>;
    className?: string;
    name: string;
    currentIndex: number;
    numberOfItems: number;
    orientation: "horizontal" | "vertical";
    style?: CSSProperties;
}

export const RadioGroup = ({
    children,
    currentIndex,
    name,
    numberOfItems,
    orientation,
    className,
    style
}: RadioGroupProps): ReactElement => {
    const radioGroupScope = useMemo(() => `widget-radio-buttons-${name}`, [name]);

    const focusElementWithValue = useCallback(
        v => {
            const newValueInput: HTMLInputElement | null = document.querySelector(
                `input#${radioGroupScope}-radio-${v}`
            );
            if (newValueInput) {
                newValueInput.focus();
            }
        },
        [radioGroupScope]
    );

    const contextValues = useMemo(
        () => ({
            currentIndex,
            numberOfItems,
            focusElementWithValue,
            radioGroupScope
        }),
        [numberOfItems, focusElementWithValue, currentIndex, radioGroupScope]
    );

    return (
        <RadioGroupContext.Provider value={contextValues}>
            <div
                id={radioGroupScope}
                role="radiogroup"
                className={classNames("widget-radio-buttons", className, {
                    inline: orientation === "horizontal"
                })}
                style={style}
                data-mendix-radio-group
            >
                {children}
            </div>
        </RadioGroupContext.Provider>
    );
};

export const Radio = ({ label, children, disabled, index, onChange }: RadioProps): ReactElement => {
    const isFirstItem = index === 0;
    const [focus, setFocus] = useState(false);
    const { currentIndex, numberOfItems, focusElementWithValue, radioGroupScope } = useContext(RadioGroupContext);

    const handleKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
        event => {
            function changeValueTo(newIndex: number): void {
                onChange(newIndex);
                focusElementWithValue(newIndex);
                event.stopPropagation();
                event.preventDefault();
            }

            switch (event.key) {
                case " ":
                case "Enter":
                    changeValueTo(index);
                    break;
                case "Left":
                case "ArrowLeft":
                case "Up":
                case "ArrowUp":
                    changeValueTo(currentIndex === 0 ? numberOfItems - 1 : currentIndex - 1);
                    break;
                case "Down":
                case "ArrowDown":
                case "Right":
                case "ArrowRight":
                    changeValueTo(currentIndex === numberOfItems - 1 ? 0 : currentIndex + 1);
                    break;
                default:
                    break;
            }
        },
        [onChange, focusElementWithValue, index, currentIndex, numberOfItems]
    );

    const radioId = `${radioGroupScope}-radio-${index}`;

    return (
        <div className="radio" data-mendix-radio>
            <input
                aria-checked={currentIndex === index}
                aria-disabled={disabled}
                aria-label={label}
                checked={currentIndex === index}
                data-mendix-radio-focus={focus}
                data-radio-input
                disabled={disabled}
                id={radioId}
                onBlur={() => setFocus(false)}
                onChange={() => onChange(index)}
                onFocus={() => setFocus(true)}
                onKeyDown={handleKeyDown}
                tabIndex={(currentIndex === index || (currentIndex === -1 && isFirstItem)) && !disabled ? 0 : -1}
                value={index}
                type="radio"
            />
            <label htmlFor={radioId}>
                {label}
                {children}
            </label>
        </div>
    );
};
