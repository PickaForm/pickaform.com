kiss.templates.fieldType = function ({
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

;