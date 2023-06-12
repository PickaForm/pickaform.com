// Kiss init
kiss.db.mode = "memory"
kiss.language.get()
kiss.theme.set({color: "light"})

// Paths
kiss.global.path = `https://${window.location.host}`
kiss.global.pathImg = "./resources/img"
kiss.global.pathPickaform = `https://cloud.pickaform.com`

// Blog
kiss.global.blogEndPoint = "https://cloud.pickaform.com/command/blog"
kiss.global.blogModelId = "0187ed51-d3a5-70ea-869c-6c538d786fb7"
kiss.global.blogPostTitle = "y9yVRPEQ"
kiss.global.blogPostDescription = "BedquzD8"
kiss.global.blogPostPublicationDate = "floopJiS"
kiss.global.blogPostPublished = "rhI4E1iH"

// Contact
kiss.global.contactModelId = "0187fc11-6405-73d4-abcf-8c323e9b91a9"

// AI Art
kiss.global.artEndPoint = "https://cloud.pickaform.com/command/product"
kiss.global.artModelId = "01889cf0-5878-7352-93b5-3a0fb88c852f"
kiss.global.artTitle = "pJZ5QvWL"
kiss.global.artPulished = "DgllE0KD"
;/**
 * Global functions for translation
 */
const t = (textId) => `<span class="localized" id="${textId}">${txtTitleCase(textId)}</span>`
const translateByPage = (textId, id = "") => `<span class="localized" id="${id + "-" + textId}">${txtTitleCase(id + "-" + textId)}</span>`

/**
 * Define texts for a specific page
 * 
 * @param {string} pageId 
 * @param {object[]} texts 
 * @returns 
 */
const defineTexts = (pageId, texts) => {
    let mappedTexts = {}
    Object.keys(texts).forEach(key => mappedTexts[pageId + "-" + key] = texts[key])
    kiss.app.defineTexts(mappedTexts)

    const closure = (pageId) => {
        return (textId) => {
            return translateByPage(textId, pageId)
        }
    }
    return closure(pageId)
}

/**
 * Translate all localized elements of a page
 * 
 * @param {string} language 
 */
function translateTo(language) {
    kiss.language.current = language
    const itemsToTranslate = this.querySelectorAll(".localized")
    
    itemsToTranslate.forEach(item => {
        const textId = item.getAttribute("id")
        const newText = t(textId)
        item.innerHTML = newText
    })
}

/**
 * Translate navbar, content, footer
 */
function translate() {
    const translateButton = $("language")
    const flagImage = translateButton.querySelector("img")
    
    // Switch flag image
    const newFlag = `${kiss.global.pathImg}/flag-${kiss.language.current}.svg`
    flagImage.src = newFlag

    // Update language
    let newLanguage = (kiss.language.current == "fr") ? "en" : "fr"
    kiss.language.current = newLanguage

    // Translate navbar, footer, content
    $("navbar").translateTo(newLanguage)
    $("footer").translateTo(newLanguage)
    const currentContent = kiss.router.getRoute().content
    $(currentContent).translateTo(newLanguage)
}

;kiss.app.defineView("artworks", function (id, target) {
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
                class: "blog-pager"
            }
        ],

        events: {
            click: (event) => {
                let div = event.target.closest("div")
                if (!div) return

                if (div.classList.contains("artwork")) {
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
                    url: kiss.global.artEndPoint + "/list",
                    method: "post",
                    body: JSON.stringify({
                        modelId: kiss.global.artModelId,
                        filterSyntax: "mongo",
                        filter: {
                            [kiss.global.artPulished]: true
                        },
                        sortSyntax: "mongo",
                        sort: {
                            createdAt: -1 // Sort by creation date
                        },
                        skip,
                        limit
                    })
                })

                $("artworks-list").setInnerHtml($(id).toHtml(response))
                $(id).createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: kiss.global.artEndPoint + "/list",
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId: kiss.global.artModelId,
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
                                    fieldId: kiss.global.artTitle,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                $("artworks-list").setInnerHtml($(id).toHtml(response))
                $(id).createPager(response.totalCount, response.skip, response.limit, term)
            },

            toHtml(response) {
                let items = response.products
                    .filter(product => product.published !== false)
                    .map(artwork => {
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
                return items.map($(id).renderArtwork).join("")
            },

            renderArtwork(artwork) {
                return `
                    <div id="${artwork.id}" class="artwork">
                        <img loading="lazy" class="artwork-image" src="${artwork.image}" alt="${artwork.tags}"></img>
                        <p class="artwork-tags">${artwork.tags}</p>
                    </div>`
            },

            createPager(count, skip, limit, searchTerm) {
                const searchFunction = $(id).search
                const getItemsFunction = $(id).getArtworks
                const pagerButtons = kiss.templates.pager(count, skip, limit, searchTerm, searchFunction, getItemsFunction)
                $("artworks-pager").setItems(pagerButtons)
            }
        }
    })
})

;kiss.app.defineView("blog", function (id, target) {
    const postEndpoint = kiss.global.blogEndPoint + "/list"

    const t = defineTexts(id, {
        title: {
            en: `Your resources to
                <span class="text-highlight" style="background-color: #00aaee">save time</span>`,
            fr: `Vos ressources pour
                <br><span class="text-highlight" style="background-color: #00aaee">gagner du temps</span>`
        },
        subtitle: {
            en: "News, stories and tips on project management, collaboration & productivity",
            fr: "News et conseils sur la gestion de projet, la collaboration et la productivité"
        }
    })

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Blog header
            kiss.templates.title({
                title: t("title"),
                subtitle: t("subtitle")
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

        methods: {
            async load() {
                this.getPosts(0, 6)
            },

            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo,

            async getPosts(skip, limit) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId: kiss.global.blogModelId,
                        filterSyntax: "mongo",
                        filter: {
                            [kiss.global.blogPostPublished]: true
                        },
                        sortSyntax: "mongo",
                        sort: {[kiss.global.blogPostPublicationDate]: -1}, // Sort by publication date
                        skip,
                        limit
                    })
                })

                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                $(id).createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId: kiss.global.blogModelId,
                        skip,
                        limit,
                        sortSyntax: "mongo",
                        sort: {[kiss.global.blogPostPublicationDate]: -1}, // Sort by publication date
                        filterSyntax: "normalized",
                        filter: {
                            type: "group",
                            operator: "or",
                            filters: [
                                // Search in title
                                {
                                    type: "filter",
                                    fieldId: kiss.global.blogPostTitle,
                                    operator: "contains",
                                    value: term
                                },
                                // Search in description
                                {
                                    type: "filter",
                                    fieldId: kiss.global.blogPostDescription,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                $(id).createPager(response.totalCount, response.skip, response.limit, term)
            },

            createPager(count, skip, limit, searchTerm) {
                const searchFunction = $(id).search
                const getItemsFunction = $(id).getPosts
                const pagerButtons = kiss.templates.pager(count, skip, limit, searchTerm, searchFunction, getItemsFunction)
                $("blog-pager").setItems(pagerButtons)
            }            
        }
    })
})

;kiss.app.defineView("blogPost", function (id, target) {
    const postEndpoint = kiss.global.blogEndPoint + "/get"

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
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId: kiss.global.blogModelId,
                        postId
                    })
                })

                // Load marked prior to parsing post's body
                await kiss.loader.loadScript("./resources/lib/marked/marked.min")
                post.Body = marked(post.Body)

                $("blog-post-banner").setItems([kiss.templates.blogPostBanner(post)])
                $("blog-post-content").setItems([kiss.templates.blogPost(post)])
            }
        }
    })
})

;kiss.app.defineView("contact", function (id, target) {
    const t = defineTexts(id, {
        title: {
            en: "Let's keep in touch",
            fr: "Prenons contact"
        },
        subtitle: {
            en: `Tell us about your project,<br>we show you<span class="text-highlight" style="background-color: #00aaee">in 20 minutes</span> how to make it happen.`,
            fr: `Expliquez-nous votre projet,<br>nous vous montrons<span class="text-highlight" style="background-color: #00aaee">en 20mn</span> comment le réaliser.`
        },        
        submit: {
            en: "submit",
            fr: "envoyer"
        },
        name: {
            en: "name",
            fr: "nom"
        },
        company: {
            en: "company",
            fr: "société"
        },
        project: {
            project: "project",
            fr: "projet"
        },
        language: {
            en: "language",
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
                                url: kiss.global.pathPickaform + "/command/publicForm/post/" + kiss.global.contactModelId,
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

;kiss.app.defineView("footer", function (id, target) {
    const blogUrl = kiss.global.path + "/" + kiss.language.current + "/blog"

    const t = defineTexts(id, {
        "Home": {
            en: "Home",
            fr: "Accueil"
        },
        "Product": {
            en: "Product",
            fr: "Produit"
        },
        "Pricing": {
            en: "Pricing",
            fr: "Pricing"
        },
        "Privacy": {
            en: "privacy policy",
            fr: "politique de confidentialité"
        },
        "Terms": {
            en: `terms of services`,
            fr: `mentions légales`
        },
        "Technology": {
            en: `technology`,
            fr: `technologie`
        },
        "AI Art": {
            en: "Midjourney integration",
            fr: "Intégration Midjourney"
        }
    })

    const entries = [
        // PRODUCT
        {
            title: "Site",
            items: [{
                    label: t("Home"),
                    action: () => kiss.router.navigateTo({
                        content: "landing"
                    })
                },
                {
                    label: t("Product"),
                    action: () => kiss.router.navigateTo({
                        content: "product"
                    })
                },
                {
                    label: "Contact",
                    action: () => kiss.router.navigateTo({
                        content: "contact"
                    })
                },
                {
                    label: "Blog",
                    action: () => kiss.router.navigateTo({
                        content: "blog"
                    })
                },
                {
                    label: t("Pricing"),
                    action: () => kiss.router.navigateTo({
                        content: "pricing"
                    })
                }
            ]
        },
        // LINKS
        {
            title: "Social",
            items: [
                {
                    label: "LinkedIn",
                    action: () => window.open("https://www.linkedin.com/company/pickaform-cloud/", "_new")
                },                {
                    label: "YouTube",
                    action: () => window.open("https://www.youtube.com/@pickaform", "_new")
                },
                {
                    label: "Facebook",
                    action: () => window.open("https://www.facebook.com/pickaform.applications", "_new")
                },
                {
                    label: "Twitter",
                    action: () => window.open("https://twitter.com/PickaForm", "_new")
                }
            ]
        },
        // TECH
        {
            title: t("Technology"),
            items: [
                {
                    label: "Powered by KissJS",
                    action: () => window.open("https://kissjs.net", "_new")
                },
                {
                    label: t("AI Art"),
                    action: () => kiss.router.navigateTo({
                        content: "artworks"
                    })
                }
            ]
        },
        // ARCHIVES
        {
            title: "Archives",
            items: [
                {
                    label: "Blog (English)",
                    action: () => window.open("https://blog.pickaform.com/en/", "_new")
                },
                {
                    label: "Blog (Français)",
                    action: () => window.open("https://blog.pickaform.com/fr/", "_new")
                }
            ]
        },        
        // LEGAL
        {
            title: "Legal",
            items: [
                {
                    label: t("Privacy"),
                    action: () => window.open(blogUrl + "/politique-de-confidentialite", "_new")
                },                {
                    label: t("Terms"),
                    action: () => window.open(blogUrl + "/mentions-legales", "_new")
                }
            ]
        }
    ]
    
    const blocks = entries.map(entry => kiss.templates.footerBlock({
        title: entry.title,
        entries: entry.items
    }))

    return createBlock({
        id,
        target,
        class: "footer",
        items: blocks,

        methods: {
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo
        }
    })
})

;kiss.app.defineView("landing", function (id, target) {
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
            fr: "Choisissez vos formulaires<br>Connectez vos workflows<br>Ajoutez une pincée d'IA",
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
            kiss.templates.buttonCTA(t("getStarted")),
            kiss.templates.screenshot("workflow - business contracts.webp"),

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
            kiss.templates.screenshot("nocode flexibility - pickaform.webp"),

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
})

;kiss.app.defineView("navbar", function (id, target) {
    const t = defineTexts(id, {
        "Home": {
            en: "Home",
            fr: "Accueil"
        },
        "Product": {
            en: "Product",
            fr: "Produit"
        },
        "Pricing": {
            en: "Pricing",
            fr: "Tarifs"
        },
        "Templates": {
            en: "Templates",
            fr: "Modèles"
        },
        "Login": {
            en: "Login",
            fr: "Connexion"
        },
        "Get started": {
            en: "Get started",
            fr: "Inscription"
        }
    })

    const navItems = [
        // HOME
        {
            text: t("Home"),
            href: `${kiss.global.path}/${kiss.language.current}/landing`,
            target: "_self",
            view: "landing",
        },
        // PRODUCT
        {
            text: t("Product"),
            href: `${kiss.global.path}/${kiss.language.current}/product`,
            target: "_self",
            view: "product"
        },
        // CONTACT
        {
            text: "Contact",
            href: `${kiss.global.path}/${kiss.language.current}/contact`,
            target: "_self",
            view: "contact"
        },
        // BLOG
        {
            text: "Blog",
            href: `${kiss.global.path}/${kiss.language.current}/blog`,
            target: "_self",
            view: "blog"
        },
        // // ART
        // {
        //     text: "AI Art",
        //     href: `${kiss.global.path}/${kiss.language.current}/artworks`,
        //     target: "_self",
        //     view: "artworks"
        // },
        // PRICING
        {
            text: t("Pricing"),
            href: `${kiss.global.path}/${kiss.language.current}/pricing`,
            target: "_self",
            view: "pricing"
        },
        // TEMPLATES
        {
            text: t("Templates"),
            href: kiss.global.pathPickaform + "/client/pickaform/demo.html#ui=templates-list",
            target: "_new",
            view: ""
        },
        // LOGIN
        {
            text: t("Login"),
            href: kiss.global.pathPickaform + "/client/pickaform/index_dev.html#ui=authentication-login",
            target: "_new",
            view: ""
        },
        // REGISTER
        {
            text: t("Get started"),
            href: kiss.global.pathPickaform + "/client/pickaform/index_dev.html#ui=authentication-register",
            target: "_new",
            view: ""
        }
    ]

    const buttons = [{
        type: "html",
        html: kiss.templates.navbar(navItems, "row")
    }]

    const menu = [{
        type: "html",
        html: kiss.templates.navbar(navItems, "column")
    }]

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
        items: [
            // LOGO
            {
                type: "image",
                src: "./resources/img/pickaform.webp"
            },
            {
                type: "spacer",
                flex: 1
            },
            // MENU
            {
                id: "topbar-buttons",
                items: buttons
            },
            // LANGUAGE
            {
                id: "language",
                class: "button-flag",
                type: "html",
                html: `<img id="language-img" style="width: 16px" src="${kiss.global.pathImg}/flag-${(kiss.language.current == "fr") ? "en" : "fr"}.svg">`
            },
            // CONTRAST
            {
                id: "mode",
                class: "button-mode",
                type: "html",
                html: "◐"
            }
        ],

        events: {
            /**
             * Intercepts the navbar click event to prevent direct navigation with href.
             * This allows to *not reload* the page and leverage the SPA behavior of KissJS when opening views.
             */
            click: function (event) {
                event.preventDefault()
                let element = event.target

                if (element.id.includes("language")) {
                    translate()
                    return
                }

                // Dark and Light mode
                if (element.id == "mode") {
                    if (kiss.theme.currentColor == "dark") {
                        kiss.theme.set({
                            color: "light"
                        })
                    } else {
                        kiss.theme.set({
                            color: "dark"
                        })
                    }
                    return
                }

                // Manage client-side navigation
                if (element.tagName == "SPAN") element = element.closest("a")
                if (element.tagName == "LI") element = element.querySelector("a")
                
                if (element.tagName == "A") {
                    const view = element.getAttribute("view")
                    const target = element.getAttribute("target")

                    if (view) {
                        kiss.router.navigateTo({
                            content: view
                        })
                    } else {
                        window.open(element.href, target)
                    }
                }
            }
        },

        subscriptions: {
            EVT_WINDOW_RESIZED: function (msgData) {
                if (!this.isConnected) return
                this.adjustDisplayMode(msgData.current.width)
            }
        },

        methods: {
            load() {
                // this.adjustDisplayMode(kiss.screen.current.width)
            },
            _afterConnected() {
                this.translateTo(kiss.language.current)
            },
            translateTo,

            adjustDisplayMode(width) {
                if (width < 900) {
                    if (this.mode == "narrow") return
                    this.mode = "narrow"
                    this.displayAsButton()
                } else {
                    if (this.mode == "wide") return
                    this.mode = "wide"
                    this.displayAsMenu()
                }
            },

            displayAsMenu() {
                $("topbar-buttons")
                    .setItems(buttons)
                    .setAnimation({
                        name: "slideInDown",
                        speed: "faster"
                    })
            },

            displayAsButton() {
                const menuButton = {
                    type: "button",
                    text: "☰",
                    padding: "0 6px",
                    fontSize: 20,
                    fontWeight: 900,
                    action: (event) => {
                        event.stop()

                        // Display menu vertically
                        createPanel({
                                header: false,
                                modal: true,
                                class: "wave-3",
                                width: "100%",
                                height: "100%",
                                layout: "vertical",
                                items: menu,
                                events: {
                                    click: function (event) {
                                        this.close()
                                    }
                                }
                            })
                            .render()
                            .setAnimation({
                                name: "slideInDown",
                                speed: "faster"
                            })
                    }
                }
                $("topbar-buttons")
                    .setItems([menuButton])
                    .setAnimation({
                        name: "zoomIn",
                        speed: "faster"
                    })
            }
        }
    })
})

;kiss.app.defineView("pricing", function(id, target) {
    const t = defineTexts(id, {
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
            en: "Get started",
            fr: "Incription"
        }
    })

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
                title: t("title"),
                subtitle: t("subtitle"),
            }),
            {
                type: "html",
                class: "pricing-table",
                html: kiss.templates.pricingTable(plans, t)
            }
        ],

        events: {
            click: (event) => {
                if (event.target.closest("div").classList.contains("pricing-plan-CTA")) {
                    document.location = kiss.global.pathPickaform + "/client/pickaform/index.html#ui=authentication-register"
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

;kiss.app.defineView("product", function (id, target) {
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
            en: "An infinity of applications and uses are possible from the forms and their à la carte functionalities.",
            fr: "Une infinité d'applications et d'usages sont possibles à partir des formulaires et de leurs fonctionnalités à la carte."
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
    return {
        type: "html",
        html: `<img class="blog-post-banner-image" src="${post.Image[0].path}">`
    }
}

kiss.templates.blogPost = function (post) {
    return {
        layout: "vertical",
        items: [
            {
                type: "html",
                html: kiss.templates.breadcrumb(post)
            },
            {
                type: "html",
                html: `
                    <h1 class="blog-post-title">${post.Title}</h1>
                    <p class="blog-post-description">${post.Description}</p>
                    <p class="blog-post-body">${post.Body}</p>
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

kiss.templates.breadcrumb = function(post) {
    const blogUrl = kiss.global.path + "/" + kiss.language.current + "/blog"

    return /*html*/`
        <nav aria-label="breadcrumb">
            <div itemscope="itemscope" itemtype="http://schema.org/BreadcrumbList" class="breadcrumb">
                <div class="container">
                    <span itemprop="itemListElement" itemscope="itemscope" itemtype="http://schema.org/ListItem" class="breadcrumb-item">
                        <a href="${blogUrl}" itemprop="item">
                            <span itemprop="name">Blog</span>
                            <meta itemprop="position" content="1">
                        </a>
                    </span>
                    ➤
                    <span itemprop="itemListElement" itemscope="itemscope" itemtype="http://schema.org/ListItem" class="breadcrumb-item">
                        <a href="${blogUrl}/search/${post.Category}" itemprop="item">
                            <span itemprop="name">${post.Category}</span>
                            <meta itemprop="position" content="2">
                        </a>
                    </span>
                    ➤
                    <span itemprop="itemListElement" itemscope="itemscope" itemtype="http://schema.org/ListItem" class="breadcrumb-item  active">
                        <a href="${blogUrl}/${post.Slug}" itemprop="item">
                            <span itemprop="name">${post.Title}</span>
                            <meta itemprop="position" content="3">
                        </a>
                    </span>
                </div>
            </div>
        </nav>`
}

;kiss.templates.blogPostEntry = function (post) {
    const postUrl = kiss.global.path + "/" + kiss.language.current + "/blog/" + post.slug
    const image = (post.image && Array.isArray(post.image) && post.image.length > 0) ? post.image[0] : ""
    const tags = post.tags.map(tag => `<span class="blog-entry-tag">${tag}</span>`).join("")

    return {
        id: post.slug,
        layout: "vertical",
        class: "blog-entry",
        items: [{
            type: "html",
            html:
                `
                <a href="${postUrl}" class="no-underline">
                    <img loading="lazy" class="blog-entry-banner-image" src="${image.path}"></img>
                    <span class="blog-entry-category">${post.category}</span>
                    ${tags}
                    <h3 class="blog-entry-title no-underline">${post.title}</h3>
                    <p class="blog-entry-description">${post.description}</p>
                </a>`
        }]
    }
}

;kiss.templates.buttonCTA = function (text, page) {
    return {
        text: text + " &nbsp;&nbsp; ➔",
        action: () => {
            if (page) {
                kiss.router.navigateTo({
                    content: "contact"
                })
            }
            else {
                const link = "https://app.pickaform.com/client/pickaform/index.html#ui=authentication-register&language=" + (kiss.language.current || "en")
                window.open(link, "_new")
            }
        },

        type: "button",
        backgroundColor: "#00aaee",
        backgroundColorHover: "#a1ed00",
        boxShadowHover: "0 0 32px #a1ed00",
        color: "#ffffff",
        colorHover: "#000000",
        fontSize: "2vh",
        borderRadius: 10,
        borderWidth: 0,
        animation: "zoomIn",
        padding: "1vh 2vh"
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
    const src = kiss.global.pathImg + "/" + screenshot

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
                        class: "feature-screenshot-container-" + textPosition,
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

;kiss.templates.featureDetails = function ({
    title,
    description,
    screenshot
}) {
    const id = kiss.tools.shortUid()
    const src = kiss.global.pathImg + "/" + screenshot

    return {
        id,
        class: "feature-details",
        items: [
            {
                class: "feature-details-screenshot",
                flex: 1,
                items: [
                    {
                        type: "html",
                        html: `<img src="${src}" class="feature-details-screenshot-img">`,
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
                    <h4 class="feature-details-title">${title}</h4>
                    <p class="feature-details-description">${description}</p>`
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
        class: "footer-column",
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

;kiss.templates.navbar = function (items, orientation) {
    return /*html*/ `
        <div class="nav-wrapper">
            <nav>
                <ul style="display: flex; flex-flow: ${orientation}; padding: 0">
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

;kiss.templates.pager = function (count, skip, limit, searchTerm, searchFunction, getItemsFunction) {
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
            color: (i == pageNumber) ? "#ffffff" : "",
            backgroundColor: (i == pageNumber) ? "#00aaee" : "",
            fontSize: "1.5vh !important",
            width: "3vh",
            height: "3vh",
            borderRadius: "5vh",
            margin: "5px",
            action: () => {
                const newSkip = i * limit
                if (searchTerm) {
                    searchFunction(searchTerm, newSkip, limit)
                } else {
                    getItemsFunction(newSkip, limit)
                }
            }
        }
        pagerButtons.push(newButton)
    }

    return pagerButtons
}
kiss.templates.pricingTable = function (plans, t) {
    return /*html*/ `
        <div class="pricing-table">
            ${plans.map(plan => kiss.templates.pricingPlan(plan, t))}
        </div>
    `
}

kiss.templates.pricingPlan = function (plan, t) {
    const gradient = kiss.tools.CSSGradient(plan.color, 135, -0.6)
    const lightColor = kiss.tools.adjustColor(plan.color, 1)
    const check = `<span style="color:${lightColor}" class="pricing-plan-check">✓</span>`

    return /*html*/ `
        <div class="pricing-plan" style="background:${gradient}; box-shadow: 0 0 16vh ${lightColor};">
            <div class="pricing-plan-title">${plan.name}</div>
            <div class="pricing-plan-data">${check + plan.users} Users</div>
            <div class="pricing-plan-data">${check + plan.apps} Applications</div>
            <div class="pricing-plan-data">${check + plan.storage}</div>
            <div class="pricing-plan-data">${check} ${t("unlimitedForms")}</div>
            <div class="pricing-plan-data">${check} ${t("unlimitedWorkflows")}</div>
            <div style="display: flex; flex-flow: row; align-items: center; justify-content: center;">
                <div class="pricing-plan-price">
                    ${plan.price}
                </div>
                <div>
                    ${t("userPerMonth")}
                </div>
            </div>
            <div class="pricing-plan-CTA" style="border-color: ${lightColor}">${t("Get started")}</div>
        </div>
    `
}

;kiss.templates.screenshot = function (src) {
    src = kiss.global.pathImg + "/" + src

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
            <h2 class="title">${title}</h2>
            <h3 class="subtitle">${subtitle}</h3>`
    }
}

;