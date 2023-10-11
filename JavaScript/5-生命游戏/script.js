const gridContainer = document.getElementById("grid-container");

// 网格行数
const numRows = 20;
// 网格列数
const numCols = 20;
// 单元格尺寸
const cellSize = 20;
// 单元格DOM缓存
const cellMap = {};

let grid = new Array(numRows);

// 创建初始化网格
function createGrid() {
  for (let i = 0; i < numRows; i++) {
    grid[i] = new Array(numCols).fill(0);
  }

  gridContainer.innerHTML = "";

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("div");
      cell.style.width = cellSize + "px";
      cell.style.height = cellSize + "px";
      cell.className = grid[i][j] ? "cell alive" : "cell dead";
      cell.dataset.i = `${i}`;
      cell.dataset.j = `${j}`;
      gridContainer.appendChild(cell);
      // 缓存 cell dom
      cellMap[`${i}-${j}`] = cell;
    }
  }

  gridContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("cell")) {
      toggleCellState(target);
    }
  });
}

// 渲染网格
function renderGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      cellMap[`${i}-${j}`].className = grid[i][j] ? "cell alive" : "cell dead";
    }
  }
}

// 启动生命游戏
let intervalId = null;
function startGame() {
  // 设置更新网格的定时器，每200毫秒更新一次
  intervalId = setInterval(updateGrid, 200);
}

// 停止生命游戏
function stopGame() {
  // 清除定时器，停止游戏循环
  intervalId && clearInterval(intervalId);
}

// 清空网格
function clearGrid() {
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      grid[i][j] = 0;
    }
  }

  renderGrid();
}

// 更新网络状态
function updateGrid() {
  const newGrid = new Array(numRows);
  for (let i = 0; i < numRows; i++) {
    newGrid[i] = new Array(numCols).fill(0);
  }

  /*
  生命游戏规则：
      如果一个活细胞周围有2或3个活细胞，它将继续存活。
      如果一个活细胞周围有少于2个活细胞，它会因孤独而死亡。
      如果一个活细胞周围有超过3个活细胞，它会因拥挤而死亡。
      如果一个死细胞周围有恰好3个活细胞，它将复活。
  */
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      const neighbors = countNeighbors(i, j);
      if (grid[i][j] === 1) {
        // 活细胞规则
        if (neighbors === 2 || neighbors === 3) {
          newGrid[i][j] = 1;
        } else {
          newGrid[i][j] = 0;
        }
      } else {
        // 死细胞规则
        if (neighbors === 3) {
          newGrid[i][j] = 1;
        }
      }
    }
  }

  grid = newGrid;
  // 更新显示
  renderGrid();
}

// 计算细胞周围的活细胞数
function countNeighbors(x, y) {
  let count = 0;
  const offsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  for (const offset of offsets) {
    const neighborX = x + offset[0];
    const neighborY = y + offset[1];

    // 保证细胞动画再指定范围运动
    if (
      neighborX >= 0 &&
      neighborX < numRows &&
      neighborY >= 0 &&
      neighborY < numCols
    ) {
      count += grid[neighborX][neighborY];
    }
  }

  return count;
}

// 切换单元格状态
function toggleCellState(cell) {
  const i = +cell.dataset.i;
  const j = +cell.dataset.j;
  grid[i][j] = 1 - grid[i][j];
  cell.className = grid[i][j] ? "cell alive" : "cell dead";
}

createGrid();
renderGrid();
