const settingsButton = document.getElementById('setting');

settingsButton.addEventListener('click', () => {
    document.querySelectorAll("*").forEach(elem => elem.classList.toggle("dark-theme"))
});