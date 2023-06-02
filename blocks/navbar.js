kiss.templates.navbar = function (items) {
    return /*html*/ `
        <div class="nav-wrapper">
            <nav>
                <ul>
                    ${kiss.templates.navbarItems(items)}
                </ul>
            </nav>
        </div>
    `
}

kiss.templates.navbarItems = function (items) {
    return items.map(item => {
        return /*html*/`
            <li class="navbar-item">
                <a href="${item.href}" view="${item.view}" target="${item.target}">${item.text}</a>
            </li>
        `
    }).join("")
}

;