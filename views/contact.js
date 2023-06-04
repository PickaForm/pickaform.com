kiss.app.defineView("contact", function (id, target) {
    const modelId = "0187fc11-6405-73d4-abcf-8c323e9b91a9"

    const t = defineTexts(id, {
        title: {
            en: "Let's keep in touch",
            fr: "Prenons contact"
        },
        subtitle: {
            en: `By explaining your project,<br>we can help you start <span class="text-highlight" style="background-color: #00aaee">for free</span>`,
            fr: `En expliquant votre projet,<br>nous pouvons vous aider à démarrer<span class="text-highlight" style="background-color: #00aaee">gratuitement</span>`
        },        
        submit: {
            en: "submit",
            fr: "envoyer"
        },
        name: {
            fr: "nom"
        },
        company: {
            fr: "société"
        },
        project: {
            fr: "projet"
        },
        language: {
            fr: "langue"
        }
    })

    return createBlock({
        id,
        target,
        layout: "vertical",
        alignItems: "center",
        class: "wave-3",

        items: [
            // TITLE / SUBTITLE
            kiss.templates.title({
                title: t("title"),
                subtitle: t("subtitle")
            }),

            // CONTACT FORM
            {
                type: "panel",
                header: false,
                maxWidth: 600,
                width: "50%",
                minWidth: 400,
                margin: "10vh 0 20vh 0",
                layout: "vertical",
        
                defaultConfig: {
                    labelPosition: "top",
                },
        
                items: [
                    // Name
                    {
                        id: "name",
                        type: "text",
                        label: t("name")
                    },
                    // Email
                    {
                        id: "email",
                        type: "text",
                        label: "Email",
                        validationType: "email"
                    },
                    // Telephone
                    {
                        id: "telephone",
                        type: "text",
                        label: "Telephone"
                    },
                    // Language
                    {
                        id: "language",
                        type: "select",
                        label: t("language"),
                        options: [{
                                label: "English",
                                value: "en"
                            },
                            {
                                label: "Français",
                                value: "fr"
                            }
                        ],
                        value: kiss.language.current || "en"
                    },
                    // Company
                    {
                        id: "company",
                        type: "text",
                        label: t("company")
                    },
                    // Project
                    {
                        id: "project",
                        type: "textarea",
                        label: t("project"),
                        rows: 10
                    },
                    // Submit button
                    {
                        type: "button",
                        text: t("submit"),
                        icon: "fas fa-paper-plane",
                        iconSize: "2vh",
                        fontSize: "2vh",
                        height: "5vh",
                        backgroundColor: "#00aaee",
                        color: "#ffffff",
                        iconColor: "#ffffff",
                        action: async function() {
                            let formData = this.closest("a-block").getData({
                                useLabels: true
                            })
                            formData.useLabels = true
        
                            await kiss.ajax.request({
                                url: "https://localhost/command/publicForm/post/" + modelId,
                                method: "post",
                                body: JSON.stringify(formData)
                            })
                        }
                    }
                ]
            }            
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