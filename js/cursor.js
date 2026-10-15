const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot) {
    document.addEventListener("mousemove", (event) => {
        cursorDot.style.left = `${event.clientX}px`;
        cursorDot.style.top = `${event.clientY}px`;
        cursorDot.classList.add("visible");
    });

    document.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("visible");
    });
}

document.addEventListener("click", (event) => {
    const ripple = document.createElement("span");

    ripple.className = "cursor-ripple";
    ripple.style.left = `${event.clientX}px`;
    ripple.style.top = `${event.clientY}px`;
    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", () => {
        ripple.remove();
    }, { once: true });
});
