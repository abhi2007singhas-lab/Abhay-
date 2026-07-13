// ==============================
// OPEN INVITATION
// ==============================

const openButton = document.getElementById("openInvitation");
const welcomeScreen = document.querySelector(".welcome-screen");
const mainInvitation = document.getElementById("mainInvitation");

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

openButton.addEventListener("click", () => {

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transition = "opacity 1s ease";

    setTimeout(() => {

        welcomeScreen.style.display = "none";
        mainInvitation.classList.add("show");

        document.body.style.overflow = "auto";

        createScratchCard();

        // Auto play music
        music.play().then(() => {
            musicPlaying = true;
            musicBtn.innerHTML = "🔊";
            musicBtn.classList.add("playing");
        }).catch((error) => {
            console.log(error);
        });

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

const canvas = document.getElementById("scratchCanvas");
const ctx = canvas.getContext("2d");

let scratching = false;

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
});

window.addEventListener("resize", () => {
    if (mainInvitation.classList.contains("show")) {
        createScratchCard();
    }
});


// ==============================
// GUEST NAME
// ==============================

const params = new URLSearchParams(window.location.search);
const guest = params.get("name");

if (guest) {
    document.getElementById("guestName").textContent = guest;
}


// ================= MUSIC BUTTON =================

musicBtn.addEventListener("click", function () {

    if (musicPlaying) {

        music.pause();
        musicBtn.innerHTML = "🎵";
        musicBtn.classList.remove("playing");

    } else {

        music.play();

        musicBtn.innerHTML = "🔊";
        musicBtn.classList.add("playing");
    }

    musicPlaying = !musicPlaying;
});


// ===== Falling Flower Petals =====

const petals = document.getElementById("petals");

function createPetal() {

    const petal = document.createElement("div");

    petal.classList.add("petal");

    const flowers = ["🌸", "🌺", "🌼", "💮"];

    petal.innerHTML =
        flowers[Math.floor(Math.random() * flowers.length)];

    petal.style.left = Math.random() * 100 + "vw";
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


// ===== GOLDEN SPARKLE =====

const scratchArea = document.getElementById("scratchCanvas");

function createGoldenSparkle(x, y) {

    const sparkle = document.createElement("span");

    sparkle.className = "golden-sparkle";
    sparkle.innerHTML = "✦";

    sparkle.style.left = x + "px";
    sparkle.style.top = y + "px";

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 800);
}

scratchArea.addEventListener("mousemove", function (e) {
    if (e.buttons === 1) {
        createGoldenSparkle(
            e.clientX,
            e.clientY
        );
    }
});

scratchArea.addEventListener("touchmove", function (e) {

    const touch = e.touches[0];

    createGoldenSparkle(
        touch.clientX,
        touch.clientY
    );
});
