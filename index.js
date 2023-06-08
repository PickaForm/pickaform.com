/**
 * Global functions for translation
 */
const t = (textId) => `<span class="localized" id="${textId}">${txtTitleCase(textId)}</span>`
const translateByPage = (textId, id = "") => `<span class="localized" id="${id + "-" + textId}">${txtTitleCase(id + "-" + textId) || textId}</span>`

/**
 * Define texts for a specific page
 * 
 * @param {string} pageId 
 * @param {object[]} texts 
 * @returns 
 */
const defineTexts = (pageId, texts) => {
    let mappedTexts = {}
    Object.keys(texts).forEach(key => mappedTexts[pageId + "-" + key] = texts[key])
    kiss.app.defineTexts(mappedTexts)

    const closure = (pageId) => {
        return (textId) => {
            return translateByPage(textId, pageId)
        }
    }
    return closure(pageId)
}

/**
 * Translate all localized elements of a page
 * 
 * @param {string} language 
 */
function translateTo(language) {
    kiss.language.current = language
    const itemsToTranslate = this.querySelectorAll(".localized")
    
    itemsToTranslate.forEach(item => {
        const textId = item.getAttribute("id")
        const newText = t(textId)
        item.innerHTML = newText
    })
}

// Load styles
kiss.loader.loadStyles([
    "https://kissjs.net/resources/lib/kissjs/kissjs",
    "https://kissjs.net/resources/lib/kissjs/styles/geometry/default",
    "https://kissjs.net/resources/lib/kissjs/styles/colors/dark",
    "styles"
])

window.onload = async function () {
    kiss.db.mode = "memory"
    kiss.language.current = kiss.router.getRoute().language || "en"
    kiss.theme.set({color: "light"})

    kiss.global.path = `https://${window.location.host}`
    kiss.global.pathImg = "./resources/img/"

    // Blog settings
    kiss.global.blogEndPoint = "https://cloud.pickaform.com/command/blog" // https://localhost/command/blog
    kiss.global.blogModelId = "0187ed51-d3a5-70ea-869c-6c538d786fb7" // "0187ed6f-35e4-7b17-80c5-046e69931916"

    // Load app
    await kiss.loader.loadScript("./app.min")
    kiss.app.init()

    kiss.router.navigateTo({
        ui: "start",
        content: "landing"
    })
    $("splash").remove()
};