kiss.app.defineView("artworks", function (id, target) {
    // Static model properties
    const modelId = "0188527b-7570-7551-9c32-99e1958e25b5"
    const fieldTitle = "pJZ5QvWL"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Header
            kiss.templates.title({
                title: "Get Inspired by our AI Art Collection",
                subtitle: "We used pickaform to streamline the process of creating Midjourney images"
            }),
            // Search field
            {
                type: "text",
                width: "366px",
                fieldWidth: "100%",
                fieldHeight: "4vh",
                fontSize: "2vh",
                placeholder: "Search",
                events: {
                    change() {
                        $(id).search(this.getValue())
                    }
                }
            },
            // List of artworks
            {
                id: "artworks-list",
                class: "artworks-list"
            },
            // Pager
            {
                id: "artworks-pager",
                class: "artworks-pager"
            }
        ],

        events: {
            click: (event) => {
                if (event.target.closest("div").classList.contains("artwork")) {
                    const filename = event.target.src.replace(".256x256", "")
                    const tags = event.target.alt

                    createPanel({
                        modal: true,
                        header: false,
                        width: "calc(100% - 20px)",
                        maxWidth: 1350,
                        height: "calc(100% - 20px)",
                        align: "center",
                        verticalAlign: "center",
                        layout: "vertical",
                        backgroundColor: "var(--body-alt)",
                        classes: {
                            "panel-body": "wave-2"
                        },
                        items: [{
                            type: "html",
                            html: /*html*/ `
                                <img class="artwork-image-preview" src="${filename}"/>
                                <h2 class="artwork-title">${tags}</h2>
                                `
                        }],
                        events: {
                            click: function () {
                                this.close()
                            }
                        }
                    }).render()
                }
            }
        },

        methods: {
            async load() {
                this.getArtworks(0, 10)
            },

            async getArtworks(skip, limit) {
                const response = await kiss.ajax.request({
                    url: kiss.global.path + "/command/product/list",
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        sortSyntax: "mongo",
                        sort: {
                            createdAt: -1 // Sort by creation date
                        },
                        skip,
                        limit
                    })
                })

                $("artworks-list").setInnerHtml(this.toHtml(response))
                this.createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: kiss.global.path + "/command/product/list",
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId,
                        skip,
                        limit,
                        sortSyntax: "mongo",
                        sort: {
                            createdAt: -1 // Sort by publication date
                        },
                        filterSyntax: "normalized",
                        filter: {
                            type: "group",
                            operator: "or",
                            filters: [
                                // Search in title
                                {
                                    type: "filter",
                                    fieldId: fieldTitle,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                $("artworks-list").setInnerHtml(this.toHtml(response))
                this.createPager(response.totalCount, response.skip, response.limit, term)
            },

            toHtml(response) {
                let items = response.products.map(artwork => {
                    return artwork.images.map(image => {
                        const imageId = (image.filename.split("-").pop()).split(".")[0]
                        return {
                            id: artwork.id + "-" + imageId,
                            title: artwork.title,
                            description: artwork.description,
                            tags: artwork.tags.join(", "),
                            image: image.thumbnails.m.path //image.path
                        }
                    })
                }).flat()
                return items.map(this.renderArtwork).join("")
            },

            renderArtwork(artwork) {
                return `
                    <div id="${artwork.id}" class="artwork">
                        <img loading="lazy" class="artwork-image" src="${artwork.image}" alt="${artwork.tags}"></img>
                        <p class="artwork-tags">${artwork.tags}</p>
                    </div>`
            },

            createPager(count, skip, limit, searchTerm) {
                const rest = count % limit
                const numberOfPages = Math.floor(count / limit) + ((rest == 0) ? 0 : 1)
                const pageNumber = skip / limit

                kiss.router.updateUrlHash({
                    page: pageNumber + 1
                })

                let pagerButtons = []

                for (let i = 0; i < numberOfPages; i++) {
                    let newButton = {
                        type: "button",
                        text: i + 1 + "",
                        backgroundColor: (i == pageNumber) ? "#bdecff" : "",
                        width: "5vh",
                        height: "5vh",
                        borderRadius: "5vh",
                        margin: "5px",
                        action: () => {
                            const newSkip = i * limit
                            if (searchTerm) {
                                $(id).search(searchTerm, newSkip, limit)
                            } else {
                                $(id).getArtworks(newSkip, limit)
                            }
                        }
                    }
                    pagerButtons.push(newButton)
                }

                $("artworks-pager").setItems(pagerButtons)
            }
        }
    })
});