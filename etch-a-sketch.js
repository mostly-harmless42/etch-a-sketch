const container = document.createElement('div');
container.classList.add('container');

const title = document.createElement('div');
title.classList.add('title');
title.innerHTML = 'Etch-a-Sketch';

let grid = document.createElement('div');
grid.classList.add('grid');

const options = document.createElement('div');
options.classList.add('options');

const defaultColor = 'rgb(200, 200, 200)';

const squareColor = document.createElement('input');
squareColor.type = 'color';
squareColor.classList.add('colorSelect');
squareColor.value = rgbToHex(rgbDim(defaultColor, 60));
squareColor.addEventListener("input", (e) => setSquareColor(e.target.value));

const gridColor = document.createElement('input');
gridColor.type = 'color';
gridColor.classList.add('colorSelect');
gridColor.value = rgbToHex(defaultColor);
gridColor.addEventListener("input", (e) => setGridColor(e.target.value));

const clearButton = document.createElement('button');
clearButton.classList.add('button');
clearButton.innerHTML = 'Clear';
clearButton.onclick = () => resetSquareColor(gridColor.value);

document.body.appendChild(container);
container.append(title);
container.append(grid);
container.append(options);
options.append(squareColor);
options.append(gridColor);
options.append(clearButton);


function setGrid(gridSize, numSquares) {

  function setSideLen(elem, width, height) {
    elem.style.width = `${width}px`;
    elem.style.height = `${height}px`;
  };

  setSideLen(grid, gridSize, gridSize);
  setSideLen(options, gridSize, 200);

  let squareSize = gridSize/numSquares;
  for(n=0; n<numSquares*numSquares; n++) {
    let square = document.createElement('div');
    setSideLen(square, squareSize, squareSize);
    grid.append(square);
  };
};

setGrid(700, 16);


function setSquareColor(color) {
  const squares = grid.getElementsByTagName('*');
  for (s=0; s<squares.length; s++) {
    squares[s].addEventListener('mouseover', (e) => e.target.style.backgroundColor = color);
  };
};

setSquareColor(squareColor.value);

function resetSquareColor(color) {
  const squares = grid.getElementsByTagName('*');
  for (s=0; s<squares.length; s++) {
    squares[s].style.backgroundColor = color;
  };
};


function setGridColor(color) {
  grid.style.backgroundColor = color;
};

setGridColor(gridColor.value);

function rgbDecomp(rgbStr) {
  let [r, g, b] = rgbStr.match(/\d+/g).map(Number);
  return [r, g, b];
}

function rgbDim (rgbStr, delta) {
  let [r, g, b] = rgbDecomp(rgbStr);

  const newV = (v) => Math.max(
    0,
    Math.min(250, v - delta)
  );

  r = newV(r);
  g = newV(g);
  b = newV(b);

  return `rgb(${r}, ${g}, ${b})`;
};

function rgbToHex(rgbStr) {

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  let [r, g, b] = rgbDecomp(rgbStr);
  
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);

}

