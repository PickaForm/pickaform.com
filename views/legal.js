kiss.app.defineView("legal", function (id, target) {
    return createBlock({
        id: id,
        target,
        layout: "horizontal",
        justifyContent: "center",

        items: [{
            type: "html",
            html: `
                PICKAFORM 2023 | Politique de confidentialité | Mentions légales
                <br>
                Impasse Faraday, 97490, Sainte-Marie, Réunion
                `
        }]
    })
})

;