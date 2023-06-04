kiss.app.defineView("landing", function (id, target) {
    const t = defineTexts(id, {
        titlePitchline: {
            en: `Best <span class="text-highlight" style="background-color: #00aaee">no-code</span> platform
                <br>
                for your <span class="text-highlight" style="background-color: #a1ed00">workflows</span>`,
            fr: `La meilleure plateforme <span class="text-highlight" style="background-color: #00aaee">no-code</span>
                <br>
                pour vos <span class="text-highlight" style="background-color: #a1ed00">workflows</span>`
        },
        subtitlePitchline: {
            en: "Build your processes in minutes.<br>Collaborate instantly.",
            fr: "Créez vos workflows en quelques minutes.<br>Collaborez instantanément.",
        },
        titleNocodeWorkflow: {
            en: `no-code + workflows
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">superpowers</span>`,
            fr: `no-code + workflows
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">super pouvoirs</span>`,
        },
        subtitleNocodeWorkflow: {
            en: "Pick a form or build one.<br>Connect your workflows.",
            fr: "Choisissez vos formulaires.<br>Connectez vos workflows.",
        },
        titleFlexibility: {
            en: `no-code
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">flexibility</span>`,
            fr: `no-code
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">flexibilité</span>`,
        },
        subtitleFlexibility: {
            en: "One tool.<br>An infinity of use cases.",
            fr: "Un seul outil.<br>Des usages infinis.",
        },
        titleCollaboration: {
            en: `you + Us
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">100% productivity</span>`,
            fr: `vous + Nous
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">100% productivité</span>`,
        },
        subtitleCollaboration: {
            en: "You are not alone.<br>We audit and deploy for you at lightspeed.",
            fr: "Vous n'êtes pas seul.<br>Nous auditons et déployons pour vous à la vitesse lumière.",
        },
        titleExperience: {
            en: `+25 years of expertise in
                <br>
                process <span class="text-highlight" style="background-color: #ed3757">optimization</span>`,
            fr: `+25 ans d'expertise en
                <br>
                <span class="text-highlight" style="background-color: #ed3757">optimisation</span> des process métier`,
        },
        subtitleExperience: {
            en: "Our customers save time.<br>Do you want to know how?",
            fr: "Nos clients gagnent du temps.<br>Vous voulez savoir comment ?",
        },
        getStarted: {
            en: "Get started",
            fr: "Démarrez maintenant"
        },
        bookDemo: {
            en: `OK, I'll get in touch`,
            fr: `OK, je prends contact`
        }
    })

    return createBlock({
        id,
        target,
        layout: "vertical",
        alignItems: "center",
        items: [
            // STRIP 1
            kiss.templates.title({
                title: t("titlePitchline"),
                subtitle: t("subtitlePitchline")
            }),
            kiss.templates.buttonCTA(t("getStarted")),
            kiss.templates.screenshot("workflow - business contracts.webp"),

            // STRIP 2
            kiss.templates.title({
                title: t("titleNocodeWorkflow"),
                subtitle: t("subtitleNocodeWorkflow")
            }),
            kiss.templates.buttonCTA(t("getStarted")),
            kiss.templates.screenshot("workflow - nocode.webp"),

            // STRIP 3
            kiss.templates.title({
                title: t("titleFlexibility"),
                subtitle: t("subtitleFlexibility")
            }),
            kiss.templates.buttonCTA(t("getStarted")),
            kiss.templates.screenshot("nocode flexibility - pickaform.webp"),

            // STRIP 4
            kiss.templates.title({
                title: t("titleCollaboration"),
                subtitle: t("subtitleCollaboration")
            }),
            kiss.templates.buttonCTA(t("getStarted")),
            kiss.templates.screenshot("we help you - pickaform.webp"),

            // STRIP 5
            kiss.templates.title({
                title: t("titleExperience"),
                subtitle: t("subtitleExperience")
            }),
            kiss.templates.buttonCTA(t("bookDemo"), "contact"),
            kiss.templates.screenshot("active people in business process - pickaform.webp"),
        ],

        methods: {
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;