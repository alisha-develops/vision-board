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
        img.style.cssText = `
            position: absolute;
            top: 50px;
            left: 50px;
            cursor: move;
            max-width: 300px;
        `;
        img.classList.add("uploadedphoto");
        document.getElementById("customwindow").appendChild(img);
        makeDraggable(img);
    };
    reader.readAsDataURL(file);
});

function makeDraggable(el){
    el.style.userSelect ="none";

    const paper = document.createElement("div");
        paper.style.cssText=`
        position: absolute;
        top:50px;
        left:50px;
        width:fit-content;
        cursor: move;
    `;

    const grid= document.createElement("div");
    grid.style.cssText =`
        position: absolute;
        top: 0;
        left:0;
        width: 100%;
        height:100%;
        pointer-events:none;
        background-image:linear-gradient(rgba(102,75,44,0.3) 1px, transparent 1px),linear-gradient(90deg, rgba(102,75,44,0.3) 1px, transparent 1px);
        background-size: 20px 20px;
        z-index: 5;
    `;

    el.style.cssText = `
        display: block;
        max-width: 300px;
        cursor: move;
    `;

    const corners =["nw", "ne", "sw", "se"];
    corners.forEach(corner =>{
        const handle = document.createElement("div");
        handle.style.cssText =`
            width: 12px;
            height: 12px;
            background: #664b2c;
            position: absolute;
            z-index: 10;
            cursor: ${corner}-resize;
        `;
        if(corner === "nw"){
            handle.style.top = "-6px";
            handle.style.left = "-6px";
        }
        if(corner === "ne"){
            handle.style.top = "-6px";
            handle.style.right = "-6px";
        }
        if(corner === "sw"){
            handle.style.bottom = "-6px";
            handle.style.left = "-6px";
        }
        if(corner === "se"){
            handle.style.bottom = "-6px";
            handle.style.right = "-6px";
        }

        handle.addEventListener("mousedown", (e) =>{
            e.stopPropagation();
            e.preventDefault();

            const startX = e.clientX;
            const startY = e.clientY;
            const startW = el.offsetWidth;
            const startH = el.offsettHeight;

            const onMove = (e) => {
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;

                if(corner === "se"){
                    el.style.width = Math.max(50, startW + dx) + "px";
                    el.style.height = Math.max(50, startH + dy) + "px";
                }
                if(corner === "sw"){
                    el.style.width = Math.max(50, startW - dx) + "px";
                    el.style.height = Math.max(50, startH + dy) + "px";
                }
                if(corner === "ne"){
                    el.style.width = Math.max(50, startW + dx) + "px";
                    el.style.height = Math.max(50, startH - dy) + "px";
                }
                if(corner === "nw"){
                    el.style.width = Math.max(50, startW - dx) + "px";
                    el.style.height = Math.max(50, startH - dy) + "px";
                }
            };

            const onUp = () => {
                document.removeEventListener("mousemove", onMove);
                document.removeEventListener("mousemove", onUp);
            };
            document.addEventListener("mousemove", onMove);
            document.addEventListener("mousemove", onUp);
        });
        paper.appendChild(handle);
    });

    const rotate = document.createElement("div")
    

    el.parentNode.insertBefore(paper, el);
    paper.appendChild(el);
    paper.appendChild(grid);
}