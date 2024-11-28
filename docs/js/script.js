document.addEventListener("DOMContentLoaded", function () {
    // Get the current URL path (relative to the domain)
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        // Extract the link path (to compare with the current page path)
        const linkPath = new URL(link.href).pathname;

        // Compare if the link path matches the current path
        if (currentPath === linkPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Smooth scroll functionality for internal navigation links (same-page)
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            // Only apply smooth scroll if the link leads to the same page
            const targetId = link.getAttribute("href").substring(1); // Get the section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement && currentPath === window.location.pathname) {
                // Scroll to the target element smoothly if on the same page
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                // Otherwise, follow the normal link (navigate to a different page)
                window.location.href = link.href;
            }
        });
    });

    // Intersection Observer to add "visible" class for scroll animations
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                } else {
                    entry.target.classList.remove("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".projects, .about-content").forEach(section => {
        observer.observe(section);
    });

    document.querySelectorAll(".social-links a").forEach(link => {
        // Extract the platform name by checking the class and mapping it
        const platformClass = link.classList[1]; // Assuming the second class is the social media class (e.g., fa-facebook)
        
        // Define a mapping of font-awesome classes to platform names
        const platformMap = {
            "fa-facebook": "Facebook",
            "fa-twitter": "Twitter",
            "fa-linkedin": "LinkedIn",
            "fa-instagram": "Instagram",
            "fa-github": "GitHub",
            "fa-youtube": "YouTube"
            // Add other platforms as necessary
        };
    
        // Set the tooltip with the platform name
        if (platformMap[platformClass]) {
            link.setAttribute("title", `Visit my ${platformMap[platformClass]} profile`);
        }
    });
    
});
