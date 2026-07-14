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
    const response = await fetch("http://127.0.0.1:8000/api/random");
    const song = await response.json();

    audio.src = song.url;
    document.getElementById("trackname").textContent = song.title;

    try {
        await audio.play();
        play.textContent = "❚❚ pause";
    } catch (err) {
        play.textContent = "▶ play";
    }
}

async function loadSongs() {
    const response = await fetch("http://127.0.0.1:8000/api/songs");
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

document.getElementById("card1").addEventListener("click", ()=> {
    document.getElementById("templateswindow").classList.add("active");
    document.getElementById("backdrop").classList.add("active");
})
document.getElementById("closetemplates").addEventListener("click",()=> {
    document.getElementById("templateswindow").classList.remove("active");
    document.getElementById("backdrop").classList.remove("active");
})

document.getElementById("card2").addEventListener("click", ()=> {
    document.getElementById("customwindow").classList.add("active");
    document.getElementById("backdrop").classList.add("active");
})
document.getElementById("closecustom").addEventListener("click",()=> {
    document.getElementById("customwindow").classList.remove("active");
    document.getElementById("backdrop").classList.remove("active");
})

const arrow1 = document.getElementById("arrow1");
const arrow2 = document.getElementById("arrow2");
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

[arrow1, arrow2].forEach(arrow=>{
    arrow.style.position = "fixed";
    arrow.style.opacity = "0";
    arrow.style.width = "60px";
    arrow.style.transition = "opacity 0.3s ease, left 0.3s ease";
    arrow.style.pointerEvents = "none";
    arrow.style.zIndex = "999";
})

let card1Timer, card2Timer;

card1.addEventListener("mouseenter", () => {
    clearTimeout(card1Timer);
    const rect = card1.getBoundingClientRect();
    card1.style.transform = "translateX(-80px) scale(0.65) rotate(-4deg)";
    arrow2.style.top = (rect.top + rect.height/2 - 30) + "px";
    arrow2.style.left = (rect.left - 20) + "px";
    arrow2.style.opacity = "1";
    setTimeout(() => {
        arrow2.style.left = (rect.right - 80) + "px";
    }, 10);
});

card1.addEventListener("mouseleave",()=>{
    card1Timer = setTimeout(() => {
        card1.style.transform = "";
        arrow2.style.opacity ="0";
    }, 300);
});

card2.addEventListener("mouseenter", () =>{
    clearTimeout(card2Timer);
    const rect = card2.getBoundingClientRect();
    card2.style.transform = "translateX(80px) scale(0.65) rotate(4deg)";
    arrow1.style.top = (rect.top + rect.height/2 - 30) + "px";
    arrow1.style.left = (rect.left + 20) + "px";
    arrow1.style.opacity = "1";
    setTimeout(() => {
        arrow1.style.left = (rect.left - 20) + "px";
    }, 10);
});

card2.addEventListener("mouseleave", () =>{
    card2Timer= setTimeout(()=>{
        card2.style.transform = "";
        arrow1.style.opacity = "0";
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