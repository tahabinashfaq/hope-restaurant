document.addEventListener("DOMContentLoaded", () => {

    // ── Sticky header: add 'scrolled' class for enhanced shadow & opacity ──
    const header = document.getElementById("main-header");

    if (header) {
        const updateHeader = () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        };
        window.addEventListener("scroll", updateHeader, { passive: true });
        updateHeader(); // run on load too
    }

    // ── Highlight active navigation link ──
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");
        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // ── Animate menu categories on scroll (Intersection Observer) ──
    const menuSections = document.querySelectorAll(".menu-category");

    if (menuSections.length > 0) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("show");
                        sectionObserver.unobserve(entry.target); // fire once
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
        );

        menuSections.forEach((sec, i) => {
            // Stagger each section slightly
            sec.style.transitionDelay = `${i * 0.05}s`;
            sectionObserver.observe(sec);
        });
    }

    // ── Animate about blocks on scroll ──
    const aboutBlocks = document.querySelectorAll(".about-block");

    if (aboutBlocks.length > 0) {
        aboutBlocks.forEach(block => {
            block.style.opacity = "0";
            block.style.transform = "translateX(-16px)";
            block.style.transition = "opacity 0.55s ease, transform 0.55s ease";
        });

        const blockObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = "1";
                        entry.target.style.transform = "translateX(0)";
                        blockObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        aboutBlocks.forEach((block, i) => {
            block.style.transitionDelay = `${i * 0.12}s`;
            blockObserver.observe(block);
        });
    }

    // ── Animate contact cards ──
    const contactCards = document.querySelectorAll(".contact-card, .hours-card");
    if (contactCards.length > 0) {
        contactCards.forEach((card, i) => {
            card.style.animationDelay = `${i * 0.15}s`;
        });
    }

    // ── Generic reveal for homepage cards (visual-card, cuisine-card, promise-card) ──
    const revealItems = document.querySelectorAll(".visual-card, .cuisine-card, .promise-card");

    if (revealItems.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("reveal");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
        );

        revealItems.forEach((el, i) => {
            // Stagger siblings within the same parent grid
            const siblings = el.parentElement.querySelectorAll(".visual-card, .cuisine-card, .promise-card");
            const idx = Array.from(siblings).indexOf(el);
            el.style.transitionDelay = `${idx * 0.08}s`;
            el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
            revealObserver.observe(el);
        });
    }

    // ── Menu card micro-interaction: tilt on hover ──
    const menuCards = document.querySelectorAll(".menu-card");
    menuCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
            const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
            card.style.transform = `translateY(-5px) rotateX(${y}deg) rotateY(${x}deg)`;
        });
        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });

});
