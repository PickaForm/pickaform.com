kiss.templates.title = function ({
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