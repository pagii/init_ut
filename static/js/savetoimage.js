const saveBtn = document.getElementById("saveBtn");
saveBtn.addEventListener("click", toImage);


function toImage(){
    console.log("hello");
    const hello = document.getElementById("rectSpace");
    html2canvas(hello).then(function(canvas) {
        // Export the canvas to its data URI representation
        var base64image = canvas.toDataURL("image/png");
    
        // Open the image in a new window
        window.open(base64image , "");
    });
    html2canvas(hello, {
        allowTaint: true,
        foreignObjectRendering: true
    });
}