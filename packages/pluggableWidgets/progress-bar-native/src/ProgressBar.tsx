import { flattenStyles } from "@mendix/piw-native-utils-internal";
import { isAvailable } from "@mendix/piw-utils-internal";
import { createElement } from "react";
import { Text, View } from "react-native";
import { Bar } from "react-native-progress";

import { ProgressBarProps } from "../typings/ProgressBarProps";
import { defaultProgressBarStyle, ProgressBarStyle } from "./ui/Styles";

export type Props = ProgressBarProps<ProgressBarStyle>;

export function ProgressBar(props: ProgressBarProps<ProgressBarStyle>): JSX.Element {
    const styles = flattenStyles(defaultProgressBarStyle, props.style);

    const validate = (): string[] => {
        const messages: string[] = [];
        const { minimumValue, maximumValue, progressValue } = props;

        if (!isAvailable(minimumValue)) {
            messages.push("No minimum value provided.");
        }
        if (!isAvailable(maximumValue)) {
            messages.push("No maximum value provided.");
        }
        if (!isAvailable(progressValue)) {
            messages.push("No current value provided.");
        }
        return messages;
    };

    const calculateProgress = (): number => {
        const { minimumValue, maximumValue, progressValue } = props;

        if (
            !isAvailable(minimumValue) ||
            !isAvailable(maximumValue) ||
            !isAvailable(progressValue) ||
            minimumValue.value!.gte(maximumValue.value!)
        ) {
            return 0;
        }

        if (progressValue.value!.gt(maximumValue.value!)) {
            return 1;
        } else if (progressValue.value!.lt(minimumValue.value!)) {
            return 0;
        }
        const numerator = progressValue.value!.minus(minimumValue.value!);
        const denominator = maximumValue.value!.minus(minimumValue.value!);
        return Number(numerator.div(denominator));
    };

    const validationMessages = validate();
    const progress = calculateProgress();

    return (
        <View style={styles.container}>
            <Bar
                testID={props.name}
                height={Number(styles.bar.height)}
                width={null}
                progress={progress}
                color={styles.fill.backgroundColor}
                borderWidth={styles.bar.borderWidth}
                style={styles.bar}
            />
            {validationMessages.length > 0 && (
                <Text style={styles.validationMessage}>{validationMessages.join("\n")}</Text>
            )}
        </View>
    );
}
