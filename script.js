const generateBtn = document.getElementById("generateBtn");
const colors = document.querySelectorAll(".color");

function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getTextColor(hex) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    return luminance < 140 ? "#ffffff" : "#000000";
}

function generatePalette() {
    colors.forEach(colorBlock => {
        const newColor = getRandomColor();
        colorBlock.style.backgroundColor = newColor;
        colorBlock.setAttribute("data-hex", newColor);

        colorBlock.style.setProperty('--text-color', getTextColor(newColor));
    });
}

const copyAlert = document.getElementById("copyAlert");
const colorCircle = document.getElementById("colorCircle");

colors.forEach(colorBlock => {
    colorBlock.addEventListener("click", () => {
        const color = colorBlock.getAttribute("data-hex");
        navigator.clipboard.writeText(color).then(() => {
            colorCircle.style.backgroundColor = color;

            copyAlert.classList.add("show");

            setTimeout(() => {
                copyAlert.classList.remove("show");
            }, 2500);
        });
    });
});

generatePalette();
generateBtn.addEventListener("click", generatePalette);
