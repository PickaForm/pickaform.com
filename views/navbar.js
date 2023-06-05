kiss.app.defineView("navbar", function (id, target) {
    const t = defineTexts(id, {
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
    })

    const navItems = [
        // HOME
        {
            text: t("Home"),
            href: "./index.html#ui=start&content=landing",
            target: "_self",
            view: "landing",
        },
        // PRODUCT
        {
            text: t("Product"),
            href: "./index.html#ui=start&content=product",
            target: "_self",
            view: "product"
        },
        // CONTACT
        {
            text: "Contact",
            href: "./index.html#ui=start&content=contact",
            target: "_self",
            view: "contact"
        },
        // BLOG
        {
            text: "Blog",
            href: "./index.html#ui=start&content=blog",
            target: "_self",
            view: "blog"
        },
        // ART
        {
            text: "AI Art",
            href: "./index.html#ui=start&content=artworks",
            target: "_self",
            view: "artworks"
        },
        // PRICING
        {
            text: t("Pricing"),
            href: "./index.html#ui=start&content=pricing",
            target: "_self",
            view: "pricing"
        },
        // TEMPLATES
        {
            text: t("Templates"),
            href: kiss.global.path + "/client/pickaform/demo.html#ui=templates-list",
            target: "_new",
            view: ""
        },
        // LOGIN
        {
            text: t("Login"),
            href: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-login",
            target: "_new",
            view: ""
        },
        // REGISTER
        {
            text: t("Get started"),
            href: kiss.global.path + "/client/pickaform/index_dev.html#ui=authentication-register",
            target: "_new",
            view: ""
        }
    ]

    const buttons = [{
        type: "html",
        html: kiss.templates.navbar(navItems)
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

                if (element.classList.contains("field-checkbox-icon")) {
                    const currentState = $("mode").getValue()
                    const theme = (currentState === false) ? "dark" : "light"
                    kiss.theme.set({
                        color: theme
                    })
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
                    } else {
                        window.open(element.href, target)
                    }
                }
            },

            mouseover: function (event) {
                event.preventDefault()

                let element = event.target



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
                    icon: "fas fa-bars",
                    padding: 10,
                    margin: 10,
                    action: () => {
                        // Display menu vertically
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

;