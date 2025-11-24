document.addEventListener("DOMContentLoaded", () => {

    // Smooth header animation on scroll
    window.addEventListener("scroll", () => {
        const header = document.querySelector("header");
        if (window.scrollY > 50) {
            header.style.background = "rgba(0,0,0,0.9)";
        } else {
            header.style.background = "rgba(0,0,0,0.7)";
        }
    });

    // Highlight active navigation link
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

    // Animate menu sections on scroll
    const sections = document.querySelectorAll('.menu-category');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add("show");
        });
    }, { threshold: 0.2 });

    sections.forEach(sec => observer.observe(sec));

});
