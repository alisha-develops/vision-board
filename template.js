function openTemplate(num) {
    document.getElementById("templateswindow").style.display = "none";
    document.getElementById("template" + num).style.display = "block";
}

function closeTemplate(num) {
    document.getElementById("template" + num).style.display = "none";
    document.getElementById("templateswindow").style.display = "block";
}