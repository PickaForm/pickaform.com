kiss.app.defineView("blog", function (id, target) {
    // Static model properties
    const modelId = "0187ed6f-35e4-7b17-80c5-046e69931916"
    const fieldTitle = "y9yVRPEQ"
    const fieldDescription = "BedquzD8"
    const fieldPublicationDate = "floopJiS"
    const postEndpoint = "https://localhost/command/blog/list"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            // Blog header
            kiss.templates.title({
                title: "Get Inspired to Do Big Things",
                subtitle: "News, stories and tips on project management, collaboration & productivity"
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

        events: {
            click: (event) => {
                const item = event.target
                if (item.closest("a-block").classList.contains("blog-entry")) {
                    const postId = item.closest("a-block").id

                    kiss.context.postId = postId
                    kiss.router.navigateTo({
                        content: "blogPost",
                        postId
                    })
                }
            }
        },

        methods: {
            async load() {
                this.getPosts(0, 6)
            },

            async getPosts(skip, limit) {
                const response = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        sortSyntax: "mongo",
                        sort: {[fieldPublicationDate]: -1}, // Sort by publication date
                        skip,
                        limit
                    })
                })

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
                        modelId,
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