kiss.app.defineView("blogPost", function (id, target) {
    const modelId = "0187ed6f-35e4-7b17-80c5-046e69931916"

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
                    url: kiss.global.path + "/command/blog/get",
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
});