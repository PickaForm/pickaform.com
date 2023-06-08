kiss.app.defineView("legal", function (id, target) {
    const blogUrl = kiss.global.path + "/" + kiss.language.current + "/blog"

    return createHtml({
        id: id,
        target,
        class: "footer-legal",
        html: `
            PICKAFORM 2023 | <a href="${blogUrl}/politique-de-confidentialite">Politique de confidentialité</a> | <a href="${blogUrl}/mentions-legales">Mentions légales</a>
            <br>
            Adresse: Impasse Faraday, 97490, Sainte-Marie, Réunion | SIRET: 83109916300014 | Email: contact@pickaform.com
            `
    })
})

;