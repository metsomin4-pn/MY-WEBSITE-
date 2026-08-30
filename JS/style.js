/* ==========================================
   PERSONAL PORTFOLIO JAVASCRIPT
========================================== */


/* ==========================================
   MOBILE MENU
========================================== */

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {

    navMenu.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("open")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }

});


/* Close menu after clicking link */

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ==========================================
   ACTIVE NAVIGATION
========================================== */

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + current
        ) {
            link.classList.add("active");
        }

    });

});


/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeBtn = document.getElementById("themeBtn");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
    themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-theme");

    const isLight =
        document.body.classList.contains("light-theme");

    if (isLight) {

        localStorage.setItem(
            "portfolio-theme",
            "light"
        );

        themeBtn.innerHTML =
            '<i class="fas fa-sun"></i>';

    } else {

        localStorage.setItem(
            "portfolio-theme",
            "dark"
        );

        themeBtn.innerHTML =
            '<i class="fas fa-moon"></i>';

    }

});


/* ==========================================
   SCROLL REVEAL
========================================== */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );

revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ==========================================
   BACK TO TOP
========================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 600) {

        topBtn.classList.add("show");

    } else {

        topBtn.classList.remove("show");

    }

});

topBtn.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* ==========================================
   FALLING BLING-BLING SPARKLES
========================================== */

const canvas =
    document.getElementById("sparkleCanvas");

const ctx = canvas.getContext("2d");

let sparkles = [];

let sparkleEnabled = true;

let animationFrame;


/* Canvas size */

function resizeCanvas() {

    canvas.width = window.innerWidth *
        window.devicePixelRatio;

    canvas.height = window.innerHeight *
        window.devicePixelRatio;

    canvas.style.width =
        window.innerWidth + "px";

    canvas.style.height =
        window.innerHeight + "px";

    ctx.scale(
        window.devicePixelRatio,
        window.devicePixelRatio
    );
}

resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* Sparkle characters */

const sparkleCharacters = [
    "✦",
    "✧",
    "✶",
    "✷",
    "✹",
    "⋆",
    "✨"
];


/* Create sparkle */

function createSparkle() {

    return {

        x: Math.random() *
            window.innerWidth,

        y: -30,

        size:
            Math.random() * 12 + 6,

        speed:
            Math.random() * 1.5 + 0.5,

        drift:
            Math.random() * 0.6 - 0.3,

        rotation:
            Math.random() * Math.PI * 2,

        rotationSpeed:
            Math.random() * 0.03 - 0.015,

        opacity:
            Math.random() * 0.7 + 0.3,

        character:
            sparkleCharacters[
                Math.floor(
                    Math.random() *
                    sparkleCharacters.length
                )
            ],

        twinkle:
            Math.random() * 0.05 + 0.01

    };

}


/* Add initial sparkles */

for (let i = 0; i < 55; i++) {

    const sparkle = createSparkle();

    sparkle.y =
        Math.random() *
        window.innerHeight;

    sparkles.push(sparkle);

}


/* Draw sparkle */

function drawSparkle(sparkle) {

    ctx.save();

    ctx.translate(
        sparkle.x,
        sparkle.y
    );

    ctx.rotate(
        sparkle.rotation
    );

    const twinkle =
        0.5 +
        Math.sin(
            Date.now() *
            sparkle.twinkle
        ) *
        0.5;

    ctx.globalAlpha =
        sparkle.opacity *
        twinkle;

    ctx.font =
        `${sparkle.size}px Arial`;

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    /*
        Use white/gold/purple-like
        sparkle highlights.
    */

    ctx.shadowBlur = 15;

    ctx.shadowColor =
        "rgba(255,255,255,0.9)";

    ctx.fillStyle = "#ffffff";

    ctx.fillText(
        sparkle.character,
        0,
        0
    );

    ctx.restore();

}


/* Animate sparkles */

function animateSparkles() {

    if (!sparkleEnabled) {

        ctx.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

        return;

    }

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    sparkles.forEach(sparkle => {

        sparkle.y += sparkle.speed;

        sparkle.x += sparkle.drift;

        sparkle.rotation +=
            sparkle.rotationSpeed;

        drawSparkle(sparkle);


        /* Reset after bottom */

        if (
            sparkle.y >
            window.innerHeight + 40
        ) {

            Object.assign(
                sparkle,
                createSparkle()
            );

        }

    });


    animationFrame =
        requestAnimationFrame(
            animateSparkles
        );
}

animateSparkles();


/* ==========================================
   SPARKLE ON / OFF
========================================== */

const sparkleBtn =
    document.getElementById("sparkleBtn");

sparkleBtn.addEventListener(
    "click",
    () => {

        sparkleEnabled =
            !sparkleEnabled;

        if (sparkleEnabled) {

            sparkleBtn.textContent = "✨";

            animateSparkles();

        } else {

            sparkleBtn.textContent = "⭐";

            cancelAnimationFrame(
                animationFrame
            );

            ctx.clearRect(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );

        }

    }
);


/* ==========================================
   CODE PREVIEW
========================================== */

const codeDisplay =
    document.getElementById(
        "codeDisplay"
    );

const codeTabs =
    document.querySelectorAll(
        ".code-tab"
    );

const codeExamples = {

    html: `<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
</head>
<body>

    <section class="hero">
        <h1>Hello, I'm YOUR NAME</h1>
        <p>Full-Stack Developer</p>
        <a href="#projects">
            View My Projects
        </a>
    </section>

</body>
</html>`,

    css: `body {
    background: #070712;
    color: white;
    font-family: Arial, sans-serif;
}

.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn {
    padding: 12px 20px;
    border-radius: 10px;
}`,

    javascript: `const sparkleCanvas =
    document.getElementById("sparkleCanvas");

function createSparkle() {
    return {
        x: Math.random() * innerWidth,
        y: -20,
        speed: Math.random() * 2 + 1
    };
}

function animate() {
    // Animate falling sparkles
    requestAnimationFrame(animate);
}

animate();`

};

codeDisplay.textContent =
    codeExamples.html;


codeTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            codeTabs.forEach(t =>
                t.classList.remove(
                    "active"
                )
            );

            tab.classList.add("active");

            const selectedCode =
                tab.dataset.code;

            codeDisplay.textContent =
                codeExamples[
                    selectedCode
                ];

        }
    );

});


/* ==========================================
   COPY CODE
========================================== */

const copyCode =
    document.getElementById(
        "copyCode"
    );

copyCode.addEventListener(
    "click",
    async () => {

        try {

            await navigator.clipboard.writeText(
                codeDisplay.textContent
            );

            copyCode.innerHTML =
                '<i class="fas fa-check"></i> Copied!';

            setTimeout(() => {

                copyCode.innerHTML =
                    '<i class="fas fa-copy"></i> Copy Code';

            }, 1500);

        } catch (error) {

            console.log(
                "Copy failed:",
                error
            );

        }

    }
);


/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const formMessage =
    document.getElementById(
        "formMessage"
    );

contactForm.addEventListener(
    "submit",
    async event => {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector(
                ".submit-btn"
            );

        submitButton.disabled = true;

        submitButton.innerHTML =
            '<i class="fas fa-spinner fa-spin"></i> Sending...';


        /*
            FRONTEND DEMO

            Later, replace this section with:

            fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name,
                    email,
                    subject,
                    message
                })
            });
        */


        await new Promise(resolve =>
            setTimeout(resolve, 1200)
        );


        formMessage.innerHTML =
            "✨ Your message has been sent successfully!";

        formMessage.style.color =
            "#6dffb8";


        contactForm.reset();

        submitButton.disabled = false;

        submitButton.innerHTML =
            '<span>Send Message</span>' +
            '<i class="fas fa-paper-plane"></i>';

    }
);


/* ==========================================
   REDUCED MOTION
========================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

if (reducedMotion.matches) {

    sparkleEnabled = false;

    cancelAnimationFrame(
        animationFrame
    );

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

}