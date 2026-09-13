/**
 * AMMAR SHAMS — DATA ANALYST PORTFOLIO
 * Main JavaScript Application Script
 * Dark Emerald Theme Architecture
 */

// Centralized Project Configuration Data
const PROJECTS_DATA = [
    {
        id: "atlas-lab",
        title: "Atlas Lab — HR Analytics & Attrition Dashboard",
        category: "HR ANALYTICS / POWER BI",
        imageCount: 4,
        images: [
            {
                url: "assets/images/projects/atlas-lab-overview.jpg",
                caption: "Overview Dashboard — Headcount, Attrition Rate & Tenure Metrics"
            },
            {
                url: "assets/images/projects/atlas-lab-demographics.jpg",
                caption: "Demographics Analysis — Age Band, Gender & Education Breakdown"
            },
            {
                url: "assets/images/projects/atlas-lab-performance.jpg",
                caption: "Performance Tracker — Job & Environment Satisfaction vs Overtime"
            },
            {
                url: "assets/images/projects/atlas-lab-attrition.jpg",
                caption: "Attrition Drivers — Monthly Income Delta & Commute Distance Signal"
            }
        ]
    },
    {
        id: "customer-churn-powerbi",
        title: "Customer Churn Analysis Dashboard — Power BI",
        category: "CUSTOMER ANALYTICS / POWER BI",
        imageCount: 1,
        images: [
            {
                url: "assets/images/projects/customer-churn-powerbi.jpg",
                caption: "Power BI Customer Churn Dashboard — 6,687 Customers & 26.86% Churn Benchmark"
            }
        ]
    },
    {
        id: "customer-churn-excel",
        title: "Customer Churn Analysis Dashboard — Excel",
        category: "EXCEL / DATA ANALYSIS",
        imageCount: 1,
        images: [
            {
                url: "assets/images/projects/customer-churn-excel.jpg",
                caption: "Excel Customer Churn Dashboard — Power Query, Pivot Tables & Slicers"
            }
        ]
    },
    {
        id: "superstore-sales",
        title: "Superstore Sales Analytics Dashboard",
        category: "SALES ANALYTICS / EXCEL",
        imageCount: 1,
        images: [
            {
                url: "assets/images/projects/superstore-sales.jpg",
                caption: "Superstore Sales Analytics — 2019 Dataset, Profit Margins & Regional Slicers"
            }
        ]
    },
    {
        id: "sales-dashboard",
        title: "Sales Performance Dashboard",
        category: "SALES ANALYTICS / DATA VISUALIZATION",
        imageCount: 1,
        images: [
            {
                url: "assets/images/projects/sales-dashboard.jpg",
                caption: "Sales Dashboard — Regional Trends, Sales Rep Matrix & Shipping Mode Breakdown"
            }
        ]
    }
];

// State for active lightbox
let currentLightboxProject = null;
let currentLightboxIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initAtlasLabGallery();
    initLightbox();
    initScrollObserver();
    initHeroCounterAnimation();
});

/**
 * Navigation Bar Scroll & Mobile Menu Logic
 */
function initNavigation() {
    const navbar = document.querySelector(".nav-container");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const navLinks = document.querySelector(".nav-links-wrapper");
    const navItemLinks = document.querySelectorAll(".nav-link");

    // Sticky shadow & compacting on scroll
    window.addEventListener("scroll", () => {
        const header = document.getElementById("nav-header");
        if (window.scrollY > 40) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Mobile Toggle
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.contains("active");
            if (isOpen) {
                navLinks.classList.remove("active");
                mobileToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            } else {
                navLinks.classList.add("active");
                mobileToggle.setAttribute("aria-expanded", "true");
                document.body.style.overflow = "hidden";
            }
        });

        // Close menu when clicking link
        navItemLinks.forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                mobileToggle.setAttribute("aria-expanded", "false");
                document.body.style.overflow = "";
            });
        });
    }
}

/**
 * Atlas Lab 4-Image Tab Switcher
 */
function initAtlasLabGallery() {
    const atlasLabProject = PROJECTS_DATA.find(p => p.id === "atlas-lab");
    if (!atlasLabProject) return;

    const mainImage = document.getElementById("atlas-main-img");
    const captionEl = document.getElementById("atlas-img-caption");
    const tabs = document.querySelectorAll(".atlas-thumb-btn");

    if (!mainImage || !tabs.length) return;

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("active"));
            tab.classList.add("active");

            const imgData = atlasLabProject.images[index];
            if (imgData) {
                mainImage.src = imgData.url;
                mainImage.alt = imgData.caption;
                mainImage.dataset.index = index;
                if (captionEl) {
                    captionEl.textContent = imgData.caption;
                }
            }
        });
    });
}

/**
 * Global Fullscreen Lightbox Modal
 */
function initLightbox() {
    const modal = document.getElementById("lightbox-modal");
    const modalImg = document.getElementById("lightbox-img");
    const modalCaption = document.getElementById("lightbox-caption");
    const modalCounter = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lightbox-close");
    const prevBtn = document.getElementById("lightbox-prev");
    const nextBtn = document.getElementById("lightbox-next");

    if (!modal || !modalImg) return;

    // Attach click triggers to all project images
    document.querySelectorAll(".lightbox-trigger").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            const projectId = trigger.dataset.project;
            const index = parseInt(trigger.dataset.index || "0", 10);
            openLightbox(projectId, index);
        });
    });

    function openLightbox(projectId, index) {
        const proj = PROJECTS_DATA.find(p => p.id === projectId);
        if (!proj) return;

        currentLightboxProject = proj;
        currentLightboxIndex = index;

        updateLightboxContent();
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
        currentLightboxProject = null;
    }

    function updateLightboxContent() {
        if (!currentLightboxProject) return;

        const imgData = currentLightboxProject.images[currentLightboxIndex];
        const total = currentLightboxProject.images.length;

        modalImg.src = imgData.url;
        modalImg.alt = imgData.caption;
        if (modalCaption) modalCaption.textContent = imgData.caption;
        if (modalCounter) modalCounter.textContent = `${currentLightboxIndex + 1} / ${total}`;

        if (total > 1) {
            if (prevBtn) prevBtn.style.display = "flex";
            if (nextBtn) nextBtn.style.display = "flex";
        } else {
            if (prevBtn) prevBtn.style.display = "none";
            if (nextBtn) nextBtn.style.display = "none";
        }
    }

    function nextImage() {
        if (!currentLightboxProject) return;
        currentLightboxIndex = (currentLightboxIndex + 1) % currentLightboxProject.images.length;
        updateLightboxContent();
    }

    function prevImage() {
        if (!currentLightboxProject) return;
        currentLightboxIndex = (currentLightboxIndex - 1 + currentLightboxProject.images.length) % currentLightboxProject.images.length;
        updateLightboxContent();
    }

    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    if (nextBtn) nextBtn.addEventListener("click", nextImage);
    if (prevBtn) prevBtn.addEventListener("click", prevImage);

    // Overlay click to close
    modal.addEventListener("click", (e) => {
        if (e.target === modal || e.target.classList.contains("lightbox-backdrop")) {
            closeLightbox();
        }
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("active")) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") nextImage();
        if (e.key === "ArrowLeft") prevImage();
    });
}

/**
 * Scroll Reveal Intersection Observer
 */
function initScrollObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".reveal-on-scroll").forEach(el => {
        observer.observe(el);
    });
}

/**
 * Hero Metric Animated Counter
 */
function initHeroCounterAnimation() {
    const counters = document.querySelectorAll(".metric-number");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endVal = parseFloat(target.dataset.target);
                const isPercent = target.dataset.isPercent === "true";
                const duration = 1600;
                const startTime = performance.now();

                function updateCount(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easeProgress = 1 - (1 - progress) * (1 - progress);
                    const currentVal = endVal * easeProgress;

                    if (isPercent) {
                        target.textContent = currentVal.toFixed(2) + "%";
                    } else {
                        target.textContent = Math.floor(currentVal).toLocaleString("en-US");
                    }

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        if (isPercent) {
                            target.textContent = endVal.toFixed(2) + "%";
                        } else {
                            target.textContent = endVal.toLocaleString("en-US");
                        }
                    }
                }

                requestAnimationFrame(updateCount);
                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
}
