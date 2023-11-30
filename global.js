const DARK_THEME_KEY = "dark-theme";
const toggleThemeElem = document.querySelector('#toggle-theme');
const aboutElem = document.querySelector("#about")

function updateTheme() {
    document.querySelectorAll("*")
        .forEach(elem => {
            if (sessionStorage.getItem(DARK_THEME_KEY) === null) {
                elem.classList.remove("dark-theme");
            } else {
                elem.classList.add("dark-theme");
            }
        });

    document.documentElement.style.backgroundImage =
        sessionStorage.getItem(DARK_THEME_KEY) === null ?
            "url('asset/index-bg.jpg')" :
            "url('asset/index-bg-dark.jpg')";
}

toggleThemeElem.addEventListener('click', () => {
    if (sessionStorage.getItem(DARK_THEME_KEY) === null) {
        sessionStorage.setItem(DARK_THEME_KEY, "");
    } else {
        sessionStorage.removeItem(DARK_THEME_KEY);
    }

    updateTheme();
});

updateTheme();

aboutElem.addEventListener("click", () => {
    alert("Preview product. Version: 0.0.2");
})