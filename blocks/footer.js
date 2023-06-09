/**
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

;