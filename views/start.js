kiss.app.defineView("start", function (id, target) {
    return createBlock({
        id,
        target,
        layout: "vertical",
        fullscreen: true,

        items: [
            // NAVBAR
            {
                type: "view",
                id: "navbar",
            },
            {
                id: "content-container",
                overflowY: "auto",
                items: [
                    // CONTENT
                    {
                        id: "content",
                        layout: "vertical",
                        items: [{
                            type: "view",
                            id: "landing"
                        }]
                    },
                    // FOOTER
                    {
                        type: "view",
                        id: "footer"
                    }
                ]
            }
        ],

        subscriptions: {
            "EVT_ROUTE_UPDATED": (route) => {
                kiss.views
                    .show(route.content, "content", true)
                    .setAnimation({
                        name: "zoomIn",
                        speed: "faster"
                    })

                $("content-container").scrollTop = 0
            }
        }
    })
})

;