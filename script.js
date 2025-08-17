document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    function toggleMenu(e) {
        e.preventDefault(); // чтобы не было неожиданных эффектов
        navLinks.classList.toggle("active");
    }

    // Для клика и тач-событий (iPhone/Android)
    menuToggle.addEventListener("click", toggleMenu);
    menuToggle.addEventListener("touchstart", toggleMenu);
});
