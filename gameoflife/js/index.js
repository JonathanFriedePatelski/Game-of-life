let grid;
let rows, cols;
let interval = null;
let speed = 300;
let lastTime = 0;
let isRunning = false;
let stepCount = 0;

const presets = [
    {
        "name": "Glider",
        "image": "../gameoflife/images/glider.jpeg",
        "description": "A small pattern that moves diagonally.",
        "data": [
            {"row": 1, "col": 2},
            {"row": 2, "col": 3},
            {"row": 3, "col": 1},
            {"row": 3, "col": 2},
            {"row": 3, "col": 3}
        ]
    },
    {
        "name": "Toad",
        "image": "../gameoflife/images/toad.jpeg",
        "description": "A horizontal oscillator with a period of 2.",
        "data": [
            {"row": 2, "col": 2},
            {"row": 2, "col": 3},
            {"row": 2, "col": 4},
            {"row": 3, "col": 1},
            {"row": 3, "col": 2},
            {"row": 3, "col": 3}
        ]
    },
    {
        "name": "Blinker",
        "image": "../gameoflife/images/blinker.jpeg",
        "description": "A vertical oscillator with a period of 2.",
        "data": [
            {"row": 2, "col": 1},
            {"row": 2, "col": 2},
            {"row": 2, "col": 3}
        ]
    },
    {
        "name": "TNT",
        "image": "../gameoflife/images/tnt.jpeg",
        "description": "BOOM!",
        "data": [
            {"row": 7, "col": 40},
            {"row": 7, "col": 41},
            {"row": 8, "col": 41},
            {"row": 9, "col": 41},
            {"row": 10, "col": 40}
        ]
    }
];

function initializeGridSize() {
    const gameElement = document.getElementById('game');
    const gridWidth = gameElement.clientWidth;
    const gridHeight = gameElement.clientHeight;

    const checkboxSize = 20;
    cols = Math.floor(gridWidth / checkboxSize);
    rows = Math.floor(gridHeight / checkboxSize);

    const adjustedCheckboxWidth = Math.floor(gridWidth / cols);
    const adjustedCheckboxHeight = Math.floor(gridHeight / rows);

    grid = new Array(rows * cols).fill(0);
    gameElement.style.gridTemplateColumns = `repeat(${cols}, ${adjustedCheckboxWidth}px)`;
    gameElement.style.gridTemplateRows = `repeat(${rows}, ${adjustedCheckboxHeight}px)`;
}

function createGrid() {
    const gameElement = document.getElementById('game');
    gameElement.innerHTML = '';
    for (let i = 0; i < rows * cols; i++) {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.dataset.index = i;
        checkbox.addEventListener('change', handleCheckboxChange);
        gameElement.appendChild(checkbox);
    }
}

function handleCheckboxChange(event) {
    const index = parseInt(event.target.dataset.index);
    grid[index] = event.target.checked ? 1 : 0;
}

function applyPreset(presetData) {
    grid.fill(0);
    presetData.forEach(({ row, col }) => {
        const index = row * cols + col;
        grid[index] = 1;
    });
    updateGridUI();
}

function updateGridUI() {
    const gameElement = document.getElementById('game');
    const checkboxes = gameElement.querySelectorAll('input');
    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = grid[index] === 1;
    });
}

function computeNextState() {
    const nextGrid = new Array(rows * cols).fill(0);
    for (let i = 0; i < rows * cols; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const aliveNeighbors = countAliveNeighbors(row, col);
        if (grid[i] === 1) {
            nextGrid[i] = (aliveNeighbors === 2 || aliveNeighbors === 3) ? 1 : 0;
        } else {
            nextGrid[i] = (aliveNeighbors === 3) ? 1 : 0;
        }
    }
    grid = nextGrid;
    updateGridUI();
    stepCount++;
    document.getElementById('stepCounter').textContent = `Steps: ${stepCount}`;
}

function countAliveNeighbors(row, col) {
    let aliveCount = 0;
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i === 0 && j === 0) continue;
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                const index = newRow * cols + newCol;
                aliveCount += grid[index];
            }
        }
    }
    return aliveCount;
}

function toggleRunning() {
    isRunning = !isRunning;
    document.getElementById('playBtn').textContent = isRunning ? 'Pause' : 'Play';
    if (isRunning) {
        lastTime = 0;
        requestAnimationFrame(animate);
    }
}

function animate(timestamp) {
    if (!lastTime || timestamp - lastTime >= speed) {
        computeNextState();
        lastTime = timestamp;
    }
    if (isRunning) {
        requestAnimationFrame(animate);
    }
}

function clearGrid() {
    grid.fill(0);
    updateGridUI();
    stepCount = 0;
    document.getElementById('stepCounter').textContent = `Steps: ${stepCount}`;
}

function randomizeGrid() {
    grid = grid.map(() => Math.random() < 0.5 ? 1 : 0);
    updateGridUI();
    stepCount = 0;
    document.getElementById('stepCounter').textContent = `Steps: ${stepCount}`;
}

function updateSpeed(event) {
    const sliderValue = event.target.value;
    speed = 300 - (sliderValue - 50) * 0.25; 
    document.getElementById('speedValue').textContent = Math.round(speed);

    if (isRunning) {
        lastTime = 0;
        requestAnimationFrame(animate);
    }
}

function togglePresetPanel() {
    const panel = document.getElementById('presetPanel');
    panel.classList.toggle('open');
    const allTheThings = document.getElementById('allthethings');
    allTheThings.style.opacity = '0';
    setTimeout(() => {
        allTheThings.style.visibility = 'hidden';
    }, 500);
}

function loadPresets() {
    const panel = document.getElementById('presetPanel');
    panel.innerHTML = '';

    presets.forEach(preset => {
        const item = document.createElement('div');
        item.classList.add('presetItem');

        const img = document.createElement('img');
        img.src = preset.image;
        img.alt = preset.name;
        img.title = preset.description;

        const title = document.createElement('h3');
        title.innerText = preset.name;

        const description = document.createElement('p');
        description.innerText = preset.description;

        const button = document.createElement('button');
        button.innerText = 'Apply';
        button.classList.add('presetBtn');
        button.addEventListener('click', () => {
            applyPreset(preset.data);
            togglePresetPanel();
        });

        item.appendChild(img);
        item.appendChild(title);
        item.appendChild(description);
        item.appendChild(button);
        panel.appendChild(item);
    });
}

document.getElementById('playBtn').addEventListener('click', toggleRunning);
document.getElementById('stepBtn').addEventListener('click', computeNextState);
document.getElementById('clearBtn').addEventListener('click', clearGrid);
document.getElementById('randomBtn').addEventListener('click', randomizeGrid);
document.getElementById('speedSlider').addEventListener('input', updateSpeed);
document.getElementById('togglePresetPanelBtn').addEventListener('click', togglePresetPanel);

window.addEventListener('resize', initializeGridSize);

// Initialize the grid and presets
initializeGridSize();
createGrid();
loadPresets();