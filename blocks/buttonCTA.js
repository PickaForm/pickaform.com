kiss.templates.buttonCTA = function (text) {
    return {
        text: text + " &nbsp;&nbsp; ➔",
        action: () => {
            const link = "https://app.pickaform.com/client/pickaform/index.html#ui=authentication-register&language=" + (kiss.language.current || "en")
            window.open(link, "_new")
        },

        type: "button",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#a1ed00",
        boxShadowHover: "0 0 32px #a1ed00",
        color: "#ffffff",
        colorHover: "#000000",
        fontSize: "2.5vh",
        iconSize: "2.5vh",
        icon: "fas fa-arrow-right",
        iconPosition: "right",
        iconColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 0,
        animation: "zoomIn",
        padding: "1vh 0 1vh 3vh"
    }
}

;