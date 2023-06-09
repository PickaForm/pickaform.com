kiss.templates.featureDetails = function ({
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

;