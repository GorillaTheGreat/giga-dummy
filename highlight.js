document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".sidebar-link");

    links.forEach(link => {
        const href = link.getAttribute("href");
        const currentPage = window.location.pathname.split("/").pop();

        if (href === currentPage) {
            link.classList.add("active");
        }
    });
});