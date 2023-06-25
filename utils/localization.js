/**
 * Global functions for translation
 */
const t = (textId) => `<span class="localized" id="${textId}">${txtTitleCase(textId)}</span>`
const translateByPage = (textId, id = "") => `<span class="localized" id="${id + "-" + textId}">${txtTitleCase(id + "-" + textId)}</span>`

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
        const newText = txtTitleCase(textId)
        item.innerHTML = newText
    })
}

/**
 * Translate navbar, content, footer
 */
function translate() {
    publish("EVT_LANGUAGE", {
        language: kiss.language.current
    })

    let newLanguage = (kiss.language.current == "fr") ? "en" : "fr"
    kiss.language.current = newLanguage
    localStorage.setItem("config-language", newLanguage)

    // Translate navbar, footer, content
    $("navbar").translateTo(newLanguage)
    $("footer").translateTo(newLanguage)
    const currentContent = kiss.router.getRoute().content
    $(currentContent).translateTo(newLanguage)
}

;