kiss.app.defineView({
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
                fr: "Enregistrez vous et démarrez l'essai de 14 jours."
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
                en: `Pickaform is made for: companies, associations, the public sector, digital companies who want to accelerate their projects and deliver faster, no-coders & makers who are looking to work with larger clients.
                More generally, pickaform is useful for any person or organization wishing to organize their data and business processes in a collaborative way.`,
                fr: `Pickaform est fait pour : les entreprises, les associations, le secteur public, les entreprises du numérique qui veulent accélérer leurs projets et livrer plus vite, les no-coders & makers qui cherchent à travailler avec des clients plus gros.
                Plus généralement, pickaform est utile à toute personne ou organisation souhaitant organiser ses données et ses processus métier de manière collaborative.`
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
                fr: `Il n'y a aucun engagement de durée. Vous pouvez stopper votre abonnement à tout moment.`
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

;