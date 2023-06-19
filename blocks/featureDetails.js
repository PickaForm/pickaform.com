kiss.templates.featureDetails = function ({
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
                                kiss.templates.screenshotPreview(src, 822, 522)
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

;