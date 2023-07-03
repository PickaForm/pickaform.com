// Kiss init
kiss.db.mode = "memory"
kiss.language.get()

// Dark theme between 22h and 6h
kiss.theme.set({
    color: (new Date().getHours() <= 6 || new Date().getHours() >= 22) ? "dark" : "light"
})

// Paths
kiss.global.path = `https://${window.location.host}`
kiss.global.pathImg = "./resources/img"
kiss.global.pathPickaform = `https://app.pickaform.com`

// Blog
kiss.global.blogEndPoint = "https://app.pickaform.com/command/blog"
kiss.global.blogModelId = "0187ed51-d3a5-70ea-869c-6c538d786fb7"
kiss.global.blogPostTitle = "y9yVRPEQ"
kiss.global.blogPostDescription = "BedquzD8"
kiss.global.blogPostPublicationDate = "floopJiS"
kiss.global.blogPostPublished = "rhI4E1iH"

// Contact
kiss.global.contactModelId = "0187b40b-0061-7f65-af86-982a361afcf3"

// AI Art
kiss.global.artEndPoint = "https://beta.pickaform.com/command/product"
kiss.global.artModelId = "01889cf0-5878-7352-93b5-3a0fb88c852f"
kiss.global.artTitle = "pJZ5QvWL"
kiss.global.artPulished = "DgllE0KD";/**
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
        const newText = txtTitleCase(textId)
        item.innerHTML = newText
    })
}

/**
 * Translate navbar, content, footer
 */
function translate() {
    publish("EVT_LANGUAGE", {
        language: kiss.language.current
    })

    let newLanguage = (kiss.language.current == "fr") ? "en" : "fr"
    kiss.language.current = newLanguage
    localStorage.setItem("config-language", newLanguage)

    // Translate navbar, footer, content
    $("navbar").translateTo(newLanguage)
    $("footer").translateTo(newLanguage)
    const currentContent = kiss.router.getRoute().content
    $(currentContent).translateTo(newLanguage)
}

;kiss.app.defineView({
    id: "artworks",
    meta: {
        url: {
            en: "https://pickaform.fr/en/artworks",
            fr: "https://pickaform.fr/fr/artworks"
        },
        title: {
            en: "Pickaform | Midjourney integration",
            fr: "Pickaform | Integration Midjourney"
        },
        description: {
            en: `Get Inspired by our AI Art Collection.`,
            fr: `Laissez-vous inspirer par notre collection d'art IA.`
        }
    },    
    renderer: function (id, target) {

        const t = defineTexts(id, {
            title: {
                en: `Get Inspired by our AI Art Collection`,
                fr: `Laissez-vous inspirer par notre collection d'art IA`
            },
            subtitle: {
                en: "We used pickaform to streamline the process of creating Midjourney images",
                fr: "Nous avons utilisé pickaform pour rationaliser le processus de création d'images Midjourney"
            }
        })

        return createBlock({
            id: id,
            target,
            layout: "vertical",
            alignItems: "center",
            overflowY: "auto",

            items: [
                // Header
                kiss.templates.title({
                    title: t("title"),
                    subtitle: t("subtitle")
                }),
                // Search field
                {
                    type: "text",
                    width: "256px",
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

                _afterConnected() {
                    this.translateTo(kiss.language.current)
                },
                translateTo,

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
    }
})

;kiss.app.defineView({
    id: "blog",
    renderer: function (id, target) {
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
                    width: "256px",
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
                            sort: {
                                [kiss.global.blogPostPublicationDate]: -1
                            }, // Sort by publication date
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
                            sort: {
                                [kiss.global.blogPostPublicationDate]: -1
                            }, // Sort by publication date
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
    }
})

;kiss.app.defineView({
    id: "blogPost",
    renderer: function (id, target) {
        const postEndpoint = kiss.global.blogEndPoint + "/get"

        return createBlock({
            id: id,
            target,
            layout: "vertical",
            alignItems: "center",
            overflowY: "auto",

            items: [{
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
    }
})

;kiss.app.defineView({
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
            titleCRM: {
                en: "CRM",
                fr: "Des formulaires flexibles"
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
                    screenshot: "example - project management - pickaform.webp",
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

;kiss.app.defineView({
    id: "contact",
    meta: {
        url: {
            en: "https://pickaform.fr/en/contact",
            fr: "https://pickaform.fr/fr/contact"
        },
        title: {
            en: "Pickaform | Contact & FAQ",
            fr: "Pickaform | Contact & FAQ"
        },
        description: {
            en: `Request a demo or check the Frequently Asked Questions.`,
            fr: `Demandez une démo ou jetez un oeil aux Questions Fréquentes.`
        }
    },    
    renderer: function (id, target) {
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
            thanks: {
                en: `Thank you!
                <br>Your request has been sent 🚀
                <br>We will contact you very soon.`,
                fr: `Merci !
                <br>Votre demande a bien été envoyée 🚀
                <br>Nous allons prendre contact avec vous très rapidement.`
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
                    id: "contactForm",
                    type: "panel",
                    header: false,
                    width: () => (kiss.screen.current.width < 600) ? kiss.screen.current.width - 40 : 600,
                    autoSize: true,
                    margin: "10vh 0 20vh 0",
                    layout: "vertical",

                    defaultConfig: {
                        labelPosition: "top"
                    },

                    items: [
                        // Name
                        {
                            id: "name",
                            type: "text",
                            label: "Name",
                            required: true
                        },
                        // Email
                        {
                            id: "email",
                            type: "text",
                            label: "Email",
                            validationType: "email",
                            required: true
                        },
                        // Telephone
                        {
                            id: "telephone",
                            type: "text",
                            label: "Telephone",
                            required: true
                        },
                        // Language
                        {
                            id: "language",
                            type: "select",
                            label: "Language",
                            options: ["English", "Français"],
                            value: (kiss.language.current == "fr") ? "Français" : "English",
                            required: true
                        },
                        // Company
                        {
                            id: "company",
                            type: "text",
                            label: "Company",
                            required: true
                        },
                        // Company size
                        {
                            id: "companySize",
                            type: "select",
                            label: "Company size",
                            required: true,
                            options: [
                                {
                                    "value": "1 - 10",
                                    "color": "#FFAA00"
                                },
                                {
                                    "value": "11 - 20",
                                    "color": "#55CC00"
                                },
                                {
                                    "value": "21 - 50",
                                    "color": "#0075FF"
                                },
                                {
                                    "value": "51 - 100",
                                    "color": "#ED3757"
                                },
                                {
                                    "value": "100+",
                                    "color": "#8833EE"
                                }
                            ]                            
                        },                        
                        // Project
                        {
                            id: "project",
                            type: "textarea",
                            label: "Project",
                            rows: 10,
                            required: true
                        },
                        // Submit button
                        {
                            type: "button",
                            text: t("submit"),
                            height: 40,
                            backgroundColor: "#00aaee",
                            color: "#ffffff",
                            iconColor: "#ffffff",
                            action: async function () {
                                const form = this.closest("a-panel")
                                if (!form.validate()) return

                                let formData = form.getData({
                                    useLabels: true
                                })
                                formData.useLabels = true

                                await kiss.ajax.request({
                                    url: kiss.global.pathPickaform + "/command/publicForm/post/" + kiss.global.contactModelId,
                                    method: "post",
                                    body: JSON.stringify(formData)
                                })

                                $("contactForm").hide()
                                $("thankYou").show()
                            }
                        }
                    ]
                },

                // THANK YOU
                {
                    hidden: true,
                    id: "thankYou",
                    type: "html",
                    class: "thank-you",
                    html: t("thanks"),
                    animation: {
                        name: "rotateIn",
                        speed: "fast"
                    }
                }                
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

;kiss.app.defineView({
    id: "footer",
    renderer: function (id, target) {
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
            "Examples": {
                en: "Examples",
                fr: "Exemples"
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
                        label: t("Examples"),
                        action: () => kiss.router.navigateTo({
                            content: "cases"
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
                        // action: () => kiss.router.navigateTo({
                        //     content: "blog"
                        // })
                        action: () => window.open(`https://blog.pickaform.com/${kiss.language.current}/`, "_new")
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
                items: [{
                        label: "LinkedIn",
                        action: () => window.open("https://www.linkedin.com/company/pickaform-cloud/", "_new")
                    }, {
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
                items: [{
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
                items: [{
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
                items: [{
                    label: t("Privacy"),
                    action: () => window.open(blogUrl + "/politique-de-confidentialite", "_new")
                }, {
                    label: t("Terms"),
                    action: () => window.open(blogUrl + "/mentions-legales", "_new")
                }]
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
    }
})

;kiss.app.defineView({
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

;kiss.app.defineView({
    id: "navbar",
    renderer: function (id, target) {
        const nextLanguage = (kiss.language.current == "fr") ? "en" : "fr"

        const t = defineTexts(id, {
            "Home": {
                en: "Home",
                fr: "Accueil"
            },
            "Product": {
                en: "Product",
                fr: "Produit"
            },
            "Examples": {
                en: "Examples",
                fr: "Exemples"
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
            // USE CASES
            {
                text: t("Examples"),
                href: `${kiss.global.path}/${kiss.language.current}/cases`,
                target: "_self",
                view: "cases"
            },
            // CONTACT
            {
                text: "Contact",
                href: `${kiss.global.path}/${kiss.language.current}/contact`,
                target: "_self",
                view: "contact"
            },
            // PRICING
            {
                text: t("Pricing"),
                href: `${kiss.global.path}/${kiss.language.current}/pricing`,
                target: "_self",
                view: "pricing"
            },
            // BLOG
            {
                text: "Blog",
                href: `http://blog.pickaform.com/${kiss.language.current}`,
                target: "_new",
                view: ""
            },
            // TEMPLATES
            {
                text: t("Templates"),
                href: kiss.global.pathPickaform + `/client/pickaform/demo.html#ui=templates-list&language=${kiss.language.current}`,
                target: "_new",
                view: ""
            },
            // LOGIN
            {
                text: t("Login"),
                href: kiss.global.pathPickaform + "/client/pickaform/index.html#ui=authentication-login",
                target: "_new",
                view: ""
            },
            // REGISTER
            {
                text: t("Get started"),
                href: kiss.global.pathPickaform + "/client/pickaform/index.html#ui=authentication-register",
                target: "_new",
                view: ""
            }
        ]

        const options = [
            // LANGUAGE
            {
                id: "language",
                class: "button-flag",
                type: "html",
                html: `<img id="language-img" width=16 height=12 src="${kiss.global.pathImg}/flag-${nextLanguage}.svg" alt="switch to language ${nextLanguage}">`,
                subscriptions: {
                    EVT_LANGUAGE: function (msgData) {
                        log(this)
                        const flagImage = this.querySelector("img")
                        const newFlag = `${kiss.global.pathImg}/flag-${msgData.language}.svg`
                        flagImage.src = newFlag
                    }
                }
            },
            // CONTRAST
            {
                id: "mode",
                class: "button-mode",
                type: "html",
                html: "◐"
            }
        ]

        let buttons = [{
                type: "html",
                html: kiss.templates.navbar(navItems, "row")
            },
            ...options
        ]

        let menu = [{
                type: "html",
                html: kiss.templates.navbar(navItems, "column")
            },
            ...options
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
            items: [
                // LOGO
                {
                    type: "image",
                    alt: "pickaform logo",
                    src: "./resources/img/pickaform.webp",
                    width: 256,
                    height: 60
                },
                {
                    type: "spacer",
                    flex: 1
                },
                // MENU
                {
                    id: "topbar-buttons",
                    items: buttons
                }
            ],

            events: {
                /**
                 * Intercepts the navbar click event to prevent direct navigation with href.
                 * This allows to *not reload* the page and leverage the SPA behavior of KissJS when opening views.
                 */
                click: (event) => $(id)._handleClick(event)
            },

            subscriptions: {
                EVT_WINDOW_RESIZED: function (msgData) {
                    if (!this.isConnected) return
                    this.adjustDisplayMode(msgData.current.width)
                }
            },

            methods: {
                load() {
                    if (kiss.tools.isMobile()) {
                        this.adjustDisplayMode(kiss.screen.current.width)
                    }
                },

                // Translation
                _afterConnected() {
                    this.translateTo(kiss.language.current)
                },
                translateTo,

                // Clicked on a menu item
                _handleClick(event) {
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

                        if (element.innerHTML.includes("Blog")) {
                            // BLOG
                            window.open(`https://blog.pickaform.com/${kiss.language.current}/`, "_new")
                        } else if (element.innerHTML.includes("Templates") || element.innerHTML.includes("Modèles")) {
                            // TEMPLATES
                            window.open(kiss.global.pathPickaform + `/client/pickaform/demo.html#ui=templates-list&language=${kiss.language.current}`, "_new")
                        } else if (view) {
                            kiss.router.navigateTo({
                                content: view
                            })
                        } else {
                            window.open(element.href, target)
                        }
                    }
                },

                // Responsiveness
                adjustDisplayMode(width) {
                    if (width < 900) {
                        if (this.mode == "narrow") return
                        this.mode = "narrow"
                        this.displayMenuVertically()
                    } else {
                        if (this.mode == "wide") return
                        this.mode = "wide"
                        this.displayMenuHorizontally()
                    }
                },

                // Horizontal menu
                displayMenuHorizontally() {
                    $("topbar-buttons")
                        .setItems(buttons)
                        .setAnimation({
                            name: "slideInDown",
                            speed: "faster"
                        })
                },

                // Vertical menu
                displayMenuVertically() {
                    const verticalMenu = {
                        type: "button",
                        text: "☰",
                        padding: "0 6px",
                        fontSize: 20,
                        fontWeight: 900,
                        margin: "0 20px 0 0",
                        action: (event) => {
                            event.stop()
                            if ($("vertical-menu")) return $("vertical-menu").show()

                            createPanel({
                                id: "vertical-menu",
                                header: false,
                                modal: true,
                                width: "100%",
                                height: "100%",
                                layout: "vertical",
                                items: menu,
                                closeMethod: "hide",
                                background: "var(--background-blue)",
                                events: {
                                    click: function (event) {
                                        $(id)._handleClick(event)
                                        this.close()
                                    }
                                }
                            }).render()
                        }
                    }

                    $("topbar-buttons").setItems([verticalMenu])
                }
            }
        })
    }
})

;kiss.app.defineView({
    id: "pricing",
    meta: {
        url: {
            en: "https://pickaform.fr/en/pricing",
            fr: "https://pickaform.fr/fr/pricing"
        },
        title: {
            en: "Pricing | Pickaform",
            fr: "Tarifs | Pickaform"
        },
        description: {
            en: `Get the Right Plan for Your Business Needs.`,
            fr: `Sélectionnez le plan adapté à vos besoins.`
        }
    },    
    renderer: function (id, target) {
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
                fr: "Inscription"
            },
            enterprisePlan: {
                en: `We have many other plans beyond that, and also on-premise versions beyond 100 users.
                <br>
                Please contact us for more informations:`,
                fr: `Nous avons des offres au-delà, et des versions on-premise à partir de 100 utilisateurs.
                <br>
                Contactez-nous pour plus d'informations :`
            },
            contactUs: {
                en: "Contact us",
                fr: "Contactez-nous"
            },
            faq0: {
                en: "Why choose pickaform?",
                fr: "Pourquoi choisir pickaform ?"
            },
            answer0: {
                en: `Pickaform is not a cloud software born from a simple idea and created quickly to surf the wave of no-code.
            The story begins in 2009, long before "no-code" existed, and the design of the platform was 100% guided by the use of its users.
            In 2019, ten years after the very first version, the platform is dedicated "IBM CHAMPION" in the category of Collaboration software.
            From the outset, the platform has kept the same philosophy:
            <br>• easy-to-make forms
            <br>• a la carte functionalities integrated into forms
            <br>• flexible and quick-to-implement workflow feature
            <br>• simplicity
            <br>Today, large companies use Pickaform on a daily basis for all types of use, and 95% of our users who adopt the platform use it for several years, guaranteeing maximum ROI.`,
                fr: `Pickaform n'est pas un logiciel cloud issu d'une simple idée et créé rapidement pour surfer sur la vague du no-code.
            L'histoire commence en 2009, bien avant que le "no-code" existe, et la conception de la plateforme a été guidée à 100% par l'usage de ses utilisateurs.
            En 2019, soit dix ans après la toute première version, la plateforme est consacrée "IBM CHAMPION" dans la categorie des logiciels de Collaboration.
            Depuis l'origine, la plateforme a conservé la même philosophie :
            <br>• formulaires simples à fabriquer
            <br>• fonctionnalités à la carte intégrées aux formulaires
            <br>• fonctionnalité de workflow flexible et rapide à mettre en place
            <br>• simplicité
            <br>Aujourd'hui, de grandes entreprises utilisent Pickaform au quotidien pour tous types d'usages, et 95% de nos utilisateurs qui adoptent la plateforme l'utilisent plusieurs années, garantissant un ROI maximal.`
            },
            faq1: {
                en: "Who uses Pickaform?",
                fr: "A qui s'adresse Pickaform ?"
            },
            answer1: {
                en: `Pickaform is made for: companies, associations, the public sector, the self-employed, individuals who want to organize information.
            More generally, to any person or organization wishing to organize their data and be able to access it online in a secure and possibly shared way with other users.`,
                fr: `Pickaform est fait pour : les entreprises, les associations, le secteur public, les travailleurs indépendants, les particuliers qui veulent organiser des informations.
            Plus généralement, à toute personne ou organisation souhaitant organiser ses données et pouvoir y accéder en ligne de manière sécurisée et éventuellement partagée avec d'autres utilisateurs.`
            },
            faq2: {
                en: "How can I take a subscription?",
                fr: "Comment puis-je prendre un abonnement ?"
            },
            answer2: {
                en: `First, sign up and enjoy your free trial including up to 20 users!
            If you need to upgrade before the end of your free period, you'll do it directly from your Pickaform account management.`,
                fr: `Inscrivez-vous et profitez d'abord de votre période d'essai, incluant jusqu'à 20 utilisateurs !
            Si vous souhaitez changer d'offre avant la fin de votre essai, vous pourrez le faire directement dans Pickaform depuis votre rubrique "Compte".`
            },
            faq3: {
                en: "When will I be able to stop my subscription?",
                fr: "Quand pourrai-je stopper mon abonnement ?"
            },
            answer3: {
                en: `There is no constraint. You can stop at anytime.`,
                fr: `Il n'y a aucun engagement de durée. Vous pourrez stopper votre abonnement à tout moment.`
            },
            faq4: {
                en: "What will happen if I exceed a quota?",
                fr: "Que se passera-t-il si je dépasse un quota ?"
            },
            answer4: {
                en: `You'll have a message in the application, inviting you to upgrade or to clean your unused data or inactive users.`,
                fr: `Vous serez averti par un message dans l'application, vous invitant soit à prendre une offre supérieure, soit à faire un peu de ménage pour supprimer les utilisateurs inactifs.`
            },
            faq5: {
                en: "Will my data be secured?",
                fr: "Mes données seront-elles en sécurité ?"
            },
            answer5: {
                en: `Security and confidentiality is our major concern.
            We host data exclusively in France and not in the USA.
            The protocol https ensures that nobody can steal or exploit your data between your office and our servers, but you have to secure your password on your side!`,
                fr: `La sécurité et la confidentialité de vos données sont nos préoccupations majeures.  
            Nous hébergeons vos données exclusivement en France et non aux Etats-Unis.  
            Le protocole https garantit qu'aucune donnée ne peut être exploitée entre chez vous et nos serveurs.`
            },
            faq6: {
                en: "Who can see my data?",
                fr: "Qui peut voir mes données ?"
            },
            answer6: {
                en: `Only you.
            Each application you create generates a brand new database on our server, 100% dedicated to you, in order to have the best  possible separation between you and other customers. We are nearly alone to do this in a multi-tenancy architecture!
            Even the members of our team can't access your applications. But don't forget: if you loose your password, nobody will be able to help you!`,
                fr: `Seulement vous.  
            Chacune de vos applications crée une nouvelle base de données qui vous est 100% dédiée, afin de garantir un cloisonnement et une étanchéité absolue avec les autres clients.  
            Même les membres de notre équipe ne peuvent pas accéder au contenu de vos applications. D'ailleurs, si vous perdez vos codes d'accès, nous ne pourrons absolument rien faire pour vous !`
            },
            faq7: {
                en: "It's expensive, isn't it?",
                fr: "C'est cher, non ?"
            },
            answer7: {
                en: `On the contrary, it's not!
            First, you don't pay anything until you are convinced.
            On one hand, we perfectly know that on this kind of platform, very rich of many features, it takes time to evaluate everything we can do with it!
            On the other hand, our serious competitors sell their solution around 24€/user/month and up to 60€/user/month, where we can go down to 1€/user/month.
            To be clear, we have better prices if we are compared to product with similar features.`,
                fr: `Bien au contraire !  
            D'une part, vous ne payez rien tant que vous n'êtes pas convaincu.
            Nous savons parfaitement que sur ce type de plateforme riche en fonctionnalités, il faut un peu de temps avant de prendre la mesure de tout ce que l'on peut faire avec !
            D'autre part, nos concurrents sérieux proposent leur solution en moyenne à 24€/user/mois et jusqu'à 60€/user/mois, alors que notre tarif est dégressif jusqu'à 1€/user/mois.
            En clair, nous sommes imbattables sur le prix lorsque l'on est comparé à des produits de fonctionnalités similaires.`
            },
            faq8: {
                en: "How much data can I store on Pickaform?",
                fr: "A quel volume de données ai-je le droit ?"
            },
            answer8: {
                en: `Pickaform allows you to attach files to your form data, but its goal is not to replace a file management or a virtual drive (like Google Drive, One Drive, DropBox ...), so, we calculated that an average volume of 100MB of attachments per user was sufficient for standard use of our platform. For example, this represents 2GB of data for 20 users.
            Contact us if you think your needs will exceed this usage. In that case, there is an option to connect your own storage.`,
                fr: `Pickaform vous permet bien de joindre des fichiers à vos données de formulaire, mais sa fonction n'est pas de venir en remplacement d'une gestion de fichiers ou d'un drive (Google Drive, One Drive, DropBox...), aussi, nous avons calculé qu'un volume moyen de 100Mo de pièces jointes par utilisateur était suffisant pour un usage standard de notre plateforme. Cela représente 2Go de données pour 20 utilisateurs.
            Nous consulter si vous pensez que vos besoins dépasseront cet usage. Si c'est le cas, il existe une possibilité pour intégrer votre propre espace de stockage.`
            }
        })

        const plans = [{
                name: "Silver",
                users: 10,
                apps: 3,
                price: "15,00€",
                storage: "10 GB Storage",
                color: "#00aaee"
            },
            {
                name: "Gold",
                users: 20,
                apps: 5,
                price: "12,50€",
                storage: "20 GB Storage",
                color: "#8833ee"
            },
            {
                name: "Platinum",
                users: 50,
                apps: 10,
                price: "11,00€",
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

                // PRICING TABLE
                {
                    type: "html",
                    class: "pricing-table",
                    html: kiss.templates.pricingTable(plans, t)
                },

                // ENTERPRISE PLAN
                {
                    type: "html",
                    class: "pricing-enterprise",
                    html: t("enterprisePlan")
                },

                // CONTACT
                kiss.templates.buttonCTA(t("contactUs"), "contact"),

                // FAQ
                {
                    class: "feature-top-separator"
                },
                {
                    class: "pricing-faq-container",
                    items: [
                        {
                            type: "html",
                            class: "pricing-faq-title",
                            html: "FAQ"
                        },
                        kiss.templates.pricingFAQ(t("faq0"), t("answer0")),
                        kiss.templates.pricingFAQ(t("faq1"), t("answer1")),
                        kiss.templates.pricingFAQ(t("faq2"), t("answer2")),
                        kiss.templates.pricingFAQ(t("faq3"), t("answer3")),
                        kiss.templates.pricingFAQ(t("faq4"), t("answer4")),
                        kiss.templates.pricingFAQ(t("faq5"), t("answer5")),
                        kiss.templates.pricingFAQ(t("faq6"), t("answer6")),
                        kiss.templates.pricingFAQ(t("faq7"), t("answer7")),
                        kiss.templates.pricingFAQ(t("faq8"), t("answer8"))
                    ]
                }
            ],

            events: {
                click: (event) => {
                    const target = event.target.closest("div")
                    if (target && target.classList.contains("pricing-plan-CTA")) {
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
    }
})

;kiss.app.defineView({
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
                en: `Tell us about your project,<br>we show you<span class="text-highlight" style="background-color: #00aaee">in 20 minutes</span> how to make it happen.`,
                fr: `Expliquez-nous votre projet,<br>nous vous montrons<span class="text-highlight" style="background-color: #00aaee">en 20mn</span> comment le réaliser.`
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

;kiss.app.defineView({
    id: "start",
    renderer: function (id, target) {
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
                            name: "fadeIn",
                            speed: "slower"
                        })

                    $("content-container").scrollTop = 0
                }
            }
        })
    }
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
    const alt = screenshot.split(".")[0]

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
                        html: `<img src="${src}" alt="${alt}" class="feature-screenshot-img">`,
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
    const alt = screenshot.split(".")[0]

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
                        html: `<img src="${src}" alt="${alt}" class="feature-details-screenshot-img">`,
                        events: {
                            click: () => {
                                if (kiss.tools.isMobile()) return // Don't zoom on mobile phones
                                kiss.templates.screenshotPreview(src)
                            }
                        }
                    }
                ]
            },
            {
                type: "html",
                padding: "1vh",
                flex: 1,
                maxWidth: () => (kiss.screen.current.width > 500) ? 430 : kiss.screen.current.width - 10,
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
        margin: "0 0 20px 0",
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

kiss.templates.pricingFAQ = function(question, answer)  {
    return {
        class: "pricing-faq",
        items: [
            {
                type: "html",
                html: /*html*/ `
                    <h4 class="pricing-faq-title">${question}</h4>
                    <p class="pricing-faq-description">${answer}</p>`
            }
        ]     
    }
}

;kiss.templates.screenshot = function (src) {
    const alt = src.split(".")[0]
    src = kiss.global.pathImg + "/" + src

    return {
        type: "html",
        classes: {
            this: "wave-2 screenshot-container"
        },
        width: "100%",
        html: `<img loading="lazy" class="screenshot" src="${src}" alt="${alt}" width="100%" height="100%">`,
        events: {
            click: () => kiss.templates.screenshotPreview(src)
        }
    }
}

kiss.templates.screenshotPreview = function (src) {
    const alt = src.split(".")[0]
    createPanel({
        header: false,
        modal: true,
        
        width: () => kiss.screen.current.width - 40,
        height: () => kiss.screen.current.height - 40,
        
        display: "flex",
        align: "center",
        verticalAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background-3)",

        items: [{
            type: "html",
            display: "flex",
            html: `<img class="screenshot-preview" loading="lazy" src="${src}" alt="${alt}" width="100%" height="100%" style="object-fit: contain;">`
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