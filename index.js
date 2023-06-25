// Load styles
kiss.loader.loadStyles([
    "https://kissjs.net/resources/lib/kissjs/kissjs",
    "https://kissjs.net/resources/lib/kissjs/styles/geometry/default",
    "https://kissjs.net/resources/lib/kissjs/styles/colors/dark",
    "styles"
])

window.onload = async function () {
    await kiss.loader.loadScript("./app.min")
    kiss.app.init()
    
    kiss.router.navigateTo({
        ui: "start",
        content: "landing"
    })
};