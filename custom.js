const audio = document.getElementById("player");
const play = document.getElementById('play');
const music = document.getElementById('music');
const musicwindow = document.getElementById('musicwindow');

const textSettings = document.getElementById("textsettings");
const textWindow = document.getElementById("textwindow");

music.addEventListener("click", ()=> {
    musicwindow.classList.toggle("active");
});

document.getElementById("closemusic").addEventListener("click", () => {
    musicwindow.classList.remove("active");
});

play.addEventListener("click", () => {
    if (audio.paused){
        audio.play();
        play.textContent = "❚❚ pause";
    } else {
        audio.pause();
        play.textContent = "▶ play";
    }
});

async function playRandomMusic() {
    const response = await fetch("https://vision-board-mu.vercel.app/api/random");
    const song = await response.json();

    console.log(song);

    audio.src = song.url;
    audio.load();

    document.getElementById("trackname").textContent = song.name;

    try {
        await audio.play();
        console.log("playing!");
        play.textContent = "❚❚ pause";
    } catch (err) {
        console.error("Autoplay failed:", err);
        play.textContent = "▶ play";
    }
}

async function loadSongs() {
    const response = await fetch("https://vision-board-mu.vercel.app/api/songs");
    const songs = await response.json();

    const songlist = document.getElementById("songlist");
    songlist.innerHTML = "";

    songs.forEach(song => {
        const item = document.createElement("div");
        item.classList.add("songitem");
        item.textContent = song.name;

        item.addEventListener("click", async () => {
            document.querySelectorAll(".songitem")
                .forEach(s => s.classList.remove("playing"));

            item.classList.add("playing");

            audio.src = song.url;
            document.getElementById("trackname").textContent = song.name;

            try {
                await audio.play();
                play.textContent = "❚❚ pause";
            } catch (err) {
                play.textContent = "▶ play";
            }
        });

        songlist.appendChild(item);
    });
}

// playRandomMusic();
// loadSongs();

const genpalette = document.getElementById("generatepalette");

genpalette.addEventListener("click", () => {
    const palettewindow = document.getElementById("palettewindow");
    palettewindow.classList.toggle("active");
    if (palettewindow.classList.contains("active")) {
        generatePalette();
    }
});

async function generatePalette() {
    const box5 = document.getElementById("palettecolors");
    const paletteTitle = document.getElementById("palettetitle");

    paletteTitle.textContent = "Loading palette...";
    box5.innerHTML = "";

    try {
        const response = await fetch("https://vision-board-mu.vercel.app/api/palette");

        if (response.ok === false) {
            paletteTitle.textContent = "Couldn't load palette, try again";
            return;
        }

        const data = await response.json();

        paletteTitle.textContent = data.theme;

        data.colors.forEach(color => {
            const swatch = document.createElement("div");
            swatch.classList.add("colorswatch");
            swatch.style.backgroundColor = color;
            swatch.title = "Click to copy " + color;

            swatch.addEventListener("click", async () => {
                try {
                    await navigator.clipboard.writeText(color);
                    const status = document.getElementById("copystatus");
                    status.textContent = `✓ copied ${color}`;
                    setTimeout(() => {
                        status.textContent = "";
                    }, 1200);

                    swatch.title = "copied!";
                    setTimeout(() => {
                        swatch.title = "Click to copy " + color;
                    }, 1000);
                } catch (err) {
                    console.error("Failed to copy:", err);
                }
            });
            box5.appendChild(swatch);
        });
    } catch (err) {
        paletteTitle.textContent = "Couldn't load palette, try again";
        console.error("Failed to fetch palette:", err);
    }
}

document.getElementById("regenerate").addEventListener("click", () => {
    generatePalette();
});

document.getElementById("card1").addEventListener("click", ()=> {
    desc2.style.opacity = "0";
    document.getElementById("templateswindow").classList.add("active");
    document.getElementById("backdrop").classList.add("active");
    showWindowFooter();
})
document.getElementById("closetemplates").addEventListener("click",()=> {
    document.getElementById("templateswindow").classList.remove("active");
    document.getElementById("backdrop").classList.remove("active");
})

document.getElementById("card2").addEventListener("click", ()=> {
    desc1.style.opacity = "0";
    document.getElementById("customwindow").classList.add("active");
    document.getElementById("backdrop").classList.add("active");
    showWindowFooter();
})
document.getElementById("closecustom").addEventListener("click",()=> {
    document.getElementById("customwindow").classList.remove("active");
    document.getElementById("backdrop").classList.remove("active");
})

const title = document.getElementById("title");
title.innerHTML = "my vision board!".split("").map(char =>
    `<span style="display:inline-block; opacity:0;">${char === " " ? "&nbsp;" : char}</span>`
).join("");

gsap.to(title.querySelectorAll("span"), {
    opacity: 1,
    duration: 0.05,
    stagger: 0.06,
    ease: "none",
    delay: 0.3
});

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
let card1Timer, card2Timer;

const desc1 = document.createElement("p");
const desc2 = document.createElement("p");

[desc1, desc2].forEach(desc => {
    desc.style.cssText = "position:fixed; opacity:0; font-family:Yuyu; color:#664b2c; font-size:1.8rem; pointer-events:none; z-index:999;";
    document.body.appendChild(desc);
});

function animateText(el, text) {
    el.innerHTML = text.split("").map(char => 
        `<span style="display:inline-block; opacity:0; white-space:pre;">${char}</span>`
    ).join("");
    el.style.opacity = "1";
    gsap.to(el.querySelectorAll("span"), {
        opacity: 1,
        duration: 0.02,
        stagger: 0.04,
        ease: "none"
    });
}

card1.addEventListener("mouseenter", () => {
    clearTimeout(card1Timer);
    const rect = card1.getBoundingClientRect();
    card1.style.transform = "scale(0.9)";
    desc2.style.top = (rect.top - 30) + "px";
    desc2.style.left = (rect.left + rect.width/2 - 100) + "px";
    animateText(desc2, "pick from ready made layouts!");
});

card1.addEventListener("mouseleave",()=>{
    card1Timer = setTimeout(() => {
        card1.style.transform = "";
        desc2.style.opacity ="0";
        desc2.innerHTML = "";
    }, 300);
});

card2.addEventListener("mouseenter", () =>{
    clearTimeout(card2Timer);
    const rect = card2.getBoundingClientRect();
    card2.style.transform = "scale(0.9)";
    desc1.style.top = (rect.top - 30) + "px";
    desc1.style.left = (rect.left + rect.width/2 - 100) + "px";
    animateText(desc1, "build your own from scratch!");
});

card2.addEventListener("mouseleave", () =>{
    card2Timer= setTimeout(()=>{
        card2.style.transform = "";
        desc1.style.opacity = "0";
        desc1.innerHTML = "";
    }, 300);
});

document.addEventListener("keydown", (e) => {
    if (e.key === "t") {
        document.getElementById("templateswindow").classList.add("active");
        document.getElementById("backdrop").classList.add("active");
    }
    if (e.key === "T") {
        document.getElementById("templateswindow").classList.add("active");
        document.getElementById("backdrop").classList.add("active");
    }
    if (e.key === "c") {
        document.getElementById("customwindow").classList.add("active");
        document.getElementById("backdrop").classList.add("active");
    }
    if (e.key === "C") {
        document.getElementById("customwindow").classList.add("active");
        document.getElementById("backdrop").classList.add("active");
    }
    if (e.key === "Escape") {
        document.getElementById("templateswindow").classList.remove("active");
        document.getElementById("customwindow").classList.remove("active");
        document.getElementById("backdrop").classList.remove("active");
    }
});

document.getElementById("upload").addEventListener("click", () => {
    document.getElementById("photoupload").click();
});

document.getElementById("photoupload").addEventListener("change", (e) =>{
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.classList.add("uploadedphoto");
        createBoardItem(img);
    };
    reader.readAsDataURL(file);
});

const draw = document.getElementById("draw");
const drawOptions = document.getElementById("drawoptions");

draw.addEventListener("click", (e) => {
    e.stopPropagation();

    drawOptions.style.display =
        drawOptions.style.display === "block" ? "none" : "block";
});

document.addEventListener("click", () => {
    drawOptions.style.display = "none";
});

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("drawtool")) return;
    if (e.target === draw) return;
    drawOptions.style.display = "none";
});

const bgcolor = document.getElementById("bgcolor");
const bgpicker = document.getElementById("bgpicker");
const board = document.getElementById("board");
const bghexinput = document.getElementById("bghexinput");
const bgWindow = document.getElementById("bgwindow");

bgpicker.addEventListener("input", () => {
    const color = bgpicker.value;
    bghexinput.value = color;
    board.style.backgroundColor = color;
});

bghexinput.addEventListener("input", () => {
    const value = bghexinput.value.trim();
    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    if (isValidHex) {
        bgpicker.value = value;
        board.style.backgroundColor = value;
    }
});

bgWindow.classList.remove("active");

bgcolor.addEventListener("click", () => {
    textWindow.classList.remove("active");
    bgWindow.classList.toggle("active");
});

document.getElementById("closebgwindow").addEventListener("click", () => {
    bgWindow.classList.remove("active");
});


function createBoardItem(el) {
    const board = document.getElementById("board");

    const paper = document.createElement("div");
    paper.classList.add("boarditem");

    paper.style.cssText = `
        position:absolute;
        top:50px;
        left:50px;
        width:fit-content;
        cursor:move;
    `;

    paper.appendChild(el);
    board.appendChild(paper);

    enableDragging(paper);
    enableResize(paper, el);
    enableRotation(paper);
    enableSelection(paper);
    enableSmartGuides(paper);

    return paper;
}

document.getElementById("text").addEventListener("click", () => {

    const text = document.createElement("div");

    text.classList.add("textitem");
    text.contentEditable = false;
    text.spellcheck = false;
    text.textContent = "Double-click to edit";

    activeTextItem = text;

    text.addEventListener("mousedown", () => {
        activeTextItem = text;
    });

    text.addEventListener("dblclick", () => {
        text.contentEditable = true;
        text.focus();

        const range = document.createRange();
        range.selectNodeContents(text);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    });

    text.addEventListener("blur", () => {
        text.contentEditable = false;
    });
    textSettings.style.display = "inline-block";

    const paper = createBoardItem(text);

    paper.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));

});

const textColorInput = document.getElementById("textcolor");
const hexInput = document.getElementById("hexinput");

let activeTextItem = null;

function applyTextColor(color) {
    if (activeTextItem !== null) {
        activeTextItem.style.color = color;
    }
}

textColorInput.addEventListener("input", () => {
    const color = textColorInput.value;
    hexInput.value = color;
    applyTextColor(color);
});

hexInput.addEventListener("input", () => {
    const value = hexInput.value.trim();
    const isValidHex = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(value);

    if (isValidHex) {
        textColorInput.value = value;
        applyTextColor(value);
    }
});

const fontFamilySelect = document.getElementById("fontfamily");

fontFamilySelect.addEventListener("change", () => {
    if (activeTextItem === null) {
        return;
    }

    activeTextItem.style.fontFamily = fontFamilySelect.value;
});

const bold = document.getElementById("bold");
const italic = document.getElementById("italic");
const fontSize = document.getElementById("fontsize");

bold.addEventListener("click", () => {
    if (activeTextItem === null) {
        return;
    }

    bold.classList.toggle("active");

    if (bold.classList.contains("active")) {
        activeTextItem.style.fontWeight = "bold";
    } else {
        activeTextItem.style.fontWeight = "normal";
    }
})

italic.addEventListener("click", () => {
    if (activeTextItem === null) {
        return;
    }

    italic.classList.toggle("active");

    if (italic.classList.contains("active")) {
        activeTextItem.style.fontStyle = "italic";
    } else {
        activeTextItem.style.fontStyle = "normal";
    }
});

fontSize.addEventListener("input", () => {
    if (activeTextItem === null) {
        return;
    }

    activeTextItem.style.fontSize = fontSize.value + "px";
});

textSettings.style.display = "none";
textWindow.classList.remove("active");
    textSettings.addEventListener("click", () => {
    textWindow.classList.toggle("active");
});

document.getElementById("closetextwindow").addEventListener("click", () => {
    textWindow.classList.remove("active");
});

function makeDraggable(windowElement, headerElement) {
    let isDragging = false;
    let dragOffsetX = 0;
    let dragOffsetY = 0;
    let pendingX = 0;
    let pendingY = 0;
    let rafScheduled = false;

    headerElement.addEventListener("mousedown", (event) => {
        isDragging = true;
        event.preventDefault();

        const rect = windowElement.getBoundingClientRect();
        dragOffsetX = event.clientX - rect.left;
        dragOffsetY = event.clientY - rect.top;

        document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging === false) {
            return;
        }

        pendingX = event.clientX - dragOffsetX;
        pendingY = event.clientY - dragOffsetY;

        if (rafScheduled === false) {
            rafScheduled = true;
            requestAnimationFrame(() => {
                windowElement.style.left = pendingX + "px";
                windowElement.style.top = pendingY + "px";
                rafScheduled = false;
            });
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
        document.body.style.userSelect = "";
    });
}

makeDraggable(textWindow, textWindow.querySelector("h3"));
makeDraggable(bgWindow, bgWindow.querySelector("h3"));

function enableDragging(paper){
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;
    const board = document.getElementById("board");

    paper.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("resizehandle"))return;
        if (e.target.classList.contains("rotatehandle"))return;
        isDragging = true;
        offsetX = e.clientX - paper.offsetLeft;
        offsetY = e.clientY - paper.offsetTop;
        e.preventDefault();
    });

    document.addEventListener("mousemove", (e) => {
        if(!isDragging) return;
        let left = e.clientX - offsetX;
        let top = e.clientY - offsetY;
        left = Math.max(0, Math.min(left, board.clientWidth - paper.offsetWidth));
        top = Math.max(0, Math.min(top, board.clientHeight - paper.offsetHeight));
        paper.style.left = left + "px";
        paper.style.top = top + "px";
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
}
function enableResize(paper, el){
    const corners = ["nw", "ne", "sw", "se"];
    corners.forEach(corner => {
        const handle = document.createElement("div");
        handle.classList.add("resizehandle");
        handle.style.cssText = `
            width: 12px;
            height: 12px;
            background: #4A90D9;
            border: 2px solid white;
            border-radius: 50%;
            box-sizing: border-box;
            position: absolute;
            z-index: 10;
            cursor: ${corner}-resize;
        `;
        if (corner === "nw") { 
            handle.style.top = "-6px"; 
            handle.style.left = "-6px"; 
        }
        if (corner === "ne") { 
            handle.style.top = "-6px"; 
            handle.style.right = "-6px"; 
        }
        if (corner === "sw") { 
            handle.style.bottom = "-6px"; 
            handle.style.left = "-6px"; 
        }
        if (corner === "se") { 
            handle.style.bottom = "-6px"; 
            handle.style.right = "-6px"; 
        }
        handle.style.display = "none";

        handle.addEventListener("mousedown", (e) => {
            e.stopPropagation();
            e.preventDefault();
            const startX = e.clientX;
            const startY = e.clientY;
            const startW = el.offsetWidth;
            const startH = el.offsetHeight;

            const onMove = (e) => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (corner === "se") { 
                    el.style.width = Math.max(50, startW + dx) + "px"; 
                    el.style.height = Math.max(50, startH + dy) + "px"; 
                }
                if (corner === "sw") { 
                    el.style.width = Math.max(50, startW - dx) + "px"; 
                    el.style.height = Math.max(50, startH + dy) + "px"; 
                }
                if (corner === "ne") { 
                    el.style.width = Math.max(50, startW + dx) + "px"; 
                    el.style.height = Math.max(50, startH - dy) + "px"; 
                }
                if (corner === "nw") { 
                    el.style.width = Math.max(50, startW - dx) + "px"; 
                    el.style.height = Math.max(50, startH - dy) + "px"; 
                }
            };
            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mouseup", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mouseup", onUp);
        });
        paper.appendChild(handle);
    });
}

function enableRotation(paper){
    const handle = document.createElement("div");
    handle.classList.add("rotatehandle");
    handle.style.cssText = `
        width: 24px;
        height: 24px;
        position: absolute;
        bottom: -35px;
        left: 50%;
        transform: translateX(-50%);
        cursor: grab;
        z-index: 10;
        font-size: 18px;
        text-align: center;
        color: #4A90D9;
        user-select: none;
    `;
    handle.textContent = "↺";
    handle.style.display = "none";
    let angle = 0;

    handle.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        e.preventDefault();
        const rect = paper.getBoundingClientRect();
        const centerX = rect.left + rect.width/2;
        const centerY = rect.top + rect.height/2;

        const onMove = (e) => {
            const dx = e.clientX - centerX;
            const dy = e.clientY - centerY;
            angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
            paper.style.transform = `rotate(${angle}deg)`;
        };
        const onUp = () => {
            document.removeEventListener("mousemove", onMove);
            document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });
    paper.appendChild(handle);
}

function enableSelection(paper){
    paper.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        deselectAll();

        paper.classList.add("selected");
        paper.style.outline = "2px solid #4A90D9";
        paper.querySelectorAll(".resizehandle, .rotatehandle").forEach(handle => {
            handle.style.display = "block";
        });

        showControls(paper);
    });
}

function deselectAll() {
    document.querySelectorAll(".boarditem").forEach(item => {
        item.style.outline = "none";
        item.classList.remove("selected");
        item.querySelectorAll(".resizehandle, .rotatehandle").forEach(handle => {
            handle.style.display = "none";
        });
    });
    hideControls();
}
document.getElementById("board").addEventListener("mousedown", (e) => {
    deselectAll();
});


function showControls(paper){
    let panel = document.getElementById("controlpanel");
    if(!panel) {
        panel = document.createElement("div");
        panel.id = "controlpanel";
        panel.style.cssText =`
            position: fixed;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(243, 211, 174, 0.97);
            border: 2px dashed #664b2c;
            border-radius: 10px;
            padding: 8px 15px;
            display: flex;
            gap: 10px;
            z-index: 9999;
            font-family: Yuyu;
        `;
        document.body.appendChild(panel);
    }
    panel.innerHTML = "";
    panel.style.display = "flex";

    const buttons = [
        { label: "↑ front", action: () => { 
            paper.style.zIndex = getMaxZ() + 1; 
        }},
        { label: "↓ back", action: () =>{ 
            paper.style.zIndex = Math.max(0, getMinZ() - 1); 
        }},
        { label: "🗑 delete", action: () => { 
            paper.remove(); hideControls(); 
        }},
    ];

    buttons.forEach(btn => {
        const b = document.createElement("button");
        b.textContent = btn.label;
        b.style.cssText = `
            background: transparent;
            border: 1px dashed #664b2c;
            color: #664b2c;
            padding: 4px 10px;
            border-radius: 6px;
            cursor: pointer;
            font-family: Yuyu;
            font-size: 0.8rem;
        `;
        b.addEventListener("click", btn.action);
        panel.appendChild(b);
    });
}

function hideControls() {
    const panel = document.getElementById("controlpanel");
    if(panel){
        panel.style.display = "none";
    }
}

function getMaxZ() {
    let max = 0;
    document.querySelectorAll(".boarditem").forEach(item => {
        const z = parseInt(item.style.zIndex);
        if (z > max) max = z;
    });
    return max;
}

function getMinZ() {
    let min = 999;
    document.querySelectorAll(".boarditem").forEach(item => {
        const z = parseInt(item.style.zIndex);
        if (z < min) min = z;
    });
    return min;
}

function deleteSelected() {
    document.querySelectorAll(".boarditem.selected").forEach(item => {
        item.remove();
    });
    hideControls();
}

function clearBoard() {
    const board = document.getElementById("board");
    board.innerHTML = "";
    board.style.background = "";
    board.style.backgroundColor = "";
    board.style.backgroundImage = "";
    deselectAll();
    hideControls();
}

function exportBoard() {
    html2canvas(document.getElementById("board"),{
        scale: 3
    }).then(canvas => {
        const link = document.createElement("a");
        link.download = "visionboard.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}
document.getElementById("empty").addEventListener("click", clearBoard);
document.getElementById("export").addEventListener("click", exportBoard);
