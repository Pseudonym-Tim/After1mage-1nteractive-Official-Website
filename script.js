const studioConfig =
{
    studioEmail: "after1mage1nteractive@gmail.com",
    steamSoulstreamUrl: "https://store.steampowered.com/app/4373550/SoulStream_Saga_Chapter_1/"
};

function setupYear()
{
    const yearElement = document.getElementById("year");

    if (!yearElement)
    {
        return;
    }

    yearElement.textContent = String(new Date().getFullYear());
}

function setupMobileNavigation()
{
    const toggle = document.querySelector(".nav-toggle");
    const nav = document.getElementById("site-nav");

    if (!toggle || !nav)
    {
        return;
    }

    toggle.addEventListener("click", function ()
    {
        const isOpen = nav.classList.toggle("is-open");
        toggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach(function (link)
    {
        link.addEventListener("click", function ()
        {
            nav.classList.remove("is-open");
            toggle.setAttribute("aria-expanded", "false");
        });
    });
}

function setupConfigValues()
{
    const emailLink = document.getElementById("studioEmailLink");
    const heroWishlistButton = document.getElementById("steamWishlistHero");

    if (emailLink)
    {
        emailLink.href = `mailto:${studioConfig.studioEmail}`;
        emailLink.textContent = studioConfig.studioEmail;
    }

    if (heroWishlistButton)
    {
        heroWishlistButton.href = studioConfig.steamSoulstreamUrl;
    }
}

function setupRevealAnimations()
{
    const revealElements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window))
    {
        revealElements.forEach(function (element)
        {
            element.classList.add("is-visible");
        });

        return;
    }

    const observer = new IntersectionObserver(
        function (entries, revealObserver)
        {
            entries.forEach(function (entry)
            {
                if (!entry.isIntersecting)
                {
                    return;
                }

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        },
        {
            threshold: 0.15
        }
    );

    revealElements.forEach(function (element)
    {
        observer.observe(element);
    });
}

function setupContactForm()
{
    const form = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");

    if (!form || !formNote)
    {
        return;
    }

    form.addEventListener("submit", function (event)
    {
        event.preventDefault();

        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const messageInput = document.getElementById("message");

        if (!nameInput || !emailInput || !messageInput)
        {
            return;
        }

        const subject = encodeURIComponent(`Studio Inquiry from ${nameInput.value.trim()}`);
        const body = encodeURIComponent(
`${nameInput.value.trim()}\n${emailInput.value.trim()}\n\n${messageInput.value.trim()}`
        );

        //formNote.textContent = "Opening your email app...";
        window.location.href = `mailto:${studioConfig.studioEmail}?subject=${subject}&body=${body}`;
    });
}

function setupProjectLightbox()
{
    const lightbox = document.getElementById("projectLightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxClose = document.getElementById("lightboxClose");
    const lightboxTitle = document.getElementById("lightboxTitle");
    const galleryButtons = document.querySelectorAll(".gallery-thumb");
    let previousFocusedElement = null;

    if (!lightbox || !lightboxImage || !lightboxClose || !lightboxTitle || galleryButtons.length === 0)
    {
        return;
    }

    function openLightbox(button)
    {
        const imageSource = button.getAttribute("data-lightbox-image");
        const imageAlt = button.getAttribute("data-lightbox-alt") || "Project image preview";

        if (!imageSource)
        {
            return;
        }

        previousFocusedElement = button;
        lightboxImage.src = imageSource;
        lightboxImage.alt = imageAlt;
        lightboxTitle.textContent = imageAlt;
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("body--lightbox-open");
        window.requestAnimationFrame(function ()
        {
            lightboxClose.focus();
        });
    }

    function closeLightbox()
    {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("body--lightbox-open");

        window.setTimeout(function ()
        {
            if (lightbox.classList.contains("is-open"))
            {
                return;
            }

            lightboxImage.src = "";
            lightboxImage.alt = "";
        }, 260);

        if (previousFocusedElement instanceof HTMLElement)
        {
            previousFocusedElement.focus();
        }
    }

    galleryButtons.forEach(function (button)
    {
        button.addEventListener("click", function ()
        {
            openLightbox(button);
        });
    });

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.querySelectorAll("[data-lightbox-close]").forEach(function (element)
    {
        element.addEventListener("click", closeLightbox);
    });

    document.addEventListener("keydown", function (event)
    {
        if (event.key === "Escape" && lightbox.classList.contains("is-open"))
        {
            closeLightbox();
        }
    });
}

function init()
{
    setupYear();
    setupMobileNavigation();
    setupConfigValues();
    setupRevealAnimations();
    setupContactForm();
    setupProjectLightbox();
}

document.addEventListener("DOMContentLoaded", init);

document.querySelectorAll('a[href^="#"]').forEach(function (anchor)
{
    anchor.addEventListener('click', function (event)
    {
        event.preventDefault();

        const targetId = anchor.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if(targetElement)
        {
            targetElement.scrollIntoView(
            {
                behavior: 'smooth'
            });
        }
    });
});