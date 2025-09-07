// Birthday Website JavaScript
document.addEventListener("DOMContentLoaded", function() {
    // Initialize all features
    initSmoothScrolling();
    initConfetti();
    initAnimations();
    initNavbar();
    initParticleSystem();
    initSoundEffects();
    initTypingEffect();
    initParallaxEffect();
    initMorphingShapes();
    initInteractiveElements();
    initFireworks();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll(".nav-link");
    
    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });
}

// Enhanced Confetti animation
function initConfetti() {
    const canvas = document.getElementById("confetti-canvas");
    const ctx = canvas.getContext("2d");
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    // Confetti particles
    let confettiParticles = [];
    
    function createConfetti() {
        const colors = [
            "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", 
            "#feca57", "#ff9ff3", "#a8e6cf", "#ffd3a5",
            "#fd79a8", "#6c5ce7", "#00b894", "#e17055"
        ];
        
        for (let i = 0; i < 100; i++) {
            confettiParticles.push({
                x: Math.random() * canvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 8,
                vy: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 12 + 6,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 20,
                shape: Math.random() > 0.5 ? "circle" : "square",
                life: 1.0,
                gravity: 0.1 + Math.random() * 0.1
            });
        }
    }
    
    function updateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        confettiParticles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.rotation += particle.rotationSpeed;
            particle.life -= 0.008;
            particle.vy += particle.gravity;
            
            // Wind effect
            particle.vx += (Math.random() - 0.5) * 0.2;
            
            // Draw particle
            ctx.save();
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation * Math.PI / 180);
            ctx.globalAlpha = particle.life;
            ctx.fillStyle = particle.color;
            ctx.shadowColor = particle.color;
            ctx.shadowBlur = 20;
            
            if (particle.shape === "circle") {
                ctx.beginPath();
                ctx.arc(0, 0, particle.size/2, 0, Math.PI * 2);
                ctx.fill();
            } else {
                ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
            }
            
            ctx.restore();
            
            // Remove particles that are off screen or faded
            if (particle.y > canvas.height + 20 || particle.life <= 0) {
                confettiParticles.splice(index, 1);
            }
        });
        
        if (confettiParticles.length > 0) {
            requestAnimationFrame(updateConfetti);
        }
    }
    
    window.triggerConfetti = function() {
        createConfetti();
        updateConfetti();
    };
}

// Typing Effect for Title
function initTypingEffect() {
    const titleWords = document.querySelectorAll(".title-word");
    
    titleWords.forEach((word, index) => {
        const text = word.textContent;
        word.textContent = "";
        word.style.opacity = "1";
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    word.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                    // Add sparkle effect after typing
                    createSparkleEffect(word);
                }
            }, 100 + index * 50);
        }, index * 500);
    });
}

// Sparkle Effect
function createSparkleEffect(element) {
    for (let i = 0; i < 10; i++) {
        const sparkle = document.createElement("div");
        sparkle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #feca57;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: sparkleAnimation 1s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + "px";
        sparkle.style.top = (rect.top + Math.random() * rect.height) + "px";
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
}

// Parallax Effect
function initParallaxEffect() {
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll(".heart");
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(45deg)`;
        });
    });
}

// Morphing Shapes
function initMorphingShapes() {
    const shapesContainer = document.createElement("div");
    shapesContainer.className = "morphing-shapes";
    shapesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 5; i++) {
        const shape = document.createElement("div");
        shape.className = "morphing-shape";
        shape.style.cssText = `
            position: absolute;
            width: ${Math.random() * 100 + 50}px;
            height: ${Math.random() * 100 + 50}px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #feca57);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: morphShape ${Math.random() * 20 + 15}s infinite linear;
            animation-delay: ${Math.random() * 5}s;
            opacity: 0.1;
        `;
        shapesContainer.appendChild(shape);
    }
    
    document.body.appendChild(shapesContainer);
    
    // Add CSS for morphing shapes
    const morphStyle = document.createElement("style");
    morphStyle.textContent = `
        @keyframes morphShape {
            0% {
                border-radius: 50%;
                transform: rotate(0deg) scale(1);
            }
            25% {
                border-radius: 20%;
                transform: rotate(90deg) scale(1.2);
            }
            50% {
                border-radius: 0%;
                transform: rotate(180deg) scale(0.8);
            }
            75% {
                border-radius: 30%;
                transform: rotate(270deg) scale(1.1);
            }
            100% {
                border-radius: 50%;
                transform: rotate(360deg) scale(1);
            }
        }
        
        @keyframes sparkleAnimation {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 1;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(morphStyle);
}

// Interactive Elements
function initInteractiveElements() {
    // Add hover effects to quality items
    const qualityItems = document.querySelectorAll(".quality-item");
    
    qualityItems.forEach((item, index) => {
        item.addEventListener("mouseenter", function() {
            // Create ripple effect
            createRippleEffect(this);
            
            // Add floating particles
            createFloatingParticles(this);
            
            // Trigger mini confetti
            setTimeout(() => triggerConfetti(), 200);
        });
        
        item.addEventListener("click", function() {
            // Add click animation
            this.style.animation = "none";
            setTimeout(() => {
                this.style.animation = "fadeInUp 1s ease-out, qualityFloat 4s ease-in-out infinite";
            }, 10);
        });
    });
}

// Ripple Effect
function createRippleEffect(element) {
    const ripple = document.createElement("div");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        border-radius: 50%;
        animation: rippleExpand 0.6s ease-out;
        pointer-events: none;
        z-index: 10;
    `;
    
    element.style.position = "relative";
    element.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// Floating Particles
function createFloatingParticles(element) {
    for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.style.cssText = `
            position: absolute;
            width: 6px;
            height: 6px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            animation: floatParticle 2s ease-out forwards;
        `;
        
        const rect = element.getBoundingClientRect();
        particle.style.left = (rect.left + Math.random() * rect.width) + "px";
        particle.style.top = (rect.top + Math.random() * rect.height) + "px";
        
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }
}

// Fireworks Effect
function initFireworks() {
    const canvas = document.createElement("canvas");
    canvas.id = "fireworks-canvas";
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext("2d");
    let fireworks = [];
    
    function resizeFireworksCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeFireworksCanvas();
    window.addEventListener("resize", resizeFireworksCanvas);
    
    function createFirework(x, y) {
        const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#feca57", "#ff9ff3"];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            fireworks.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 1.0,
                size: Math.random() * 4 + 2
            });
        }
    }
    
    function updateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        fireworks.forEach((firework, index) => {
            firework.x += firework.vx;
            firework.y += firework.vy;
            firework.vy += 0.1; // gravity
            firework.life -= 0.02;
            
            ctx.save();
            ctx.globalAlpha = firework.life;
            ctx.fillStyle = firework.color;
            ctx.shadowColor = firework.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(firework.x, firework.y, firework.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
            
            if (firework.life <= 0) {
                fireworks.splice(index, 1);
            }
        });
        
        if (fireworks.length > 0) {
            requestAnimationFrame(updateFireworks);
        }
    }
    
    window.triggerFireworks = function() {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height * 0.6;
        createFirework(x, y);
        updateFireworks();
    };
}

// Particle System for background
function initParticleSystem() {
    const particleContainer = document.createElement("div");
    particleContainer.className = "particle-system";
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "floating-particle";
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 8 + 2}px;
            height: ${Math.random() * 8 + 2}px;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #feca57);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            animation: particleFloat ${Math.random() * 25 + 20}s infinite linear;
            animation-delay: ${Math.random() * 8}s;
            box-shadow: 0 0 15px currentColor;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS for particles
    const particleStyle = document.createElement("style");
    particleStyle.textContent = `
        @keyframes particleFloat {
            0% {
                transform: translateY(100vh) translateX(0px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) translateX(${Math.random() * 300 - 150}px) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes rippleExpand {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0;
            }
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(0px) scale(1);
                opacity: 1;
            }
            100% {
                transform: translateY(-100px) scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);
}

// Sound Effects (visual feedback)
function initSoundEffects() {
    // Create visual sound waves
    const soundWaves = document.createElement("div");
    soundWaves.className = "sound-waves";
    soundWaves.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100px;
        height: 100px;
        pointer-events: none;
        z-index: 9998;
        opacity: 0;
    `;
    
    for (let i = 0; i < 5; i++) {
        const wave = document.createElement("div");
        wave.className = "sound-wave";
        wave.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: ${20 + i * 15}px;
            height: ${20 + i * 15}px;
            border: 2px solid #ff6b6b;
            border-radius: 50%;
            animation: soundWave 1.5s ease-out;
            animation-delay: ${i * 0.1}s;
        `;
        soundWaves.appendChild(wave);
    }
    
    document.body.appendChild(soundWaves);
    
    // Add CSS for sound waves
    const soundStyle = document.createElement("style");
    soundStyle.textContent = `
        @keyframes soundWave {
            0% {
                transform: translate(-50%, -50%) scale(0);
                opacity: 1;
            }
            100% {
                transform: translate(-50%, -50%) scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(soundStyle);
    
    window.triggerSoundWave = function() {
        soundWaves.style.opacity = "1";
        setTimeout(() => {
            soundWaves.style.opacity = "0";
        }, 1500);
    };
}

// Additional animations
function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = "running";
                // Trigger confetti when about section comes into view
                if (entry.target.classList.contains("about")) {
                    setTimeout(() => {
                        triggerConfetti();
                        triggerFireworks();
                    }, 500);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll(".quality-item, .about");
    animatedElements.forEach(el => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });
    
    // Add click effects to celebration icons
    document.addEventListener("click", function(e) {
        if (e.target.classList.contains("bounce")) {
            triggerConfetti();
            triggerSoundWave();
            triggerFireworks();
            
            // Add ripple effect
            createRipple(e);
        }
    });
}

// Ripple effect
function createRipple(event) {
    const ripple = document.createElement("div");
    const rect = event.target.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: radial-gradient(circle, rgba(255,107,107,0.3) 0%, transparent 70%);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
        z-index: 1000;
    `;
    
    event.target.style.position = "relative";
    event.target.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add CSS for ripple effect
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
function initNavbar() {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;
    
    window.addEventListener("scroll", function() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = "rgba(0, 0, 0, 0.95)";
            navbar.style.boxShadow = "0 5px 30px rgba(255, 107, 107, 0.2)";
        } else {
            navbar.style.background = "rgba(0, 0, 0, 0.9)";
            navbar.style.boxShadow = "none";
        }
        
        lastScrollY = currentScrollY;
    });
}

// Birthday countdown (optional feature)
function initBirthdayCountdown() {
    const birthdayDate = new Date("2024-12-25");
    const today = new Date();
    
    if (today.getMonth() === birthdayDate.getMonth() && today.getDate() === birthdayDate.getDate()) {
        // It's the birthday!
        triggerConfetti();
        setTimeout(triggerConfetti, 1000);
        setTimeout(triggerConfetti, 2000);
        setTimeout(triggerFireworks, 500);
    }
}

// Initialize countdown on page load
initBirthdayCountdown();

// Add some random floating elements
function createFloatingElements() {
    const floatingContainer = document.createElement("div");
    floatingContainer.className = "floating-elements";
    floatingContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    
    const symbols = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", ""];
    
    for (let i = 0; i < 20; i++) {
        const element = document.createElement("div");
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        element.style.cssText = `
            position: absolute;
            font-size: ${Math.random() * 30 + 15}px;
            left: ${Math.random() * 100}%;
            animation: floatUp ${Math.random() * 20 + 25}s infinite linear;
            animation-delay: ${Math.random() * 10}s;
            filter: drop-shadow(0 0 15px rgba(255, 107, 107, 0.7));
        `;
        floatingContainer.appendChild(element);
    }
    
    document.body.appendChild(floatingContainer);
}

// Add CSS for floating elements
const floatingStyle = document.createElement("style");
floatingStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(720deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(floatingStyle);

// Create floating elements
createFloatingElements();

// Add mouse trail effect
function initMouseTrail() {
    const trail = [];
    const trailLength = 25;
    
    document.addEventListener("mousemove", function(e) {
        trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (trail.length > trailLength) {
            trail.shift();
        }
        
        // Create trail particles
        if (Math.random() > 0.5) {
            const particle = document.createElement("div");
            particle.style.cssText = `
                position: fixed;
                left: ${e.clientX}px;
                top: ${e.clientY}px;
                width: 6px;
                height: 6px;
                background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                animation: trailFade 1.5s ease-out forwards;
            `;
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1500);
        }
    });
    
    const trailStyle = document.createElement("style");
    trailStyle.textContent = `
        @keyframes trailFade {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(0);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(trailStyle);
}

// Initialize mouse trail
initMouseTrail();

// Auto-trigger effects periodically
setInterval(() => {
    if (Math.random() > 0.7) {
        triggerConfetti();
    }
}, 10000);

setInterval(() => {
    if (Math.random() > 0.8) {
        triggerFireworks();
    }
}, 15000);
