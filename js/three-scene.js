"use strict";

document.addEventListener("DOMContentLoaded", () => {
    if (typeof THREE === "undefined") {
        console.error("Three.js load nahi hua.");
        return;
    }

    initHeroScene();
    initTechUniverse();
});


/* =========================================================
   HERO 3D SCENE
========================================================= */

function initHeroScene() {
    const canvas = document.getElementById("three-canvas");

    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        60,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    function resize() {
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;

        if (width === 0 || height === 0) return;

        renderer.setSize(width, height, false);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }

    resize();

    /* Main object */
    const geometry = new THREE.IcosahedronGeometry(1.5, 2);

    const material = new THREE.MeshBasicMaterial({
        color: 0x62e9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.75
    });

    const object = new THREE.Mesh(geometry, material);

    scene.add(object);

    /* Inner sphere */
    const innerGeometry = new THREE.SphereGeometry(0.75, 32, 32);

    const innerMaterial = new THREE.MeshBasicMaterial({
        color: 0xa78bfa,
        transparent: true,
        opacity: 0.15
    });

    const innerSphere = new THREE.Mesh(
        innerGeometry,
        innerMaterial
    );

    scene.add(innerSphere);

    /* Particles */
    const particleGeometry = new THREE.BufferGeometry();

    const particleCount = 900;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
        color: 0x62e9ff,
        size: 0.025,
        transparent: true,
        opacity: 0.7
    });

    const particles = new THREE.Points(
        particleGeometry,
        particleMaterial
    );

    scene.add(particles);

    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener("mousemove", (event) => {
        mouseX =
            (event.clientX / window.innerWidth - 0.5) * 0.5;

        mouseY =
            (event.clientY / window.innerHeight - 0.5) * 0.5;
    });

    function animate() {
        requestAnimationFrame(animate);

        object.rotation.x += 0.002;
        object.rotation.y += 0.004;

        innerSphere.rotation.y -= 0.003;

        particles.rotation.y += 0.0004;

        object.rotation.x +=
            (mouseY - object.rotation.x) * 0.002;

        object.rotation.y +=
            (mouseX - object.rotation.y) * 0.002;

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener("resize", resize);
}


/* =========================================================
   TECH UNIVERSE
========================================================= */

function initTechUniverse() {

    const container = document.querySelector(".tech-universe");

    if (!container) {
        console.warn("Tech Universe container nahi mila.");
        return;
    }

    /*
        Existing center text ko preserve karenge.
        Technology nodes dynamically create honge.
    */

    const technologies =
        window.studentData &&
        Array.isArray(window.studentData.technologies)
            ? window.studentData.technologies
            : [
                "HTML5",
                "CSS3",
                "JavaScript",
                "Python",
                "C",
                "C++",
                "React",
                "Node.js",
                "Git",
                "GitHub",
                "AI",
                "Machine Learning",
                "REST API",
                "Three.js",
                "VS Code"
            ];

    /* Remove old generated nodes */
    container
        .querySelectorAll(".tech-node-generated")
        .forEach(node => node.remove());

    const center = document.createElement("div");

    center.className = "tech-center";

    center.innerHTML = `
        <span>TECH</span>
        <strong>UNIVERSE</strong>
    `;

    container.appendChild(center);


    /* Create technology nodes */

    technologies.forEach((technology, index) => {

        const node = document.createElement("div");

        node.className = "tech-node-generated";

        node.textContent = technology;

        const angle =
            (index / technologies.length) *
            Math.PI *
            2;

        const radius =
            32 + (index % 3) * 7;

        const x =
            50 + Math.cos(angle) * radius;

        const y =
            50 + Math.sin(angle) * radius;

        node.style.left = `${x}%`;
        node.style.top = `${y}%`;

        node.style.animationDelay =
            `${index * 0.15}s`;

        container.appendChild(node);
    });


    /* Connecting lines */

    technologies.forEach((technology, index) => {

        const line = document.createElement("div");

        line.className = "tech-line-generated";

        const angle =
            (index / technologies.length) *
            Math.PI *
            2;

        const radius =
            32 + (index % 3) * 7;

        const length = radius * 1.45;

        line.style.width = `${length}%`;

        line.style.left = "50%";
        line.style.top = "50%";

        line.style.transform =
            `rotate(${angle}rad)`;

        container.appendChild(line);
    });

    console.log(
        "Tech Universe loaded:",
        technologies
    );
}