kiss.app.defineView("footer", function (id, target) {
    const blogUrl = kiss.global.path + "/" + kiss.language.current + "/blog"

    const t = defineTexts(id, {
        "Home": {
            en: "Home",
            fr: "Accueil"
        },
        "Product": {
            en: "Product",
            fr: "Produit"
        },
        "Pricing": {
            en: "Pricing",
            fr: "Pricing"
        },
        "Privacy": {
            en: "privacy policy",
            fr: "politique de confidentialité"
        },
        "Terms": {
            en: `terms of services`,
            fr: `mentions légales`
        },
        "Technology": {
            en: `technology`,
            fr: `technologie`
        },
        "AI Art": {
            en: "Midjourney integration",
            fr: "Intégration Midjourney"
        }
    })

    const entries = [
        // PRODUCT
        {
            title: "Site",
            items: [{
                    label: t("Home"),
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: t("Product"),
                    action: () => kiss.views.show("product", "content", true)
                },
                {
                    label: "Contact",
                    action: () => kiss.views.show("contact", "content", true)
                },
                {
                    label: "Blog",
                    action: () => kiss.views.show("blog", "content", true)
                },
                {
                    label: t("Pricing"),
                    action: () => kiss.views.show("pricing", "content", true)
                }
            ]
        },
        // LINKS
        {
            title: "Social",
            items: [
                {
                    label: "LinkedIn",
                    action: () => window.open("https://www.linkedin.com/company/pickaform-cloud/", "_new")
                },                {
                    label: "YouTube",
                    action: () => window.open("https://www.youtube.com/@pickaform", "_new")
                },
                {
                    label: "Facebook",
                    action: () => window.open("https://www.facebook.com/pickaform.applications", "_new")
                },
                {
                    label: "Twitter",
                    action: () => window.open("https://twitter.com/PickaForm", "_new")
                }
            ]
        },
        // TECH
        {
            title: t("Technology"),
            items: [
                {
                    label: "Powered by KissJS",
                    action: () => window.open("https://kissjs.net", "_new")
                },
                {
                    label: t("AI Art"),
                    action: () => kiss.views.show("artworks", "content", true)
                }
            ]
        },
        // LEGAL
        {
            title: "Legal",
            items: [
                {
                    label: t("Privacy"),
                    action: () => window.open(blogUrl + "/politique-de-confidentialite", "_new")
                },                {
                    label: t("Terms"),
                    action: () => window.open(blogUrl + "/mentions-legales", "_new")
                }
            ]
        }
    ]
    
    const blocks = entries.map(entry => kiss.templates.footerBlock({
        title: entry.title,
        entries: entry.items
    }))

    return createBlock({
        id,
        target,
        class: "footer",
        items: blocks,

        methods: {
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;