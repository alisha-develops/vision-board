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
            width:150px;
            height: 150px;
            object-fit:cover;
            border: 5px dashed #664b2c;
            border-radius: 8px;
            position: absolute;
            top: 50px;
            left: 50px;
            cursor: move;
        `;
        img.classList.add("uploadedphoto");
        document.getElementById("customwindow").appendChild(img);
        makeDraggable(img);
    };
    reader.readAsDataURL(file);
});

function makeDraggable(el){
    let startX, startY, startLeft, startTop;

    el.addEventListener("mousedown", (e) => {
        startX = e.clientX;
        startY = e.clientY;
        startLeft = el.offsetLeft;
        startTop = el.offsetTop;

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
    });
    function onMove(e){
        el.style.left = (startLeft +e.clientX - startX)+ "px";
        el.style.top = (startTop +e.clientY - startY)+ "px";
    }
    function onUp() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
    }
}