// ==============================
// ELEMENTS
// ==============================

const openButton = document.getElementById("openInvitation");
const welcomeScreen = document.querySelector(".welcome-screen");
const mainInvitation = document.getElementById("mainInvitation");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

const petals = document.getElementById("petals");

let scratching = false;
let musicPlaying = false;


// ==============================
// OPEN INVITATION
// ==============================

openButton.addEventListener("click", () => {

    // Mobile ke liye direct click par music play
    music.play().then(() => {
        musicPlaying = true;
        musicBtn.innerHTML = "🔊";
        musicBtn.classList.add("playing");
    }).catch((err) => {
        console.log("Music blocked:", err);
    });

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transition = "opacity 1s ease";

    setTimeout(() => {
        welcomeScreen.style.display = "none";
        mainInvitation.classList.add("show");

        document.body.style.overflow = "auto";

        createScratchCard();

    }, 1000);
});


// ==============================
// COUNTDOWN
// ==============================

const weddingDate = new Date("November 20, 2026 00:00:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance <= 0) return;

    document.getElementById("days").innerText =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    document.getElementById("hours").innerText =
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    document.getElementById("minutes").innerText =
        Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("seconds").innerText =
        Math.floor((distance % (1000 * 60)) / 1000);
}

updateCountdown();
setInterval(updateCountdown, 1000);


// ==============================
// SCRATCH CARD
// ==============================

function createScratchCard() {

    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#c89b3c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 22px Cinzel";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        "✦ SCRATCH HERE ✦",
        canvas.width / 2,
        canvas.height / 2
    );
}

function scratch(x, y) {

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
}


canvas.addEventListener("mousedown", () => scratching = true);
canvas.addEventListener("mouseup", () => scratching = false);
canvas.addEventListener("mouseleave", () => scratching = false);


canvas.addEventListener("mousemove", (e) => {

    if (!scratching) return;

    const rect = canvas.getBoundingClientRect();

    scratch(
        e.clientX - rect.left,
        e.clientY - rect.top
    );
});


canvas.addEventListener("touchstart", () => scratching = true);
canvas.addEventListener("touchend", () => scratching = false);


canvas.addEventListener("touchmove", (e) => {

    e.preventDefault();

    if (!scratching) return;

    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];

    scratch(
        touch.clientX - rect.left,
        touch.clientY - rect.top
    );

}, { passive: false });


window.addEventListener("resize", () => {

    if (mainInvitation.classList.contains("show")) {
        createScratchCard();
    }

});


// ==============================
// GUEST NAME
// ==============================

const params = new URLSearchParams(window.location.search);

const guest = params.get("guest");

const guestNameElement =
    document.getElementById("guestName");

if (guestNameElement) {

    if (guest) {

        guestNameElement.textContent = guest;

    } else {

        guestNameElement.textContent = "Guest";

    }

}


// ==============================
// MUSIC BUTTON
// ==============================

musicBtn.addEventListener("click", () => {

    if (musicPlaying) {

        music.pause();

        musicBtn.innerHTML = "🎵";
        musicBtn.classList.remove("playing");

        musicPlaying = false;

    } else {

        music.play().then(() => {

            musicBtn.innerHTML = "🔊";
            musicBtn.classList.add("playing");

            musicPlaying = true;

        }).catch((err) => {

            console.log(err);

        });

    }

});


// ==============================
// FLOWER PETALS
// ==============================

function createPetal() {

    const petal = document.createElement("div");

    petal.classList.add("petal");

    const flowers = ["🌸", "🌺", "🌼", "💮"];

    petal.innerHTML =
        flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.left =
        Math.random() * 100 + "vw";

    petal.style.animationDuration =
        (5 + Math.random() * 5) + "s";

    petal.style.fontSize =
        (18 + Math.random() * 18) + "px";

    petals.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    }, 10000);

}

setInterval(createPetal, 500);


// ==============================
// GOLDEN SPARKLES
// ==============================

function createGoldenSparkle(x, y) {

    const sparkle =
        document.createElement("span");

    sparkle.className =
        "golden-sparkle";

    sparkle.innerHTML = "✦";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => {

        sparkle.remove();

    }, 800);

}


canvas.addEventListener("mousemove", function (e) {

    if (e.buttons === 1) {

        createGoldenSparkle(
            e.clientX,
            e.clientY
        );

    }

});


canvas.addEventListener("touchmove", function (e) {

    const touch = e.touches[0];

    createGoldenSparkle(
        touch.clientX,
        touch.clientY
    );

});


// ==============================
// FIREWORKS
// ==============================

const fwCanvas =
    document.getElementById("fireworks");

const fwCtx =
    fwCanvas.getContext("2d");


fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;


let fireworks = [];


function createFirework() {

    const x =
        Math.random() * fwCanvas.width;

    const y =
        Math.random() * (fwCanvas.height / 2);


    for (let i = 0; i < 50; i++) {

        fireworks.push({

            x: x,
            y: y,

            dx: (Math.random() - 0.5) * 8,
            dy: (Math.random() - 0.5) * 8,

            size: Math.random() * 3 + 1,

            life: 100

        });

    }

}


function animateFireworks() {

    fwCtx.clearRect(
        0,
        0,
        fwCanvas.width,
        fwCanvas.height
    );


    for (let i = 0; i < fireworks.length; i++) {

        let p = fireworks[i];

        p.x += p.dx;
        p.y += p.dy;

        p.life--;


        fwCtx.beginPath();

        fwCtx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        fwCtx.fillStyle =
            `hsl(${Math.random() * 360},100%,50%)`;

        fwCtx.fill();


        if (p.life <= 0) {

            fireworks.splice(i, 1);

            i--;

        }

    }


    requestAnimationFrame(
        animateFireworks
    );

}


setInterval(createFirework, 1500);

animateFireworks();


window.addEventListener("resize", () => {

    fwCanvas.width =
        window.innerWidth;

    fwCanvas.height =
        window.innerHeight;

});
