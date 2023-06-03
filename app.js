kiss.app.defineView("artworks", function (id, target) {
    // Static model properties
    const modelId = "0188527b-7570-7551-9c32-99e1958e25b5"
    const fieldTitle = "pJZ5QvWL"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Header
            kiss.templates.title({
                title: "Get Inspired by our AI Art Collection",
                subtitle: "We used pickaform to streamline the process of creating Midjourney images"
            }),
            // Search field
            {
                type: "text",
                width: "366px",
                fieldWidth: "100%",
                fieldHeight: "4vh",
                fontSize: "2vh",
                placeholder: "Search",
                events: {
                    change() {
                        $(id).search(this.getValue())
                    }
                }
            },
            // List of artworks
            {
                id: "artworks-list",
                class: "artworks-list"
            },
            // Pager
            {
                id: "artworks-pager",
                class: "artworks-pager"
            }
        ],

        events: {
            click: (event) => {
                if (event.target.closest("div").classList.contains("artwork")) {
                    const filename = event.target.src.replace(".256x256", "")
                    const tags = event.target.alt

                    createPanel({
                        modal: true,
                        header: false,
                        width: "calc(100% - 20px)",
                        maxWidth: 1350,
                        height: "calc(100% - 20px)",
                        align: "center",
                        verticalAlign: "center",
                        layout: "vertical",
                        backgroundColor: "var(--body-alt)",
                        classes: {
                            "panel-body": "wave-2"
                        },
                        items: [{
                            type: "html",
                            html: /*html*/ `
                                <img class="artwork-image-preview" src="${filename}"/>
                                <h2 class="artwork-title">${tags}</h2>
                                `
                        }],
                        events: {
                            click: function () {
                                this.close()
                            }
                        }
                    }).render()
                }
            }
        },

        methods: {
            async load() {
                this.getArtworks(0, 10)
            },

            async getArtworks(skip, limit) {
                const response = await kiss.ajax.request({
                    url: kiss.global.path + "/command/product/list",
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        sortSyntax: "mongo",
                        sort: {
                            createdAt: -1 // Sort by creation date
                        },
                        skip,
                        limit
                    })
                })

                $("artworks-list").setInnerHtml(this.toHtml(response))
                this.createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: kiss.global.path + "/command/product/list",
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId,
                        skip,
                        limit,
                        sortSyntax: "mongo",
                        sort: {
                            createdAt: -1 // Sort by publication date
                        },
                        filterSyntax: "normalized",
                        filter: {
                            type: "group",
                            operator: "or",
                            filters: [
                                // Search in title
                                {
                                    type: "filter",
                                    fieldId: fieldTitle,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                $("artworks-list").setInnerHtml(this.toHtml(response))
                this.createPager(response.totalCount, response.skip, response.limit, term)
            },

            toHtml(response) {
                let items = response.products.map(artwork => {
                    return artwork.images.map(image => {
                        const imageId = (image.filename.split("-").pop()).split(".")[0]
                        return {
                            id: artwork.id + "-" + imageId,
                            title: artwork.title,
                            description: artwork.description,
                            tags: artwork.tags.join(", "),
                            image: image.thumbnails.m.path //image.path
                        }
                    })
                }).flat()
                return items.map(this.renderArtwork).join("")
            },

            renderArtwork(artwork) {
                return `
                    <div id="${artwork.id}" class="artwork">
                        <img loading="lazy" class="artwork-image" src="${artwork.image}" alt="${artwork.tags}"></img>
                        <p class="artwork-tags">${artwork.tags}</p>
                    </div>`
            },

            createPager(count, skip, limit, searchTerm) {
                const rest = count % limit
                const numberOfPages = Math.floor(count / limit) + ((rest == 0) ? 0 : 1)
                const pageNumber = skip / limit

                kiss.router.updateUrlHash({
                    page: pageNumber + 1
                })

                let pagerButtons = []

                for (let i = 0; i < numberOfPages; i++) {
                    let newButton = {
                        type: "button",
                        text: i + 1 + "",
                        backgroundColor: (i == pageNumber) ? "#bdecff" : "",
                        width: "5vh",
                        height: "5vh",
                        borderRadius: "5vh",
                        margin: "5px",
                        action: () => {
                            const newSkip = i * limit
                            if (searchTerm) {
                                $(id).search(searchTerm, newSkip, limit)
                            } else {
                                $(id).getArtworks(newSkip, limit)
                            }
                        }
                    }
                    pagerButtons.push(newButton)
                }

                $("artworks-pager").setItems(pagerButtons)
            }
        }
    })
})

;kiss.app.defineView("blog", function (id, target) {
    // Static model properties
    const modelId = "0187ed6f-35e4-7b17-80c5-046e69931916"
    const fieldTitle = "y9yVRPEQ"
    const fieldDescription = "BedquzD8"
    const fieldPublicationDate = "floopJiS"
    const postEndpoint = "https://localhost/command/blog/list"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Blog header
            kiss.templates.title({
                title: "Get Inspired to Do Big Things",
                subtitle: "News, stories and tips on project management, collaboration & productivity"
            }),
            // Search field
            {
                type: "text",
                width: "366px",
                fieldWidth: "100%",
                fieldHeight: "4vh",
                fontSize: "2vh",
                placeholder: "Search",
                events: {
                    change() {
                        $(id).search(this.getValue())
                    }
                }
            },
            // List of posts
            {
                id: "blog-content",
                class: "blog-content"
            },
            // Pager
            {
                id: "blog-pager",
                class: "blog-pager"
            }
        ],

        events: {
            click: (event) => {
                const item = event.target
                if (item.closest("a-block").classList.contains("blog-entry")) {
                    const postId = item.closest("a-block").id

                    kiss.context.postId = postId
                    kiss.router.navigateTo({
                        content: "blogPost",
                        postId
                    })
                }
            }
        },

        methods: {
            async load() {
                this.getPosts(0, 6)
            },

            async getPosts(skip, limit) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        sortSyntax: "mongo",
                        sort: {[fieldPublicationDate]: -1}, // Sort by publication date
                        skip,
                        limit
                    })
                })

                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                this.createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId,
                        skip,
                        limit,
                        sortSyntax: "mongo",
                        sort: {[fieldPublicationDate]: -1}, // Sort by publication date
                        filterSyntax: "normalized",
                        filter: {
                            type: "group",
                            operator: "or",
                            filters: [
                                // Search in title
                                {
                                    type: "filter",
                                    fieldId: fieldTitle,
                                    operator: "contains",
                                    value: term
                                },
                                // Search in description
                                {
                                    type: "filter",
                                    fieldId: fieldDescription,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                this.createPager(response.totalCount, response.skip, response.limit, term)
            },

            createPager(count, skip, limit, searchTerm) {
                const rest = count % limit
                const numberOfPages = Math.floor(count / limit) + ((rest == 0) ? 0 : 1)
                const pageNumber = skip / limit
                
                kiss.router.updateUrlHash({
                    page: pageNumber + 1
                })

                let pagerButtons = []

                for (let i = 0; i < numberOfPages; i++) {
                    let newButton = {
                        type: "button",
                        text: i + 1 + "",
                        backgroundColor: (i == pageNumber) ? "#bdecff" : "",
                        width: "5vh",
                        height: "5vh",
                        borderRadius: "5vh",
                        margin: "5px",
                        action: () => {
                            const newSkip = i * limit
                            if (searchTerm) {
                                $(id).search(searchTerm, newSkip, limit)
                            }
                            else {
                                $(id).getPosts(newSkip, limit)
                            }
                        }
                    }
                    pagerButtons.push(newButton)
                }

                $("blog-pager").setItems(pagerButtons)
            }            
        }
    })
})

;kiss.app.defineView("blogPost", function (id, target) {
    const modelId = "0187ed6f-35e4-7b17-80c5-046e69931916"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            {
                id: "blog-post-banner",
                class: "blog-post-banner",
            },
            {
                id: "blog-post-content",
                class: "blog-post-content",
                layout: "vertical",
                alignItems: "center"        
            }
        ],

        methods: {
            async load() {
                const postId = kiss.context.postId
                const post = await kiss.ajax.request({
                    url: kiss.global.path + "/command/blog/get",
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        postId
                    })
                })

                $("blog-post-banner").setItems([kiss.templates.blogPostBanner(post)])
                $("blog-post-content").setItems([kiss.templates.blogPost(post)])
            }
        }
    })
})

;kiss.app.defineView("contact", function (id, target) {
    const modelId = "0187fc11-6405-73d4-abcf-8c323e9b91a9"

    const texts = {
        "title": {
            en: "Let's keep in touch",
            fr: ""
        },
        "subtitle": {
            en: `By explaining your project, we can help you quickstart your project, <span class="text-highlight" style="background-color: #00aaee">for free</span>`,
            fr: ``
        },        
        "submit": {
            en: "submit",
            fr: ""
        },
        "name": {
            fr: "nom"
        },
        "company": {
            fr: "société"
        },
        "project": {
            fr: "projet"
        },
        "language": {
            fr: "langue"
        }
    }
    const t = (id) => txtTitleCase(id, texts)

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
                id: id,
                target,
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
                                url: "/command/publicForm/post/" + modelId,
                                method: "post",
                                body: JSON.stringify(formData)
                            })
        
                        }
                    }
                ]
            }            
        ]
    })
})

;kiss.app.defineView("footer", function (id, target) {
    const entries = [
        // PRODUCT
        {
            title: "Product",
            items: [{
                    label: "form",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "fields",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "workflow",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "API",
                    action: () => kiss.views.show("landing", "content", true)
                }
            ]
        },
        // ALTERNATIVES
        {
            title: "Alternatives",
            items: [{
                    label: "AirTable",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "Asana",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "Trello",
                    action: () => kiss.views.show("landing", "content", true)
                }
            ]
        },
        // ALTERNATIVES
        {
            title: "Other cool stuff",
            items: [{
                    label: "Beboop",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "Walalaa",
                    action: () => kiss.views.show("landing", "content", true)
                },
                {
                    label: "Grellox",
                    action: () => kiss.views.show("landing", "content", true)
                }
            ]
        }            
    ]

    const blocks = entries.map(entry => kiss.templates.footerBlock({
        title: entry.title,
        entries: entry.items
    }))

    return createBlock({
        id: id,
        target,
        class: "footer",
        layout: "horizontal",
        items: blocks
    })
})

;kiss.app.defineView("landing", function (id, target) {
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

;kiss.app.defineView("legal", function (id, target) {
    return createBlock({
        id: id,
        target,
        layout: "horizontal",
        justifyContent: "center",

        items: [{
            type: "html",
            html: `PICKAFORM 2023 | Politique de confidentialité | Mentions légales`
        }]
    })
})

;kiss.app.defineView("navbar", function (id, target) {
    texts = {
        "Home": {
            fr: "Accueil"
        },
        "Product": {
            fr: "Produit"
        },
        "Pricing": {
            fr: "Pricing"
        },
        "Templates": {
            fr: "Modèles"
        },
        "Login": {
            fr: "Connexion"
        },
        "Get started": {
            fr: "Inscription"
        }
    }

    const navItems = [
        // HOME
        {
            text: t("Home", texts),
            href: kiss.global.path + "/www/start/landing",
            view: "landing",
        },        
        // PRODUCT
        {
            text: t("Product", texts),
            href: kiss.global.path + "/www/start/product",
            view: "product"
        },
        // CONTACT
        {
            text: "Contact",
            href: kiss.global.path + "/www/start/contact",
            view: "contact"
        },
        // BLOG
        {
            text: "Blog",
            href: kiss.global.path + "/www/start/blog",
            view: "blog"
        },
        // ART
        {
            text: "AI Art",
            href: kiss.global.path + "/www/start/artworks",
            view: "artworks"
        },        
        // PRICING
        {
            text: t("Pricing", texts),
            href: kiss.global.path + "/www/start/pricing",
            view: "pricing"
        },
        // TEMPLATES
        {
            text: t("Templates", texts),
            href: kiss.global.path + "/client/pickaform/demo.html#ui=templates-list",
            target: "_new",
            view: ""
        },
        // LOGIN
        {
            text: t("Login", texts),
            href: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-login",
            target: "_new",
            view: ""
        },
        // REGISTER
        {
            text: t("Get started", texts),
            href: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register",
            target: "_new",
            view: ""
        }
    ]

    return createBlock({
        id,
        target,
        layout: "horizontal",
        alignItems: "center",
        minHeight: 60,
        maxHeight: 60,
        styles: {
            this: "user-select: none;"
        },
        items: [{
                type: "image",
                src: "./resources/img/pickaform.png"
            },
            {
                type: "spacer",
                flex: 1
            },
            {
                id: "topbar-buttons",
                type: "html",
                html: kiss.templates.navbar(navItems)
            },
            {
                id: "mode",
                type: "checkbox",
                iconOn: "fas fa-moon",
                iconOff: "fas fa-sun",
                iconColorOn: "#00aaee",
                iconSize: 24
            }
        ],

        events: {
            /**
             * Intercepts the navbar click event to prevent direct navigation with href.
             * This allows to *not reload* the page and leverage the SPA behavior of KissJS when opening views.
             */
            click: function(event) {
                event.preventDefault()
                
                let element = event.target
                
                if (element.classList.contains("field-checkbox-icon")) {
                    const currentState = $("mode").getValue()
                    const theme = (currentState === false) ? "dark": "light"
                    kiss.theme.set({color: theme})
                    return
                }

                if (element.tagName == "SPAN") element = element.closest("a")
                if (element.tagName == "LI") element = element.querySelector("a")

                if (element.tagName == "A") {
                    const view = element.getAttribute("view")
                    const target = element.getAttribute("target")

                    if (view) {
                        kiss.router.navigateTo({
                            content: view
                        })
                    }
                    else {
                        window.open(element.href, target)
                    }
                }
            }
        },

        // subscriptions: {
        //     EVT_WINDOW_RESIZED: function (msgData) {
        //         if (!this.isConnected) return
        //         this.adjustDisplayMode(msgData.current.width)
        //     }
        // },

        methods: {
            load() {
                this.texts = texts
                // this.adjustDisplayMode(kiss.screen.current.width)
            },
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo,

            // adjustDisplayMode(width) {
            //     if (width < 900) {
            //         if (this.mode == "narrow") return
            //         this.mode = "narrow"
            //         this.displayAsButton()
            //     } else {
            //         if (this.mode == "wide") return
            //         this.mode = "wide"
            //         this.displayAsMenu()
            //     }
            // },

            // displayAsMenu() {
            //     $("topbar-buttons").setItems(buttons)
            // },

            // displayAsButton() {
            //     const menuButton = {
            //         type: "button",
            //         icon: "fas fa-bars",
            //         padding: 10,
            //         margin: 10,
            //         action: () => {
            //             // Display menu vertically
            //         }
            //     }
            //     $("topbar-buttons").setItems([menuButton])
            // }
        }
    })
})

;kiss.app.defineView("pricing", function(id, target) {
    const texts = {
        title: {
            en: "Get the Right Plan for<br>Your Business Needs",
            fr: "Sélectionnez le plan adapté à vos besoins"
        },
        subtitle: {
            en: "Register and start your 14 days free trial.",
            fr: "Enregistrez vous et démarrer l'essai de 14 jours."
        },
        unlimitedForms: {
            en: "unlimited forms",
            fr: "formulaires illimités"
        },
        unlimitedWorkflows: {
            en: "unlimited workflows",
            fr: "workflows illimités"
        },
        userPerMonth: {
            en: "user /<br>month",
            fr: "utilisateur /<br>mois"
        },
        "Get started": {
            fr: "Incription"
        }
    }

    const plans = [
        {
            name: "Silver",
            users: 10,
            apps: 3,
            price: "15,00",
            storage: "10 GB Storage",
            color: "#00aaee"
        },
        {
            name: "Gold",
            users: 20,
            apps: 5,
            price: "12,50",
            storage: "20 GB Storage",
            color: "#8833ee"
        },
        {
            name: "Platinum",
            users: 50,
            apps: 10,
            price: "11,00",
            storage: "50 GB Storage",
            color: "#ed3757"
        }
    ]

    return createBlock({
        id,
        target,
        layout: "vertical",
        alignItems: "center",

        items: [
            kiss.templates.title({
                title: t("title", texts),
                subtitle: t("subtitle", texts),
            }),
            {
                type: "html",
                class: "pricing-table",
                html: kiss.templates.pricingTable(plans, texts)
            }
        ],

        events: {
            click: (event) => {
                if (event.target.classList.contains("pricing-plan-CTA")) {
                    document.location = "https://localhost/client/pickaform/index_dev.html#ui=authentication-register"
                }
            }
        },

        methods: {
            load() {
                this.texts = texts
            },
            _qqafterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;kiss.app.defineView("product", function (id, target) {
    const texts = {
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
        }
    }
    const t = (id) => txtTitleCase(id, texts)

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
                title: t("title5", texts),
                subtitle: t("subtitle5", texts)
            }),

            {
                class: "feature-top-separator"
            },

            // Block containing all field types
            {
                display: "inline-flex",
                flexFlow: "row",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "center",
                backgroundColor: "var(--feature-background)",
                items: [
                    // Text
                    kiss.templates.fieldType({
                        title: t("text"),
                        description: t("textDescription"),
                        screenshot: "field type - text - pickaform.png"
                    }),
                    // Number
                    kiss.templates.fieldType({
                        title: t("number"),
                        description: t("numberDescription"),
                        screenshot: "field type - number - pickaform.png"
                    }),
                    // Date
                    kiss.templates.fieldType({
                        title: t("date"),
                        description: t("dateDescription"),
                        screenshot: "field type - date - pickaform.png"
                    }),
                    // Time
                    kiss.templates.fieldType({
                        title: t("time"),
                        description: t("timeDescription"),
                        screenshot: "field type - time - pickaform.png"
                    }),  
                    // Paragraph
                    kiss.templates.fieldType({
                        title: t("paragraph"),
                        description: t("paragraphDescription"),
                        screenshot: "field type - paragraph - pickaform.png"
                    }),
                    // AI paragraph
                    kiss.templates.fieldType({
                        title: t("AI paragraph"),
                        description: t("aiParagraphDescription"),
                        screenshot: "field type - AI paragraph - pickaform.png"
                    }),
                    // Select
                    kiss.templates.fieldType({
                        title: t("select"),
                        description: t("selectDescription"),
                        screenshot: "field type - select - pickaform.png"
                    }),
                    // Checkbox
                    kiss.templates.fieldType({
                        title: t("checkbox"),
                        description: t("checkboxDescription"),
                        screenshot: "field type - checkbox - pickaform.png"
                    }),
                    // Progress bar
                    kiss.templates.fieldType({
                        title: t("progress bar"),
                        description: t("progressBarDescription"),
                        screenshot: "field type - progress bar - pickaform.png"
                    }),
                    // Rating
                    kiss.templates.fieldType({
                        title: t("rating"),
                        description: t("ratingDescription"),
                        screenshot: "field type - ranking - pickaform.png"
                    }),
                    // Attachment
                    kiss.templates.fieldType({
                        title: t("attachment"),
                        description: t("attachmentDescription"),
                        screenshot: "field type - attachment - pickaform.png"
                    }),
                    // Select from view column
                    kiss.templates.fieldType({
                        title: t("dynamic dropdown list"),
                        description: t("selectColumnDescription"),
                        screenshot: "field type - select from column - pickaform.png"
                    }),
                    // Select from view
                    kiss.templates.fieldType({
                        title: t("select from a view"),
                        description: t("selectViewDescription"),
                        screenshot: "field type - select from view - pickaform.png"
                    }),
                    // Collaborators
                    kiss.templates.fieldType({
                        title: t("collaborators"),
                        description: t("collaboratorsDescription"),
                        screenshot: "field type - collaborators - pickaform.png"
                    }),
                    // Color
                    kiss.templates.fieldType({
                        title: t("color"),
                        description: t("colorDescription"),
                        screenshot: "field type - color - pickaform.png"
                    }),
                    // Icon
                    kiss.templates.fieldType({
                        title: t("icon"),
                        description: t("iconDescription"),
                        screenshot: "field type - icon - pickaform.png"
                    }),
                    // Password
                    kiss.templates.fieldType({
                        title: t("password"),
                        description: t("passwordDescription"),
                        screenshot: "field type - password - pickaform.png"
                    }),
                    // Link
                    kiss.templates.fieldType({
                        title: t("link"),
                        description: t("linkDescription"),
                        screenshot: "field type - link - pickaform.png"
                    }),
                    // Lookup
                    kiss.templates.fieldType({
                        title: t("lookup"),
                        description: t("lookupDescription"),
                        screenshot: "field type - lookup - pickaform.png"
                    }),                    
                    // Summary
                    kiss.templates.fieldType({
                        title: t("summary"),
                        description: t("summaryDescription"),
                        screenshot: "field type - summary - pickaform.png"
                    })
                ]
            },

            // WORKING WITH VIEWS
            kiss.templates.title({
                title: t("title6", texts),
                subtitle: t("subtitle6", texts)
            }),

            {
                class: "feature-top-separator"
            },

            // Block containing view demo
            {
                display: "inline-flex",
                flexFlow: "row",
                flexWrap: "wrap",
                alignItems: "baseline",
                justifyContent: "center",
                backgroundColor: "var(--feature-background)",
                items: [
                    // Column selection
                    kiss.templates.fieldType({
                        title: t("column selection"),
                        description: t("textDescription"),
                        screenshot: "field type - text - pickaform.png"
                    }),
                    // Sorting
                    kiss.templates.fieldType({
                        title: t("sorting"),
                        description: t("numberDescription"),
                        screenshot: "field type - number - pickaform.png"
                    }),
                    // Filtering
                    kiss.templates.fieldType({
                        title: t("filtering"),
                        description: t("dateDescription"),
                        screenshot: "field type - date - pickaform.png"
                    }),
                    // One level grouping
                    kiss.templates.fieldType({
                        title: t("grouping"),
                        description: t("timeDescription"),
                        screenshot: "field type - time - pickaform.png"
                    }),  
                    // Multi-level grouping
                    kiss.templates.fieldType({
                        title: t("multi-grouping"),
                        description: t("paragraphDescription"),
                        screenshot: "field type - paragraph - pickaform.png"
                    }),
                    // Aggregations
                    kiss.templates.fieldType({
                        title: t("aggregations"),
                        description: t("aiParagraphDescription"),
                        screenshot: "field type - AI paragraph - pickaform.png"
                    })
                ]
            }            
        ],

        events: {
            click: (event) => {
                if (event.target.parentNode.classList.contains("feature-CTA")) {
                    log("CTA")
                }
            }
        }
    })
})

;kiss.app.defineView("start", function (id, target) {
    return createBlock({
        id,
        target,
        layout: "vertical",
        fullscreen: true,

        items: [
            // NAVBAR
            {
                type: "view",
                id: "navbar",
            },
            {
                id: "content-container",
                overflowY: "auto",
                items: [
                    // CONTENT
                    {
                        id: "content",
                        layout: "vertical",
                        items: [{
                            type: "view",
                            id: "landing"
                        }]
                    },
                    // FOOTER
                    {
                        type: "view",
                        id: "footer"
                    },
                    // LEGAL
                    {
                        type: "view",
                        id: "legal"
                    }
                ]
            }
        ],

        subscriptions: {
            "EVT_ROUTE_UPDATED": (route) => {
                kiss.views
                    .show(route.content, "content", true)
                    .setAnimation({
                        name: "zoomIn",
                        speed: "faster"
                    })

                $("content-container").scrollTop = 0
            }
        }
    })
})

;kiss.templates.blogPostBanner = function (post) {
    log(post)
    
    return {
        type: "html",
        // html: `<img class="blog-post-banner-image" src="/${post.Image[0].path}">`
        html: `<img loading="lazy" class="blog-post-banner-image" src="/uploads/01844399-988f-7974-a68f-92d35fc702cc/2023/05/06/zen%20coach.png">`
    }
}

kiss.templates.blogPost = function (post) {
    return {
        layout: "vertical",
        items: [{
                type: "html",
                html: `
                    <h1 class="blog-post-title">${post.Title}</h1>
                    <p class="blog-post-description">${post.Description}</p>
                    
                    <p class="blog-post-body">${marked(post.Body)}</p>
                `
            },
            ...post.Sections.map(section => {
                return {
                    type: "html",
                    html: `
                        <h2 class="blog-post-title">${section.Title}</h2>
                        <p class="blog-post-body">${section.Body.replaceAll("\n", "<br>")}</p>
                    `
                }
            })
        ]
    }
}

;kiss.templates.blogPostEntry = function (post) {
    const postUrl = kiss.global.path + "/www/start/blogPost/" + post.slug
    const image = (post.image && Array.isArray(post.image) && post.image.length > 0) ? post.image[0] : ""

    return {
        id: post.slug,
        layout: "vertical",
        class: "blog-entry",
        items: [{
            type: "html",
            html:
                `
                <a href="${postUrl}">
                    <img loading="lazy" class="blog-entry-banner-image" src="${image.path}"></img>
                </a>
                <p class="blog-entry-tags">${post.tags}</p>
                <a href="${postUrl}">
                    <h2 class="blog-entry-title">${post.title}</h2>
                    <p class="blog-entry-description">${post.description}</p>
                </a>`
        }]
    }
}

;kiss.templates.buttonCTA = function () {
    const texts = {
        getStarted: {
            en: "Get started &nbsp;",
            fr: "Démarrez maintenant &nbsp;"
        },        
        register: {
            en: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register&language=en",
            fr: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register&language=fr"
        }
    }

    return {
        text: t("getStarted") + " ➔",
        action: () => window.open(t("register", texts), "_new"),

        type: "button",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#a1ed00",
        boxShadowHover: "0 0 32px #a1ed00",
        color: "#ffffff",
        colorHover: "#000000",
        fontSize: "2.5vh",
        iconSize: "2.5vh",
        icon: "fas fa-arrow-right",
        iconPosition: "right",
        iconColor: "#ffffff",
        borderRadius: 10,
        borderWidth: 0,
        animation: "zoomIn",
        padding: "1vh 0 1vh 3vh"
    }
}

;kiss.templates.feature = function ({
    title,
    description,
    screenshot,
    CTA,
    textPosition,
    color,
    backgroundColor
}) {
    const id = kiss.tools.shortUid()
    const src = kiss.global.pathImg + screenshot

    return {
        id,
        display: "flex",
        flexFlow: (textPosition == "right") ? "row-reverse" : "row",
        class: (textPosition == "right") ? "feature-right" : "feature-left",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor,
        items: [
            {
                type: "html",
                padding: "0 5vh",
                flex: 1,
                maxWidth: 580,
                styles: {
                    this: `color: ${color}`
                },
                html: /*html*/ `
                    <div class="feature-title">
                        <h1>${title}</h1>
                    </div>
                    <div class="feature-description">
                        <p>${description}</p>
                    </div>
                    <div class="feature-CTA">
                        <p>${CTA}</p>
                    </div>
                    `
            },
            {
                class: "feature-screenshot",
                flex: 1,
                maxWidth: 580,
                items: [
                    {
                        type: "html",
                        html: `<img src="${src}" class="feature-screenshot-img">`,
                        events: {
                            click: () => kiss.templates.screenshotPreview(src)
                        }
                    }
                ]
            }
        ],

        subscriptions: {
            EVT_WINDOW_RESIZED: function (msgData) {
                if (!this.isConnected) return
                this.adjustDisplayMode(msgData.current.width)
            }
        },

        methods: {
            load() {
                this.adjustDisplayMode(kiss.screen.current.width)
            },

            adjustDisplayMode(width) {
                if (width < 900) {
                    if (this.mode == "narrow") return
                    this.mode = "narrow"
                    this.displayAsColumn()
                } else {
                    if (this.mode == "wide") return
                    this.mode = "wide"
                    this.displayAsRow()
                }
            },

            displayAsRow() {
                $(id).style.flexFlow = (textPosition == "left") ? "row" : "row-reverse"
            },

            displayAsColumn() {
                $(id).style.flexFlow = "column"
            }
        }        
    }
}

;kiss.templates.fieldType = function ({
    title,
    description,
    screenshot
}) {
    const id = kiss.tools.shortUid()
    const src = kiss.global.pathImg + screenshot

    return {
        id,
        class: "field-type",
        items: [
            {
                class: "field-type-screenshot",
                flex: 1,
                items: [
                    {
                        type: "html",
                        html: `<img src="${src}" class="field-type-screenshot-img">`,
                        events: {
                            click: () => kiss.templates.screenshotPreview(src, 822, 522)
                        }
                    }
                ]
            },
            {
                type: "html",
                padding: "1vh",
                flex: 1,
                maxWidth: 430,
                html: /*html*/ `
                    <h4 class="field-type-title">${title}</h4>
                    <p class="field-type-description">${description}</p>`
            }
        ]     
    }
}

;/**
 * FOOTER BLOCK
 */
kiss.templates.footerBlock = function ({
    title,
    entries
}) {
    return {
        layout: "vertical",
        alignItems: "center",
        items: [{
                type: "html",
                html: `<div class="footer-title">${title}</div>`
            },
            ...entries.map(entry => {
                return {
                    type: "html",
                    html: `<div class="footer-link">${entry.label}</div>`,
                    events: {
                        click: entry.action
                    }
                }
            })
        ]
    }
}

;kiss.templates.navbar = function (items) {
    return /*html*/ `
        <div class="nav-wrapper">
            <nav>
                <ul>
                    ${kiss.templates.navbarItems(items)}
                </ul>
            </nav>
        </div>
    `
}

kiss.templates.navbarItems = function (items) {
    return items.map(item => {
        return /*html*/`
            <li class="navbar-item">
                <a href="${item.href}" view="${item.view}" target="${item.target}">${item.text}</a>
            </li>
        `
    }).join("")
}

;kiss.templates.pricingTable = function (plans, texts) {
    return /*html*/ `
        <div class="pricing-table">
            ${plans.map(plan => kiss.templates.pricingPlan(plan, texts))}
        </div>
    `
}

kiss.templates.pricingPlan = function (plan, texts) {
    const gradient = kiss.tools.CSSGradient(plan.color, 135, -0.6)
    const lightColor = kiss.tools.adjustColor(plan.color, 1)
    const check = `<span style="color:${lightColor}" class="pricing-plan-check">✓</span>`

    return /*html*/ `
        <div class="pricing-plan" style="background:${gradient}; box-shadow: 0 0 16vh ${lightColor};">
            <div class="pricing-plan-title">${plan.name}</div>
            <div class="pricing-plan-data">${check + plan.users} Users</div>
            <div class="pricing-plan-data">${check + plan.apps} Applications</div>
            <div class="pricing-plan-data">${check + plan.storage}</div>
            <div class="pricing-plan-data">${check} ${t("unlimitedForms", texts)}</div>
            <div class="pricing-plan-data">${check} ${t("unlimitedWorkflows", texts)}</div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: center;">
                <div class="pricing-plan-price">
                    ${plan.price}
                </div>
                <div>
                    ${t("userPerMonth", texts)}
                </div>
            </div>
            <div class="pricing-plan-CTA" style="border-color: ${lightColor}">${t("Get started")}</div>
        </div>
    `
}

;kiss.templates.screenshot = function (src) {
    src = kiss.global.pathImg + src

    return {
        type: "html",
        class: "wave-2",
        html: `<img loading="lazy" class="screenshot" src="${src}">`,
        width: "100%",
        events: {
            click: () => kiss.templates.screenshotPreview(src)
        }
    }
}

kiss.templates.screenshotPreview = function (src, width, height) {
    createPanel({
        header: false,
        modal: true,
        
        width: () => width || kiss.screen.current.width - 40,
        height: () => height || kiss.screen.current.height - 40,
        
        display: "flex",
        align: "center",
        verticalAlign: "center",
        alignItems: "center",
        justifyContent: "center",

        items: [{
            type: "html",
            display: "flex",
            width: "100%",
            height: "100%",
            html: `<img loading="lazy" src="${src}" style="object-fit: contain; width: 100%; height: 100%;">`
        }],
        
        events: {
            click: function() {
                this.close()
            }
        }
    }).render()
}

;kiss.templates.title = function ({
    title,
    subtitle
}) {
    return {
        type: "html",
        width: "100%",
        html: /*html*/ `
            <h1 class="title">${title}</h1>
            <h2 class="subtitle">${subtitle}</h2>`
    }
}

;