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

const templateBoard1 = document.getElementById("templateboard1");
let letterTileCount = 0;

function createLetterTitle() {
    const tile = document.createElement("div");
    tile.classList.add("lettertile");
    tile.contentEditable = true;
    tile.spellcheck = false;
    tile.textContent = "A";

    letterTileCount = letterTileCount + 1;
    const offsetStack = (letterTileCount % 6) * 15;

    tile.style.top = (40 + offsetStack) + "px";
    tile.style.left = (40 + offsetStack) + "px";

    tile.addEventListener("input", () => {
        const onlyFirstChar = tile.textContent.trim().slice(0, 1);
        tile.textContent = onlyFirstChar;

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(tile);
        range.collapse(false);
        selection.removeAllRanges();
        selection.addRange(range);
    });
    templateBoard1.appendChild(tile);
    enableLetterTileDragging(tile);
}

function enableLetterTileDragging(tile) {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    tile.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - tile.offsetLeft;
        offsetY = event.clientY - tile.offsetTop;
    });
    document.addEventListener("mousemove", (event) => {
        if (isDragging === false) {
            return;
        }

        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;

        left = Math.max(0, Math.min(left, templateBoard1.clientWidth - tile.offsetWidth));
        top = Math.max(0, Math.min(top, templateBoard1.clientHeight - tile.offsetHeight));

        tile.style.left = left + "px";
        tile.style.top = top + "px";
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

document.querySelectorAll(".templatetool").forEach((toolButton) => {
    toolButton.addEventListener("click", () => {
        const action = toolButton.dataset.action;

        if (action === "addletter") {
            createLetterTitle();
        }
    });
});