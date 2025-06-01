const gradientLayer1 = document.querySelector(".gradient--1");
const gradientLayer2 = document.querySelector(".gradient--2");
const backgroundImage = document.querySelector(".background");
const backgroundCharacter = document.querySelector(".character");
const Cursor = document.querySelector(".cursor");
layers = [{ element: backgroundImage, factor: 0.05, x: 0, y: 0 },
{ element: backgroundCharacter, factor: 0.1, x: 0, y: 0 }];

function gradientMovement() {
    gradientLayer1.style.backgroundPosition = `${100 * Math.random()}% ${100 * Math.random()}%`;
    gradientLayer1.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    gradientLayer2.style.backgroundPosition = `${100 * Math.random()}% ${100 * Math.random()}%`;
    gradientLayer2.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    setTimeout(gradientMovement, 5000);
}

function gradientOpacity() {
    gradientLayer1.style.opacity = `${Math.random}`;
    gradientLayer2.style.opacity = `${Math.random}`;
    setTimeout(gradientOpacity, 5000);
}

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

gradientOpacity();
gradientMovement();
let moveTimeout;
const lerpFactor = 0.5;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let mouseMoving = false;
let centreTimeout;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    Cursor.style.top = `${mouseY}px`;
    Cursor.style.left = `${mouseX}px`;
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let adaptiveMoving = (1920 - window.innerWidth) / 10;
    layers.forEach(layer => {
        const targetX = (centerX - mouseX) * layer.factor;
        const targetY = (centerY - mouseY) * layer.factor;
        layer.x = lerp(layer.x, targetX, lerpFactor);
        layer.y = lerp(layer.y, targetY, lerpFactor);
        layer.element.style.backgroundPosition = `calc(50% + ${layer.x}px - ${adaptiveMoving}px) calc(50% + ${layer.y}px)`;
    });

});

document.addEventListener("mouseenter", () => {
    Cursor.style.opacity = "0.4";
})
document.addEventListener("mouseleave", () => {
    Cursor.style.opacity = "0";
})

document.querySelectorAll("li").forEach(button => button.addEventListener("mouseenter", () => {
    Cursor.style.width = "300px";
    Cursor.style.height = "100px";
}))

document.querySelectorAll("li").forEach(button => button.addEventListener("mouseleave", () => {
    Cursor.style.width = "300px";
    Cursor.style.height = "300px";
}))


window.addEventListener('resize', () => {
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
});
