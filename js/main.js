"use strict";

/* =========================================================
   STUDENT PORTFOLIO - MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * PROFILE MENU FIRST
     * Isko data.js check se pehle initialize kiya gaya hai.
     * Agar data.js mein error ho tab bhi profile photo ka
     * menu kaam karega.
     */
    initializeProfileMenu();


    /* =====================================================
       CHECK DATA.JS
       ===================================================== */

    if (typeof studentData === "undefined") {

        console.error(
            "studentData is not defined. Make sure data.js is loaded before main.js."
        );

        return;
    }


    /* =====================================================
       LOAD PORTFOLIO DATA
       ===================================================== */

    loadStudentInfo();
    loadEducation();
    loadKnowledge();
    loadSkills();
    loadJourney();
    loadProjects();
    loadCertificates();


    /* =====================================================
       INITIALIZE FEATURES
       ===================================================== */

    initializeNavigation();
    initializeScrollExperience();
    initializeThemeToggle();
    initializeAmbientParticles();
    initializePortfolioEnhancements();
    initializeLoader();
    initializeContactForm();
    initializeYear();

    initializeRevealAnimations();
    initializeSkillAnimations();
    initializeCounters();
    initializeProjectTilt();

});


/* =========================================================
   STUDENT INFORMATION
   ========================================================= */

function loadStudentInfo() {

    const nameElements =
        document.querySelectorAll(
            "[data-student-name]"
        );

    nameElements.forEach((element) => {

        element.textContent =
            studentData.name ||
            "YOUR NAME";

    });


    const descriptionElements =
        document.querySelectorAll(
            "[data-student-description]"
        );

    descriptionElements.forEach((element) => {

        element.textContent =
            studentData.description ||
            "Student, Developer & Technology Enthusiast";

    });


    const aboutElement =
        document.querySelector("#about-text");


    if (aboutElement) {

        aboutElement.textContent =
            studentData.about ||
            "I am a student interested in programming, web development and modern technology.";

    }

}


/* =========================================================
   EDUCATION
   ========================================================= */

function loadEducation() {

    const container =
        document.querySelector(
            "#education-timeline"
        );


    if (!container) {
        return;
    }


    const education =
        Array.isArray(studentData.education)
            ? studentData.education
            : [];


    container.innerHTML =
        education
            .map((item) => {

                return `
                    <article class="timeline-item reveal">

                        <div class="timeline-dot"></div>

                        <div class="timeline-content">

                            <span class="timeline-year">
                                ${escapeHTML(item.year || "")}
                            </span>

                            <h3>
                                ${escapeHTML(item.title || "")}
                            </h3>

                            <h4>
                                ${escapeHTML(item.school || "")}
                            </h4>

                            <p>
                                ${escapeHTML(item.description || "")}
                            </p>

                        </div>

                    </article>
                `;

            })
            .join("");

}


/* =========================================================
   KNOWLEDGE
   ========================================================= */

function loadKnowledge() {

    const container =
        document.querySelector(
            "#knowledge-grid"
        );


    if (!container) {
        return;
    }


    const knowledge =
        Array.isArray(studentData.knowledge)
            ? studentData.knowledge
            : [];


    container.innerHTML =
        knowledge
            .map((item) => {

                const subjects =
                    Array.isArray(item.subjects)
                        ? item.subjects
                        : [];


                return `
                    <article class="knowledge-card reveal">

                        <div class="knowledge-number">
                            ${escapeHTML(
                                String(subjects.length)
                                    .padStart(2, "0")
                            )}
                        </div>

                        <h3>
                            ${escapeHTML(item.title || "")}
                        </h3>

                        <div class="knowledge-list">

                            ${subjects
                                .map(
                                    (subject) => `
                                        <span>
                                            ${escapeHTML(subject)}
                                        </span>
                                    `
                                )
                                .join("")}

                        </div>

                    </article>
                `;

            })
            .join("");

}


/* =========================================================
   SKILLS
   ========================================================= */

function loadSkills() {

    const container =
        document.querySelector(
            "#skills-grid"
        );


    if (!container) {
        return;
    }


    const skills =
        Array.isArray(studentData.skills)
            ? studentData.skills
            : [];


    container.innerHTML =
        skills
            .map((skill) => {

                const level =
                    clampNumber(
                        skill.level,
                        0,
                        100
                    );


                return `
                    <article class="skill-card reveal">

                        <div class="skill-header">

                            <span>
                                ${escapeHTML(
                                    skill.name || "Skill"
                                )}
                            </span>

                            <span>
                                ${level}%
                            </span>

                        </div>


                        <div class="skill-bar">

                            <div
                                class="skill-progress"
                                data-level="${level}"
                                style="width: 0%"
                            ></div>

                        </div>

                    </article>
                `;

            })
            .join("");

}


/* =========================================================
   JOURNEY
   ========================================================= */

function loadJourney() {

    const container =
        document.querySelector(
            "#journey-list"
        );


    if (!container) {
        return;
    }


    const journey =
        Array.isArray(studentData.journey)
            ? studentData.journey
            : [];


    container.innerHTML =
        journey
            .map((item, index) => {

                return `
                    <article class="journey-item reveal">

                        <div class="journey-number">
                            ${String(index + 1).padStart(2, "0")}
                        </div>

                        <div class="journey-content">

                            <span class="journey-year">
                                ${escapeHTML(item.year || "")}
                            </span>

                            <h3>
                                ${escapeHTML(item.title || "")}
                            </h3>

                            <p>
                                ${escapeHTML(
                                    item.description || ""
                                )}
                            </p>

                        </div>

                    </article>
                `;

            })
            .join("");

}


/* =========================================================
   PROJECTS
   ========================================================= */

function loadProjects() {

    const container =
        document.querySelector(
            "#projects-grid"
        );


    if (!container) {
        return;
    }


    const projects =
        Array.isArray(studentData.projects)
            ? studentData.projects
            : [];


    container.innerHTML =
        projects
            .map((project, projectIndex) => {

                const technologies =
                    Array.isArray(
                        project.technologies
                    )
                        ? project.technologies
                        : [];


                return `
                    <article class="project-card reveal" data-project-index="${projectIndex}" data-project-tags="${escapeHTML(technologies.join(" ").toLowerCase())}">

                        <div class="project-media">
                            ${
                                project.image
                                    ? `<img src="${safeURL(project.image)}" alt="${escapeHTML(project.title || "Project preview")}" loading="lazy">`
                                    : `<span>ADD PROJECT SCREENSHOT</span>`
                            }
                        </div>

                        <div class="project-links">
                            <button class="project-detail-trigger" type="button" data-project-index="${projectIndex}">
                                DETAILS →
                            </button>

                            <a
                                href="${safeURL(
                                    project.url
                                )}"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Open ${escapeHTML(
                                    project.title ||
                                    "project"
                                )}"
                            >
                                OPEN PROJECT →
                            </a>


                        </div>

                    </article>
                `;

            })
            .join("");

    initializeProjectEnhancements();

}


/* =========================================================
   CERTIFICATES
   ========================================================= */

function loadCertificates() {

    const container =
        document.querySelector(
            "#certificates-grid"
        );


    if (!container) {
        return;
    }


    const certificates =
        Array.isArray(
            studentData.certificates
        )
            ? studentData.certificates
            : [];


    container.innerHTML =
        certificates
            .map((certificate, certificateIndex) => {

                return `
                    <article class="certificate-card reveal">

                        <div class="certificate-icon">
                            CERT
                        </div>


                        <div class="certificate-content">

                            <h3>
                                ${escapeHTML(
                                    certificate.title || ""
                                )}
                            </h3>


                            <h4>
                                ${escapeHTML(
                                    certificate.organization ||
                                    ""
                                )}
                            </h4>


                            <p>
                                ${escapeHTML(
                                    certificate.description ||
                                    ""
                                )}
                            </p>

                            <button class="certificate-detail-trigger" type="button" data-certificate-index="${certificateIndex}">
                                DETAILS →
                            </button>

                        </div>

                    </article>
                `;

            })
            .join("");

    document.querySelectorAll(".certificate-detail-trigger").forEach((button) => {
        button.addEventListener("click", () => {
            const certificate = certificates[Number(button.dataset.certificateIndex)];
            openDetailModal("CERTIFICATE DETAILS", certificate.title, certificate.description, [
                certificate.organization || "Certificate"
            ]);
        });
    });
}

function initializeProjectEnhancements() {
    const projects = Array.isArray(studentData.projects) ? studentData.projects : [];
    document.querySelectorAll(".project-detail-trigger").forEach((button) => {
        button.addEventListener("click", () => {
            const project = projects[Number(button.dataset.projectIndex)];
            openDetailModal("PROJECT DETAILS", project.title, project.description, project.technologies || []);
        });
    });
}

function openDetailModal(label, title, description, meta) {
    const modal = document.querySelector("#detailModal");
    if (!modal) return;
    document.querySelector("#detailModalLabel").textContent = label;
    document.querySelector("#detailModalTitle").textContent = title || "";
    document.querySelector("#detailModalText").textContent = description || "";
    document.querySelector("#detailModalMeta").innerHTML = (meta || [])
        .map((item) => `<span>${escapeHTML(item)}</span>`)
        .join("");
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

function initializePortfolioEnhancements() {
    const modal = document.querySelector("#detailModal");
    const closeModal = () => {
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    };

    const modalClose =
        document.querySelector("#detailModalClose");

    if (modalClose) {
        modalClose.addEventListener("click", closeModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) closeModal();
        });
    }
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeModal();
    });

    document.querySelectorAll(".filter-button").forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            document.querySelectorAll(".filter-button").forEach((item) => item.classList.toggle("active", item === button));
            document.querySelectorAll(".project-card").forEach((card) => {
                const tags = card.dataset.projectTags || "";
                card.hidden = filter !== "all" && !tags.includes(filter);
            });
        });
    });

    const backToTop = document.querySelector("#backToTop");
    window.addEventListener("scroll", () => {
        if (backToTop) {
            backToTop.classList.toggle("visible", window.scrollY > 500);
        }
    }, { passive: true });
    if (backToTop) {
        backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }

    const copyEmail =
        document.querySelector(".copy-email");

    if (copyEmail) {
        copyEmail.addEventListener("click", async (event) => {
        const button = event.currentTarget;
        try {
            await navigator.clipboard.writeText(button.dataset.email || "");
            button.textContent = "EMAIL COPIED";
            setTimeout(() => { button.textContent = "COPY EMAIL"; }, 1800);
        } catch (error) {
            button.textContent = "COPY unavailable";
        }
        });
    }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetID =
                    link.getAttribute("href");


                if (
                    !targetID ||
                    targetID === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetID
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                try {

                    history.pushState(
                        null,
                        "",
                        targetID
                    );

                } catch (error) {

                    // Ignore history errors

                }

            }
        );

    });

}


function initializeScrollExperience() {

    const progressBar =
        document.querySelector("#scroll-progress-bar");

    const sections =
        document.querySelectorAll("main section[id]");

    const navLinks =
        document.querySelectorAll('.nav-menu a[href^="#"]');

    const updateScrollState = () => {
        const scrollable =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress =
            scrollable > 0
                ? (window.scrollY / scrollable) * 100
                : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }
    };

    window.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();

    if (!sections.length || !navLinks.length || !window.IntersectionObserver) {
        return;
    }

    const sectionObserver =
        new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                navLinks.forEach((link) => {
                    link.classList.toggle(
                        "active",
                        link.getAttribute("href") === `#${entry.target.id}`
                    );
                });
            });
        }, {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        });

    sections.forEach((section) => sectionObserver.observe(section));
}

function initializeThemeToggle() {

    const toggle =
        document.querySelector("#themeToggle");

    if (!toggle) {
        return;
    }

    const savedTheme =
        localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    const updateLabel = () => {
        const light =
            document.body.classList.contains("light-theme");

        toggle.setAttribute(
            "aria-label",
            light
                ? "Switch to dark theme"
                : "Switch to light theme"
        );

    };

    updateLabel();

    toggle.addEventListener("click", () => {
        const light =
            document.body.classList.toggle("light-theme");

        localStorage.setItem(
            "portfolio-theme",
            light ? "light" : "dark"
        );

        updateLabel();
    });
}

function initializeAmbientParticles() {

    const container =
        document.querySelector(".hero-particles");

    if (!container || container.childElementCount) {
        return;
    }

    for (let index = 0; index < 24; index += 1) {
        const particle =
            document.createElement("span");

        particle.style.setProperty("--particle-x", `${(index * 37) % 100}%`);
        particle.style.setProperty("--particle-y", `${(index * 61) % 100}%`);
        particle.style.setProperty("--particle-delay", `${(index % 8) * -.7}s`);
        particle.style.setProperty("--particle-size", `${2 + (index % 3)}px`);
        container.appendChild(particle);
    }
}


/* =========================================================
   LOADER
   ========================================================= */

function initializeLoader() {

    const loader =
        document.querySelector(
            "#loader"
        );


    if (!loader) {
        return;
    }

    const progress =
        loader.querySelector(".loader-progress");

    const percent =
        loader.querySelector(".loader-percent");

    let value = 0;

    const progressTimer =
        setInterval(() => {
            value = Math.min(value + 1, 94);

            if (progress) {
                progress.style.width = `${value}%`;
            }

            if (percent) {
                percent.textContent = `${value}%`;
            }
        }, 45);

    const finishProgress = () => {
        clearInterval(progressTimer);

        if (progress) {
            progress.style.width = "100%";
        }

        if (percent) {
            percent.textContent = "100%";
        }
    };

    window.addEventListener(
        "load",
        () => {
            setTimeout(() => {
                finishProgress();

                loader.classList.add(
                    "loaded"
                );

            }, 2700);

        }
    );


    // Safety fallback

    setTimeout(() => {
        finishProgress();

        loader.classList.add(
            "loaded"
        );

    }, 6000);

}


/* =========================================================
   CONTACT FORM
   ========================================================= */

function initializeContactForm() {
    const form =
        document.querySelector(
            "#contact-form"
        );

    if (!form) {
        return;
    }

    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();

            const formData =
                new FormData(form);

            const name =
                String(
                    formData.get("name") ||
                    ""
                ).trim();

            const email =
                String(
                    formData.get("email") ||
                    ""
                ).trim();

            const subject =
                String(
                    formData.get("subject") ||
                    ""
                ).trim() ||
                "Portfolio contact message";

            const message =
                String(
                    formData.get("message") ||
                    ""
                ).trim();

            if (
                !name ||
                !email ||
                !message
            ) {

                showFormMessage(
                    form,
                    "Please fill in all required fields.",
                    "error"
                );

                return;
            }

            if (!isValidEmail(email)) {
                showFormMessage(
                    form,
                    "Please enter a valid email address.",
                    "error"
                );

                return;
            }

            showFormMessage(
                form,
                "Opening your email app to send this message.",
                "success"
            );

            const recipient =
                form.getAttribute("action").replace(/^mailto:/i, "");
            const body =
                `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailto =
                `mailto:${recipient}?${new URLSearchParams({
                    subject,
                    body
                })}`;

            window.location.href = mailto;
        }
    );
}


/* =========================================================
   FORM MESSAGE
   ========================================================= */

function showFormMessage(
    form,
    message,
    type
) {

    let messageElement =
        form.querySelector(
            ".form-message"
        );


    if (!messageElement) {

        messageElement =
            document.createElement(
                "div"
            );


        messageElement.className =
            "form-message";


        form.appendChild(
            messageElement
        );

    }


    messageElement.textContent =
        message;


    messageElement.dataset.type =
        type;


    setTimeout(() => {

        if (messageElement) {

            messageElement.textContent =
                "";

        }

    }, 5000);

}


/* =========================================================
   EMAIL VALIDATION
   ========================================================= */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
    );

}


/* =========================================================
   FOOTER YEAR
   ========================================================= */

function initializeYear() {

    const yearElement =
        document.querySelector(
            "#year"
        );


    if (!yearElement) {
        return;
    }


    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================================
   REVEAL ANIMATIONS
   ========================================================= */

function initializeRevealAnimations() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    if (!elements.length) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        elements.forEach(
            (element) => {

                element.classList.add(
                    "visible"
                );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    elements.forEach(
        (element) => {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================================
   SKILL ANIMATIONS
   ========================================================= */

function initializeSkillAnimations() {

    const skillSection =
        document.querySelector(
            "#skills"
        );


    const progressBars =
        document.querySelectorAll(
            ".skill-progress"
        );


    if (!progressBars.length) {
        return;
    }


    const animateSkills = () => {

        progressBars.forEach(
            (bar) => {

                const level =
                    clampNumber(
                        parseFloat(
                            bar.getAttribute(
                                "data-level"
                            )
                        ),
                        0,
                        100
                    );


                requestAnimationFrame(
                    () => {

                        bar.style.width =
                            `${level}%`;

                    }
                );

            }
        );

    };


    if (
        !skillSection ||
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        animateSkills();

        return;
    }


    let started = false;


    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting &&
                            !started
                        ) {

                            started = true;


                            animateSkills();


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.2
            }
        );


    observer.observe(
        skillSection
    );

}


/* =========================================================
   COUNTERS
   ========================================================= */

function initializeCounters() {

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    if (!counters.length) {
        return;
    }


    if (
        !(
            "IntersectionObserver"
            in window
        )
    ) {

        counters.forEach(
            (counter) => {

                counter.textContent =
                    formatNumber(
                        Number(
                            counter.dataset.count
                        ) || 0
                    );

            }
        );

        return;
    }


    const observer =
        new IntersectionObserver(
            (
                entries,
                observerInstance
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }


                        animateCounter(
                            entry.target
                        );


                        observerInstance.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        (counter) => {

            observer.observe(
                counter
            );

        }
    );

}


/* =========================================================
   COUNTER ANIMATION
   ========================================================= */

function animateCounter(element) {

    const target =
        Number(
            element.getAttribute(
                "data-count"
            )
        );


    if (!Number.isFinite(target)) {

        element.textContent =
            "0";

        return;
    }


    const duration = 1400;

    const startTime =
        performance.now();


    function updateCounter(
        currentTime
    ) {

        const elapsed =
            currentTime -
            startTime;


        const progress =
            Math.min(
                elapsed /
                    duration,
                1
            );


        const eased =
            1 -
            Math.pow(
                1 - progress,
                3
            );


        const currentValue =
            Math.round(
                target * eased
            );


        element.textContent =
            formatNumber(
                currentValue
            );


        if (progress < 1) {

            requestAnimationFrame(
                updateCounter
            );

        } else {

            element.textContent =
                formatNumber(
                    target
                );

        }

    }


    requestAnimationFrame(
        updateCounter
    );

}


/* =========================================================
   PROJECT TILT EFFECT
   ========================================================= */

function initializeProjectTilt() {

    const cards =
        document.querySelectorAll(
            ".project-card"
        );


    if (!cards.length) {
        return;
    }


    if (
        window.matchMedia &&
        window.matchMedia(
            "(hover: none), (pointer: coarse)"
        ).matches
    ) {

        return;
    }


    cards.forEach((card) => {

        card.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (
                        (y - centerY) /
                        centerY
                    ) * -4;


                const rotateY =
                    (
                        (x - centerX) /
                        centerX
                    ) * 4;


                card.style.transform = `
                    perspective(900px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-4px)
                `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    const stringValue =
        String(
            value ?? ""
        );


    return stringValue
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   SAFE URL
   ========================================================= */

function safeURL(url) {

    if (!url) {
        return "#";
    }


    const value =
        String(url).trim();


    if (
        value === "#" ||
        value.startsWith("/") ||
        value.startsWith("./") ||
        value.startsWith("../") ||
        /^[a-zA-Z0-9_-]+(?:\/[^?#]*)*(?:\?[^#]*)?(?:#.*)?$/.test(value) ||
        value.startsWith("#")
    ) {

        return value;

    }


    try {

        const parsedURL =
            new URL(
                value,
                window.location.href
            );


        const allowedProtocols = [
            "http:",
            "https:"
        ];


        if (
            allowedProtocols.includes(
                parsedURL.protocol
            )
        ) {

            return parsedURL.href;

        }

    } catch (error) {

        console.warn(
            "Invalid URL:",
            value
        );

    }


    return "#";

}


/* =========================================================
   NUMBER HELPERS
   ========================================================= */

function clampNumber(
    value,
    min,
    max
) {

    const number =
        Number(value);


    if (!Number.isFinite(number)) {

        return min;

    }


    return Math.min(
        Math.max(
            number,
            min
        ),
        max
    );

}


function formatNumber(value) {

    return new Intl.NumberFormat(
        "en-IN"
    ).format(value);

}


/* =========================================================
   PROFILE MENU
   =========================================================
   
   IMPORTANT:
   profileTrigger
   profileOverlay
   profileClose
   
   Ye IDs index.html mein hone chahiye.
   ========================================================= */

function initializeProfileMenu() {

    const trigger =
        document.getElementById(
            "profileTrigger"
        );


    const overlay =
        document.getElementById(
            "profileOverlay"
        );


    const close =
        document.getElementById(
            "profileClose"
        );


    /*
     * Agar elements nahi mile to JS crash nahi karega.
     */

    if (
        !trigger ||
        !overlay ||
        !close
    ) {

        console.warn(
            "Profile menu elements nahi mile."
        );

        return;
    }


    /* =====================================================
       OPEN PROFILE
       ===================================================== */

    trigger.addEventListener(
        "click",
        (event) => {

            event.preventDefault();


            overlay.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }
    );


    /* =====================================================
       CLOSE BUTTON
       ===================================================== */

    close.addEventListener(
        "click",
        () => {

            closeProfileMenu();

        }
    );


    /* =====================================================
       CLICK OUTSIDE PANEL
       ===================================================== */

    overlay.addEventListener(
        "click",
        (event) => {

            if (
                event.target === overlay
            ) {

                closeProfileMenu();

            }

        }
    );


    /* =====================================================
       PROFILE NAVIGATION
       ===================================================== */

    const profileLinks =
        overlay.querySelectorAll(
            ".profile-navigation a"
        );


    profileLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                () => {

                    closeProfileMenu();

                }
            );

        }
    );


    /* =====================================================
       ESC KEY
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                closeProfileMenu();

            }

        }
    );


    /* =====================================================
       CLOSE FUNCTION
       ===================================================== */

    function closeProfileMenu() {

        overlay.classList.remove(
            "active"
        );


        document.body.style.overflow =
            "";

    }

}