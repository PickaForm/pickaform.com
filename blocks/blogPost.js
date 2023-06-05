kiss.templates.blogPostBanner = function (post) {
    log(post)
    
    return {
        type: "html",
        html: `<img class="blog-post-banner-image" src="/${post.Image[0].path}">`
        // html: `<img loading="lazy" class="blog-post-banner-image" src="/uploads/01844399-988f-7974-a68f-92d35fc702cc/2023/05/06/zen%20coach.png">`
    }
}

kiss.templates.blogPost = function (post) {
    return {
        layout: "vertical",
        items: [{
                type: "html",
                html: `
                    <h1 class="blog-post-title">${post.Title}</h1>
                    <p class="blog-post-description">${post.Description}</p>
                    
                    <p class="blog-post-body">${post.Body}</p>
                `
            },
            ...post.Sections.map(section => {
                return {
                    type: "html",
                    html: `
                        <h2 class="blog-post-title">${section.Title}</h2>
                        <p class="blog-post-body">${section.Body.replaceAll("\n", "<br>")}</p>
                    `
                }
            })
        ]
    }
}

;