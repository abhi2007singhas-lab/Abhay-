// ==============================
// OPEN INVITATION
// ==============================

const openButton = document.getElementById("openInvitation");
const welcomeScreen = document.querySelector(".welcome-screen");
const mainInvitation = document.getElementById("mainInvitation");

openButton.addEventListener("click", () => {

    welcomeScreen.style.opacity = "0";
    welcomeScreen.style.transition = "opacity 1s ease";

    setTimeout(() => {

        welcomeScreen.style.display = "none";

        mainInvitation.classList.add("show");
music.play().catch(function(error){
    console.log(error);
});

musicPlaying = true;
musicBtn.innerHTML = "🔊";
musicBtn.classList.add("playing");
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

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
    );

    const minutes = Math.floor(
        (distance % (1000 * 60 * 60)) /
        (1000 * 60)
    );

    const seconds = Math.floor(
        (distance % (1000 * 60)) /
        1000
    );

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;

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

    // Canvas size = scratch card size
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    // Golden layer
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#c89b3c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Scratch text
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

// Mouse Events
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

// Touch Events
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

// Resize Fix
window.addEventListener("resize", () => {

    if (mainInvitation.classList.contains("show")) {
        createScratchCard();
    }

});
const params = new URLSearchParams(window.location.search);
const guest = params.get("name");

if (guest) {
    document.getElementById("guestName").textContent = guest;
}
// ================= MUSIC =================

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", function () {

    if (musicPlaying) {

        music.pause();
        musicBtn.innerHTML = "🎵";
        musicBtn.classList.remove("playing");

    } else {

        music.play().catch(function(error){
            console.log(error);
        });

        musicBtn.innerHTML = "🔊";
        musicBtn.classList.add("playing");

    }

    musicPlaying = !musicPlaying;

});
// ===== Falling Flower Petals =====

const petals = document.getElementById("petals");

function createPetal(){

    const petal = document.createElement("div");

    petal.classList.add("petal");

    const flowers = ["🌸","🌺","🌼","💮"];

    petal.innerHTML = flowers[Math.floor(Math.random()*flowers.length)];

    petal.style.left = Math.random()*100 + "vw";

    petal.style.animationDuration = (5 + Math.random()*5) + "s";

    petal.style.fontSize = (18 + Math.random()*18) + "px";

    petals.appendChild(petal);

    setTimeout(()=>{
        petal.remove();
    },10000);

}

setInterval(createPetal,500);
console.log("Petal script loaded");
console.log("Petal script is running");
// GOLDEN SPARKLE EFFECT ON SCRATCH

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
        createGoldenSparkle(e.clientX, e.clientY);
    }
});
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let musicPlaying = false;

musicBtn.addEventListener("click", function () {
    if (musicPlaying) {
        music.pause();
        musicBtn.innerHTML = "🎵";
    } else {
        music.play().catch(function(error){
            console.log(error);
        });
        musicBtn.innerHTML = "🔊";
    }

    musicPlaying = !musicPlaying;
});
scratchArea.addEventListener("touchmove", function (e) {
    const touch = e.touches[0];

    createGoldenSparkle(
        touch.clientX,
        touch.clientY
    );
});
