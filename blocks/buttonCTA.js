kiss.templates.buttonCTA = function ({
    text,
    action
}) {
    return {
        text,
        action,

        type: "button",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#a1ed00",
        color: "#ffffff",
        fontSize: "2.5vh",
        iconSize: "2.5vh",
        icon: "fas fa-arrow-right",
        iconPosition: "right",
        iconColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 0,
        animation: "zoomIn",
        padding: "1vh 3vh"
    }
}

;