kiss.app.defineView({
    id: "cases",
    renderer: function (id, target) {
        const t = defineTexts(id, {
            getStarted: {
                en: "Get started",
                fr: "Démarrez maintenant"
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
                en: "Create the business tool of your dreams and start saving time.",
                fr: "Créez l'outil métier de vos rêves et commencez à gagner du temps."
            },
            titleCRM: {
                en: "CRM",
                fr: "Des formulaires flexibles"
            },
            descriptionCRM: {
                en: `Build your custom CRM with all the fields and all the indicators that interest you for your business.
            <br>Define your own sales pipeline with your custom workflow`,
                fr: `Construisez votre CRM sur mesure avec tous les champs et tous les indicateurs qui vous intéressent pour votre métier.
            <br>Définissez votre propre pipeline de ventes avec votre workflow personnalisé.`
            },
            titleHR: {
                en: "Define your Human Resources",
                fr: "Ressources Humaines"
            },
            descriptionHR: {
                en: "Create a tool in the image of your company for your recruitment process, your training, your contractual documents, your regulatory deadlines.",
                fr: "Créez un outil à l'image de votre entreprise pour votre processus de recrutement, vos formations, vos documents contractuels, vos échéances règlementaires."
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
                en: "Tell us about your project, and we'll show you how to make it happen in 20 minutes!",
                fr: "Expliquez-nous votre projet, et on vous montre en 20 minutes comment le réaliser !"
            },
            bookDemo: {
                en: `OK, I'll get in touch`,
                fr: `OK, je prends contact`
            },

            // Field types
            titleFieldTypes: {
                en: "21 field types to build your forms",
                fr: "21 types de champs pour vos formulaires"
            },
            descriptionFieldTypes: {
                en: "Creating rich forms requires a variety of field types.<br>We've got you covered!",
                fr: "La création de formulaires riches nécessite des types de champs variés.<br>Nous vous couvrons !"
            },
            // View features
            titleViewCreation: {
                en: "Many ways to organize your data",
                fr: "Plein de manières d'organiser vos données"
            },
            subtitleViewCreation: {
                en: "Creating views is a simple yet extremely powerful process for organizing all your data.",
                fr: "La création des vues est un processus simple mais extrêmement puissant pour organiser toutes vos données."
            },

            // Field types
            text: {
                en: "text",
                fr: "texte"
            },
            textDescription: {
                en: "Add a short text to any element. The Text field is used for simple fields such as a name, a title, etc...",
                fr: "Ajoutez un court texte à n'importe quel élément. Le champ Texte est utilisé pour des champs simples comme un nom, un titre, etc..."
            },
            number: {
                en: "number",
                fr: "nombre"
            },
            numberDescription: {
                en: "The Number field allows you to process numeric information such as amounts, and you can also choose the units.",
                fr: "Le champ Nombre permet de traiter les informations numériques telles que des montants, et vous pouvez également choisir les unités."
            },
            date: {
                en: "date",
                fr: "date"
            },
            dateDescription: {
                en: "The Date field allows you to select a date in a calendar, for example to set an appointment, a deadline...",
                fr: "Le champ Date vous permet de sélectionner une date dans un calendrier, par exemple pour fixer un RDV, une deadline, une échéance..."
            },
            time: {
                en: "time",
                fr: "heure"
            },
            timeDescription: {
                en: "The Time control offers a drop-down list of time slots whose increment can be configured (every 5 minutes for example).",
                fr: "Le champ Heure propose une liste déroulante de créneaux horaires dont l'incrément est paramétrable (par exemple toutes les 5mn)."
            },
            paragraph: {
                en: "paragraph",
                fr: "paragraphe"
            },
            paragraphDescription: {
                en: "The Paragraph field allows you to enter longer and multi-line texts, for example to add comments, descriptions, etc...",
                fr: "Le champ Paragraphe permet de saisir des textes plus longs et multi-lignes, par exemple pour ajouter des commentaires, des descriptions, etc..."
            },
            aiParagraph: {
                en: "AI paragraph",
                fr: "paragraphe IA"
            },
            aiParagraphDescription: {
                en: "The AI Paragraph field allows you to automatically generate the content of the field according to your instructions, thanks to OpenAI's AI.",
                fr: "Le champ Paragraphe AI permet de générer automatiquement le contenu du champ selon vos instructions, grâce à l'IA de OpenAI."
            },
            select: {
                en: "dropdown list",
                fr: "liste déroulante"
            },
            selectDescription: {
                en: "The Drop-down List control offers to choose from a list of values possibly associated with a color.",
                fr: "Le champ Liste déroulante propose de choisir parmi une liste de valeurs éventuellement associées à une couleur."
            },
            multipleSelect: {
                en: "multiple select",
                fr: "sélection multiple"
            },
            multipleSelectDescription: {
                en: "Drop-down lists can, if necessary, receive several values and act as tags.",
                fr: "Les listes déroulantes peuvent si nécessaire recevoir plusieurs valeurs et agir comme des tags."
            },
            checkbox: {
                en: "checkbox",
                fr: "case à cocher"
            },
            checkboxDescription: {
                en: "The Check box field allows you to create checklists or to switch the state of a record easily.",
                fr: "Le champ Case à cocher permet d'élaborder des checklists ou bien de basculer l'état d'une fiche facilement."
            },
            progressBar: {
                en: "progress bar",
                fr: "barre de progression"
            },
            progressBarDescription: {
                en: "The Progress Bar field is useful for visually displaying the progress of a task or project.",
                fr: "Le champ Barre de progression est utile pour afficher l'avancement d'une tâche ou d'un projet de manière visuelle."
            },
            rating: {
                en: "rating",
                fr: "notation"
            },
            ratingDescription: {
                en: "The Rating field is useful for rating items from 1 to 10, and you can also choose its symbol.",
                fr: "Le champ Notation est utile pour évaluer des objets de 1 à 10, et vous pouvez aussi choisir son symbole."
            },
            attachment: {
                en: "attachment",
                fr: "fichiers attachés"
            },
            attachmentDescription: {
                en: "The Attached Files field is used to embed one or more attachments to your data, and images can be previewed directly.",
                fr: "Le champ Fichiers attachés est utilisé pour intégrer une ou plusieurs pièces jointes à vos données, et les images peuvent être prévisualisées directement."
            },
            selectColumn: {
                en: "column selection",
                fr: "sélection de colonne"
            },
            selectColumnDescription: {
                en: "This type of field dynamically generates a drop-down list of values by retrieving information from a column in your views.",
                fr: "Ce type champ génère dynamiquement une liste déroulante de valeurs en récupérant les informations dans une colonne de vos vues."
            },
            selectView: {
                en: "selection inside a view",
                fr: "sélection dans une vue"
            },
            selectViewDescription: {
                en: "This type of field allows you to simultaneously retrieve several values from another record by selecting it in a view.",
                fr: "Ce type de champ permet de récupérer simultanément plusieurs valeurs d'une autre fiche en la sélectionnant dans une vue."
            },
            collaborators: {
                en: "collaborators",
                fr: "collaborateurs"
            },
            collaboratorsDescription: {
                en: "The Collaborators field displays in a drop-down list the address book of users and groups in your organization.",
                fr: "Le champ Collaborateurs affiche dans une liste déroulante le carnet d'adresses des utilisateurs et des groupes de votre organisation."
            },
            color: {
                en: "color",
                fr: "couleur"
            },
            colorDescription: {
                en: "The Color field is used to assign a color to a data item by selecting it from a palette.",
                fr: "Le champ Couleur permet d'attribuer une couleur à une donnée en la sélectionnant dans une palette."
            },
            icon: {
                en: "icon",
                fr: "icône"
            },
            iconDescription: {
                en: "The Icon control allows you to associate an icon to an object from a palette of more than 1000 icons.",
                fr: "Le champ Icône vous permet d'associer une icône à un objet à partir d'une palette de plus de 1000 icônes."
            },
            password: {
                en: "password",
                fr: "mot de passe"
            },
            passwordDescription: {
                en: "The Password field is a text field whose characters are masked in order to keep certain data confidential.",
                fr: "Le champ Mot de passe est champ texte dont les caractères sont masqués afin de garder la confidentialité de certaines données."
            },
            link: {
                en: "link to another table",
                fr: "liaison vers une autre table"
            },
            linkDescription: {
                en: "The Link field is very powerful because it allows you to connect your records to each other and navigate between them by hyper-link.",
                fr: "Le champ de Liaison est très puissant car il permet de connecter vos données entre elles et de naviguer entre données par hyper-lien."
            },
            lookup: {
                en: "lookup a value on linked records",
                fr: "valeur d'une fiche liée"
            },
            lookupDescription: {
                en: "This type of field is used to automatically retrieve a value in a record linked by a Link field.",
                fr: "Ce type de champ permet de récupérer automatiquement une valeur dans une fiche liée par un champ de liaison."
            },
            summary: {
                en: "summarize data from linked records",
                fr: "calcul à partie de fiches liées"
            },
            summaryDescription: {
                en: "This type of field is used to perform a calculation (ex: sum, average) from all the records linked by a Link field.",
                fr: "Ce type de champ permet d'effectuer un calcul (de type somme, moyenne) à partir de toutes les fiches liées par un champ de liaison."
            },

            // Views
            columnSelection: {
                en: "choose your columns",
                fr: "choix des colonnes"
            },
            columnSelectionDescription: {
                en: "Select the columns most relevant to your way of working.",
                fr: "Sélectionnez les colonnes les plus pertinentes pour votre façon de travailler."
            },
            sorting: {
                en: "Multi-column sorting",
                fr: "Tri multi-colonnes"
            },
            sortingDescription: {
                en: "Sort your columns easily on several levels. Quickly change your sorting criteria.",
                fr: "Triez vos colonnes facilement sur plusieurs niveaux. Modifiez rapidement vos critères de tri."
            },
            filtering: {
                en: "simple of complex filters",
                fr: "filtres simples ou complexes"
            },
            filteringDescription: {
                en: "Filter your data with simple or complex logic by nesting 'AND' and 'OR' operations.",
                fr: "Filtrez vos données avec une logique simple ou complexe en imbriquant des opérations 'ET' et 'OU'."
            },
            grouping: {
                en: "grouping",
                fr: "regroupement"
            },
            groupingDescription: {
                en: "This type of field is used to perform a calculation (ex: sum, average) from all the records linked by a Link field.",
                fr: "En un seul clic, regroupez les données sur le critère de votre choix pour une meilleure vue d'ensemble."
            },
            multiGrouping: {
                en: "multi-level grouping",
                fr: "regroupement multi-niveaux"
            },
            multiGroupingDescription: {
                en: "By grouping your data on several levels, you can instantly have a more detailed view of your data.",
                fr: "En regroupant vos données sur plusieurs niveaux, vous pouvez en un instant avoir une vision plus fine de vos données."
            },
            aggregations: {
                en: "aggregations",
                fr: "aggrégations"
            },
            aggregationsDescription: {
                en: "When a view is grouped on one or more fields, you can automatically calculate aggregations for each level.",
                fr: "Lorsqu'une vue est groupée sur un ou plusieurs champs, vous pouvez automatiquement calculer des aggrégations pour chaque niveau."
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
                kiss.templates.screenshot("workflow - contrat - pickaform.webp"),

                // CRM
                kiss.templates.feature({
                    title: "CRM",
                    description: t("descriptionCRM"),
                    screenshot: "example - CRM - pickaform.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // PROJECTS
                kiss.templates.feature({
                    title: t("titleProjects"),
                    description: t("descriptionProjects"),
                    screenshot: "workflows-thumbnail.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // PHONE
                kiss.templates.feature({
                    title: t("titlePhone"),
                    description: t("descriptionPhone"),
                    screenshot: "workflows-thumbnail.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // SUPPORT
                kiss.templates.feature({
                    title: t("titleSupport"),
                    description: t("descriptionSupport"),
                    screenshot: "a la carte form features - pickaform.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // INVENTORY
                kiss.templates.feature({
                    title: t("titleInventory"),
                    description: t("descriptionInventory"),
                    screenshot: "example - inventory - pickaform.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // DONATION
                kiss.templates.feature({
                    title: t("titleDonation"),
                    description: t("descriptionDonation"),
                    screenshot: "example - donation - pickaform.webp",
                    CTA: t("getStarted"),
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
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // BOOK A DEMO
                kiss.templates.title({
                    title: t("titleBookDemo"),
                    subtitle: t("subtitleBookDemo")
                }),
                kiss.templates.buttonCTA(t("bookDemo"), "contact"),
                kiss.templates.screenshot("book your demo - pickaform.webp")
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