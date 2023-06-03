kiss.templates.buttonCTA = function () {
    const texts = {
        getStarted: {
            en: "Get started &nbsp;",
            fr: "Démarrez maintenant &nbsp;"
        },        
        register: {
            en: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register&language=en",
            fr: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register&language=fr"
        }
    }

    return {
        text: t("getStarted") + " ➔",
        action: () => window.open(t("register", texts), "_new"),

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