// Load application scripts
kiss.loader.loadScripts([
    "utils/init",
    "utils/localization",

    // Views
    "views/start",
    "views/navbar",
    "views/footer",
    "views/landing",
    "views/product",
    "views/cases",
    "views/pricing",
    "views/blog",
    "views/blogPost",
    "views/contact",
    "views/artworks",
    "views/whoCanUse",

    // Templates
    "blocks/navbar",
    "blocks/title",
    "blocks/screenshot",
    "blocks/buttonCTA",
    "blocks/footer",
    "blocks/pricing",
    "blocks/blogPost",
    "blocks/blogPostEntry",
    "blocks/feature",
    "blocks/featureDetails",
    "blocks/pager",
    "blocks/whoCanUse"
])

// Load styles
kiss.loader.loadStyles([
    "https://kissjs.net/resources/lib/kissjs/kissjs",
    "https://kissjs.net/resources/lib/kissjs/styles/geometry/default",
    "https://kissjs.net/resources/lib/kissjs/styles/colors/dark",
    "styles"
])

window.onload = async function () {
    kiss.logger.init({
        data: true,
        types: [0],
        categories: ["😘"]
    })
        
    kiss.app.init()

    kiss.router.navigateTo({
        ui: "start",
        content: "landing"
    })
};