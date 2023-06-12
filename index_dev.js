// Load application scripts
kiss.loader.loadScripts([
    "utils/init",
    "utils/localization",

    // Views
    "views/start",
    "views/navbar",
    "views/footer",
    "views/landing",
    "views/pricing",
    "views/product",
    "views/blog",
    "views/blogPost",
    "views/contact",
    "views/artworks",

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
    "blocks/pager"
])

// Load styles
kiss.loader.loadStyles([
    "https://kissjs.net/resources/lib/kissjs/kissjs",
    "https://kissjs.net/resources/lib/kissjs/styles/geometry/default",
    "https://kissjs.net/resources/lib/kissjs/styles/colors/dark",
    "styles"
])

window.onload = async function () {
    kiss.app.init()

    kiss.router.navigateTo({
        ui: "start",
        content: "landing"
    })
    $("splash").remove()
};