let container = document.createElement("div");
let global_width = 800;


container.style.width = global_width + "px";
container.style.height = global_width + "px";
container.style.display = "flex";
container.style.flexWrap = "wrap";
container.style.alignItems = "center";
container.style.backgroundColor = "white";
container.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";

let body = document.querySelector("body");
body.style.display = "flex";
body.style.flexWrap= "wrap";
body.style.alignItems = "center";
body.style.justifyContent = "center";
body.style.gap = "10px";
body.style.marginTop = "20px";
body.style.backgroundColor = "lightgray";

let header = document.createElement("h1");
header.textContent = "Etch n' Sketch";
body.appendChild(header);

let left = document.createElement("div");
left.style.display = "flex";
left.style.width = "150px";
left.style.height = global_width/2 + "px";
left.style.flexDirection = "column";
left.style.alignItems = "center";
left.style.justifyContent = "space-between";
left.style.gap = "10px";
body.appendChild(left);

let left_down = document.createElement("div");
left_down.style.display = "flex";
left_down.style.flexDirection = "column";
left_down.style.alignItems = "center";
left_down.style.justifyContent = "flex-start";
left_down.style.gap = "10px";
left.appendChild(left_down);
let left_up = document.createElement("div");
left_up.style.display = "flex";
left_up.style.flexDirection = "column";
left_up.style.alignItems = "center";
left_up.style.justifyContent = "flex-start";
left_up.style.gap = "10px";
left.appendChild(left_up);

let right = document.createElement("div");
right.style.display = "flex";
right.style.flexDirection = "row";
right.style.alignItems = "center";
right.style.justifyContent = "center";
right.style.gap = "10px";
body.appendChild(right);


let size = 16;
let Draw = false;
let color = false;
let rainbow = false;
let eraser = false;
let opacity =1.0;
let pickedColor = "#000000";
let savedGrid = [];
document.body.addEventListener("mousedown", function() {
    Draw = true;
});
document.body.addEventListener("mouseup", function() {
    Draw = false;
});

function saveGrid(){
    savedGrid = [];
    let cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell) {
        savedGrid.push({color: cell.style.backgroundColor, opacity: cell.style.opacity}
        );
    });
}
function loadSavedGrid(){
    let cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell, index) {
        cell.style.backgroundColor = savedGrid[index].color;
        cell.style.opacity = savedGrid[index].opacity;
    });
}

let newSize = document.createElement("button") ;
newSize.textContent = "Change Grid Size";
newSize.addEventListener("click", function() {
    saveGrid();
    let prevsize = size;
    size = prompt("Enter new grid size of max size 100:");
    if (size > 100 || size < 1 || isNaN(size))  {
        container.innerHTML = "";
        alert("Wrong size, input correct size.");
        createGrid(prevsize);
        loadSavedGrid();
        size = prevsize;
    }
    else {
        container.innerHTML = "";
        createGrid(size);
    }
    
});


let clear_btn = document.createElement("button");
clear_btn.textContent = "Clear Grid";
clear_btn.addEventListener("click", function() {
    let cells = document.querySelectorAll(".cell");
    cells.forEach(function(cell) {
        cell.style.backgroundColor = "white";
    });
});



let eraser_btn = document.createElement("button");
eraser_btn.textContent = "Eraser";
eraser_btn.addEventListener("click", function() {
    rainbow = false;
    color = false;
    eraser= true;
});

let rainbow_btn = document.createElement("button");
rainbow_btn.textContent = "Rainbow Mode";
rainbow_btn.addEventListener("click", function() {
    rainbow = true;
    color = false;
    eraser = false;
});

let color_picker = document.createElement("input");
color_picker.type = "color";
color_picker.value = pickedColor;
color_picker.textContent = "Color Mode";
color_picker.addEventListener("input", function() {
    pickedColor = color_picker.value;
    rainbow = false;
    color = true;
    eraser = false;
});

let black_btn = document.createElement("button");
black_btn.textContent = "Black Color Mode";
black_btn.addEventListener("click", function() {
    rainbow = false;
    color = false;
    eraser =false
});

let opacity_slider = document.createElement("input");
opacity_slider.type = "range";
opacity_slider.min = 0.1;
opacity_slider.max = 1.0;
opacity_slider.step = 0.1;
opacity_slider.value = opacity;
opacity_slider.addEventListener("input", function() {
    opacity = opacity_slider.value;
});
left_down.appendChild(black_btn);
left_down.appendChild(color_picker);
left_down.appendChild(rainbow_btn);
left_down.appendChild(eraser_btn);
left_down.appendChild(opacity_slider);  

left_up.appendChild(newSize);
left_up.appendChild(clear_btn);
    let cells = document.querySelectorAll(".cell");
function drawCell(cell) {
    if (color === false && rainbow === false && eraser === false) {
        cell.style.backgroundColor = "black";
        cell.style.opacity = opacity;
    }
    else if (color === true) {
        cell.style.backgroundColor = pickedColor;
        cell.style.opacity = opacity;
    }
    else if (rainbow === true) {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        cell.style.backgroundColor = `rgb(${randomR}, ${randomG}, ${randomB})`;
        cell.style.opacity = opacity;
    }
    else if (eraser === true) {
        cell.style.backgroundColor = "white";
        cell.style.opacity = 1.0;
    }
};

function createGrid(size) {for (let i = 0; i < size; i++) {
    let row = document.createElement("div");
    row.style.display = "flex";
    container.appendChild(row);
    for (var j = 0; j < size; j++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.style.width = (global_width / size) + "px";
        cell.style.height = (global_width / size) + "px";
        cell.style.boxSizing = "border-box";
        cell.addEventListener("mouseover", function() {
            if (Draw) {
                drawCell(cell);
            }   
        });
        cell.addEventListener("dragstart", function(e) {
            e.preventDefault();
        }   );  
        cell.addEventListener("mousedown", function() {
            drawCell(cell);
        });
        row.appendChild(cell);
    }
    container.appendChild(row);
}   };
createGrid(16);
right.appendChild(container);

