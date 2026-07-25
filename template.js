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

document.querySelectorAll(".templatetoolbartoggle").forEach((toggleButton) => {
    toggleButton.addEventListener("click", () => {
        const targetNumber = toggleButton.dataset.target;
        const targetWindow = document.getElementById("templatewindow" + targetNumber);
        const content = targetWindow.querySelector(".templatecontent");
        const isOpen = targetWindow.classList.contains("templatewindow-panel-open");

        if (targetWindow.dataset.baseWidth === undefined) {
            targetWindow.dataset.baseWidth = targetWindow.getBoundingClientRect().width;
        }

        const baseWidth = Number(targetWindow.dataset.baseWidth);

        requestAnimationFrame(() => {
            if (isOpen === false) {
                targetWindow.style.width = (baseWidth + 220) + "px";
                content.style.width = (baseWidth - 60) + "px";
                targetWindow.classList.add("templatewindow-panel-open");
            } else {
                targetWindow.style.width = baseWidth + "px";
                content.style.width = (baseWidth - 60) + "px";
                targetWindow.classList.remove("templatewindow-panel-open");
            }
        });
    });
});