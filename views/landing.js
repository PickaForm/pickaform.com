kiss.app.defineView("landing", function (id, target) {
    const texts = {
        title1: {
            en: `Best <span class="text-highlight" style="background-color: #00aaee">no-code</span> platform
                <br>
                for your <span class="text-highlight" style="background-color: #a1ed00">workflows</span>`,
            fr: `La meilleure plateforme <span class="text-highlight" style="background-color: #00aaee">no-code</span>
                <br>
                pour vos <span class="text-highlight" style="background-color: #a1ed00">workflows</span>`
        },
        subtitle1: {
            en: "Build your processes in minutes.<br>Collaborate instantly.",
            fr: "Créez vos workflows en quelques minutes.<br>Collaborez instantanément.",
        },
        title2: {
            en: `no-code + workflows
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">superpowers</span>`,
            fr: `no-code + workflows
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">super pouvoirs</span>`,
        },
        subtitle2: {
            en: "Pick a form or build one.<br>Connect your workflows.",
            fr: "Choisissez vos formulaires.<br>Connectez vos workflows.",
        },
        title3: {
            en: `no-code
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">flexibility</span>`,
            fr: `no-code
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">flexibilité</span>`,
        },
        subtitle3: {
            en: "One tool.<br>An infinity of use cases.",
            fr: "Un seul outil.<br>Des usages infinis.",
        },
        title4: {
            en: `you + Us
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">100% productivity</span>`,
            fr: `vous + Nous
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">100% productivité</span>`,
        },
        subtitle4: {
            en: "You are not alone.<br>We audit and deploy for you at lightspeed.",
            fr: "Vous n'êtes pas seul.<br>Nous auditons et déployons pour vous à la vitesse lumière.",
        },
        title5: {
            en: `+25 years of expertise in
                <br>
                process <span class="text-highlight" style="background-color: #ed3757">optimization</span>`,
            fr: `+25 ans d'expertise en
                <br>
                <span class="text-highlight" style="background-color: #ed3757">optimisation</span> des process métier`,
        },
        subtitle5: {
            en: "Our customers save time.<br>Do you want to know how?",
            fr: "Nos clients gagnent du temps.<br>Vous voulez savoir comment ?",
        }
    }

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        items: [
            // STRIP 1
            kiss.templates.title({
                title: t("title1", texts),
                subtitle: t("subtitle1", texts)
            }),
            kiss.templates.buttonCTA(),
            kiss.templates.screenshot("workflow - business contracts.webp", texts),

            // STRIP 2
            kiss.templates.title({
                title: t("title2", texts),
                subtitle: t("subtitle2", texts)
            }),
            kiss.templates.buttonCTA(),
            kiss.templates.screenshot("workflow - nocode.webp", texts),

            // STRIP 3
            kiss.templates.title({
                title: t("title3", texts),
                subtitle: t("subtitle3", texts)
            }),
            kiss.templates.buttonCTA(),
            kiss.templates.screenshot("nocode flexibility - pickaform.webp", texts),

            // STRIP 4
            kiss.templates.title({
                title: t("title4", texts),
                subtitle: t("subtitle4", texts)
            }),
            kiss.templates.buttonCTA(),
            kiss.templates.screenshot("we help you - pickaform.webp", texts),

            // STRIP 5
            kiss.templates.title({
                title: t("title5", texts),
                subtitle: t("subtitle5", texts)
            }),
            kiss.templates.buttonCTA(),
            kiss.templates.screenshot("active people in business process - pickaform.webp", texts),
        ],

        methods: {
            load() {
                this.texts = texts
            },
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;