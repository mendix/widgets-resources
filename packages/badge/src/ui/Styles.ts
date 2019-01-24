import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
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
    text: {
        fontSize: 15,
        fontWeight: "bold"
    },
    "background-warning": {
        backgroundColor: "#F6BB42"
    },
    "background-info": {
        backgroundColor: "#8AD4ED"
    },
    "background-danger": {
        backgroundColor: "#D9534F"
    },
    "background-success": {
        backgroundColor: "#8CC152"
    },
    "background-primary": {
        backgroundColor: "#59C2E6"
    },
    "background-default": {
        backgroundColor: "#ccc"
    },
    "text-warning": {
        color: "#FFFFFF"
    },
    "text-info": {
        color: "#FFFFFF"
    },
    "text-danger": {
        color: "#FFFFFF"
    },
    "text-success": {
        color: "#FFFFFF"
    },
    "text-primary": {
        color: "#FFFFFF"
    },
    "text-default": {
        color: "#000"
    }
});
