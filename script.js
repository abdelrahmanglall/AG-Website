document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Main Nav ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only prevent default if it's a hash link on the same page
            const targetId = this.getAttribute('href').split('#')[1];
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Link Highlighting (Main & Sidebar) ---
    const sections = document.querySelectorAll('section'); // Works for both pages if sections exist
    const navLi = document.querySelectorAll('nav ul li a');
    const sidebarLi = document.querySelectorAll('.sidebar ul li a');

    // Combine all nav links to check
    const allLinks = [...navLi, ...sidebarLi];

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjustment for header height (90px)
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        allLinks.forEach(a => {
            // Remove active from links corresponding to sections on this page
            const href = a.getAttribute('href');
            if (href.includes('#')) {
                const hash = href.split('#')[1];
                if (document.getElementById(hash)) {
                    a.classList.remove('active');
                    if (hash === current) {
                        a.classList.add('active');
                    }
                }
            }
        });
    });

    // --- Copy Link Functionality ---
    const copyBtns = document.querySelectorAll('.copy-link-btn');

    // Create Toast Container
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = 'Link Copied!';
    document.body.appendChild(toast);

    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            // Find parent section id
            const section = this.closest('section');
            if (section) {
                const id = section.getAttribute('id');
                const url = window.location.origin + window.location.pathname + '#' + id;

                navigator.clipboard.writeText(url).then(() => {
                    toast.classList.add('show');
                    setTimeout(() => {
                        toast.classList.remove('show');
                    }, 2000);
                });
            }
        });
    });

    // Dynamic Copyright Year if element exists
    const yearEl = document.getElementById('dynamic-year');
    if (yearEl) {
        yearEl.innerText = new Date().getFullYear();
    }
});
