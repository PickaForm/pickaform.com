kiss.templates.screenshot = function (src) {
    const alt = src.split(".")[0]
    src = kiss.global.pathImg + "/" + src

    return {
        type: "html",
        class: "wave-2",
        html: `<img loading="lazy" class="screenshot" src="${src}" alt="${alt}">`,
        width: "100%",
        events: {
            click: () => kiss.templates.screenshotPreview(src)
        }
    }
}

kiss.templates.screenshotPreview = function (src, width, height) {
    const alt = src.split(".")[0]
    createPanel({
        header: false,
        modal: true,
        
        width: () => width || kiss.screen.current.width - 40,
        height: () => height || kiss.screen.current.height - 40,
        
        display: "flex",
        align: "center",
        verticalAlign: "center",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background-1)",

        items: [{
            type: "html",
            display: "flex",
            width: "100%",
            height: "100%",
            html: `<img loading="lazy" src="${src}" alt="${alt}" style="object-fit: contain; width: 100%; height: 100%;">`
        }],
        
        events: {
            click: function() {
                this.close()
            }
        }
    }).render()
}

;