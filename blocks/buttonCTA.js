kiss.templates.buttonCTA = function (text, page) {
    return {
        text: text + " &nbsp;&nbsp; ➔",
        action: () => {
            if (page) {
                kiss.router.navigateTo({
                    content: "contact"
                })
            }
            else {
                const link = "https://app.pickaform.com/client/pickaform/index.html#ui=authentication-register&language=" + (kiss.language.current || "en")
                window.open(link, "_new")
            }
        },

        type: "button",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#a1ed00",
        boxShadowHover: "0 0 32px #a1ed00",
        color: "#ffffff",
        colorHover: "#000000",
        fontSize: "2vh",
        borderRadius: 10,
        borderWidth: 0,
        padding: "1vh 2vh",
        margin: "0 0 2vh 0"
    }
}

;