import { Dimensions, ImageStyle, ImageURISource, Platform, TextStyle, ViewStyle } from "react-native";

// Gray Colors
export const gray = {
    darkest: "#222",
    darker: "#444",
    dark: "#666",
    regular: "#888",
    light: "#aaa",
    lighter: "#ccc",
    lightest: "#eee"
};

// Border Style
export const border = {
    color: "#ddd",
    radius: Platform.select({ ios: 10, android: 5 })
};

export const spacing = {
    smallest: 5,
    smaller: 10,
    small: 15,
    regular: 20,
    large: 25,
    larger: 30,
    largest: 40
};

// Brand Style
export const brand = {
    primary: "#0595DB",
    success: "#76CA02",
    warning: "#f99b1d",
    danger: "#ed1c24"
};

// Font Styles
export const font = {
    size: 16,
    sizeSmall: 12,
    sizeLarge: 18,
    sizeH1: 31,
    sizeH2: 26,
    sizeH3: 24,
    sizeH4: 18,
    sizeH5: 14,
    sizeH6: 12,
    color: gray.regular,
    weightLight: "100" as TextStyle["fontWeight"],
    weightNormal: "normal" as TextStyle["fontWeight"],
    weightSemiBold: "500" as TextStyle["fontWeight"],
    weightBold: "bold" as TextStyle["fontWeight"],
    family: Platform.select({ ios: "System", android: "normal" })
};

// Button Styles
export const button = {
    fontSize: font.size,
    fontFamily: font.family,
    borderRadius: Platform.select({ ios: border.radius + 16, android: border.radius }),

    primary: {
        color: "#FFF",
        borderColor: brand.primary,
        background: brand.primary,
        label: {
            color: brand.primary,
            fontSize: font.sizeLarge,
            fontFamily: font.family,
            marginTop: spacing.small,
            marginBottom: Platform.select({ ios: spacing.smallest, android: 0 }),
            marginLeft: Platform.select({ ios: 0, android: spacing.large }),
            alignSelf: Platform.select({
                ios: "center" as TextStyle["alignSelf"],
                android: "flex-end" as TextStyle["alignSelf"]
            }),
            fontWeight: font.weightNormal
        }
    }
};

export const TextArea: TextStyle = {
    fontSize: font.size,
    fontFamily: font.family,
    color: gray.dark,
    borderColor: gray.lightest,
    backgroundColor: "#FFF",
    padding: spacing.smaller,
    ...Platform.select({
        ios: {
            borderTopWidth: 1,
            borderLeftWidth: 0,
            borderBottomWidth: 1,
            borderRightWidth: 0
        },
        android: {
            borderWidth: 1,
            borderRadius: border.radius
        }
    }),
    height: 100,
    textAlignVertical: "top"
};

export const Toggle: InputType = {
    label: {
        color: gray.darker,
        fontFamily: font.family,
        fontSize: font.size
    },
    input: {
        margin: 0,
        padding: 0,
        marginRight: Platform.select({ ios: 0, android: -5 })
    }
};

interface InputType {
    label: TextStyle;
    input: TextStyle;
}

/**
 * Specific styles
 */

export const elementStyle: ViewStyle = {
    position: "absolute",
    right: 0,
    top: 0,
    marginTop: Dimensions.get("window").height / 2 - 100,
    zIndex: 9999
};

export const childElementStyle: ViewStyle = {
    flexDirection: "column",
    borderRadius: 7,
    backgroundColor: "#fff",
    shadowColor: "000",
    shadowOpacity: 0.3,
    shadowOffset: {
        width: 2,
        height: 5
    },
    elevation: 2.5
};

export const imageStyle: ImageStyle = {
    width: 30,
    height: 30,
    resizeMode: "contain",
    margin: 5
};

export const mendixLogo: ImageURISource = {
    uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAMAAAC5zwKfAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAHmUExURUdwTAiZ3QWV2wWW2waV2wWV2wWV3AeV2wWV2wWV2waV2z+//////wWV23///yqq/wWV2waW3hOc6w2h5AWV2waV3Aaa3Ryq4gWV3Qma4wWV2waV2wWV2wWV2wWW3AaW2wWV2wWV2zOZ/wWV2wub3QWV2wWV2wWV2wWV3AWW3AWV2weX3wWV2wWV2wWV3QWV2wWV3CS2/wWV2wWX2wWW3AWV2wWX2wWV2wWV2wWW3AaX3BKj7Aeb2xGZ3QWV2waW3A+W4QWV2waV3AWV2waW3AWV2wWV2wWV2wWV2wWV2wWV2wWV3AWZ2wWV2weV2wWW3QWV2wWV2waV2wWW2w+f3weX2wWV3AiY3gWV2wWV2wiV3gyd5gWV2wiZ3QWV2xei5wWW2wWW2waX2wqf3wWW3QWV2wWV2wWW2wWV2wWa2wWV2wWV3AWW3wWV2wWW3AWW2waW2wWV2waV2wWW3AaV2wWW3AaW3AWV2wWW3AiV2wea4B+f3weW2waV3QeY2wyZ5QWV2wWW2waV3AeX2wWV2wWV2weW3QaV3AaV2weW3AWV3AWW2wWV3AaW2waX3QmX4gmW3waV3AaV2weW4Q6b4gaV3wWV3QWV2wWV3AaX3QeV3VWq/wmc4QWW2waV2wWV3AiW3QWV243L8pYAAAChdFJOUwAe55fP84xBy+l0BAH+AgbeJw0TtpomCWMc9aXk91jR2v0FmBeC9PzbhLwg+IpcxJMHj2Vf5lbq3K9RDiQP7HwR45vrfcmW5YftgLcy721a8PKmyhBssT6r+j8V+zysC4jWTxhiwrNdVyv2YTFexYl62M6Zp2Z31YYdIQhrTUgUusDNQPnIaW97QpTusKNxGzh+ciISKS7gv1RqAxqQ0Lg9SEM3PAAAAs5JREFUWMPt1/VzGkEUB/AtgQBFEggSICShESDWuLu71t3d3VN3d2/ff1pY9h17TK8zud1OZzq8n/a7m/uwc1xuH4T8pcozxxerliy6aqlqMW7OU3Hl4/MgWPPj5Wmv2QQSytTMOLsXJJXXTsF6kFb1Sa8TJFYnIf4imWCRnxSD1ComHXLBDlIqFywlYblgmIDkyoJZMAv+v2D0RKjxrKcXY82tUKPXM7Yy8OIqVl6ofF5Az66G4vzkSqyui0bnXAzgG/5ZdT4CfWzGNaQCjXhE58beKMf1ugMAZQ1KtOWA6SuGffhCXcMm+uD34PA7rqG4arzE9xe2KggpY7bF6yy/qNQA1S3KVnUDVLAAP3FcSK+7ifEZaICEvL3js3PIsrk7HX/A9y/8FqOHWXrp0ARfJ5LFrcThRNzvV+4wwGd+i4+xmxkBLTBAP+qCEunqNYyrASYK0lt8guPjoAnO0bgBYyuNIQ6EsvQWH7DRzjFt8GGqo8B4ksbTPBg5hlv02NgoDtpgLY0LGEdpbOFBWIsJH8Hq8B/A3FTviDGHRoMKhLqMdnoTCIItbpW3BURBqOU9p1Ec3OziwPMgDsIpDiyRALb1cOBRCWCT6h7eFgbPOFXf8kZhcHvGc7hDEDyHv+dw9kqNEBi8zILHjNO7hMBXbGxO/1N3WQXAD+xta7cA3MD5JgHwExseSr7ZlUenRDf4EV9d7cmFPbjwSC8Yfc9G6+lCiXJ+PdUJjrKBuy11XSuudN/VBRbiqVTBLt/tVF+4UhDbgL3YJ8BBXOoZ0gNilSnfQTseVOS+CtxmZRWk0YHxCI0Ra0ZF0s/dBM71ZlviLJgF/yXokOs5iEEuaCAjcsF7yrtXUlUQn9Sb6PARMigTHEy8uvsH5HkD/cnDwGWV5VlZ7+0yyvGMPuV0nJwR52Ym+d/a7tmpoIgWnJp1Z561tsC0WWdNB5TTmfwCFodDv+xoX6wAAAAASUVORK5CYII="
};

export const commentIcon: ImageURISource = {
    uri:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAARCAYAAAA7bUf6AAAABmJLR0QA/wD/AP+gvaeTAAACIElEQVQ4jY2RT2xMURjFz7nv3akitZkRhIRpO9RKSGMhYiGNRCys6KJB4k8TM2nY2FRkIhFL0XSazobEBo0gWAiLSpPGBgsSbc2UFKGkJEil6XvvHouapKbecFY393zf7/tHVKmub3S9k98magmcHGiehKnGIexjVB1bESuPRH9poyL1AMwAuE/hqwALYhuA5YS6Z7OZq7EQv29sO2SukTodJJuvVFe1hfFWwBUJ3pvNNp1ZCCl+WGzD6VFJHWEuMxTXMnpKDdbDU4HHwmzT4HzLJILpPQSf1wQAQFfzdwjnCXVWW8YRaUAvagIqwSYaBriq+t8n+VHSpprZxZcrbWh3R0CS0k3bW9oc5JqfVWyiOJa0oRnxqK0zxzOv/0jOyyRS5XMCjmLuYu8FLAWxC9BEANuB7LpJAoDtLR0BcSrwTSs6G79VGLZQ7gdcU6BoP3ItX+bD/VSpm+TBwDNb5k7cO76TVAEmOgBn2gV8poIHor0TLopacHjDj79NaQvly4QmDAbkke4CoDVw3nVCP41QL1PXRvBGHAAAxOiSgDYfU28bAA7K4ET4qfER8nS/q+Qg+TUXTs9CiBjnJwqvWhz4MHacvIyfLN8CNWziILPZzAiF23bGu1vfU1q9YB/J8iES6TDixdhOAAAD8vypcjeFkxKGCE2CJg1oLYjHEPYGvkvXhlRUeLMigWiHiGUGmnTEOzq2O6iD0Nn/YvxLvwDrheEqQUGiCwAAAABJRU5ErkJggg=="
};

export const switchViewStyle: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Platform.select({ ios: spacing.smaller, android: spacing.smaller }),
    paddingHorizontal: Platform.select({ ios: spacing.smaller, android: 0 })
};

export const activityIndicatorStyle: ViewStyle = {
    marginBottom: Platform.select({ ios: spacing.small, android: 0 })
};

export const borderIos = Platform.select({ ios: { borderTopColor: gray.lightest, borderTopWidth: 1 }, android: {} });

export const buttonSeparatorStyle = Platform.select({
    ios: { backgroundColor: gray.lightest, width: 1 },
    android: {}
});
