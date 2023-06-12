kiss.app.defineView("navbar", function (id, target) {
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
                html: `<img style="width: 16px" src="${kiss.global.pathImg}/flag-${(kiss.language.current == "fr") ? "en" : "fr"}.svg">`,
                events: {
                    click: function() {
                        translate()
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
        ],

        events: {
            /**
             * Intercepts the navbar click event to prevent direct navigation with href.
             * This allows to *not reload* the page and leverage the SPA behavior of KissJS when opening views.
             */
            click: function (event) {
                event.preventDefault()
                let element = event.target

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

;