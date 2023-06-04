kiss.app.defineView("product", function (id, target) {
    const t = defineTexts(id, {
        getStarted: {
            en: "Get started →",
            fr: "Démarrez maintenant →"
        },
        title: {
            en: `Super <span class="text-highlight" style="background-color: #00aaee">simple</span>
                <br>
                Incredibly <span class="text-highlight" style="background-color: #a1ed00">powerful</span>`,
            fr: `Super <span class="text-highlight" style="background-color: #00aaee">simple</span>
                <br>
                Incroyablement <span class="text-highlight" style="background-color: #a1ed00">puissant</span>`
        },
        subtitle: {
            en: "An infinity of applications and uses are possible from the forms and their à la carte functionalities.",
            fr: "Une infinité d'applications et d'usages sont possibles à partir des formulaires et de leurs fonctionnalités à la carte."
        },
        title1: {
            en: "Flexible forms",
            fr: "Des formulaires flexibles"
        },
        subtitle1: {
            en: "With our forms, you can collect simple or complex information and process it efficiently with your personalized workflows.",
            fr: "Avec nos formulaires, vous pouvez collecter des informations simples ou complexes et les traiter efficacement avec vos workflows personnalisés."
        },
        title2: {
            en: "Organize your work.",
            fr: "Organisez votre travail"
        },
        subtitle2: {
            en: "Thanks to the custom views, you will be able to create your own structure to organize all your work in the best possible way.",
            fr: "Grâce aux vues personnalisées, vous pourrez créer votre propre structure pour organiser l'ensemble de votre travail de la meilleure façon possible."
        },
        title3: {
            en: "Customize your workflows to fit your needs",
            fr: "Personnalisez vos workflows pour vos besoins"
        },
        subtitle3: {
            en: "In a few minutes, you define the steps of the workflow, the actors and the possible decisions, and go!",
            fr: "En quelques minutes, vous définissez les étapes du workflow, les acteurs et les décisions possibles, et c'est parti !"
        },
        title4: {
            en: "Define your views",
            fr: "Définissez vos vues"
        },
        subtitle4: {
            en: "Configure how you want to see your data: choose your columns, filters, sort, group and create as many views as needed.",
            fr: "Configurez la façon dont vous souhaitez voir vos données : choisissez vos colonnes, filtres, triez, regroupez et créez autant de vues que nécessaire."
        },
        title5: {
            en: "20 field types to build your forms",
            fr: "20 types de champs pour vos formulaires"
        },
        subtitle5: {
            en: "Creating rich forms requires a variety of field types.<br>We've got you covered!",
            fr: "La création de formulaires riches nécessite des types de champs variés.<br>Nous vous couvrons !"
        },
        title6: {
            en: "Many ways to organize your data",
            fr: "Plein de manières d'organiser vos données"
        },
        subtitle6: {
            en: "Creating views is a simple yet extremely powerful process for organizing all your data.",
            fr: "La création des vues est un processus simple mais extrêmement puissant pour organiser toutes vos données."
        },

        // Field types
        text: {
            fr: "texte"
        },
        textDescription: {
            en: "Add a short text to any element. The Text field is used for simple fields such as a name, a title, etc...",
            fr: "Ajoutez un court texte à n'importe quel élément. Le champ Texte est utilisé pour des champs simples comme un nom, un titre, etc..."
        },
        number: {
            fr: "nombre"
        },
        numberDescription: {
            en: "The Number field allows you to process numeric information such as amounts, and you can also choose the units.",
            fr: "Le champ Nombre permet de traiter les informations numériques telles que des montants, et vous pouvez également choisir les unités."
        },
        date: {
            fr: "date"
        },
        dateDescription: {
            en: "The Date field allows you to select a date in a calendar, for example to set an appointment, a deadline...",
            fr: "Le champ Date vous permet de sélectionner une date dans un calendrier, par exemple pour fixer un RDV, une deadline, une échéance..."
        },
        time: {
            fr: "heure"
        },
        timeDescription: {
            en: "The Time control offers a drop-down list of time slots whose increment can be configured (every 5 minutes for example).",
            fr: "Le champ Heure propose une liste déroulante de créneaux horaires dont l'incrément est paramétrable (par exemple toutes les 5mn)."
        },
        paragraph: {
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
            fr: "sélection"
        },
        selectDescription: {
            en: "The Drop-down List control offers to choose from a list of values possibly associated with a color.",
            fr: "Le champ Liste déroulante propose de choisir parmi une liste de valeurs éventuellement associées à une couleur."
        },
        checkbox: {
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
            fr: "notation"
        },
        ratingDescription: {
            en: "The Rating field is useful for rating items from 1 to 10, and you can also choose its symbol.",
            fr: "Le champ Notation est utile pour évaluer des objets de 1 à 10, et vous pouvez aussi choisir son symbole."
        },
        attachment: {
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
            fr: "Ce type de champ permet de récupérer simultanément plusieurs valeurs d'une autre fiche en la sélectionnat dans une vue."
        },
        collaborators: {
            fr: "collaborateurs"
        },
        collaboratorsDescription: {
            en: "The Collaborators field displays in a drop-down list the address book of users and groups in your organization.",
            fr: "Le champ Collaborateurs affiche dans une liste déroulante le carnet d'adresses des utilisateurs et des groupes de votre organisation."
        },
        color: {
            fr: "couleur"
        },
        colorDescription: {
            en: "The Color field is used to assign a color to a data item by selecting it from a palette.",
            fr: "Le champ Couleur permet d'attribuer une couleur à une donnée en la sélectionnant dans une palette."
        },
        icon: {
            fr: "icône"
        },
        iconDescription: {
            en: "The Icon control allows you to associate an icon to an object from a palette of more than 1000 icons.",
            fr: "Le champ Icône vous permet d'associer une icône à un objet à partir d'une palette de plus de 1000 icônes."
        },
        password: {
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
            fr: "Ce type de champ permet d'effectuer un calcul (de type somme, moyenne) à partir de toutes les fiches liées par un champ de liaison."
        },
        multiGrouping: {
            en: "multi-level grouping",
            fr: "regroupement multi-niveaux"
        },
        multiGroupingDescription: {
            en: "This type of field is used to perform a calculation (ex: sum, average) from all the records linked by a Link field.",
            fr: "Ce type de champ permet d'effectuer un calcul (de type somme, moyenne) à partir de toutes les fiches liées par un champ de liaison."
        },
        aggregations: {
            en: "aggregations",
            fr: "aggrégations"
        },
        aggregationsDescription: {
            en: "This type of field is used to perform a calculation (ex: sum, average) from all the records linked by a Link field.",
            fr: "Ce type de champ permet d'effectuer un calcul (de type somme, moyenne) à partir de toutes les fiches liées par un champ de liaison."
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
            kiss.templates.screenshot("nocode templates applications - pickaform.png"),

            // FORMS
            kiss.templates.feature({
                title: t("title1"),
                description: t("subtitle1"),
                screenshot: "forms-thumbnail.png",
                CTA: t("getStarted"),
                textPosition: "left"
            }),

            {
                class: "feature-top-separator"
            },

            // LEFT NAVIGATOR
            kiss.templates.feature({
                title: t("title2"),
                description: t("subtitle2"),
                screenshot: "views-thumbnail.png",
                CTA: t("getStarted"),
                textPosition: "right",
                color: "#555555",
                backgroundColor: "var(--feature-background)"
            }),

            // WORKFLOWS
            kiss.templates.feature({
                title: t("title3"),
                description: t("subtitle3"),
                screenshot: "workflows-thumbnail.png",
                CTA: t("getStarted"),
                textPosition: "left"
            }),

            {
                class: "feature-top-separator"
            },

            // VIEWS
            kiss.templates.feature({
                title: t("title4"),
                description: t("subtitle4"),
                screenshot: "business contract management - flexible views - pickaform.png",
                CTA: t("getStarted"),
                textPosition: "right",
                color: "#555555",
                backgroundColor: "var(--feature-background)"
            }),

            // FIELD TYPES
            kiss.templates.title({
                title: t("title5"),
                subtitle: t("subtitle5")
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
                            screenshot: "field type - text - pickaform.png"
                        }),
                        // Number
                        kiss.templates.featureDetails({
                            title: t("number"),
                            description: t("numberDescription"),
                            screenshot: "field type - number - pickaform.png"
                        }),
                        // Date
                        kiss.templates.featureDetails({
                            title: t("date"),
                            description: t("dateDescription"),
                            screenshot: "field type - date - pickaform.png"
                        }),
                        // Time
                        kiss.templates.featureDetails({
                            title: t("time"),
                            description: t("timeDescription"),
                            screenshot: "field type - time - pickaform.png"
                        }),
                        // Paragraph
                        kiss.templates.featureDetails({
                            title: t("paragraph"),
                            description: t("paragraphDescription"),
                            screenshot: "field type - paragraph - pickaform.png"
                        }),
                        // AI paragraph
                        kiss.templates.featureDetails({
                            title: t("aiParagraph"),
                            description: t("aiParagraphDescription"),
                            screenshot: "field type - AI paragraph - pickaform.png"
                        }),
                        // Select
                        kiss.templates.featureDetails({
                            title: t("select"),
                            description: t("selectDescription"),
                            screenshot: "field type - select - pickaform.png"
                        }),
                        // Checkbox
                        kiss.templates.featureDetails({
                            title: t("checkbox"),
                            description: t("checkboxDescription"),
                            screenshot: "field type - checkbox - pickaform.png"
                        }),
                        // Progress bar
                        kiss.templates.featureDetails({
                            title: t("progressBar"),
                            description: t("progressBarDescription"),
                            screenshot: "field type - progress bar - pickaform.png"
                        }),
                        // Rating
                        kiss.templates.featureDetails({
                            title: t("rating"),
                            description: t("ratingDescription"),
                            screenshot: "field type - ranking - pickaform.png"
                        }),
                        // Attachment
                        kiss.templates.featureDetails({
                            title: t("attachment"),
                            description: t("attachmentDescription"),
                            screenshot: "field type - attachment - pickaform.png"
                        }),
                        // Select from view column
                        kiss.templates.featureDetails({
                            title: t("selectColumn"),
                            description: t("selectColumnDescription"),
                            screenshot: "field type - select from column - pickaform.png"
                        }),
                        // Select from view
                        kiss.templates.featureDetails({
                            title: t("selectView"),
                            description: t("selectViewDescription"),
                            screenshot: "field type - select from view - pickaform.png"
                        }),
                        // Collaborators
                        kiss.templates.featureDetails({
                            title: t("collaborators"),
                            description: t("collaboratorsDescription"),
                            screenshot: "field type - collaborators - pickaform.png"
                        }),
                        // Color
                        kiss.templates.featureDetails({
                            title: t("color"),
                            description: t("colorDescription"),
                            screenshot: "field type - color - pickaform.png"
                        }),
                        // Icon
                        kiss.templates.featureDetails({
                            title: t("icon"),
                            description: t("iconDescription"),
                            screenshot: "field type - icon - pickaform.png"
                        }),
                        // Password
                        kiss.templates.featureDetails({
                            title: t("password"),
                            description: t("passwordDescription"),
                            screenshot: "field type - password - pickaform.png"
                        }),
                        // Link
                        kiss.templates.featureDetails({
                            title: t("link"),
                            description: t("linkDescription"),
                            screenshot: "field type - link - pickaform.png"
                        }),
                        // Lookup
                        kiss.templates.featureDetails({
                            title: t("lookup"),
                            description: t("lookupDescription"),
                            screenshot: "field type - lookup - pickaform.png"
                        }),
                        // Summary
                        kiss.templates.featureDetails({
                            title: t("summary"),
                            description: t("summaryDescription"),
                            screenshot: "field type - summary - pickaform.png"
                        })
                    ]
                }]
            },

            // WORKING WITH VIEWS
            kiss.templates.title({
                title: t("title6"),
                subtitle: t("subtitle6")
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
                            screenshot: "views - filter data - pickaform.png"
                        }),
                        // One level grouping
                        kiss.templates.featureDetails({
                            title: t("grouping"),
                            description: t("groupingDescription"),
                            screenshot: "field type - time - pickaform.png"
                        }),
                        // Multi-level grouping
                        kiss.templates.featureDetails({
                            title: t("multiGrouping"),
                            description: t("multiGroupingDescription"),
                            screenshot: "field type - paragraph - pickaform.png"
                        }),
                        // Aggregations
                        kiss.templates.featureDetails({
                            title: t("aggregations"),
                            description: t("aggregationsDescription"),
                            screenshot: "field type - AI paragraph - pickaform.png"
                        })
                    ]
                }]
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
})

;