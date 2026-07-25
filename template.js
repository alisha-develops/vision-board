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
let activeLetterTile = null;
let letterTileCount = 0;

function createLetterTitle() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("lettertilewrapper");

    const tile = document.createElement("div");
    tile.classList.add("lettertile");
    tile.contentEditable = true;
    tile.spellcheck = false;
    tile.textContent = "A";

    letterTileCount = letterTileCount + 1;
    const offsetStack = (letterTileCount % 6) * 15;

    wrapper.style.top = (40 + offsetStack) + "px";
    wrapper.style.left = (40 + offsetStack) + "px";

    tile.addEventListener("mousedown", () => {
        activeLetterTile = tile;
    });

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

    wrapper.appendChild(tile);
    templateBoard1.appendChild(wrapper);

    enableLetterTileDragging(wrapper);
    enableLetterTileRotation(wrapper);
    enableLetterTileResize(wrapper);

    activeLetterTile = tile;
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

        if (action === "lettersettings") {
            document.getElementById("letterstylepanel").classList.toggle("active");
        }

        if (action === "palette") {
            generateTemplatePalette();
        }
        if (action === "stickertray") {
            document.getElementById("stickertray").classList.toggle("active");
        }
    });
});

const tileColorPicker = document.getElementById("tilecolorpicker");
const tileColorHex = document.getElementById("tilecolorhex");
const tileBorderColorPicker = document.getElementById("tilebordercolorpicker");
const tileBorderColorHex = document.getElementById("tilebordercolorhex");
const tileFontSelect = document.getElementById("tilefontselect");

tileColorPicker.addEventListener("input", () => {
    if (activeLetterTile === null) {
        return;
    }

    const color = tileColorPicker.value;
    tileColorHex.value = color;
    activeLetterTile.style.background = color;
});

tileColorHex.addEventListener("input", () => {
    if (activeLetterTile === null) {
        return;
    }

    const value = tileColorHex.value.trim();
    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    if (isValidHex) {
        tileColorPicker.value = value;
        activeLetterTile.style.background = value;
    }
});

tileBorderColorPicker.addEventListener("input", () => {
    if (activeLetterTile === null) {
        return;
    }

    const color = tileBorderColorPicker.value;
    tileBorderColorHex.value = color;
    activeLetterTile.style.borderColor = color;
});

tileBorderColorHex.addEventListener("input", () => {
    if (activeLetterTile === null) {
        return;
    }

    const value = tileBorderColorHex.value.trim();
    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    if (isValidHex) {
        tileBorderColorPicker.value = value;
        activeLetterTile.style.borderColor = value;
    }
});

tileFontSelect.addEventListener("change", () => {
    if (activeLetterTile === null) {
        return;
    }
    activeLetterTile.style.fontFamily = tileFontSelect.value;
})

const tileFontEmbedInput = document.getElementById("tilefontembedinput");
const tileFontEmbedApply = document.getElementById("tilefontembedapply");

tileFontEmbedApply.addEventListener("click", () => {
    if (activeLetterTile === null) {
        alert("Select a letter tile first");
        return;
    }

    const pastedCode = tileFontEmbedInput.value.trim();

    if (pastedCode === "") {
        return;
    }

    const urlMatch = pastedCode.match(/https:\/\/fonts\.googleapis\.com\/css2?\?[^\s"')]+/);

    if (urlMatch === null) {
        alert("couldn't find a valid google fonts link in that code");
        return;
    }

    const fontUrl = urlMatch[0];
    const familyMatch = fontUrl.match(/family=([^&:]+)/);

    if (familyMatch === null) {
        alert("couldn't figure out the font name from that link");
        return;
    }

    const fontFamilyName = familyMatch[1].replace(/\+/g, " ");

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = fontUrl;
    document.head.appendChild(link);

    link.addEventListener("load", () => {
        activeLetterTile.style.fontFamily = "'" + fontFamilyName + "'";
        tileFontEmbedInput.value = "";
    });
});


async function generateTemplatePalette() {
    const button = document.getElementById("templatepalettebutton");
    const colorsContainer = document.getElementById("templatepalettecolors");

    button.textContent = "loading...";
    colorsContainer.innerHTML = "";
    colorsContainer.classList.add("active");

    try {
        const response = await fetch("https://vision-board-mu.vercel.app/api/palette");

        if (response.ok === false) {
            button.textContent = "couldn't load, try again";
            return;
        }

        const data = await response.json();

        data.colors.forEach((color) => {
            const swatch = document.createElement("div");
            swatch.classList.add("swatch");
            swatch.style.background = color;
            swatch.title = "Click to copy " + color;

            swatch.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(color);
                    swatch.title = "copied!";
                    setTimeout(() => {
                        swatch.title = "Click to copy " + color;
                    }, 1000);
                } catch (err) {
                    console.error("Failed to copy:", err);
                }
            });

            colorsContainer.appendChild(swatch);
        });

        button.textContent = "regenerate";
    } catch (err) {
        button.textContent = "couldn't load, try again";
        console.error("Failed to fetch palette:", err);
    }
}

document.getElementById("closestickertray").addEventListener("click", () => {
    document.getElementById("stickertray").classList.remove("active");
})

let stickerCount = 0;

document.querySelectorAll(".stickeritem").forEach((stickerThumb) => {
    stickerThumb.addEventListener("click", () => {
        placeSticker(stickerThumb.src);
    });
});

function placeSticker(imageSrc) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("placedstickerwrapper");

    const sticker = document.createElement("img");
    sticker.src = imageSrc;
    sticker.classList.add("placedsticker");

    wrapper.appendChild(sticker);

    stickerCount = stickerCount + 1;
    const offsetStack = (stickerCount % 6) * 15;

    wrapper.style.top = (60 + offsetStack) + "px";
    wrapper.style.left = (60 + offsetStack) + "px";

    templateBoard1.appendChild(wrapper);
    enableStickerDragging(wrapper);
    enableStickerRotation(wrapper);
}

function enableStickerDragging(sticker){
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    sticker.addEventListener("mousedown", (event) => {
        if(event.target.classList.contains("rotatehandle")){
            return;
        }

        isDragging = true;
        offsetX = event.clientX - sticker.offsetLeft;
        offsetY = event.clientY - sticker.offsetTop;
    });
    document.addEventListener("mousemove", (event) => {
        if (isDragging === false) {
            return;
        }

        let left = event.clientX - offsetX;
        let top = event.clientY - offsetY;

        left = Math.max(0, Math.min(left, templateBoard1.clientWidth - sticker.offsetWidth));
        top = Math.max(0, Math.min(top, templateBoard1.clientHeight - sticker.offsetHeight));

        sticker.style.left = left + "px";
        sticker.style.top = top + "px";
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}

function enableStickerRotation(sticker) {
    sticker.style.position = "relative";

    const handle = document.createElement("div");
    handle.classList.add("rotatehandle");
    handle.style.cssText = `
        width: 20px;
        height: 20px;
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        cursor: grab;
        font-size: 16px;
        text-align: center;
        color: #0e336b;
        user-select: none;
        display: none;
    `;
    handle.textContent = "↺";

    let hideTimeout = null;

    function showHandle() {
        clearTimeout(hideTimeout);
        handle.style.display = "block";
    }

    function scheduleHide() {
        hideTimeout = setTimeout(() => {
            handle.style.display = "none";
        }, 150);
    }

    sticker.addEventListener("mouseenter", showHandle);
    sticker.addEventListener("mouseleave", scheduleHide);
    handle.addEventListener("mouseenter", showHandle);
    handle.addEventListener("mouseleave", scheduleHide);

    let angle = 0;

    handle.addEventListener("mousedown", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const rect = sticker.getBoundingClientRect();
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;

        const onMove = (moveEvent) => {
            const dx = moveEvent.clientX - centerX;
            const dy = moveEvent.clientY - centerY;
            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            sticker.style.transform = `rotate(${angle}deg)`;
        };

        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });

    sticker.appendChild(handle);
}

function enableLetterTileRotation(tile) {
    tile.style.position = "absolute";

    const handle = document.createElement("div");
    handle.classList.add("rotatehandle");
    handle.style.cssText = `
        width: 18px;
        height: 18px;
        position: absolute;
        bottom: -22px;
        left: 50%;
        transform: translateX(-50%);
        cursor: grab;
        font-size: 14px;
        text-align: center;
        color: #0e336b;
        user-select: none;
        display: none;
    `;
    handle.textContent = "↺";

    let hideTimeout = null;

    function showHandle() {
        clearTimeout(hideTimeout);
        handle.style.display = "block";
    }

    function scheduleHide() {
        hideTimeout = setTimeout(() => {
            handle.style.display = "none";
        }, 150);
    }

    tile.addEventListener("mouseenter", showHandle);
    tile.addEventListener("mouseleave", scheduleHide);
    handle.addEventListener("mouseenter", showHandle);
    handle.addEventListener("mouseleave", scheduleHide);

    let angle = 0;

    handle.addEventListener("mousedown", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const rect = tile.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const onMove = (moveEvent) => {
            const dx = moveEvent.clientX - centerX;
            const dy = moveEvent.clientY - centerY;
            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            tile.style.transform = `rotate(${angle}deg)`;
        };

        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });

    tile.appendChild(handle);
}

function enableLetterTileResize(tile) {
    const handle = document.createElement("div");
    handle.classList.add("tileresizehandle");
    handle.style.cssText = `
        width: 10px;
        height: 10px;
        background: #4A90D9;
        border: 2px solid white;
        border-radius: 50%;
        box-sizing: border-box;
        position: absolute;
        bottom: -5px;
        right: -5px;
        cursor: se-resize;
        z-index: 25;
        display: none;
    `;

    let hideTimeout = null;

    function showHandle() {
        clearTimeout(hideTimeout);
        handle.style.display = "block";
    }

    function scheduleHide() {
        hideTimeout = setTimeout(() => {
            handle.style.display = "none";
        }, 150);
    }

    tile.addEventListener("mouseenter", showHandle);
    tile.addEventListener("mouseleave", scheduleHide);
    handle.addEventListener("mouseenter", showHandle);
    handle.addEventListener("mouseleave", scheduleHide);

    handle.addEventListener("mousedown", (event) => {
        event.stopPropagation();
        event.preventDefault();

        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = tile.offsetWidth;
        const startHeight = tile.offsetHeight;

        const onMove = (moveEvent) => {
            const dx = moveEvent.clientX - startX;
            const dy = moveEvent.clientY - startY;

            const newSize = Math.max(30, startWidth + Math.max(dx, dy));

            tile.style.width = newSize + "px";
            tile.style.height = newSize + "px";
        };

        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });

    tile.appendChild(handle);
}

const tileTextColorPicker = document.getElementById("tiletextcolorpicker");
const tileTextColorHex = document.getElementById("tiletextcolorhex");

tileTextColorPicker.addEventListener("input", () => {
    if (activeLetterTile ===null ) {
        return;
    }
    const color = tileTextColorPicker.value;
    tileTextColorHex.value = color;
    activeLetterTile.style.color = color;
});

tileTextColorHex.addEventListener("input", () => {
    if (activeLetterTile === null) {
        return;
    }

    const value = tileTextColorHex.value.trim();
    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    if (isValidHex) {
        tileTextColorPicker.value = value;
        activeLetterTile.style.color = value;
    }
})