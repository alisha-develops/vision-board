function openTemplate(templateNumber) {
    document.getElementById("templatewindow" + templateNumber).classList.add("active");
}

document.querySelectorAll(".closetemplatewindow").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const targetNumber = closeButton.dataset.target;
        document.getElementById("templatewindow" + targetNumber).classList.remove("active");
    });
});

const templateBoxes = document.querySelectorAll(".templatebox");

templateBoxes.forEach((box) => {
    const upload = box.querySelector(".templateboxupload");
    const hint =  box.querySelector(".templateboxhint");

    box.addEventListener("click", () => {
        upload.click();
    });

    upload.addEventListener("change", (event) => {
        const file = event.target.files[0];

        if (file === undefined) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (loadEvent) => {
            const img = document.createElement("img");
            img.src = loadEvent.target.result;

            hint.style.display = "none";
            box.appendChild(img);
        };

        reader.readAsDataURL(file);
    });
});

function openTemplate(templateNumber) {
    document.getElementById("templateswindow").classList.remove("active");
    document.getElementById("templatewindow" + templateNumber).classList.add("active");
}

document.querySelectorAll(".closetemplatewindow").forEach((closeButton) => {
    closeButton.addEventListener("click", () => {
        const targetNumber = closeButton.dataset.target;
        document.getElementById("templatewindow" + targetNumber).classList.remove("active");
        document.getElementById("templateswindow").classList.add("active");
    });
});