const gradientFrame = document.querySelector(".gradient");
const gradientColors = ['#ff758c', '#ff7eb3', '#7afcff', '#feff9c'];

function gradientMovement(){
    gradientFrame.style.backgroundPosition = `${100*Math.random()}% ${100*Math.random()}%`;
    gradientFrame.style.backgroundSize = `${200+100*Math.random()}% ${200+100*Math.random()}%`;
    setTimeout(gradientMovement, 5000);
}

function gradientOpacity(){
    const randomOpacity = Math.random();
    gradientFrame.style.opacity = `${randomOpacity}`;
    setTimeout(gradientOpacity, 5000);
}

// gradientRotation();
gradientOpacity();
gradientMovement();
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth * 100;
    const y = e.clientY / window.innerHeight * 100;
    gradientFrame.style.backgroundPosition = `${x}% ${y}%`;
});