/**
 * Global functions for translation
 */
const t = (textId, texts) => `<span class="localized" id="${textId}">${txtTitleCase(textId, texts)}</span>`
const screen = (textId, texts) => txtTitleCase(textId, texts)

function translateTo(language) {
    kiss.language.current = language
    const itemsToTranslate = this.querySelectorAll(".localized")
    
    itemsToTranslate.forEach(item => {
        const textId = item.getAttribute("id")
        const newText = t(textId, this.texts)
        item.innerHTML = newText
    })
}

// Load application scripts
kiss.loader.loadScripts([
    "views/start",
    "views/navbar",
    "views/footer",
    "views/legal",
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
    "blocks/fieldType"
])

// Load application styles
kiss.loader.loadStyles([
    "styles"
])

window.onload = async function () {
    kiss.db.mode = "memory"
    kiss.language.current = "fr"
    kiss.theme.set({color: "dark"})

    kiss.global.path = `https://${window.location.host}`
    kiss.global.pathImg = "./resources/img/"
    kiss.app.init()
};