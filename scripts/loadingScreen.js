//loading screen
const loadingScreen = document.querySelector(".loading");
window.addEventListener("DOMContentLoaded", () => {
    loadingScreen.style.opacity= "0";
    setTimeout(() => {
        loadingScreen.style.display = "none";
    }, 1000);
});
