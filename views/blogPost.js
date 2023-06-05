kiss.app.defineView("blogPost", function (id, target) {
    let modelId = "0187ed6f-35e4-7b17-80c5-046e69931916"
    modelId = "0187ed51-d3a5-70ea-869c-6c538d786fb7"

    let postEndpoint = "https://cloud.pickaform.com/command/blog/get"

    return createBlock({
        id: id,
        target,
        layout: "vertical",
        alignItems: "center",
        overflowY: "auto",

        items: [
            {
                id: "blog-post-banner",
                class: "blog-post-banner",
            },
            {
                id: "blog-post-content",
                class: "blog-post-content",
                layout: "vertical",
                alignItems: "center"        
            }
        ],

        methods: {
            async load() {
                const postId = kiss.context.postId
                const post = await kiss.ajax.request({
                    url: postEndpoint,
                    method: "post",
                    body: JSON.stringify({
                        modelId,
                        postId
                    })
                })

                $("blog-post-banner").setItems([kiss.templates.blogPostBanner(post)])
                $("blog-post-content").setItems([kiss.templates.blogPost(post)])
            }
        }
    })
})

;