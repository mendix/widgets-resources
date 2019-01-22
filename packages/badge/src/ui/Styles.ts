import { StyleSheet } from "react-native";

export const styles: any = StyleSheet.create({
    flex: {
        flexDirection: "row"
    },
    badge: {
        borderRadius: 30,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5
    },
    label: {
        borderRadius: 4,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 3,
        paddingBottom: 3
    },
    labelText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    "badge-warning": {
        backgroundColor: "#F6BB42"
    },
    "badge-info": {
        backgroundColor: "#8AD4ED"
    },
    "badge-danger": {
        backgroundColor: "#D9534F"
    },
    "badge-success": {
        backgroundColor: "#8CC152"
    },
    "badge-primary": {
        backgroundColor: "#59C2E6"
    },
    "badge-default": {
        backgroundColor: "#ccc"
    },
    "label-warning": {
        color: "#FFFFFF"
    },
    "label-info": {
        color: "#FFFFFF"
    },
    "label-danger": {
        color: "#FFFFFF"
    },
    "label-success": {
        color: "#FFFFFF"
    },
    "label-primary": {
        color: "#FFFFFF"
    },
    "label-default": {
        color: "#000"
    }
});
