kiss.app.defineView({
    id: "whoCanUse",
    meta: {
        url: {
            en: "https://pickaform.fr/en/whoCanUse",
            fr: "https://pickaform.fr/fr/whoCanUse"
        },
        title: {
            en: "Who can use | Pickaform",
            fr: "Qui peut utiliser | Pickaform"
        },
        description: {
            en: `Pickaform is great for enterprises, public sector, associations, IT companies and no-coders.`,
            fr: `Pickaform est pour les entreprises, le secteur public, les associations, les ESN et les no-coders.`
        }
    },
    renderer: function (id, target) {
        const t = defineTexts(id, {
            getStarted: {
                en: "Get started",
                fr: "Démarrez maintenant"
            },
            title: {
                en: `<span class="text-highlight" style="background-color: #00aaee">Who</span> can use pickaform?`,
                fr: `<span class="text-highlight" style="background-color: #00aaee">Qui</span> peut utiliser pickaform ?`
            },
            subtitle: {
                en: "No-code is for everyone, but everyone finds their own benefits.",
                fr: "Le no-code est pour tout le monde, mais chacun y trouve ses propres avantages."
            },
            titleB2C: {
                en: "Companies, public sector, associations",
                fr: "Entreprises, secteur public, associations"
            },
            descriptionB2C: {
                en: `Pickaform allows you to create your tailor-made applications, without coding.
                <br>You go from idea to prototype during the day, and then refine your application for use.
                <br>Pickaform allows you to create all types of applications to manage your activity, and excels in the implementation of your business processes (file monitoring, business monitoring, monitoring of internal or external requests, etc.)
                <br>To go even faster, we support you in the implementation by transforming your needs into concrete and testable applications very quickly (within a day).
                <br>Finally, pickaform is very transversal, so you can use it for a wide variety of needs to ensure a maximum return on investment.`,
                fr: `Pickaform vous permet de créer vos applications sur mesure, sans coder.
                <br>Vous passez de l'idée au prototype dans la journée, et vous affinez ensuite votre application à l'usage.
                <br>Pickaform vous permet de créer tous types d'applications pour gérer votre activité, et excèle dans la mise en oeuvre de vos processus métier (suivi de dossiers, suivi d'affaires, suivi des demandes internes ou externes…)
                <br>Pour aller encore plus vite, nous vous accompagnons dans la mise oeuvre en transformant vos besoins en applications concrètes et testables très rapidement (dans la journée).
                <br>Enfin, pickaform est très transversal, donc vous pourrez l'utiliser pour des besoins très variés afin d'assurer un retour sur l'investissement maximal.
                `
            },
            titleB2B2C: {
                en: "IT Services Companies",
                fr: "Entreprises de Services du Numérique (ESN)"
            },
            descriptionB2B2C: {
                en: `Do you need to go faster than your competitors on certain projects?
                <br>Pickaform brings you 80% of the standard needs of a back office on an integrated platform: database, authentication, security, forms, views, workflows, PDF generation, API, etc…
                <br>By building your solution on pickaform, you multiply your productivity by 2, 3, 5 or even 10 compared to specific development.
                <br>Finally, in 2024, we are already planning a version of pickaform dedicated to IT Services Companies so that you can host applications for your clients yourself, with an applications supervisor similar to the one that webmasters have to manage their client's websites.`,
                fr: `Vous avez besoin d'aller plus vite que vos concurrents sur certains projets ?
                <br>Pickaform vous apporte 80% des besoins standards d'un back-office sur une plateforme intégrée : base de données, authentification, sécurité, formulaires, vues, workflows, génération de PDF, API, etc…
                <br>En construisant votre solution sur pickaform, vous multipliez votre productivité par 2, 3, 5 voire 10 par rapport au développement spécifique.
                <br>Enfin, en 2024, nous prévoyons déjà une version de pickaform dédiée aux ESN pour que vous puissiez héberger vous-même les applications pour vos clients, avec un superviseur d'applications similaire à celui qu'ont les webmasters pour gérer les sites Internet de leurs clients.
                `
            },
            titleB2M2C: {
                en: "No-coders / makers / webmasters",
                fr: "No-coders / makers / webmasters"
            },
            descriptionB2M2C: {
                en: `You already know no-code tools and you have already used them to create MVPs, business tools for VSEs or small SMEs, and you really like the Freemium model but you realize that these tools will be too limiting for creating large applications in production with larger customers.
                <br>With pickaform, you can create real business applications, turnkey, with structured forms, fine security, and above all the key component requested by all companies of a certain size: the workflow engine (BPM).
                <br>Pickaform has already been deployed within entities of BNP PARIBAS, GROUPAMA, GROUPE SAUR, GROUPE HEINEKEN, ORANGE, CANAL+, and you can confidently consider approaching customers with greater potential for the growth of your business.`,
                fr: `Vous connaissez déjà les outils no-code et vous les avez déjà utilisés pour créer des MVP, des outils métiers pour des TPE ou petites PME, et vous aimez beaucoup le modèle Freemium mais vous réalisez que ces outils seront trop limitatifs pour créer de grosses applications en production chez clients d'une taille plus importante.
                <br>Avec pickaform, vous pouvez créer de vraies applications métier, clé-en-main, avec des formulaires structurée, une sécurité fine, et surtout le composant clé demandé par toutes les entreprises d'une certaine taille : le moteur de workflow (BPM).
                <br>Pickaform a déjà été déployé au sein d'entités de BNP PARIBAS, GROUPAMA, GROUPE SAUR, GROUPE HEINEKEN, ORANGE, CANAL+, et vous pouvez sereinement envisager de démarcher des clients à plus fort potentiel pour la croissance de votre entreprise.
                `
            },
            titleBookDemo: {
                en: `Not convinced?`,
                fr: `Pas convaincu ?`
            },
            subtitleBookDemo: {
                en: `Tell us about your project, and we'll show you how to make it happen in <span class="text-highlight" style="background-color: #00aaee">20 minutes!</span>`,
                fr: `Expliquez-nous votre projet, et on vous montre en <span class="text-highlight" style="background-color: #00aaee">20 minutes</span> comment le réaliser !`
            },
            bookDemo: {
                en: `OK, I'll get in touch`,
                fr: `OK, je prends contact`
            }
        })

        return createBlock({
            id: id,
            target,
            layout: "vertical",
            alignItems: "center",

            items: [
                kiss.templates.title({
                    title: t("title"),
                    subtitle: t("subtitle")
                }),
                kiss.templates.buttonCTA(t("getStarted")),

                {
                    class: "feature-top-separator"
                },

                kiss.templates.whoCanUse(t("titleB2C"), t("descriptionB2C")),
                kiss.templates.whoCanUse(t("titleB2B2C"), t("descriptionB2B2C")),
                kiss.templates.whoCanUse(t("titleB2M2C"), t("descriptionB2M2C")),

                // BOOK A DEMO
                kiss.templates.title({
                    title: t("titleBookDemo"),
                    subtitle: t("subtitleBookDemo")
                }),

                // CONTACT BUTTON
                kiss.templates.buttonCTA(t("bookDemo"), "contact"),

                {
                    class: "feature-top-separator",
                    margin: "10vh 0 0 0"
                }
            ],

            events: {
                click: (event) => {
                    if (event.target.parentNode.classList.contains("feature-CTA")) {
                        log("CTA")
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
    }
})

;