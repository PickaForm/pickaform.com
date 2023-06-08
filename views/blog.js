kiss.app.defineView("blog", function (id, target) {
    // Static model properties
    const fieldTitle = "y9yVRPEQ"
    const fieldDescription = "BedquzD8"
    const fieldPublicationDate = "floopJiS"
    const postEndpoint = kiss.global.blogEndPoint + "/list"

    const t = defineTexts(id, {
        title: {
            en: `Your resources to
                <span class="text-highlight" style="background-color: #00aaee">save time</span>`,
            fr: `Vos ressources pour
                <br><span class="text-highlight" style="background-color: #00aaee">gagner du temps</span>`
        },
        subtitle: {
            en: "News, stories and tips on project management, collaboration & productivity",
            fr: "News et conseils sur la gestion de projet, la collaboration et la productivité"
        }
    })

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Blog header
            kiss.templates.title({
                title: t("title"),
                subtitle: t("subtitle")
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
            // List of posts
            {
                id: "blog-content",
                class: "blog-content"
            },
            // Pager
            {
                id: "blog-pager",
                class: "blog-pager"
            }
        ],

        methods: {
            async load() {
                this.getPosts(0, 6)
            },

            async getPosts(skip, limit) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId: kiss.global.blogModelId,
                        sortSyntax: "mongo",
                        sort: {[fieldPublicationDate]: -1}, // Sort by publication date
                        skip,
                        limit
                    })
                })

                log(response.posts)
                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                this.createPager(response.totalCount, skip, response.limit)
            },

            async search(term, skip = 0, limit = 6) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    showLoading: true,
                    body: JSON.stringify({
                        modelId: kiss.global.blogModelId,
                        skip,
                        limit,
                        sortSyntax: "mongo",
                        sort: {[fieldPublicationDate]: -1}, // Sort by publication date
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
                                },
                                // Search in description
                                {
                                    type: "filter",
                                    fieldId: fieldDescription,
                                    operator: "contains",
                                    value: term
                                }
                            ]
                        }
                    })
                })

                const items = response.posts.map(kiss.templates.blogPostEntry)

                $("blog-content").setItems(items)
                this.createPager(response.totalCount, response.skip, response.limit, term)
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
                            }
                            else {
                                $(id).getPosts(newSkip, limit)
                            }
                        }
                    }
                    pagerButtons.push(newButton)
                }

                $("blog-pager").setItems(pagerButtons)
            }            
        }
    })
})

;