const container = document.getElementById('container')

const title = document.createElement('div');
title.classList.add('title');
title.innerHTML = 'Etch-a-Sketch';

const options = document.createElement('div');
options.classList.add('options');

let grid = document.createElement('div');
grid.classList.add('grid');

container.appendChild(title);
container.appendChild(grid);
container.appendChild(options);

function setSideLen(elem, size) {
  elem.style.width = `${size}px`;
  elem.style.height = `${size}px`;
};

function setGrid(gridSize, numSquares) {
  setSideLen(grid, gridSize);
  for(x=0; x<numSquares*numSquares; x++) {
      let square = document.createElement('div');
      setSideLen(square, gridSize/numSquares);
      grid.append(square);
  };
};


setGrid(960, 16);

const squares = grid.getElementsByTagName('*');


for (s=0; s<squares.length; s++) {
  squares[s].addEventListener('mouseover', (e) => e.target.style.backgroundColor = 'black');
};



