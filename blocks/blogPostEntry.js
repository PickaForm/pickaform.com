kiss.templates.blogPostEntry = function (post) {
    const postUrl = kiss.global.path + "/www/start/blogPost/" + post.slug
    const image = (post.image && Array.isArray(post.image) && post.image.length > 0) ? post.image[0] : ""

    return {
        id: post.slug,
        layout: "vertical",
        class: "blog-entry",
        items: [{
            type: "html",
            html:
                `
                <a href="${postUrl}">
                    <img loading="lazy" class="blog-entry-banner-image" src="${image.path}"></img>
                </a>
                <p class="blog-entry-tags">${post.tags}</p>
                <a href="${postUrl}">
                    <h2 class="blog-entry-title">${post.title}</h2>
                    <p class="blog-entry-description">${post.description}</p>
                </a>`
        }]
    }
}

;