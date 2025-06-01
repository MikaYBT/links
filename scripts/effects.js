const gradientLayer1 = document.querySelector(".gradient--1");
const gradientLayer2 = document.querySelector(".gradient--2");
const backgroundImage = document.querySelector(".background");
const backgroundCharacter = document.querySelector(".character");
const Cursor = document.querySelector(".cursor");
layers = [{ element: backgroundImage, factor: 0.05, x: 0, y: 0 },
{ element: backgroundCharacter, factor: 0.1, x: 0, y: 0 }];

function detectDeviceType() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isMobileUA = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
    const isTouchDevice = 'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0;
    const isSmallScreen = window.innerWidth < 768 ||
        (window.innerWidth < 1024 && window.innerHeight > window.innerWidth);
    const isMobile = isMobileUA && (isTouchDevice || isSmallScreen);
    return {
        isMobile
    };
}

const mobileCheck = detectDeviceType();

//gradient animation

function gradientMovement() {
    gradientLayer1.style.backgroundPosition = `${100 * Math.random()}% ${100 * Math.random()}%`;
    gradientLayer1.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    gradientLayer2.style.backgroundPosition = `${100 * Math.random()}% ${100 * Math.random()}%`;
    gradientLayer2.style.backgroundSize = `${200 + 100 * Math.random()}% ${200 + 100 * Math.random()}%`;
    setTimeout(gradientMovement, 10000);
}

function gradientOpacity() {
    gradientLayer1.style.opacity = `${Math.random}`;
    gradientLayer2.style.opacity = `${Math.random}`;
    setTimeout(gradientOpacity, 10000);
}

gradientOpacity();
gradientMovement();

//gyroscope

let isGyroActive = false;
let lastBeta = 0;
let lastGamma = 0;

function initGyroParallax() {
    if (typeof DeviceOrientationEvent !== 'undefined' &&
        typeof DeviceOrientationEvent.requestPermission === 'function') {
        showPermissionPanel();
    } else if ('DeviceOrientationEvent' in window) {
        startGyro();
    }
}

function requestGyroPermission() {
    DeviceOrientationEvent.requestPermission().then(permissionState => {
        if (permissionState === 'granted') {
            startGyro();
            hidePermissionPanel();
        }
    })
}

function startGyro() {
    window.addEventListener('deviceorientation', GyroParallax);
    isGyroActive = true;
}

function GyroParallax(event) {
    const beta = event.beta;
    const gamma = event.gamma;
    const maxTilt = 100;
    const smoothedBeta = lastBeta + (beta - lastBeta) * 0.2;
    const smoothedGamma = lastGamma + (gamma - lastGamma) * 0.2;
    lastBeta = smoothedBeta;
    lastGamma = smoothedGamma;
    const limitedBeta = Math.max(Math.min(smoothedBeta, maxTilt), -maxTilt);
    const limitedGamma = Math.max(Math.min(smoothedGamma, maxTilt), -maxTilt);
    let adaptiveMoving = (1920 - window.innerWidth) / 10;
    layers.forEach(layer => {
        const offsetX = limitedGamma * 10 * layer.factor;
        const offsetY = limitedBeta * 10 * layer.factor;
        layer.element.style.backgroundPosition = `calc(50% + ${offsetX}px - ${adaptiveMoving}px) calc(50% + ${offsetY}px)`;
    });
};

window.addEventListener('DOMContentLoaded', initGyroParallax);

//background parallax

function lerp(start, end, factor) {
    return start * (1 - factor) + end * factor;
}

let moveTimeout;
const lerpFactor = 0.5;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let mouseMoving = false;
let centreTimeout;

document.addEventListener('mousemove', (e) => {
    if (!mobileCheck.isMobile) {
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
        })
    }
    ;

});

//cursor

document.addEventListener("mouseenter", () => {
    if (!mobileCheck.isMobile) {
        Cursor.style.opacity = "0.4";
    }

})
document.addEventListener("mouseleave", () => {
    if (!mobileCheck.isMobile) {
        Cursor.style.opacity = "0";
    }
})
document.addEventListener("mousemove", () => {
    if (!mobileCheck.isMobile) {
        Cursor.style.opacity = "0.4";
    }
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


