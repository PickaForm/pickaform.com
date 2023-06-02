kiss.app.defineView("navbar", function (id, target) {
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
});