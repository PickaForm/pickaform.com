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

// Load styles
kiss.loader.loadStyles([
    "https://kissjs.net/resources/lib/kissjs/kissjs",
    "https://kissjs.net/resources/lib/kissjs/styles/geometry/default",
    "https://kissjs.net/resources/lib/kissjs/styles/colors/dark",
    "styles"
])    

window.onload = async function () {
    kiss.db.mode = "memory"
    kiss.language.current = "fr"
    kiss.theme.set({color: "dark"})

    kiss.global.path = `https://${window.location.host}`
    kiss.global.pathImg = "./resources/img/"

    await kiss.loader.loadScript("./app.min")

    kiss.app.init()

    kiss.router.navigateTo({
        ui: "start",
        content: "landing"
    })
    $("splash").remove()
};