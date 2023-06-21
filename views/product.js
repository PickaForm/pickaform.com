kiss.app.defineView({
    id: "product",
    meta: {
        url: {
            en: "https://pickaform.fr/en/product",
            fr: "https://pickaform.fr/fr/product"
        },
        title: {
            en: "Product features | Pickaform",
            fr: "Fonctionnalités du produit | Pickaform"
        },
        description: {
            en: `The full list of Pickaform product features. Combine no-code, workflows and AI to build the most flexible tools for your company!`,
            fr: `Liste des fonctionnalités du produit Pickaform. Combinez no-code, workflows et IA pour créer les outils les plus flexibles pour votre entreprise !`
        }
    },
    renderer: function (id, target) {
        const t = defineTexts(id, {
            getStarted: {
                en: "Get started",
                fr: "Démarrez maintenant"
            },
            title: {
                en: `Super <span class="text-highlight" style="background-color: #00aaee">simple</span>
                <br>
                Really <span class="text-highlight" style="background-color: #a1ed00">powerful</span>`,
                fr: `Super <span class="text-highlight" style="background-color: #00aaee">simple</span>
                <br>
                Vraiment <span class="text-highlight" style="background-color: #a1ed00">puissant</span>`
            },
            subtitle: {
                en: "Create your own business tool and start saving time.",
                fr: "Créez votre outil métier sur mesure et commencez à gagner du temps."
            },
            titleForms: {
                en: "Flexible forms",
                fr: "Des formulaires flexibles"
            },
            descriptionForms: {
                en: "With our forms, you can collect simple or complex information and process it efficiently with your personalized workflows.",
                fr: "Avec nos formulaires, vous pouvez collecter des informations simples ou complexes et les traiter efficacement avec vos workflows personnalisés."
            },
            titleViews: {
                en: "Define your views",
                fr: "Définissez vos vues"
            },
            descriptionViews: {
                en: "Configure how you want to see your data: choose your columns, filters, sort, group and create as many views as needed.",
                fr: "Configurez la façon dont vous souhaitez voir vos données : choisissez vos colonnes, filtres, triez, regroupez et créez autant de vues que nécessaire."
            },
            titleWorkflows: {
                en: "Customize your workflows to fit your needs",
                fr: "Personnalisez vos workflows pour vos besoins"
            },
            descriptionWorkflows: {
                en: "In a few minutes, you define the steps of the workflow, the actors and the possible decisions, and go!",
                fr: "En quelques minutes, vous définissez les étapes du workflow, les acteurs et les décisions possibles, et c'est parti !"
            },
            titleFormDesigner: {
                en: "Integrated form designer",
                fr: "Editeur de formulaire intégré"
            },
            descriptionFormDesigner: {
                en: "Directly improve the layout of your forms in a few clicks and drag&drop.",
                fr: "Améliorez directement la mise en page de vos formulaires en quelques clics et drag&drop."
            },
            titleFormFeatures: {
                en: "A la carte form features",
                fr: "Fonctionnalités à la carte"
            },
            descriptionFormFeatures: {
                en: "Keep ergonomics simplified by activating only the features your users need.",
                fr: "Gardez une ergonomie simplifée en activant seulement les fonctionnalités dont vos utilisateurs ont besoin."
            },
            titleCustomViews: {
                en: "Organize your work",
                fr: "Organisez votre travail"
            },
            descriptionCustomViews: {
                en: "Thanks to the custom views, you will be able to create your own structure to organize all your work in the best possible way.",
                fr: "Grâce aux vues personnalisées, vous pourrez créer votre propre structure pour organiser l'ensemble de votre travail de la meilleure façon possible."
            },
            titleLeftNavigation: {
                en: "All data just a click away",
                fr: "Toutes les données à portée de clic"
            },
            descriptionLeftNavigation: {
                en: "The side navigation bar effectively condenses all the information you need, and each user only sees what is relevant to them.",
                fr: "La barre de navigation latérale condense efficacement toute l'information dont vous avez besoin, et chaque utilisateur ne voit que ce qui le concerne."
            },
            titleTabsNavigation: {
                en: "Unless you like tabs?",
                fr: "A moins que vous aimiez les onglets ?"
            },
            descriptionTabsNavigation: {
                en: "We never impose your way of working: if you prefer the tabbed presentation, you just need 1 click.",
                fr: "On ne vous impose jamais votre manière de travailler : si vous préférez la présentation en onglet, c'est juste un clic."
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
                fr: "calcul à partir de fiches liées"
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
                kiss.templates.screenshot("nocode templates applications - pickaform.webp"),

                // FORMS
                kiss.templates.feature({
                    title: t("titleForms"),
                    description: t("descriptionForms"),
                    screenshot: "forms-thumbnail.webp",
                    CTA: t("getStarted"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // VIEWS
                kiss.templates.feature({
                    title: t("titleViews"),
                    description: t("descriptionViews"),
                    screenshot: "business contract management - flexible views - pickaform.webp",
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // WORKFLOWS
                kiss.templates.feature({
                    title: t("titleWorkflows"),
                    description: t("descriptionWorkflows"),
                    screenshot: "workflows-thumbnail.webp",
                    CTA: t("getStarted"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // FORM DESIGN
                kiss.templates.feature({
                    title: t("titleFormDesigner"),
                    description: t("descriptionFormDesigner"),
                    screenshot: "integrated simple and powerful form designer - pickaform.webp",
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // FORM FEATURES
                kiss.templates.feature({
                    title: t("titleFormFeatures"),
                    description: t("descriptionFormFeatures"),
                    screenshot: "a la carte form features - pickaform.webp",
                    CTA: t("getStarted"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // NAVIGATOR
                kiss.templates.feature({
                    title: t("titleCustomViews"),
                    description: t("descriptionCustomViews"),
                    screenshot: "views-thumbnail.webp",
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // LEFT PANE NAVIGATION
                kiss.templates.feature({
                    title: t("titleLeftNavigation"),
                    description: t("descriptionLeftNavigation"),
                    screenshot: "navigate through your data with left pane - pickaform.webp",
                    CTA: t("getStarted"),
                    textPosition: "left"
                }),

                {
                    class: "feature-top-separator"
                },

                // TABS NAVIGATOR
                kiss.templates.feature({
                    title: t("titleTabsNavigation"),
                    description: t("descriptionTabsNavigation"),
                    screenshot: "navigate through your data with tabs - pickaform.webp",
                    CTA: t("getStarted"),
                    textPosition: "right",
                    color: "#555555",
                    backgroundColor: "var(--feature-background)"
                }),

                // FIELD TYPES
                kiss.templates.title({
                    title: t("titleFieldTypes"),
                    subtitle: t("descriptionFieldTypes")
                }),

                {
                    class: "feature-top-separator"
                },

                // Block containing all field types
                {
                    class: "feature-details-container",
                    items: [{
                        class: "feature-details-container-column",
                        items: [
                            // Text
                            kiss.templates.featureDetails({
                                title: t("text"),
                                description: t("textDescription"),
                                screenshot: "field type - text - pickaform.webp"
                            }),
                            // Number
                            kiss.templates.featureDetails({
                                title: t("number"),
                                description: t("numberDescription"),
                                screenshot: "field type - number - pickaform.webp"
                            }),
                            // Date
                            kiss.templates.featureDetails({
                                title: t("date"),
                                description: t("dateDescription"),
                                screenshot: "field type - date - pickaform.webp"
                            }),
                            // Time
                            kiss.templates.featureDetails({
                                title: t("time"),
                                description: t("timeDescription"),
                                screenshot: "field type - time - pickaform.webp"
                            }),
                            // Paragraph
                            kiss.templates.featureDetails({
                                title: t("paragraph"),
                                description: t("paragraphDescription"),
                                screenshot: "field type - paragraph - pickaform.webp"
                            }),
                            // AI paragraph
                            kiss.templates.featureDetails({
                                title: t("aiParagraph"),
                                description: t("aiParagraphDescription"),
                                screenshot: "field type - AI paragraph - pickaform.webp"
                            }),
                            // Select
                            kiss.templates.featureDetails({
                                title: t("select"),
                                description: t("selectDescription"),
                                screenshot: "field type - select - pickaform.webp"
                            }),
                            // Multiple select
                            kiss.templates.featureDetails({
                                title: t("multipleSelect"),
                                description: t("multipleSelectDescription"),
                                screenshot: "field type - multiple select - pickaform.webp"
                            }),
                            // Checkbox
                            kiss.templates.featureDetails({
                                title: t("checkbox"),
                                description: t("checkboxDescription"),
                                screenshot: "field type - checkbox - pickaform.webp"
                            }),
                            // Progress bar
                            kiss.templates.featureDetails({
                                title: t("progressBar"),
                                description: t("progressBarDescription"),
                                screenshot: "field type - progress bar - pickaform.webp"
                            }),
                            // Rating
                            kiss.templates.featureDetails({
                                title: t("rating"),
                                description: t("ratingDescription"),
                                screenshot: "field type - ranking - pickaform.webp"
                            }),
                            // Attachment
                            kiss.templates.featureDetails({
                                title: t("attachment"),
                                description: t("attachmentDescription"),
                                screenshot: "field type - attachment - pickaform.webp"
                            }),
                            // Select from view column
                            kiss.templates.featureDetails({
                                title: t("selectColumn"),
                                description: t("selectColumnDescription"),
                                screenshot: "field type - select from column - pickaform.webp"
                            }),
                            // Select from view
                            kiss.templates.featureDetails({
                                title: t("selectView"),
                                description: t("selectViewDescription"),
                                screenshot: "field type - select from view - pickaform.webp"
                            }),
                            // Collaborators
                            kiss.templates.featureDetails({
                                title: t("collaborators"),
                                description: t("collaboratorsDescription"),
                                screenshot: "field type - collaborators - pickaform.webp"
                            }),
                            // Color
                            kiss.templates.featureDetails({
                                title: t("color"),
                                description: t("colorDescription"),
                                screenshot: "field type - color - pickaform.webp"
                            }),
                            // Icon
                            kiss.templates.featureDetails({
                                title: t("icon"),
                                description: t("iconDescription"),
                                screenshot: "field type - icon - pickaform.webp"
                            }),
                            // Password
                            kiss.templates.featureDetails({
                                title: t("password"),
                                description: t("passwordDescription"),
                                screenshot: "field type - password - pickaform.webp"
                            }),
                            // Link
                            kiss.templates.featureDetails({
                                title: t("link"),
                                description: t("linkDescription"),
                                screenshot: "field type - link - pickaform.webp"
                            }),
                            // Lookup
                            kiss.templates.featureDetails({
                                title: t("lookup"),
                                description: t("lookupDescription"),
                                screenshot: "field type - lookup - pickaform.webp"
                            }),
                            // Summary
                            kiss.templates.featureDetails({
                                title: t("summary"),
                                description: t("summaryDescription"),
                                screenshot: "field type - summary - pickaform.webp"
                            })
                        ]
                    }]
                },

                // WORKING WITH VIEWS
                kiss.templates.title({
                    title: t("titleViewCreation"),
                    subtitle: t("subtitleViewCreation")
                }),

                {
                    class: "feature-top-separator"
                },

                // Block containing view demo
                {
                    class: "feature-details-container",
                    items: [{
                        class: "feature-details-container-column",
                        items: [
                            // Column selection
                            kiss.templates.featureDetails({
                                title: t("columnSelection"),
                                description: t("columnSelectionDescription"),
                                screenshot: "views - select columns - pickaform.webp"
                            }),
                            // Sorting
                            kiss.templates.featureDetails({
                                title: t("sorting"),
                                description: t("sortingDescription"),
                                screenshot: "views - multi-column sorting - pickaform.webp"
                            }),
                            // Filtering
                            kiss.templates.featureDetails({
                                title: t("filtering"),
                                description: t("filteringDescription"),
                                screenshot: "views - filter data - pickaform.webp"
                            }),
                            // One level grouping
                            kiss.templates.featureDetails({
                                title: t("grouping"),
                                description: t("groupingDescription"),
                                screenshot: "views - group data - pickaform.webp"
                            }),
                            // Multi-level grouping
                            kiss.templates.featureDetails({
                                title: t("multiGrouping"),
                                description: t("multiGroupingDescription"),
                                screenshot: "views - multi-level grouping data - pickaform.webp"
                            }),
                            // Aggregations
                            kiss.templates.featureDetails({
                                title: t("aggregations"),
                                description: t("aggregationsDescription"),
                                screenshot: "views - data aggregation - pickaform.webp"
                            })
                        ]
                    }]
                },

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