document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.querySelector(".menu-button");
    const nav = document.querySelector("header nav");

    // Function to handle window resize
    function handleResize() {
        if (window.innerWidth >= 1000) {
            nav.classList.remove("hide");
        } else {
            nav.classList.add("hide");
        }
    }


    if (window.innerWidth < 1000) {
        nav.classList.add("hide");
    }

    // Toggle menu visibility on button click
    menuButton.addEventListener("click", () => {
        nav.classList.toggle("hide");
    });

    // Listen for window resize events
    window.addEventListener("resize", handleResize);
    handleResize(); // Ensure correct state on page load
});

// Function to generate image viewer modal
function viewerTemplate(imgSrc, altText) {
    return `
        <div class="viewer">
            <button class="close-viewer">X</button>
            <img src="${imgSrc}" alt="${altText}">
        </div>
    `;
}


function viewHandler(event) {
    const clickedElement = event.target;
    if (clickedElement.tagName === "IMG") {
        const imgSrc = clickedElement.src.replace("-sm.jpeg", "-full.jpeg");
        document.body.insertAdjacentHTML("afterbegin", viewerTemplate(imgSrc, clickedElement.alt));

        // Attach event listener to close button
        document.querySelector(".close-viewer").addEventListener("click", closeViewer);
    }
}

// Function to close image viewer modal
function closeViewer(event) {
    event.stopPropagation(); 
    document.querySelector(".viewer").remove();
}


document.querySelector(".gallery").addEventListener("click", viewHandler);

