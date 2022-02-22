let gridSize = 800;
let clearColor = 'rgb(220, 220, 220)';
let paintColor = 'rgb(140, 140, 140)';
let delta = 40;
let numSquares = 16;
let squares = [];

const container = document.createElement("div");
container.classList.add("container")
container.style.display = 'flex';
container.style.flexDirection = 'column';
container.style.alignItems = 'center';

const title = document.createElement("div");
title.classList.add("title");
title.innerHTML = 'Etch-a-Sketch';

const grid = document.createElement("div");
grid.classList.add('grid')
grid.style.display = 'flex';
grid.style.flexWrap = 'wrap';

const options = document.createElement("div");
options.classList.add("options");
options.style.display = 'flex';
options.style.justifyContent = 'space-around';
options.style.alignItems = 'center';
options.style.width = `${gridSize}px`;

const paintColorSelect = document.createElement("input");
paintColorSelect.id = 'paintColorSelect';
paintColorSelect.type = 'color';
paintColorSelect.value = rgbToHex(paintColor);

const pcsLabel = document.createElement("label");
pcsLabel.setAttribute("for", "paintColorSelect");
pcsLabel.innerHTML = 'Paint Color: ';
pcsLabel.append(paintColorSelect);

paintColorSelect.addEventListener("input", (e) => paintColor = e.target.value);

const clearColorSelect = document.createElement("input");
clearColorSelect.id = 'clearColorSelect';
clearColorSelect.type = 'color';
clearColorSelect.value = rgbToHex(clearColor);
clearColorSelect.addEventListener("input", (e) => clearColor = e.target.value);

const ccsLabel = document.createElement("label");
ccsLabel.setAttribute("for", "clearColorSelect");
ccsLabel.innerHTML = 'Clear Color:';
ccsLabel.append(clearColorSelect);


const clearButton = document.createElement("button");
clearButton.classList.add("clear-button");
clearButton.style.display = 'flex';
clearButton.style.justifyContent = 'center';
clearButton.style.alignItems = 'center';
clearButton.style.width = '60px';
clearButton.style.height = '30px';
clearButton.innerHTML = 'CLEAR';

const darkenCheck = document.createElement("input");
darkenCheck.id = 'darkenCheck'
darkenCheck.classList.add("darken-check")
darkenCheck.type = 'checkbox';

const dcLabel = document.createElement("label");
dcLabel.setAttribute("for", "darkenCheck");
dcLabel.innerHTML = 'Darken:';
dcLabel.append(darkenCheck);

document.body.append(container);
container.append(title);
container.append(grid);
container.append(options)
options.append(pcsLabel);
options.append(ccsLabel);
options.append(dcLabel);
options.append(clearButton);


function setSize(elem, size) {
  elem.style.width = `${size}px`;
  elem.style.height = `${size}px`;
};

setSize(grid, gridSize);

function makeSquares(numSqrs) {
  for(x=0; x<numSquares*numSquares; x++) {
    let square = document.createElement("div");
    setSize(square, gridSize/numSquares);
    grid.append(square);
    squares[x] = square;
    square.style.backgroundColor = clearColor;
  };
};

makeSquares(numSquares);

function addEvents() {
  for(s=0; s<squares.length; s++) {
    squares[s].addEventListener("mouseover", (e) => 
    e.target.style.backgroundColor = getColor(e.target.style.backgroundColor));
  };
};

function getColor(color) {
  if(color !== clearColor && darkenCheck.checked) return darkenRGB(color);
  else return paintColor;
}

addEvents();

clearButton.addEventListener("click", (e) => clear(clearColor));

function clear() {
  for(s=0; s<squares.length; s++) {
    squares[s].style.backgroundColor = clearColor;
  };
};


function darkenRGB(rgbStr, d=delta) {
  let [r, g, b] = rgbStr.match(/\d+/g);



  r = Math.max(0, r-d);
  b = Math.max(0, b-d);
  g = Math.max(0, g-d);

  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgbStr) {
  let [r, g, b] = rgbStr.match(/\d+/g);

  r = Number(r).toString(16);
  g = Number(g).toString(16);
  b = Number(b).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;

}