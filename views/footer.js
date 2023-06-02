kiss.app.defineView("footer", function (id, target) {
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
});