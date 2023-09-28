kiss.app.defineView({
    id: "cases",
    meta: {
        url: {
            en: "https://pickaform.fr/en/cases",
            fr: "https://pickaform.fr/fr/cases"
        },
        title: {
            en: "Case studies | Pickaform",
            fr: "Etudes de cas | Pickaform"
        },
        description: {
            en: `With no-code, combine your custom forms and workflows to create an infinite number of different tools.`,
            fr: `Avec le no-code, combinez vos formulaires et workflows sur mesure pour créer une infinité d'outils différents.`
        }
    },
    renderer: function (id, target) {
        const t = defineTexts(id, {
            getStarted: {
                en: "Get started",
                fr: "Démarrez maintenant"
            },
            bookDemo: {
                en: `I book a demo`,
                fr: `Je réserve une démo`
            },
            title: {
                en: `What you can <span class="text-highlight" style="background-color: #00aaee">build</span>
                <br>
                is up to your <span class="text-highlight" style="background-color: #a1ed00">imagination</span>`,
                fr: `Ce que vous pouvez <span class="text-highlight" style="background-color: #00aaee">créer</span>
                <br>
                dépend de votre <span class="text-highlight" style="background-color: #a1ed00">imagination</span>`
            },
            subtitle: {
                en: "With no-code, combine your custom forms and workflows to create an infinite number of different tools.",
                fr: "Avec le no-code, combinez vos formulaires et workflows sur mesure pour créer une infinité d'outils différents."
            },
            descriptionCRM: {
                en: `Build your custom CRM with all the fields and all the indicators that interest you for your business.
                    <br>Define your own sales pipeline with your custom workflow.`,
                fr: `Construisez votre CRM sur mesure avec tous les champs et tous les indicateurs qui vous intéressent pour votre métier.
                    <br>Définissez votre propre pipeline de ventes avec votre workflow personnalisé.`
            },
            titleHR: {
                en: "Human Resources",
                fr: "Ressources Humaines"
            },
            descriptionHR: {
                en: "Create a tool in the image of your company for your recruitment process, onboarding, training, contractual documents, or regulatory deadlines.",
                fr: "Créez un outil à l'image de votre entreprise pour vos processus de recrutement, formations, documents contractuels, ou échéances règlementaires."
            },
            titleProjects: {
                en: "Project follow-up",
                fr: "Suivi de projets"
            },
            descriptionProjects: {
                en: `Manage your projects and their associated tasks by integrating all the parameters specific to your activity.
                    <br>Integrate your specifications, documentation, and deliverables into a simple and centralized tool.`,
                fr: `Gérez vos projets et leurs tâches associées en intégrant tous les paramètres spécifiques à votre activité.
                    <br>Intégrez vos cahiers des charges, documentations, et livrables dans un outil simple et centralisé.`
            },
            titleLegal: {
                en: "Legal",
                fr: "Légal"
            },
            descriptionLegal: {
                en: "Manage the life cycle of your contracts, monitor their deadlines, their renewals, and follow in a workflow the evolutions to be brought in a collaborative way.",
                fr: "Gérez le cycle de vie de vos contrats, surveillez leurs échéances, leurs renouvellements, et suivez dans un workflow les évolutions à apporter de manière collaborative."
            },
            titlePhone: {
                en: "Phone call tracking",
                fr: "Suivi des appels téléphoniques"
            },
            descriptionPhone: {
                en: "Does your company have to deal with customer requests over the phone? Not a problem, many of our clients already track their calls and their handling status via custom workflows.",
                fr: "Votre société doit traiter des demandes clients par téléphone ? Pas problème, plusieurs de nos clients suivent déjà leurs appels et leur état de traitement via des workflows sur mesure."
            },
            titleRequests: {
                en: "Follow-up of requests",
                fr: "Suivi des demandes"
            },
            descriptionRequests: {
                en: "Purchasing requests, intervention requests, authorization requests, leave requests, requests for... whatever you want! Track all your internal requests through one simple tool.",
                fr: "Demandes d'achats, demandes d'interventions, demandes d'habilitation, demandes de congés, demandes de... ce que vous voulez ! Suivez toutes vos demandes internes via un seul outil simple."
            },
            titleSupport: {
                en: "Support, ticketing system",
                fr: "Support, gestion de tickets"
            },
            descriptionSupport: {
                en: "There are many support and ticket management applications on the market, but none will allow you as much flexibility as a custom design for your business.",
                fr: "Les applications de support et gestion de tickets sont nombreuses sur le marché, mais aucune ne vous permettra autant de flexibilité qu'une conception sur mesure pour votre métier."
            },
            titleRecovery: {
                en: "amicable negotiation, litigation, recovery",
                fr: "négociation amiable, contentieux, recouvrement"
            },
            descriptionRecovery: {
                en: "Some of our clients use pickaform to manage their amicable negotiation, litigation and recovery workflows in order to have a cross-sectional view of all the files in progress.",
                fr: "Certains de nos clients utilisent pickaform pour gérer leurs workflows de négociation amiable, contentieux, et recouvrement afin d'avoir une vision transversale de tous les dossiers en cours."
            },
            titleProduct: {
                en: "Product design",
                fr: "Conception de produit"
            },
            descriptionProduct: {
                en: "If you design products, you have to collaborate with your teams on many different aspects, from design to marketing. Pickaform allows you to federate and share all the information you need.",
                fr: "Si vous concevez des produits, vous devez collaborer avec vos équipes sur plein d'aspects différents, du design jusqu'au marketing. Pickaform vous permet de féréder et partager toutes les informations dont vous avez besoin."
            },
            titleInventory: {
                en: "Inventory management",
                fr: "Gestion de l'inventaire"
            },
            descriptionInventory: {
                en: "Whether you manage a computer park, construction equipment, or something else, pickaform allows you to build a simple and tailor-made solution to track all your equipment.",
                fr: "Que vous gériez un parc informatique, du matériel de chantier, ou autre chose, pickaform permet de construire une solution simple et sur mesure pour traquer tous vos matériels."
            },
            titleDonation: {
                en: "Donation management",
                fr: "Gestion des dons"
            },
            descriptionDonation: {
                en: "You are a large association and you need to organize yourself to monitor the donations collected and their allocation? We got you covered!",
                fr: "Vous êtes une association de taille importante et vous avez besoin de vous organiser pour suivre les dons collectés et leur attribution ? Nous vous couvrons !"
            },
            titleAnything: {
                en: "Management of...",
                fr: "Gestion de..."
            },
            descriptionAnything: {
                en: "The examples above are given as an example, but you manage exactly what you want with pickaform, and the only limit is your imagination!",
                fr: "Les exemples ci-dessus sont donnés à titre d'exemple, mais vous gérez exactement ce que vous voulez avec pickaform, et la seule limite est votre imagination !"
            },
            titleBookDemo: {
                en: `Not convinced?`,
                fr: `Pas convaincu ?`
            },
            subtitleBookDemo: {
                en: `Tell us about your project, and we'll show you how to make it happen in <span class="text-highlight" style="background-color: #00aaee">20 minutes!</span>`,
                fr: `Expliquez-nous votre projet, et on vous montre en <span class="text-highlight" style="background-color: #00aaee">20 minutes</span> comment le réaliser !`
            },
            titleVideos: {
                en: `Pickaform in action`,
                fr: `Pickaform en action`
            },
            subtitleVideos: {
                en: `See directly how to build and use applications with workflows, without coding`,
                fr: `Voyez directement comment construire et utiliser des applications avec workflows, sans coder`
            },
            titleAppFromTemplate: {
                en: "Creating an application from a template",
                fr: "Créer une application à partir d'un modèle"
            },
            descriptionAppFromTemplate: {
                en: "Download an application in 1 click to your workspace and then modify it at will to adapt it to your needs!",
                fr: "Téléchargez une application en 1 clic sur votre espace de travail et modifiez-là ensuite à volonté pour l'adapter à vos besoins !"
            },
            titleAppFromXLS: {
                en: "Creating an application from an XLS file",
                fr: "Créer une application à partir d'un fichier XLS"
            },
            descriptionAppFromXLS: {
                en: "Import your Excel or CSV file and instantly transform it into a collaborative and secure application.",
                fr: "Importez votre fichier Excel ou CSV et transformez-le instantanément en application collaborative et sécurisée."
            },
            titleFormDesigner: {
                en: "Discovering the form designer",
                fr: "Découvrir l'éditeur de formulaire"
            },
            descriptionFormDesigner: {
                en: "Modify your forms, give them an ergonomic and efficient layout, and make your users happy!",
                fr: "Modifiez vos formulaires, offrez leur une mise en page ergonomique et efficace, et rendez vos utilisateurs heureux !"
            },
            titleWorkflow: {
                en: "Discovering the workflow",
                fr: "Découvrir le workflow"
            },
            descriptionWorkflow: {
                en: "Save your employees time by streamlining the processing of your files, business, projects, recruitment, expense reports, purchase requests, etc.",
                fr: "Faites gagner du temps à vos collaborateurs en fluidifiant le traitement de vos dossiers, affaires, projets, recrutements, notes de frais, demandes d'achats, etc..."
            },
            titleWorkflow3mn: {
                en: "Creating a workflow in 3 minutes",
                fr: "Créer un workflow en 3 minutes"
            },
            descriptionWorkflow3mn: {
                en: "Pickaform is the simplest platform in the world for creating your personalized workflows: guaranteed return on investment!",
                fr: "Pickaform est la plateforme la plus simple au monde pour créer vos workflows personnalisés: retour sur investissement garanti !"
            },
            titleView: {
                en: "Creating a view for your data",
                fr: "Créer une vue pour vos données"
            },
            descriptionView: {
                en: "Organize your data as you see fit thanks to pickaform's ergonomic views: sort, filter, group, and aggregate in just a few clicks!",
                fr: "Organisez vos données comme bon vous semble grâce aux vues ergonomiques de pickaform: triez, filtrez, regroupez, et aggrégez en quelques clics !"
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
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),
                kiss.templates.screenshot("workflow - contrat - pickaform.webp"),

                // CRM
                kiss.templates.feature({
                    title: "CRM",
                    description: t("descriptionCRM"),
                    screenshot: "example - CRM - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // HR
                kiss.templates.feature({
                    title: t("titleHR"),
                    description: t("descriptionHR"),
                    screenshot: "example - HR onboarding - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // PROJECTS
                kiss.templates.feature({
                    title: t("titleProjects"),
                    description: t("descriptionProjects"),
                    screenshot: "example - project management - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // LEGAL
                kiss.templates.feature({
                    title: t("titleLegal"),
                    description: t("descriptionLegal"),
                    screenshot: "example - Legal contract - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // PHONE
                kiss.templates.feature({
                    title: t("titlePhone"),
                    description: t("descriptionPhone"),
                    screenshot: "workflows-thumbnail.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // REQUESTS
                kiss.templates.feature({
                    title: t("titleRequests"),
                    description: t("descriptionRequests"),
                    screenshot: "example - purchase request - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // SUPPORT
                kiss.templates.feature({
                    title: t("titleSupport"),
                    description: t("descriptionSupport"),
                    screenshot: "a la carte form features - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // RECOVERY
                kiss.templates.feature({
                    title: t("titleRecovery"),
                    description: t("descriptionRecovery"),
                    screenshot: "navigate through your data with tabs - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // INVENTORY
                kiss.templates.feature({
                    title: t("titleInventory"),
                    description: t("descriptionInventory"),
                    screenshot: "example - inventory - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // PRODUCT
                kiss.templates.feature({
                    title: t("titleProduct"),
                    description: t("descriptionProduct"),
                    screenshot: "example - product design - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // DONATION
                kiss.templates.feature({
                    title: t("titleDonation"),
                    description: t("descriptionDonation"),
                    screenshot: "example - donation - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // ANYTHING
                kiss.templates.feature({
                    title: t("titleAnything"),
                    description: t("descriptionAnything"),
                    screenshot: "example - midjourney collection - pickaform.webp",
                    CTA: t("bookDemo"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),


                // SAMPLES VIDEOS
                kiss.templates.title({
                    title: t("titleVideos"),
                    subtitle: t("subtitleVideos")
                }),

                {
                    class: "feature-top-separator"
                },

                // Block containing videos
                {
                    class: "feature-details-container",
                    items: [{
                        class: "feature-details-container-column",
                        items: [
                            // Creating an app from a template
                            kiss.templates.featureVideo({
                                title: t("titleAppFromTemplate"),
                                description: t("descriptionAppFromTemplate"),
                                screenshot: "creating an application from a template - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=3joHKZOH_zA"
                            }),
                            // Creating an app from a template
                            kiss.templates.featureVideo({
                                title: t("titleAppFromXLS"),
                                description: t("descriptionAppFromXLS"),
                                screenshot: "creating an application from an XLS file - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=KS7nOiDW9eE"
                            }),
                            // Discovering the form designer
                            kiss.templates.featureVideo({
                                title: t("titleFormDesigner"),
                                description: t("descriptionFormDesigner"),
                                screenshot: "discovering the form designer - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=T992n1m_bII"
                            }),
                            // Discovering the workflow
                            kiss.templates.featureVideo({
                                title: t("titleWorkflow"),
                                description: t("descriptionWorkflow"),
                                screenshot: "discovering the workflow - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=As992YkHbu8"
                            }),
                            // Creating a workflow in 3mn
                            kiss.templates.featureVideo({
                                title: t("titleWorkflow3mn"),
                                description: t("descriptionWorkflow3mn"),
                                screenshot: "creating a workflow - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=hCZ5gbu7gMs"
                            }),
                            // Creating a view
                            kiss.templates.featureVideo({
                                title: t("titleView"),
                                description: t("descriptionView"),
                                screenshot: "creating a view - pickaform.webp",
                                video: "https://www.youtube.com/watch?v=3ALIi2OS5eQ"
                            })
                        ]
                    }]
                },                

                // BOOK A DEMO
                kiss.templates.title({
                    title: t("titleBookDemo"),
                    subtitle: t("subtitleBookDemo")
                }),

                // CONTACT BUTTON
                kiss.templates.buttonCTA(t("bookDemo"), "booking"),

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