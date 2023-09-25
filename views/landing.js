kiss.app.defineView({
    id: "landing",
    meta: {
        url: {
            en: "https://pickaform.fr/en/landing",
            fr: "https://pickaform.fr/fr/landing"
        },
        title: {
            en: "Pickaform | Best no-code platform for your workflows",
            fr: "Pickaform | Meilleure plateforme no-code pour vos your workflows"
        },
        description: {
            en: `Boost all your business processes by combining no-code, forms, workflows and AI.`,
            fr: `Boostez tous vos processus métier en combinant no-code, formulaires, workflows et IA.`
        }
    },
    renderer: function (id, target) {
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
                en: `no-code + workflows + AI
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">superpowers</span>`,
                fr: `no-code + workflows + IA
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">super pouvoirs</span>`,
            },
            subtitleNocodeWorkflow: {
                en: "Pick a form or build one.<br>Connect your workflows.<br>Add a pinch of AI.",
                fr: "Choisissez vos formulaires.<br>Connectez vos workflows.<br>Ajoutez une pincée d'IA.",
            },
            titleFlexibility: {
                en: `no-code
                = <span class="text-highlight" style="background-color: #ed3757">flexibility</span>`,
                fr: `no-code
                = <span class="text-highlight" style="background-color: #ed3757">flexibilité</span>`,
            },
            subtitleFlexibility: {
                en: "One tool.<br>An infinity of use cases.",
                fr: "Un seul outil.<br>Des usages infinis.",
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
            },
            offer: {
                en: `<h1>Special offer <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 16px;">NoCode Summit</span></h1>
                <h2>If you purchase a subscription before October 30, 2023</h2>
                <h2>✔ free starter pack worth <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">1000€</span></ h2>
                <h2>✔ discount of <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">30%</span> on our services</span h2>
                <h2>✔ we build your prototype with you</h2>
                <h2>✔ we coach you on our methodology to create your processes</h2>
                <h2>✔ we coach you on NoCode design best practices</h2>

                <h2><a target="_new" href="https://www.nocode-summit.org/">Come see us on stand B2 in Paris, Station F, on October 10 and 11.</a></h2>`,
                fr:
                `<h1>Offre spéciale <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 16px;">NoCode Summit</span></h1>
                <h2>Si vous souscrivez un abonnement avant le 30 octobre 2023</h2>
                <h2>✔ pack de démarrage offert d'une valeur de <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">1000€</span></h2>
                <h2>✔ remise de <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">30%</span> sur nos prestations d'accompagnement.</h2>
                <h2>✔ nous construisons votre prototype avec vous</h2>
                <h2>✔ nous vous coachons sur notre méthodologie pour créer vos process</h2>
                <h2>✔ nous vous coachons sur les best practices de la conception NoCode</h2>

                <h2><a target="_new" href="https://www.nocode-summit.org/">Passez nous voir sur le stand B2 à Paris, Station F, les 10 et 11 octobre.</a></h2>`
            }
        })

        return createBlock({
            id,
            target,
            layout: "vertical",
            alignItems: "center",
            items: [
                // EVENT
                {
                    type: "html",
                    class: "offer",
                    html: t("offer")
                },

                // STRIP 1
                kiss.templates.title({
                    title: t("titlePitchline"),
                    subtitle: t("subtitlePitchline")
                }),
                kiss.templates.buttonCTA(t("getStarted")),
                kiss.templates.screenshot("workflow - business contracts - pickaform.webp"),

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
                kiss.templates.screenshot("midjourney integration - pickaform.webp"),

                // STRIP 4
                kiss.templates.title({
                    title: t("titleExperience"),
                    subtitle: t("subtitleExperience")
                }),
                kiss.templates.buttonCTA(t("bookDemo"), "contact"),

                // CUSTOMERS
                kiss.templates.screenshot("customer references - pickaform.webp"),
            ],

            methods: {
                _afterConnected() {
                    this.translateTo(kiss.language.current)
                },
                translateTo
            }
        })
    }
})

;