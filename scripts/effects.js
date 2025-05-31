const gradientStatic = document.querySelector(".gradient--static");
const gradientTracking = document.querySelector(".gradient--tracking");
const backgroundImage = document.querySelector(".background");
const backgroundCharacter = document.querySelector(".character");
const gradientCursor = document.querySelector(".gradient--cursor");
layers = [{ element: gradientTracking, factor: 0.9, x: 0, y: 0 },
{ element: backgroundImage, factor: 0.05, x: 0, y: 0 },
{ element: backgroundCharacter, factor: 0.1, x: 0, y: 0 }];

function gradientMovement() {
    gradientStatic.style.backgroundPosition = `${100 * Math.random()}% ${100 * Math.random()}%`;
    gradientStatic.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    gradientTracking.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    setInterval(gradientMovement, 5000);
}

function gradientOpacity() {
    const randomOpacity = Math.random();
    gradientStatic.style.opacity = `${randomOpacity}`;
    setInterval(gradientOpacity, 5000);
}

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

gradientOpacity();
gradientMovement();

const lerpFactor = 0.005;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let mouseMoving = false;
let centreTimeout;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    gradientCursor.style.transform = `translate(${mouseX - window.innerWidth/ 2 - gradientCursor.clientWidth/2}px, ${mouseY - window.innerHeight/ 2 - gradientCursor.clientHeight/2}px)`;
    mouseMoving = true;
    clearTimeout(centreTimeout);
    centreTimeout = setTimeout(() => { mouseMoving = false; }, 2000);
});

document.querySelector(".menu").addEventListener("mouseenter",  (e) => {
    gradientCursor.style.backgroundSize = "200% 200%"
})
document.querySelector(".menu").addEventListener("mouseleave",  (e) => {
    gradientCursor.style.backgroundSize = "100% 100%"
})


function backgroundParallax() {
    let centerX = window.innerWidth / 2;
    let centerY = window.innerHeight / 2;
    let adaptiveMoving = (1920 - window.innerWidth) / 10;
    layers.forEach(layer => {
        if (mouseMoving) {
            const targetX = (centerX - mouseX) * layer.factor;
            const targetY = (centerY - mouseY) * layer.factor;
            layer.x = lerp(layer.x, targetX, lerpFactor);
            layer.y = lerp(layer.y, targetY, lerpFactor);
            layer.element.style.backgroundPosition = `calc(50% + ${layer.x}px - ${adaptiveMoving}px) calc(50% + ${layer.y}px)`;
        }
        else {
            layer.x = lerp(layer.x, 0, lerpFactor);
            layer.y = lerp(layer.y, 0, lerpFactor);
            layer.element.style.backgroundPosition = `calc(50% + ${layer.x}px - ${adaptiveMoving}px) calc(50% + ${layer.y}px)`;
        }
    });
    requestAnimationFrame(backgroundParallax);
}
backgroundParallax();

window.addEventListener('resize', () => {
    mouseX = window.innerWidth / 2;
    mouseY = window.innerHeight / 2;
});
