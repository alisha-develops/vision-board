const audio = document.getElementById("player");
const play = document.getElementById('play');
const music = document.getElementById('music');
const musicwindow = document.getElementById('musicwindow');

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

playRandomMusic();
loadSongs();

const genpalette = document.getElementById("generatepalette");

genpalette.addEventListener("click", () => {
    const palettewindow = document.getElementById("palettewindow");
    palettewindow.classList.toggle("active");
    if (palettewindow.classList.contains("active")) {
        generatePalette();
    }
});

async function generatePalette() {
    const response = await fetch("https://vision-board-mu.vercel.app/api/palette");
    const data = await response.json();

    document.getElementById("palettetitle").textContent = data.theme;

    const box5 = document.getElementById("palettecolors");
    box5.innerHTML = "";

    data.colors.forEach(color => {
        const swatch = document.createElement("div");
        swatch.classList.add("colorswatch");
        swatch.style.backgroundColor = color;
        swatch.title = color;
        box5.appendChild(swatch);
    });
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

document.getElementById("upload").addEventListener("click",()=> {
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

const bgcolor = document.getElementById("bgcolor");
const bgpicker = document.getElementById("bgpicker");
const board = document.getElementById("board");

bgcolor.addEventListener("click", () => {
    bgpicker.click();
});

bgpicker.addEventListener("input", () => {
    board.style.backgroundColor = bgpicker.value;
});

function createBoardItem(el) {
    const board = document.getElementById("board");
    const paper = document.createElement("div");
    paper.classList.add("boarditem");
    paper.style.cssText = `
        position: absolute;
        top: 50px;
        left: 50px;
        width: fit-content;
        cursor: move;
    `;
    paper.appendChild(el);
    board.appendChild(paper);
    enableDragging(paper);
    enableResize(paper, el);
    enableRotation(paper);
    enableSelection(paper);
}

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
            background: #664b2c;
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
        color: #664b2c;
        user-select: none;
    `;
    handle.textContent = "↺";
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
    paper.addEventListener("mousedown", () => {
         document.querySelectorAll(".boarditem").forEach(item => {
            item.style.outline = "none";
        });
        paper.style.outline = "2px dashed #664b2c";
    });
}

function deleteSelected() {
    document.querySelectorAll(".boarditem").forEach(item => {
        if (item.style.outline !== "none" && item.style.outline !== "") {
            item.remove();
        }
    });
}

function exportBoard() {
    const board = document.getElementById("board");
    html2canvas(board).then(canvas => {
        const link = document.createElement("a");
        link.download = "visionboard.png";
        link.href = canvas.toDataURL();
        link.click();
    });
}