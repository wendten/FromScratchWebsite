// ============================================================
// TOPBAR SCROLL EFFECT - START
// ============================================================

(() => {
    const topbar = document.querySelector(".topbar");

    function updateTopbarScrollState() {
        if (!topbar) return;

        topbar.classList.toggle("scrolled", window.scrollY > 50);
    }

    window.addEventListener("scroll", updateTopbarScrollState);
    window.addEventListener("load", updateTopbarScrollState);

    updateTopbarScrollState();
})();

// ============================================================
// TOPBAR SCROLL EFFECT - END
// ============================================================




// ============================================================
// MUSIC - START
// ============================================================

(() => {

    const music = document.getElementById("bgMusic");

    if (!music) return;

    music.volume = 0.35;

    const tryPlay = () => {
        music.play().catch(() => { });
    };

    tryPlay();

    document.addEventListener("click", tryPlay, { once: true });
    document.addEventListener("keydown", tryPlay, { once: true });

})();

// ============================================================
// MUSIC - END
// ============================================================




// ============================================================
// LOGO DOCK ON SCROLL - START
// ============================================================

(() => {
    function updateLogoDock() {
        if (window.scrollY > 80) {
            document.body.classList.add("logo-docked");
        } else {
            document.body.classList.remove("logo-docked");
        }
    }

    window.addEventListener("scroll", updateLogoDock);
    window.addEventListener("load", updateLogoDock);

    updateLogoDock();
})();

// ============================================================
// LOGO DOCK ON SCROLL - END
// ============================================================





// ============================================================
// TRAILER MODAL - START
// ============================================================

(() => {
    const trailerBtn = document.getElementById("watchTrailer");
    const modal = document.getElementById("trailerModal");
    const closeModal = document.getElementById("closeTrailer");

    if (trailerBtn && modal) {
        trailerBtn.addEventListener("click", () => {
            if (!modal.open) {
                modal.showModal();
            }
        });
    }

    if (closeModal && modal) {
        closeModal.addEventListener("click", () => {
            modal.close();
        });
    }

    if (modal) {
        modal.addEventListener("click", event => {
            if (event.target === modal) {
                modal.close();
            }
        });
    }
})();

// ============================================================
// TRAILER MODAL - END
// ============================================================





// ============================================================
// MOBILE MENU - START
// ============================================================

(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    if (!menuToggle || !mobileMenu) return;

    menuToggle.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");

        const isOpen = mobileMenu.classList.contains("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
    });
})();

// ============================================================
// MOBILE MENU - END
// ============================================================


// ============================================================
// HERO BACKGROUND ROTATION - START
// ============================================================

(() => {
    const slides = [...document.querySelectorAll(".hero-bg-slide")];

    if (slides.length <= 1) return;

    let currentIndex = slides.findIndex(slide => slide.classList.contains("active"));

    if (currentIndex === -1) {
        currentIndex = 0;
    }

    function restartSlideZoom(slide) {
        slide.classList.remove("active");
        slide.classList.remove("leaving");

        // Force browser to register the reset state.
        void slide.offsetHeight;

        slide.classList.add("active");
    }

    function showNextHeroBackground() {
        const oldSlide = slides[currentIndex];

        oldSlide.classList.remove("active");
        oldSlide.classList.add("leaving");

        currentIndex = (currentIndex + 1) % slides.length;

        const newSlide = slides[currentIndex];

        restartSlideZoom(newSlide);

        setTimeout(() => {
            oldSlide.classList.remove("leaving");
        }, 1400);
    }

    // Important: wait until after first paint, then restart the first slide.
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            restartSlideZoom(slides[currentIndex]);
        });
    });

    setInterval(showNextHeroBackground, 6500);
})();

// ============================================================
// HERO BACKGROUND ROTATION - END
// ============================================================


// ============================================================
// ROADMAP INTERACTIONS - START
// ============================================================

(() => {
    const roadmapFilters = document.querySelectorAll(".roadmap-filter");
    const roadmapCards = document.querySelectorAll(".roadmap-card");
    const roadmapSteps = document.querySelectorAll(".roadmap-step");

    function openRoadmapCard(card) {
        roadmapCards.forEach(item => item.classList.remove("open"));
        card.classList.add("open");
    }

    roadmapFilters.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.roadmapFilter;

            roadmapFilters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            roadmapCards.forEach(card => {
                const matches = filter === "all" || card.dataset.status === filter;
                card.classList.toggle("hidden", !matches);
            });
        });
    });

    roadmapCards.forEach(card => {
        const head = card.querySelector(".roadmap-card-head");

        if (!head) return;

        head.addEventListener("click", () => {
            card.classList.toggle("open");
        });
    });

    roadmapSteps.forEach(step => {
        step.addEventListener("click", () => {
            const target = document.getElementById(step.dataset.target);

            if (!target) return;

            roadmapFilters.forEach(item => item.classList.remove("active"));
            document.querySelector('[data-roadmap-filter="all"]')?.classList.add("active");

            roadmapCards.forEach(card => card.classList.remove("hidden"));

            openRoadmapCard(target);

            target.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        });
    });
})();

// ============================================================
// ROADMAP INTERACTIONS - END
// ============================================================




// ============================================================
// SYSTEM MODAL - START
// ============================================================

(() => {
    const systemModal = document.getElementById("systemModal");
    const closeSystemModal = document.getElementById("closeSystemModal");

    const systemModalImage = document.getElementById("systemModalImage");
    const systemModalTitle = document.getElementById("systemModalTitle");
    const systemModalBody = document.getElementById("systemModalBody");
    const systemModalTags = document.getElementById("systemModalTags");

    const systemPrev = document.getElementById("systemPrev");
    const systemNext = document.getElementById("systemNext");

    const systemCards = [...document.querySelectorAll(".system-card")];

    let currentSystemIndex = 0;

    function renderSystemModal(index) {
        if (!systemCards.length) return;

        currentSystemIndex = (index + systemCards.length) % systemCards.length;

        const card = systemCards[currentSystemIndex];

        if (!card) return;

        if (systemModalImage) {
            systemModalImage.src = card.dataset.systemImage || "";
        }

        if (systemModalTitle) {
            systemModalTitle.textContent = card.dataset.systemTitle || "";
        }

        if (systemModalBody) {
            const systemId = card.dataset.systemId;
            const template = document.getElementById(`systemTemplate-${systemId}`);

            systemModalBody.innerHTML = "";

            if (template) {
                systemModalBody.appendChild(template.content.cloneNode(true));
            } else {
                systemModalBody.textContent = "No description yet.";
            }
        }

        if (systemModalTags) {
            systemModalTags.innerHTML = "";

            const tags = (card.dataset.systemTags || "")
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean);

            tags.forEach(tag => {
                const span = document.createElement("span");
                span.textContent = tag;
                systemModalTags.appendChild(span);
            });
        }

        const modalCard = systemModal?.querySelector(".system-modal-card");

        if (modalCard) {
            modalCard.scrollTop = 0;
        }
    }

    function openSystemModal(index) {
        if (!systemModal) return;

        renderSystemModal(index);

        if (!systemModal.open) {
            systemModal.showModal();
        }
    }

    function closeSystemModalWindow() {
        if (!systemModal) return;

        if (systemModal.open) {
            systemModal.close();
        }
    }

    function previousSystem(event) {
        event.preventDefault();
        event.stopPropagation();

        renderSystemModal(currentSystemIndex - 1);
    }

    function nextSystem(event) {
        event.preventDefault();
        event.stopPropagation();

        renderSystemModal(currentSystemIndex + 1);
    }

    systemCards.forEach((card, index) => {
        card.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            openSystemModal(index);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.stopPropagation();

                openSystemModal(index);
            }
        });
    });

    systemPrev?.addEventListener("click", previousSystem);
    systemNext?.addEventListener("click", nextSystem);

    closeSystemModal?.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();

        closeSystemModalWindow();
    });

    systemModal?.addEventListener("click", event => {
        const clickedModalCard = event.target.closest(".system-modal-card");
        const clickedButton = event.target.closest("button");

        if (!clickedModalCard && !clickedButton) {
            closeSystemModalWindow();
        }
    });

    document.addEventListener("keydown", event => {
        if (!systemModal?.open) return;

        if (event.key === "ArrowLeft") {
            previousSystem(event);
        }

        if (event.key === "ArrowRight") {
            nextSystem(event);
        }
    });
})();

// ============================================================
// SYSTEM MODAL - END
// ============================================================


// ============================================================
// MEDIA SECTION - START
// ============================================================

(() => {
    const mediaFilters = document.querySelectorAll(".media-filter");
    const mediaTiles = document.querySelectorAll(".media-tile");

    const mediaFeatureImage = document.getElementById("mediaFeatureImage");
    const mediaFeatureTitle = document.getElementById("mediaFeatureTitle");
    const mediaFeatureText = document.getElementById("mediaFeatureText");
    const mediaFeatureCategory = document.getElementById("mediaFeatureCategory");

    const mediaViewer = document.getElementById("mediaViewer");
    const mediaViewerImage = document.getElementById("mediaViewerImage");
    const closeMediaViewer = document.getElementById("closeMediaViewer");

    const mediaPrev = document.querySelector(".media-prev");
    const mediaNext = document.querySelector(".media-next");

    let activeMediaImage = "";

    function getVisibleMediaTiles() {
        return [...mediaTiles].filter(tile => !tile.classList.contains("hidden"));
    }

    function getActiveMediaIndex() {
        const visibleTiles = getVisibleMediaTiles();

        return visibleTiles.findIndex(tile => tile.classList.contains("active"));
    }

    function selectMediaTile(tile) {
        if (!tile) return;

        mediaTiles.forEach(item => item.classList.remove("active"));
        tile.classList.add("active");

        activeMediaImage = tile.dataset.image || "";

        if (mediaFeatureImage) {
            mediaFeatureImage.style.opacity = "0";

            setTimeout(() => {
                mediaFeatureImage.src = tile.dataset.image || "";
                mediaFeatureImage.style.opacity = "1";
            }, 160);
        }

        if (mediaFeatureTitle) {
            mediaFeatureTitle.textContent = tile.dataset.title || "";
        }

        if (mediaFeatureText) {
            mediaFeatureText.textContent = tile.dataset.text || "";
        }

        if (mediaFeatureCategory) {
            mediaFeatureCategory.textContent = tile.dataset.label || "";
        }
    }

    function stepMedia(direction) {
        const visibleTiles = getVisibleMediaTiles();

        if (!visibleTiles.length) return;

        let index = getActiveMediaIndex();

        if (index === -1) {
            index = 0;
        } else {
            index = (index + direction + visibleTiles.length) % visibleTiles.length;
        }

        selectMediaTile(visibleTiles[index]);
    }

    function openMediaModal() {
        if (!mediaViewer || !mediaViewerImage || !activeMediaImage) return;

        mediaViewerImage.src = activeMediaImage;

        if (!mediaViewer.open) {
            mediaViewer.showModal();
        }
    }

    mediaTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            selectMediaTile(tile);
        });
    });

    mediaFilters.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.mediaFilter;

            mediaFilters.forEach(item => item.classList.remove("active"));
            button.classList.add("active");

            mediaTiles.forEach(tile => {
                const matches = filter === "all" || tile.dataset.category === filter;
                tile.classList.toggle("hidden", !matches);
            });

            const firstVisibleTile = getVisibleMediaTiles()[0];
            selectMediaTile(firstVisibleTile);
        });
    });

    if (mediaPrev) {
        mediaPrev.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            stepMedia(-1);
        });
    }

    if (mediaNext) {
        mediaNext.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            stepMedia(1);
        });
    }

    if (mediaFeatureImage) {
        mediaFeatureImage.addEventListener("click", () => {
            openMediaModal();
        });

        mediaFeatureImage.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openMediaModal();
            }
        });
    }

    if (closeMediaViewer && mediaViewer) {
        closeMediaViewer.addEventListener("click", () => {
            mediaViewer.close();
        });
    }

    if (mediaViewer) {
        mediaViewer.addEventListener("click", event => {
            if (event.target === mediaViewer) {
                mediaViewer.close();
            }
        });
    }

    const initialMediaTile =
        document.querySelector(".media-tile.active") ||
        document.querySelector(".media-tile");

    selectMediaTile(initialMediaTile);
})();

// ============================================================
// MEDIA SECTION - END
// ============================================================





// ============================================================
// ACTIVE NAV ON CLICK + SCROLL - START
// ============================================================

(() => {
    const navLinks = document.querySelectorAll(".nav a, .mobile-menu a");
    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.getElementById("mobile-menu");

    const sections = [...navLinks]
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    function setActiveNav(id) {
        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    }

    function updateActiveNavOnScroll() {
        const scrollPosition = window.scrollY + 140;

        let currentSection = sections[0];

        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });

        if (currentSection) {
            setActiveNav(currentSection.id);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").replace("#", "");

            setActiveNav(id);

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
                menuToggle?.setAttribute("aria-expanded", "false");
            }
        });
    });

    window.addEventListener("scroll", updateActiveNavOnScroll);
    window.addEventListener("load", updateActiveNavOnScroll);

    updateActiveNavOnScroll();
})();

// ============================================================
// ACTIVE NAV ON CLICK + SCROLL - END
// ============================================================





// ============================================================
// NEWS MODAL - START
// ============================================================

(() => {
    const newsModal = document.getElementById("newsModal");
    const closeNewsModal = document.getElementById("closeNewsModal");

    const newsModalImage = document.getElementById("newsModalImage");
    const newsModalDate = document.getElementById("newsModalDate");
    const newsModalTitle = document.getElementById("newsModalTitle");
    const newsModalBody = document.getElementById("newsModalBody");

    const newsPrev = document.getElementById("newsPrev");
    const newsNext = document.getElementById("newsNext");

    const newsCards = [...document.querySelectorAll(".news-card")];

    let currentNewsIndex = 0;

    function renderNewsModal(index) {
        if (!newsCards.length) return;

        currentNewsIndex = (index + newsCards.length) % newsCards.length;

        const card = newsCards[currentNewsIndex];

        if (!card) return;

        if (newsModalImage) {
            newsModalImage.src = card.dataset.newsImage || "";
        }

        if (newsModalDate) {
            newsModalDate.textContent = card.dataset.newsDate || "";
        }

        if (newsModalTitle) {
            newsModalTitle.textContent = card.dataset.newsTitle || "";
        }

        if (newsModalBody) {
            newsModalBody.textContent = card.dataset.newsBody || "";
        }

        const modalCard = newsModal?.querySelector(".news-modal-card");

        if (modalCard) {
            modalCard.scrollTop = 0;
        }
    }

    function openNewsModal(index) {
        if (!newsModal) return;

        renderNewsModal(index);

        if (!newsModal.open) {
            newsModal.showModal();
        }
    }

    function previousNews(event) {
        event.preventDefault();
        event.stopPropagation();

        renderNewsModal(currentNewsIndex - 1);
    }

    function nextNews(event) {
        event.preventDefault();
        event.stopPropagation();

        renderNewsModal(currentNewsIndex + 1);
    }

    newsCards.forEach((card, index) => {
        card.addEventListener("click", () => {
            openNewsModal(index);
        });

        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openNewsModal(index);
            }
        });
    });

    if (newsPrev) {
        newsPrev.addEventListener("click", previousNews);
    }

    if (newsNext) {
        newsNext.addEventListener("click", nextNews);
    }

    if (closeNewsModal && newsModal) {
        closeNewsModal.addEventListener("click", event => {
            event.preventDefault();
            event.stopPropagation();

            newsModal.close();
        });
    }

    if (newsModal) {
        newsModal.addEventListener("click", event => {
            const clickedModalContent = event.target.closest(".news-modal-card");
            const clickedButton = event.target.closest("button");

            if (!clickedModalContent && !clickedButton) {
                newsModal.close();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (!newsModal?.open) return;

        if (event.key === "ArrowLeft") {
            previousNews(event);
        }

        if (event.key === "ArrowRight") {
            nextNews(event);
        }
    });
})();

// ============================================================
// NEWS MODAL - END
// ============================================================





// ============================================================
// LOAD MORE NEWS - START
// ============================================================

(() => {
    const loadMoreNews = document.getElementById("loadMoreNews");

    if (!loadMoreNews) return;

    function updateLoadMoreVisibility() {
        const hiddenNews = document.querySelectorAll(".news-card.news-hidden");

        if (hiddenNews.length === 0) {
            loadMoreNews.style.display = "none";
        }
    }

    loadMoreNews.addEventListener("click", () => {
        const hiddenNews = document.querySelectorAll(".news-card.news-hidden");

        hiddenNews.forEach((card, index) => {
            if (index < 6) {
                card.classList.remove("news-hidden");
            }
        });

        updateLoadMoreVisibility();
    });

    updateLoadMoreVisibility();
})();

// ============================================================
// LOAD MORE NEWS - END
// ============================================================


// ============================================================
// ABOUT GAME - START
// ============================================================

const aboutRevealItems = document.querySelectorAll("[data-about-reveal]");

if (aboutRevealItems.length > 0) {
    const aboutRevealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                aboutRevealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.18
    });

    aboutRevealItems.forEach(item => aboutRevealObserver.observe(item));
}

document.querySelectorAll(".about-feature-card").forEach(card => {
    card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;

        card.style.setProperty("--mouse-x", `${x}%`);
        card.style.setProperty("--mouse-y", `${y}%`);
    });
});

// ============================================================
// ABOUT GAME - END
// ============================================================