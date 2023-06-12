kiss.app.defineView("pricing", function(id, target) {
    const t = defineTexts(id, {
        title: {
            en: "Get the Right Plan for<br>Your Business Needs",
            fr: "Sélectionnez le plan adapté à vos besoins"
        },
        subtitle: {
            en: "Register and start your 14 days free trial.",
            fr: "Enregistrez vous et démarrer l'essai de 14 jours."
        },
        unlimitedForms: {
            en: "unlimited forms",
            fr: "formulaires illimités"
        },
        unlimitedWorkflows: {
            en: "unlimited workflows",
            fr: "workflows illimités"
        },
        userPerMonth: {
            en: "user /<br>month",
            fr: "utilisateur /<br>mois"
        },
        "Get started": {
            en: "Get started",
            fr: "Incription"
        },
        enterprisePlan: {
            en: `We have many other plans beyond that, and also on-premise versions beyond 100 users.
                <br>
                Please contact us for more informations:`,
            fr: `Nous avons des offres au-delà, et des versions on-premise à partir de 100 utilisateurs.
                <br>
                Contactez-nous pour plus d'informations :`
        },
        contactUs: {
            en: "Contact us",
            fr: "Contactez-nous"
        },
        
    })

    const plans = [
        {
            name: "Silver",
            users: 10,
            apps: 3,
            price: "15,00",
            storage: "10 GB Storage",
            color: "#00aaee"
        },
        {
            name: "Gold",
            users: 20,
            apps: 5,
            price: "12,50",
            storage: "20 GB Storage",
            color: "#8833ee"
        },
        {
            name: "Platinum",
            users: 50,
            apps: 10,
            price: "11,00",
            storage: "50 GB Storage",
            color: "#ed3757"
        }
    ]

    return createBlock({
        id,
        target,
        layout: "vertical",
        alignItems: "center",

        items: [
            kiss.templates.title({
                title: t("title"),
                subtitle: t("subtitle"),
            }),
            {
                type: "html",
                class: "pricing-table",
                html: kiss.templates.pricingTable(plans, t)
            },
            {
                type: "html",
                class: "pricing-enterprise",
                html: t("enterprisePlan")
            },
            kiss.templates.buttonCTA(t("contactUs"), "contact"),
            {
                height: 100
            }
        ],

        events: {
            click: (event) => {
                if (event.target.closest("div").classList.contains("pricing-plan-CTA")) {
                    document.location = kiss.global.pathPickaform + "/client/pickaform/index.html#ui=authentication-register"
                }
            }
        },

        methods: {
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;