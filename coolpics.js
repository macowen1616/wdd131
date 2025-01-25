document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector("header nav");

    menuButton.addEventListener("click", () => {
    nav.classList.toggle("active");
    });
});
