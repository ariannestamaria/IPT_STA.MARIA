document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {

        const linkPath = new URL(link.href).pathname;

        
        if (currentPath === linkPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();

            const targetId = link.getAttribute("href").substring(1); 
            const targetElement = document.getElementById(targetId);

            if (targetElement && currentPath === window.location.pathname) {
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } else {
                window.location.href = link.href;
            }
        });
    });

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
        const platformClass = link.classList[1]; 
        
        
        const platformMap = {
            "fa-facebook": "Facebook",
            "fa-twitter": "Twitter",
            "fa-linkedin": "LinkedIn",
            "fa-instagram": "Instagram",
            "fa-email": "Email",
            
        };
    
        if (platformMap[platformClass]) {
            link.setAttribute("title", `Visit my ${platformMap[platformClass]} profile`);
        }
    });
    
});
