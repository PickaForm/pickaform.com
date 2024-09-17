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
                en: `no-code
                <br>+ Business Process Management
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">superpowers</span>`,
                fr: `no-code
                <br>+ Business Process Management
                <br>
                = <span class="text-highlight" style="background-color: #ed3757">super pouvoirs</span>`,
            },
            subtitleNocodeWorkflow: {
                en: "Pick a form or build one.<br>Connect your process.",
                fr: "Choisissez vos formulaires.<br>Connectez vos workflows.",
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
                en: `I book a demo`,
                fr: `Je réserve une démo`
            },
            getInTouch: {
                en: `OK, I'll get in touch`,
                fr: `OK, je prends contact`
            },
            offer: {
                en:
                `<h1>Special offer <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 16px;">NoCode Summit 2024</span></h1>
                <h2>Come see us on October 16 and 17 in Paris, Station F</h2>
                <h2>If you purchase a subscription before October 30, 2024</h2>
                <h2>✔ discount of <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">30%</span> on our services</span h2>
                <h2>✔ we build your prototype with you</h2>
                <h2>✔ we coach you on our methodology to create your processes</h2>
                <h2>✔ we coach you on NoCode design best practices</h2>

                <center>
                    <a href="https://calendly.com/pickaform/pickaform-live-demo">
                        <div class="a-button button-booking">Book your private demo now to benefit from this unique offer!</div>
                    </a>
                </center>`,
                fr:
                `<h1>Offre spéciale <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 16px;">NoCode Summit 2024</span></h1>
                <h2>Venez nous voir les 16 et 17 octobre à Paris, Station F</h2>
                <h2>Si vous souscrivez un abonnement avant le 30 octobre 2024</h2>
                <h2>✔ remise de <span class="text-highlight" style="color: black; background-color: #ffffff; padding: 5px;">30%</span> sur nos prestations d'accompagnement.</h2>
                <h2>✔ nous construisons votre prototype avec vous</h2>
                <h2>✔ nous vous coachons sur notre méthodologie pour créer vos process</h2>
                <h2>✔ nous vous coachons sur les best practices de la conception NoCode</h2>
                              
                <center>
                    <a href="https://calendly.com/pickaform/pickaform-live-demo">
                        <div class="a-button button-booking">Réservez votre démo privée dès maintenant pour bénéficier de cette offre unique !</div>
                    </a>
                </center>`
            },
            titleWhy: {
                en: `Why Pickaform?`,
                fr: `Pourquoi Pickaform ?`
            },
            subtitleWhy: {
                en: `Simply best suited for
                    <br><span class="text-highlight" style="background-color: #00aaee">enterprises</span>`,
                fr: `Simplement la plus adaptée aux
                    <br><span class="text-highlight" style="background-color: #00aaee">entreprises</span>`
            },
            compareTo: {
                en: `Compare to`,
                fr: `Comparer à`
            },
            pickaform: {
                en: `
                    <br>✔ Rich form layout
                    <br>✔ Integrated workflow engine (BPM)
                    <br>✔ Integrated PDF generation
                    <br>✔ Very fast and stable
                    <br>✔ Cloud + self-hosted deployments
                    <br>✔ Hosted in France
                    <br>✔ GDPR
                    <br>✔ Competitive pricing
                    <br>✔ English, French, Spanish & more coming
                    <br>✅ Good for all company sizes and budgets
                    `,
                fr: `
                    <br>✔ Mise en page de formulaire riche
                    <br>✔ Moteur de workflow intégré (BPM)
                    <br>✔ Génération de PDF intégrée
                    <br>✔ Très rapide et très stable
                    <br>✔ Validé par de grandes entreprises
                    <br>✔ Déploiements cloud et on-premise
                    <br>✔ Hébergé en France
                    <br>✔ RGPD
                    <br>✔ Tarification compétitive
                    <br>✔ Anglais, français, espagnol et plus à venir
                    <br>✅ Bon pour toutes les tailles d'entreprises et de budgets
                `,

            },
            airtable: {
                en: `
                    <br>❌ Cloud only
                    <br>❌ Poor security model
                    <br>❌ Basic form layout, no sections, no columns
                    <br>❌ No workflow engine (BPM)
                    <br>❌ No native PDF generation
                    <br>❌ Low row limits, even at the enterprise level
                    <br>❌ Lacks speed and stability at scale
                    <br>❌ Complex pricing
                    <br>❌ Expensive for large teams
                    <br>❌ English only
                    <br>✅ Good for companies with a substantial budget
                    `,
                fr: `
                    <br>❌ Cloud uniquement
                    <br>❌ Modèle de sécurité médiocre
                    <br>❌ Mise en page basique des formulaire
                    <br>❌ Pas de sections, pas de colonnes
                    <br>❌ Pas de moteur de workflow (BPM)
                    <br>❌ Pas de génération native de PDF
                    <br>❌ Limitations sur la quantité de données
                    <br>❌ Manque de vitesse et de stabilité à grande échelle
                    <br>❌ Tarification complexe
                    <br>❌ Cher pour les grandes équipes
                    <br>❌ Anglais seulement
                    <br>✅ Bon pour les entreprises avec un budget conséquent
                `,
            },
            baserow: {
                en: `
                    <br>❌ Airtable clone with inferior UI/UX
                    <br>❌ Poor security model
                    <br>❌ Basic form layout, no sections, no columns
                    <br>❌ No workflow engine (BPM)
                    <br>❌ No native PDF generation
                    <br>❌ Not so intuitive for non-technical users
                    <br>❌ Difficult data aggregations
                    <br>❌ English only
                    <br>✅ Good for basic projects and small teams
                    `,
                fr: `
                    <br>❌ Clone de Airtable avec une UI/UX inférieure
                    <br>❌ Modèle de sécurité médiocre
                    <br>❌ Mise en page basique des formulaire
                    <br>❌ Pas de sections, pas de colonnes
                    <br>❌ Pas de moteur de workflow (BPM)
                    <br>❌ Pas de génération native de PDF
                    <br>❌ Pas intuitif pour les utilisateurs non techniques
                    <br>❌ Agrégations de données difficiles
                    <br>❌ Anglais seulement
                    <br>✅ Bon pour les projets basiques et les petites équipes
                `,
            },
            nocodb: {
                en: `
                    <br>❌ Airtable clone with inferior UI/UX
                    <br>❌ Very slow UI when navigating datasets
                    <br>❌ Basic form layout, no sections, no columns
                    <br>❌ No workflow engine (BPM)
                    <br>❌ No native PDF generation
                    <br>❌ Designed for technical audiences
                    <br>❌ Lacks collaborative features for teams
                    <br>❌ English only
                    <br>✅ Good for technical teams
                    `,
                fr: `
                    <br>❌ Clone de Airtable avec une UI/UX inférieure
                    <br>❌ UI lente lors de la navigation dans les données
                    <br>❌ Mise en page basique des formulaire
                    <br>❌ Pas de sections, pas de colonnes
                    <br>❌ Pas de moteur de workflow (BPM)
                    <br>❌ Pas de génération native de PDF
                    <br>❌ Conçu pour les audiences techniques
                    <br>❌ Manque de fonctionnalités collaboratives
                    <br>❌ Anglais seulement
                    <br>✅ Bon pour les équipes techniques
                `,
            },            
            googlesheets: {
                en: `
                    <br>❌ Cloud only
                    <br>❌ Not suited to build enterprise apps
                    <br>❌ Impossible to fine-tune security
                    <br>❌ No forms at all
                    <br>❌ No relational/linking abilities
                    <br>❌ No workflow engine (BPM)
                    <br>❌ No native PDF generation
                    <br>❌ Lacks collaborative features for teams
                    <br>❌ Long history of privacy and security concerns
                    <br>✅ Great for spreadsheet work and calculations
                    `,
                fr: `
                    <br>❌ Cloud uniquement
                    <br>❌ Pas adapté pour des applications d'entreprise
                    <br>❌ Impossible d'avoir une sécurité fine
                    <br>❌ Pas de formulaires du tout
                    <br>❌ Aucune capacité de relation / liaison
                    <br>❌ Pas de moteur de workflow (BPM)
                    <br>❌ Pas de génération native de PDF
                    <br>❌ Manque de fonctionnalités collaboratives
                    <br>❌ Préoccupations en matière de confidentialité
                    <br>✅ Idéal comme tableur et pour les calculs
                `,
            },
            excelsheets: {
                en: `
                    <br>❌ Not suited to build enterprise apps
                    <br>❌ Impossible to fine-tune security
                    <br>❌ No relational/linking abilities
                    <br>❌ No workflow engine (BPM)
                    <br>❌ No native PDF generation
                    <br>❌ Lacks collaborative features for teams
                    <br>✅ Great for spreadsheet work and calculations
                    `,
                fr: `
                    <br>❌ Pas adapté pour des applications d'entreprise
                    <br>❌ Impossible d'avoir une sécurité fine
                    <br>❌ Pas de capacité de relation / liaison
                    <br>❌ Pas de moteur de workflow (BPM)
                    <br>❌ Pas de génération native de PDF
                    <br>❌ Manque de fonctionnalités collaboratives
                    <br>✅ Idéal comme tableur et pour les calculs
                `,
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
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),
                kiss.templates.screenshot("workflow - business contracts - pickaform.webp", false),

                // EVENTS & ANNOUNCENMENTS
                // {
                //     type: "html",
                //     class: "offer",
                //     html: t("offer")
                // },

                // STRIP 2
                kiss.templates.title({
                    title: t("titleNocodeWorkflow"),
                    subtitle: t("subtitleNocodeWorkflow")
                }),
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),
                kiss.templates.screenshot("workflow - nocode.webp"),

                // STRIP 3
                kiss.templates.title({
                    title: t("titleFlexibility"),
                    subtitle: t("subtitleFlexibility")
                }),
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),
                kiss.templates.screenshot("midjourney integration - pickaform.webp"),

                // STRIP 4 - Comparison with competitors
                kiss.templates.title({
                    title: t("titleWhy"),
                    subtitle: t("subtitleWhy")
                }),

                {
                    class: "vs-container",
                    items: [
                        {
                            layout: "vertical",
                            class: "vs-content",
                            items: [
                                {
                                    type: "html",
                                    html: `<img src="./resources/img/pickaform.webp" alt="pickaform logo" class="image-content" loading="lazy" style="width: 256px; height: 60px;">`
                                },
                                {
                                    type: "html",
                                    html: t("pickaform")
                                }
                            ]
                        },
                        {
                            type: "html",
                            html: "<div class='vs'>VS</div>"
                        },
                        {
                            layout: "vertical",
                            class: "vs-content",
                            items: [
                                {
                                    type: "select",
                                    class: "vs-select",
                                    label: t("compareTo"),
                                    labelPosition: "top",
                                    fieldWidth: "100%",
                                    labelWidth: "100%",
                                    value: "airtable",
                                    autocomplete: "off",
                                    options: [
                                        {
                                            label: "Airtable",
                                            value: "airtable",
                                            color: "#39CAFF"
                                        },
                                        {
                                            label: "Nocodb",
                                            value: "nocodb",
                                            color: "#322EBA"
                                        },
                                        {
                                            label: "Baserow",
                                            value: "baserow",
                                            color: "#5186D7"
                                        },
                                        {
                                            label: "Google Sheets",
                                            value: "googlesheets",
                                            color: "#34A853"
                                        },
                                        {
                                            label: "Microsoft Excel",
                                            value: "excelsheets",
                                            color: "#107C41"
                                        }
                                    ],
                                    events: {
                                        change: function() {
                                            const value = this.getValue()
                                            const targetProduct = document.getElementById("target-product")
                                            targetProduct.innerHTML = t(value)
                                        }
                                    }
                                },                        
                                {
                                    id: "target-product",
                                    type: "html",
                                    html: t("airtable")
                                }                                
                            ]
                        }
                    ]
                },

                // STRIP 5
                kiss.templates.title({
                    title: t("titleExperience"),
                    subtitle: t("subtitleExperience")
                }),
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),                

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