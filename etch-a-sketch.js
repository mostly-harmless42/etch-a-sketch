let clearColor = 'rgb(220, 220, 220)';
let paintColor = 'rgb(150, 150, 150)';
let gridSize = 800;
let delta = 40;

const container = document.createElement("div");
container.classList.add("container")


const title = document.createElement("div");
title.classList.add("title");
title.innerHTML = 'Etch-a-Sketch';

const grid = document.createElement("div");
grid.classList.add('grid');

const options = document.createElement("div");
options.classList.add("options");
options.style.width = `${gridSize}px`;

const numSqrSlider = document.createElement("input");
numSqrSlider.classList.add("numSqrSlider");
numSqrSlider.type = 'range';
numSqrSlider.min = '4';
numSqrSlider.max = '100';
numSqrSlider.value = 21;
numSqrSlider.addEventListener("change", (e) => {
  removeSquares();
  makeSquares(e.target.value)
})

const paintColorSelect = document.createElement("input");
paintColorSelect.id = 'paintColorSelect';
paintColorSelect.type = 'color';
paintColorSelect.value = rgbToHex(paintColor);
paintColorSelect.addEventListener("input", (e) => paintColor = e.target.value);

const pcsLabel = document.createElement("label");
pcsLabel.setAttribute("for", "paintColorSelect");
pcsLabel.innerHTML = 'Paint Color: ';
pcsLabel.append(paintColorSelect);


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
options.append(numSqrSlider);
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
  let sqrSize = gridSize/numSqrs;
  setSize(grid, sqrSize*numSqrs);
  for(x=0; x<numSqrs*numSqrs; x++) {
    let square = document.createElement("div");
    square.style.flex = `0 0 ${sqrSize/gridSize*100}%`;
    grid.append(square);
    square.classList.add("square");
    square.style.backgroundColor = clearColor;
  };
  let squares = document.getElementsByClassName("square");
  addEvents(squares);
};

makeSquares(numSqrSlider.value);

function removeSquares() {
  let squares = document.getElementsByClassName("square");
  while(squares[0]) {
    squares[0].parentElement.removeChild(squares[0]);
  }
}

function addEvents(sqrs) {
  for(s=0; s<sqrs.length; s++) {
    sqrs[s].addEventListener("mouseover", (e) => 
    e.target.style.backgroundColor = getColor(e.target.style.backgroundColor));
  };
};

function getColor(color) {
  if(darkenCheck.checked) return darkenRGB(color);
  else return paintColor;
}



clearButton.addEventListener("click", (e) => clear(clearColor));

function clear() {
  let squares = document.getElementsByClassName("square");
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