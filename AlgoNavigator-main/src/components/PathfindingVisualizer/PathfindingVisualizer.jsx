import React, { useState, useEffect, useRef } from "react";
import "./PathfindingVisualizer.css";
import Node from "./components/Node";

// keep original import — if it's missing or wrong we'll fallback below
import { dijkstra as importedDijkstra, getNodesInShortestPathOrder as importedGetPath } from "./algorithms/dijkstra";


const ALGORITHM_OPTIONS = [
  { key: "dijkstra", label: "Dijkstra" },
  { key: "astar", label: "A* (A-Star)" },
  { key: "bfs", label: "BFS" },
  { key: "dfs", label: "DFS " }
];
const ALGO_INFO = {
    dijkstra: { name: "Dijkstra", time: "O(|E| + |V| log |V|)", space: "O(|V|)" },
    astar: { name: "A*", time: "Depends on heuristic", space: "O(|V|)" },
    bfs: { name: "BFS", time: "O(|V| + |E|)", space: "O(|V|)" },
    dfs: { name: "DFS", time: "O(|V| + |E|)", space: "O(|V|)" }
  };


const DEFAULTS = {
  START_NODE: { row: 5, col: 5 },
  FINISH_NODE: { row: 22, col: 22 },
  ROWS: 30,
  COLS: 30
};

export default function PathfindingVisualizer({
  rows = DEFAULTS.ROWS,
  cols = DEFAULTS.COLS
}) {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const [algorithm, setAlgorithm] = useState("dijkstra");
  const [speed, setSpeed] = useState(3);
  const [mode, setMode] = useState("draw");
  const [vizMode, setVizMode] = useState("grid");
  const [mazeType, setMazeType] = useState("random");
  const [statusText, setStatusText] = useState("Ready");
  const [visitedCount, setVisitedCount] = useState(0);
  const [frontierCount, setFrontierCount] = useState(0); // remaining in visited list
  const [animStep, setAnimStep] = useState(0); // how many animation steps executed
  const [pathLength, setPathLength] = useState(0);
  const [elapsedMs, setElapsedMs] = useState(0);
  const animStartRef = useRef(null);


  const startNodeRef = useRef(DEFAULTS.START_NODE);
  const finishNodeRef = useRef(DEFAULTS.FINISH_NODE);

  useEffect(() => {
    setGrid(createInitialGrid(rows, cols));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows, cols]);
  useEffect(() => {
  if (vizMode === "graph") {
    // graph will be reset here in later phases
    console.log("[Graph Mode] reset");
  }
  }, [vizMode]);


  function createInitialGrid(r, c) {
    const g = [];
    for (let row = 0; row < r; row++) {
      const currentRow = [];
      for (let col = 0; col < c; col++) {
        currentRow.push(createNode(row, col));
      }
      g.push(currentRow);
    }
    return g;
  }

  function createNode(row, col) {
    return {
      row,
      col,
      isStart:
        row === startNodeRef.current.row &&
        col === startNodeRef.current.col,
      isFinish:
        row === finishNodeRef.current.row &&
        col === finishNodeRef.current.col,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
    };
  }

  // ---------- Interaction handlers ----------
  const handleMouseDown = (row, col) => {
    if (isRunning) return;
    const node = grid[row][col];

    if (mode === "move-start") {
      if (node.isFinish || node.isWall) return;
      startNodeRef.current = { row, col };
      setGrid((g) => updateStartFinishInGrid(g, "start", { row, col }));
      return;
    }

    if (mode === "move-finish") {
      if (node.isStart || node.isWall) return;
      finishNodeRef.current = { row, col };
      setGrid((g) => updateStartFinishInGrid(g, "finish", { row, col }));
      return;
    }

    setGrid((g) => toggleWall(g, row, col));
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isRunning || mode !== "draw") return;
    setGrid((g) => toggleWall(g, row, col));
  };

  const handleMouseUp = () => setMouseIsPressed(false);

  function toggleWall(gridParam, row, col) {
    const newGrid = gridParam.map((r) => r.map((n) => ({ ...n })));
    const node = newGrid[row][col];
    if (node.isStart || node.isFinish) return newGrid;
    node.isWall = !node.isWall;
    return newGrid;
  }

  function updateStartFinishInGrid(gridParam, which, pos) {
    const newGrid = gridParam.map((r) => r.map((n) => ({ ...n })));
    for (const r of newGrid) {
      for (const n of r) {
        if (which === "start") n.isStart = n.row === pos.row && n.col === pos.col;
        if (which === "finish") n.isFinish = n.row === pos.row && n.col === pos.col;
      }
    }
    return newGrid;
  }

  // ---------- Controls ----------
  const clearGridClasses = () => {
    if (isRunning) return;
    const newGrid = grid.map((r) =>
      r.map((n) => ({ ...n, isVisited: false, distance: Infinity, previousNode: null }))
    );
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[0].length; c++) {
        const elem = document.getElementById(`node-${r}-${c}`);
        if (elem) elem.classList.remove("node-visited", "node-shortest-path");
      }
    }
    setGrid(newGrid);
    setStatusText("Cleared path");
  };
  // ---------------------- RESET INFO PANEL STATS ----------------------
  const resetStats = () => {
    setVisitedCount(0);
    setFrontierCount(0);
    setAnimStep(0);
    setPathLength(0);
    setElapsedMs(0);
    animStartRef.current = null;
  };

  const clearWalls = () => {
    if (isRunning) return;
    const newGrid = grid.map((r) => r.map((n) => ({ ...n, isWall: false })));
    setGrid(newGrid);
    setStatusText("Walls cleared");
  };

  const resetGrid = () => {
    if (isRunning) return;
    startNodeRef.current = DEFAULTS.START_NODE;
    finishNodeRef.current = DEFAULTS.FINISH_NODE;
    setGrid(createInitialGrid(rows, cols));
    setStatusText("Grid reset");
    resetStats();
  };


  // ---------- Maze ----------
// ---------------------- GENERATE MAZE (replace existing) ----------------------
// ---------------------- GENERATE MAZE (solvable guaranteed) ----------------------
// ---------------------- GENERATE MAZE (solvable guaranteed, supports many types) ----------------------
const generateMaze = () => {
  if (isRunning) return;

  if (!Array.isArray(grid) || grid.length === 0) {
    alert("Grid not ready");
    return;
  }

  const MAX_ATTEMPTS = 4;
  let newGrid;
  let attempts = 0;
  const s = startNodeRef.current;
  const f = finishNodeRef.current;

  do {
    switch (mazeType) {
      case "random":
        newGrid = generateRandomMaze(grid, s, f, 0.32);
        break;
      case "recursive":
        newGrid = generateRecursiveDivisionMaze(grid, s, f);
        break;
      case "recursive-backtracking":
        newGrid = generateRecursiveBacktrackingMaze(grid, s, f);
        break;
      case "binary-tree":
        newGrid = generateBinaryTreeMaze(grid, s, f);
        break;
      case "vertical":
        newGrid = generateStripedMaze(grid, s, f, "vertical", 3, 1);
        break;
      case "horizontal":
        newGrid = generateStripedMaze(grid, s, f, "horizontal", 3, 1);
        break;
      default:
        newGrid = generateRandomMaze(grid, s, f, 0.32);
    }

    // quick solvability check
    const path = findPathBFS(newGrid, s, f);
    if (path && path.length > 0) {
      setGrid(newGrid);
      setStatusText(`${mazeType} maze generated (solvable)`);
      return;
    }

    attempts += 1;
  } while (attempts <= MAX_ATTEMPTS);

  // fallback: carve a guaranteed path if repeated generation failed
  const carved = carveStraightPath(newGrid, s, f);
  setGrid(carved);
  setStatusText(`${mazeType} maze generated (carved a guaranteed path)`);
};

// ---------------------- HELPERS: Solvability check (BFS) ----------------------
function findPathBFS(gridRef, startPos, finishPos) {
  const rows = gridRef.length;
  const cols = gridRef[0].length;
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  const prev = Array.from({ length: rows }, () => Array(cols).fill(null));
  const q = [];
  q.push({ row: startPos.row, col: startPos.col });
  visited[startPos.row][startPos.col] = true;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  while (q.length > 0) {
    const cur = q.shift();
    if (cur.row === finishPos.row && cur.col === finishPos.col) {
      const path = [];
      let cr = cur.row;
      let cc = cur.col;
      while (!(cr === startPos.row && cc === startPos.col)) {
        path.unshift({ row: cr, col: cc });
        const p = prev[cr][cc];
        cr = p.row;
        cc = p.col;
      }
      path.unshift({ row: startPos.row, col: startPos.col });
      return path;
    }

    for (const [dr, dc] of directions) {
      const nr = cur.row + dr;
      const nc = cur.col + dc;
      if (nr < 0 || nr >= rows || nc < 0 || nc >= cols) continue;
      if (visited[nr][nc]) continue;
      if (gridRef[nr][nc].isWall) continue;
      visited[nr][nc] = true;
      prev[nr][nc] = { row: cur.row, col: cur.col };
      q.push({ row: nr, col: nc });
    }
  }

  return null;
}
// ---------------------- HELPER: Carve a straight (guaranteed) path ----------------------
function carveStraightPath(gridRef, startPos, finishPos) {
  const newGrid = gridRef.map((row) => row.map((n) => ({ ...n })));
  let r = startPos.row;
  let c = startPos.col;
  newGrid[r][c].isWall = false;

  // walk toward finish, clearing walls along the way.
  while (!(r === finishPos.row && c === finishPos.col)) {
    const dr = finishPos.row - r;
    const dc = finishPos.col - c;
    // prefer the larger difference to make the path direct
    if (Math.abs(dr) >= Math.abs(dc)) {
      r += Math.sign(dr);
    } else {
      c += Math.sign(dc);
    }
    newGrid[r][c].isWall = false;

    // small random sidestep occasionally to make the path less perfectly straight
    if (Math.random() < 0.18) {
      const sidestep = Math.random() > 0.5 ? 1 : -1;
      if (r + sidestep >= 0 && r + sidestep < newGrid.length) {
        newGrid[r + sidestep][c].isWall = false;
      }
      if (c + sidestep >= 0 && c + sidestep < newGrid[0].length) {
        newGrid[r][c + sidestep].isWall = false;
      }
    }
  }

  return newGrid;
}

// ---------------------- HELPER: Random Maze ----------------------
function generateRandomMaze(oldGrid, startPos, finishPos, density = 0.32) {
  const newGrid = oldGrid.map((row) =>
    row.map((n) => ({ ...n, isWall: false, isVisited: false, previousNode: null }))
  );

  for (let r = 0; r < newGrid.length; r++) {
    for (let c = 0; c < newGrid[0].length; c++) {
      if ((r === startPos.row && c === startPos.col) || (r === finishPos.row && c === finishPos.col)) {
        continue;
      }
      if (Math.random() < density) newGrid[r][c].isWall = true;
    }
  }
  return newGrid;
}

// ---------------------- HELPER: Striped Maze (vertical/horizontal) ----------------------
function generateStripedMaze(oldGrid, startPos, finishPos, orientation = "vertical", stripeThickness = 3, gap = 1) {
  const rows = oldGrid.length;
  const cols = oldGrid[0].length;
  const newGrid = oldGrid.map((row) => row.map((n) => ({ ...n, isWall: false, isVisited: false, previousNode: null })));

  if (orientation === "vertical") {
    let x = 0;
    while (x < cols) {
      for (let t = 0; t < stripeThickness && x + t < cols; t++) {
        for (let r = 0; r < rows; r++) {
          const c = x + t;
          if ((r === startPos.row && c === startPos.col) || (r === finishPos.row && c === finishPos.col)) continue;
          if (Math.random() > 0.18) newGrid[r][c].isWall = true;
        }
      }
      x += stripeThickness + gap;
    }
  } else {
    let y = 0;
    while (y < rows) {
      for (let t = 0; t < stripeThickness && y + t < rows; t++) {
        for (let c = 0; c < cols; c++) {
          const r = y + t;
          if ((r === startPos.row && c === startPos.col) || (r === finishPos.row && c === finishPos.col)) continue;
          if (Math.random() > 0.18) newGrid[r][c].isWall = true;
        }
      }
      y += stripeThickness + gap;
    }
  }

  return newGrid;
}

// ---------------------- HELPER: Recursive Division Maze ----------------------
function generateRecursiveDivisionMaze(oldGrid, startPos, finishPos) {
  const rows = oldGrid.length;
  const cols = oldGrid[0].length;
  const gridCopy = oldGrid.map((row) => row.map((n) => ({ ...n, isWall: false, isVisited: false, previousNode: null })));

  function fillWallLine(gridRef, orientation, index, aStart, aEnd, holeIndex = -1) {
    if (orientation === "h") {
      const r = index;
      for (let c = aStart; c <= aEnd; c++) {
        if (c === holeIndex) continue;
        if ((r === startPos.row && c === startPos.col) || (r === finishPos.row && c === finishPos.col)) continue;
        gridRef[r][c].isWall = true;
      }
    } else {
      const c = index;
      for (let r = aStart; r <= aEnd; r++) {
        if (r === holeIndex) continue;
        if ((r === startPos.row && c === startPos.col) || (r === finishPos.row && c === finishPos.col)) continue;
        gridRef[r][c].isWall = true;
      }
    }
  }

  function divide(gridRef, rStart, rEnd, cStart, cEnd) {
    const height = rEnd - rStart + 1;
    const width = cEnd - cStart + 1;
    if (height < 3 || width < 3) return;

    const horizontal = width <= height;

    if (horizontal) {
      const possibleRows = [];
      for (let r = rStart + 1; r <= rEnd - 1; r += 1) possibleRows.push(r);
      const wallRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
      const holeChoices = [];
      for (let c = cStart; c <= cEnd; c++) holeChoices.push(c);
      const holeCol = holeChoices[Math.floor(Math.random() * holeChoices.length)];

      fillWallLine(gridRef, "h", wallRow, cStart, cEnd, holeCol);
      divide(gridRef, rStart, wallRow - 1, cStart, cEnd);
      divide(gridRef, wallRow + 1, rEnd, cStart, cEnd);
    } else {
      const possibleCols = [];
      for (let c = cStart + 1; c <= cEnd - 1; c += 1) possibleCols.push(c);
      const wallCol = possibleCols[Math.floor(Math.random() * possibleCols.length)];
      const holeChoices = [];
      for (let r = rStart; r <= rEnd; r++) holeChoices.push(r);
      const holeRow = holeChoices[Math.floor(Math.random() * holeChoices.length)];

      fillWallLine(gridRef, "v", wallCol, rStart, rEnd, holeRow);
      divide(gridRef, rStart, rEnd, cStart, wallCol - 1);
      divide(gridRef, rStart, rEnd, wallCol + 1, cEnd);
    }
  }

  divide(gridCopy, 0, rows - 1, 0, cols - 1);

  const s = startPos;
  const f = finishPos;
  if (gridCopy[s.row] && gridCopy[s.row][s.col]) gridCopy[s.row][s.col].isWall = false;
  if (gridCopy[f.row] && gridCopy[f.row][f.col]) gridCopy[f.row][f.col].isWall = false;

  return gridCopy;
}

// ---------------------- HELPER: Recursive Backtracking Maze ----------------------
function generateRecursiveBacktrackingMaze(oldGrid, startPos, finishPos) {
  const rows = oldGrid.length;
  const cols = oldGrid[0].length;

  // Initialize everything as wall
  const newGrid = oldGrid.map((row) =>
    row.map((n) => ({ ...n, isWall: true, isVisited: false, previousNode: null }))
  );

  const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

  // To create corridors with walls between them, we operate on "cell coordinates" with step 2.
  // If the grid dimensions are even, carving still works; we clamp valid cell positions.
  const cellNeighbors = [
    [0, 2],
    [2, 0],
    [0, -2],
    [-2, 0],
  ];

  // Choose a valid starting cell near startPos (snap to an odd/even coordinate that fits stepping)
  // Prefer the startPos itself if it is within bounds.
  let sx = startPos.row;
  let sy = startPos.col;
  // If grid is small or start sits on even coordinate, we still start from startPos to keep UX simple.

  // Carve starting cell
  if (inBounds(sx, sy)) newGrid[sx][sy].isWall = false;

  // DFS stack
  const stack = [{ row: sx, col: sy }];

  while (stack.length > 0) {
    const current = stack[stack.length - 1];
    const { row, col } = current;

    // find unvisited (still-wall) neighbors two steps away
    const neighbors = [];
    for (const [dr, dc] of cellNeighbors) {
      const nr = row + dr;
      const nc = col + dc;
      if (!inBounds(nr, nc)) continue;
      if (newGrid[nr][nc].isWall) neighbors.push({ row: nr, col: nc, dr, dc });
    }

    if (neighbors.length === 0) {
      // backtrack
      stack.pop();
      continue;
    }

    // pick a random neighbor and carve path between current and neighbor
    const next = neighbors[Math.floor(Math.random() * neighbors.length)];
    const midR = row + Math.round(next.dr / 2);
    const midC = col + Math.round(next.dc / 2);

    // carve the intermediate cell and the neighbour cell
    newGrid[midR][midC].isWall = false;
    newGrid[next.row][next.col].isWall = false;

    // push neighbour
    stack.push({ row: next.row, col: next.col });
  }

  // Ensure start and finish are passages
  if (inBounds(startPos.row, startPos.col)) newGrid[startPos.row][startPos.col].isWall = false;
  if (inBounds(finishPos.row, finishPos.col)) newGrid[finishPos.row][finishPos.col].isWall = false;

  return newGrid;
}


// ---------------------- HELPER: Binary Tree Maze ----------------------
function generateBinaryTreeMaze(oldGrid, startPos, finishPos) {
  const rows = oldGrid.length;
  const cols = oldGrid[0].length;

  // 1. Start with all walls
  const newGrid = oldGrid.map(row =>
    row.map(n => ({ ...n, isWall: true, isVisited: false, previousNode: null }))
  );

  const inBounds = (r, c) => r >= 0 && r < rows && c >= 0 && c < cols;

  // 2. Binary Tree operates on every OTHER cell (checkerboard)
  for (let r = 0; r < rows; r += 2) {
    for (let c = 0; c < cols; c += 2) {

      if (!inBounds(r, c)) continue;

      // carve this cell
      newGrid[r][c].isWall = false;

      // choose a direction: North or East
      const carveNorth = inBounds(r - 2, c);
      const carveEast = inBounds(r, c + 2);

      const choices = [];
      if (carveNorth) choices.push("N");
      if (carveEast) choices.push("E");

      if (choices.length === 0) continue;

      const choice = choices[Math.floor(Math.random() * choices.length)];

      if (choice === "N") {
        // carve wall between and target cell
        newGrid[r - 1][c].isWall = false;
        newGrid[r - 2][c].isWall = false;
      } else {
        newGrid[r][c + 1].isWall = false;
        newGrid[r][c + 2].isWall = false;
      }
    }
  }

  // Ensure start/finish are not walls
  newGrid[startPos.row][startPos.col].isWall = false;
  newGrid[finishPos.row][finishPos.col].isWall = false;

  return newGrid;
}


  // ---------- Speeds ----------
  const delays = {
    1: { visited: 60, path: 40 },
    2: { visited: 35, path: 25 },
    3: { visited: 20, path: 14 },
    4: { visited: 12, path: 9 },
    5: { visited: 5, path: 3 }
  };

  // ---------- Algorithm fallback helpers ----------
  // Local fallback implementation (works for unweighted grid) — returns visited order and sets previousNode
// ---------- Utility: neighbors (kept / single source) ----------
function getNeighbors(node, gridParam) {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;
    if (r >= 0 && r < gridParam.length && c >= 0 && c < gridParam[0].length) {
      const n = gridParam[r][c];
      if (!n.isWall) neighbors.push(n);
    }
  }
  return neighbors;
}

// ---------- Local Dijkstra fallback (BFS-like for unit grid) ----------
function localDijkstra(gridParam, startNode, finishNode) {
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;
  const queue = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
  startNode.distance = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    visitedOrder.push(node);

    if (node.row === finishNode.row && node.col === finishNode.col) break;

    const neighbors = getNeighbors(node, gridParam);
    for (const nb of neighbors) {
      if (visited[nb.row][nb.col]) continue;
      visited[nb.row][nb.col] = true;
      nb.previousNode = node;
      nb.distance = node.distance + 1;
      queue.push(nb);
    }
  }
  return visitedOrder;
}

// ---------- Local BFS (explicit BFS function; similar to Dijkstra for unit graph) ----------
function localBFS(gridParam, startNode, finishNode) {
  // This is essentially the same as localDijkstra above,
  // kept separate for clarity / future changes.
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;
  const queue = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
  startNode.distance = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    visitedOrder.push(node);

    if (node.row === finishNode.row && node.col === finishNode.col) break;

    const neighbors = getNeighbors(node, gridParam);
    for (const nb of neighbors) {
      if (visited[nb.row][nb.col]) continue;
      visited[nb.row][nb.col] = true;
      nb.previousNode = node;
      nb.distance = node.distance + 1;
      queue.push(nb);
    }
  }
  return visitedOrder;
}

// ---------- Local A* (Manhattan heuristic) ----------
function manhattan(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function localAStar(gridParam, startNode, finishNode) {
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;

  // simple array priority queue (sufficient for sizes ~30x30)
  const openSet = [];
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const inOpen = Array.from({ length: rows }, () => Array(cols).fill(false));

  gScore[startNode.row][startNode.col] = 0;
  fScore[startNode.row][startNode.col] = manhattan(startNode, finishNode);
  openSet.push({ node: startNode, f: fScore[startNode.row][startNode.col] });
  inOpen[startNode.row][startNode.col] = true;

  while (openSet.length > 0) {
    // get the lowest-f entry
    openSet.sort((a, b) => a.f - b.f);
    const currentEntry = openSet.shift();
    const current = currentEntry.node;
    inOpen[current.row][current.col] = false;

    visitedOrder.push(current);

    if (current.row === finishNode.row && current.col === finishNode.col) {
      break;
    }

    const neighbors = getNeighbors(current, gridParam);
    for (const nb of neighbors) {
      const tentative_g = gScore[current.row][current.col] + 1; // unit step
      if (tentative_g < gScore[nb.row][nb.col]) {
        gScore[nb.row][nb.col] = tentative_g;
        nb.previousNode = current;
        const tentative_f = tentative_g + manhattan(nb, finishNode);
        fScore[nb.row][nb.col] = tentative_f;

        if (!inOpen[nb.row][nb.col]) {
          openSet.push({ node: nb, f: tentative_f });
          inOpen[nb.row][nb.col] = true;
        }
      }
    }
  }

  return visitedOrder;
}
// ---------- Local DFS (iterative) ----------
function localDFS(gridParam, startNode, finishNode) {
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;
  const stack = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  // push start
  stack.push(startNode);
  visited[startNode.row][startNode.col] = true;
  startNode.distance = 0;

  while (stack.length > 0) {
    const node = stack.pop();
    visitedOrder.push(node);

    if (node.row === finishNode.row && node.col === finishNode.col) {
      break;
    }

    // get neighbors; to produce a similar visual pattern to recursive DFS
    // we shuffle the neighbors so different runs look varied (optional)
    const neighbors = getNeighbors(node, gridParam);
    // shuffle in-place (Fisher-Yates) so order is random — more natural maze-like DFS
    for (let i = neighbors.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [neighbors[i], neighbors[j]] = [neighbors[j], neighbors[i]];
    }

    for (const nb of neighbors) {
      if (visited[nb.row][nb.col]) continue;
      visited[nb.row][nb.col] = true;
      nb.previousNode = node;
      nb.distance = node.distance + 1;
      stack.push(nb);
    }
  }

  return visitedOrder;
}

// ---------- Shortest-path reconstruction (keeps same behavior) ----------
function localGetNodesInShortestPathOrder(finishNode) {
  const nodes = [];
  let current = finishNode;
  while (current !== null) {
    nodes.unshift(current);
    current = current.previousNode ?? null;
  }
  return nodes;
}

// ---------- Runner: choose algorithm and invoke visualize ----------
// Replace your old runAlgorithm with this function
// ---------- Algorithm helpers (replace previous algorithm helpers with this block) ----------

// neighbors (single source)
function getNeighbors(node, gridParam) {
  const neighbors = [];
  const { row, col } = node;
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0]
  ];
  for (const [dr, dc] of directions) {
    const r = row + dr;
    const c = col + dc;
    if (r >= 0 && r < gridParam.length && c >= 0 && c < gridParam[0].length) {
      const n = gridParam[r][c];
      if (!n.isWall) neighbors.push(n);
    }
  }
  return neighbors;
}

// Ensure nodes on a fresh grid copy are initialized (clear previous run state)
function prepareGridNodes(gridCopy) {
  for (let r = 0; r < gridCopy.length; r++) {
    for (let c = 0; c < gridCopy[0].length; c++) {
      const n = gridCopy[r][c];
      n.previousNode = null;
      n.distance = Infinity;
      n.isVisited = false;
    }
  }
}

// ---------- Local Dijkstra fallback (BFS-like for unit grid) ----------
function localDijkstra(gridParam, startNode, finishNode) {
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;
  const queue = [];
  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));

  queue.push(startNode);
  visited[startNode.row][startNode.col] = true;
  startNode.distance = 0;

  while (queue.length > 0) {
    const node = queue.shift();
    visitedOrder.push(node);

    if (node.row === finishNode.row && node.col === finishNode.col) break;

    const neighbors = getNeighbors(node, gridParam);
    for (const nb of neighbors) {
      if (visited[nb.row][nb.col]) continue;
      visited[nb.row][nb.col] = true;
      nb.previousNode = node;
      nb.distance = node.distance + 1;
      queue.push(nb);
    }
  }
  return visitedOrder;
}

// ---------- Local BFS (explicit BFS function; similar to Dijkstra for unit graph) ----------
function localBFS(gridParam, startNode, finishNode) {
  // same as localDijkstra (kept separate for clarity)
  return localDijkstra(gridParam, startNode, finishNode);
}

// ---------- Local A* (Manhattan heuristic) ----------
function manhattan(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
}

function localAStar(gridParam, startNode, finishNode) {
  const visitedOrder = [];
  const rows = gridParam.length;
  const cols = gridParam[0].length;

  const openSet = [];
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const inOpen = Array.from({ length: rows }, () => Array(cols).fill(false));

  gScore[startNode.row][startNode.col] = 0;
  fScore[startNode.row][startNode.col] = manhattan(startNode, finishNode);
  openSet.push({ node: startNode, f: fScore[startNode.row][startNode.col] });
  inOpen[startNode.row][startNode.col] = true;

  while (openSet.length > 0) {
    // get entry with lowest f
    openSet.sort((a, b) => a.f - b.f);
    const currentEntry = openSet.shift();
    const current = currentEntry.node;
    inOpen[current.row][current.col] = false;

    visitedOrder.push(current);

    if (current.row === finishNode.row && current.col === finishNode.col) {
      break;
    }

    const neighbors = getNeighbors(current, gridParam);
    for (const nb of neighbors) {
      const tentative_g = gScore[current.row][current.col] + 1; // unit weight
      if (tentative_g < gScore[nb.row][nb.col]) {
        gScore[nb.row][nb.col] = tentative_g;
        nb.previousNode = current;
        const tentative_f = tentative_g + manhattan(nb, finishNode);
        fScore[nb.row][nb.col] = tentative_f;

        if (!inOpen[nb.row][nb.col]) {
          openSet.push({ node: nb, f: tentative_f });
          inOpen[nb.row][nb.col] = true;
        }
      }
    }
  }

  return visitedOrder;
}

// ---------- Shortest-path reconstruction ----------
function localGetNodesInShortestPathOrder(finishNode) {
  const nodes = [];
  let current = finishNode;
  while (current !== null) {
    nodes.unshift(current);
    current = current.previousNode ?? null;
  }
  return nodes;
}

// ---------- Runner: pick algorithm and invoke visualize ----------
const runAlgorithm = () => {
  if (isRunning) return;

  if (!Array.isArray(grid) || grid.length === 0) {
    alert("Grid appears empty.");
    return;
  }

  let algFn = null;
  let algName = algorithm;

  if (algorithm === "dijkstra") {
    algFn = (g, s, f) => {
      // try imported first (if present and function)
      if (typeof importedDijkstra === "function" && typeof importedGetPath === "function") {
        try {
          return importedDijkstra(g, s, f);
        } catch (err) {
          console.warn("[PFV] importedDijkstra failed; falling back to localDijkstra", err);
        }
      }
      return localDijkstra(g, s, f);
    };
  } else if (algorithm === "bfs") {
    algFn = localBFS;
  } else if (algorithm === "astar") {
    algFn = localAStar;
  } else if (algorithm === "dfs") {
    algFn = localDFS;
  } else {
    alert(`${ALGORITHM_OPTIONS.find((o) => o.key === algorithm)?.label} is not implemented yet.`);
    return;
  }

  visualizeAlgorithm(algFn, algName);
};

// ---------- Visualizer: general for any algorithm function ----------
const visualizeAlgorithm = (algorithmFn, algName = "algorithm") => {
  setIsRunning(true);

  // stats init
  resetStats();
  animStartRef.current = performance.now();
  setElapsedMs(0);
  setStatusText(`Running ${algName}...`);
  setVisitedCount(0);

  try {
    const gridCopy = grid.map((r) => r.map((n) => ({ ...n })));
    prepareGridNodes(gridCopy);

    const start = gridCopy[startNodeRef.current.row]?.[startNodeRef.current.col];
    const finish = gridCopy[finishNodeRef.current.row]?.[finishNodeRef.current.col];

    if (!start || !finish) {
      alert("Start or finish missing — check positions.");
      setIsRunning(false);
      setStatusText("Error: missing start/finish");
      return;
    }

    // run algorithm: returns visited order (and nodes will have previousNode set)
    const visitedNodesInOrder = algorithmFn(gridCopy, start, finish);

    if (!Array.isArray(visitedNodesInOrder)) {
      console.error("[PFV] Algorithm returned invalid visited list", visitedNodesInOrder);
      setIsRunning(false);
      setStatusText("Error");
      return;
    }

    // reconstruct path from finish
    const nodesInShortestPathOrder = localGetNodesInShortestPathOrder(finish);

    // set initial frontier count
    setFrontierCount(visitedNodesInOrder.length);

    // kick off animation using your existing animate()
    animate(visitedNodesInOrder, nodesInShortestPathOrder);
  } catch (err) {
    console.error("[PFV] visualizeAlgorithm error", err);
    alert("Error while running algorithm. See console.");
    setIsRunning(false);
    setStatusText("Error");
  }
};


  // ---------- Animation ----------
const animate = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  const delaysCfg = delays[speed] || delays[3];
  const visitedDelay = delaysCfg.visited;
  const pathDelay = delaysCfg.path;

  for (let i = 0; i <= visitedNodesInOrder.length; i++) {

    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathOrder, pathDelay);
      }, visitedDelay * i);
      return;
    }

    setTimeout(() => {
      const node = visitedNodesInOrder[i];
      const elem = document.getElementById(`node-${node.row}-${node.col}`);
      if (!elem) return;

      // 1️⃣ Mark the node as visited → FULL COLOR
      if (!elem.classList.contains("node-start") && !elem.classList.contains("node-finish")) {
        elem.classList.add("node-visited");
      }
       // Update stats
        setVisitedCount((v) => v + 1);
        setFrontierCount(Math.max(0, visitedNodesInOrder.length - (i + 1)));
        setAnimStep((s) => s + 1);
        if (animStartRef.current) {
          setElapsedMs(Math.round(performance.now() - animStartRef.current));
        }

      // 2️⃣ ONLY the *current* node gets the bubble ring
      // Prevent stacking bubbles
      if (elem.dataset.activeBubble === "1") return;
      elem.dataset.activeBubble = "1";

      const N = 8; // looks exactly like Clement, 8 bubbles
      const size = elem.offsetWidth;
      const radius = size * 0.55;
      const center = size / 2;

      for (let b = 0; b < N; b++) {
        const angle = (2 * Math.PI * b) / N;
        const dx = Math.cos(angle) * radius;
        const dy = Math.sin(angle) * radius;

        const bubble = document.createElement("span");
        bubble.className = "pfv-bubble";

        // exact Clement circle placement
        bubble.style.left = `${center + dx - 4}px`;
        bubble.style.top = `${center + dy - 4}px`;

        elem.appendChild(bubble);

        // remove bubble after the animation
        setTimeout(() => {
          bubble.remove();
        }, 600);
      }

      // Let this node be bubbled only once
      setTimeout(() => {
        elem.dataset.activeBubble = "0";
      }, 650);

    }, visitedDelay * i);
  }
};


const animateShortestPath = (nodesInShortestPathOrder, pathDelay) => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i];
      const elem = document.getElementById(`node-${node.row}-${node.col}`);
      if (!elem) return;

      // Add the persistent path class so the cell is highlighted
      if (!elem.classList.contains('node-start') && !elem.classList.contains('node-finish')) {
        elem.classList.add('node-shortest-path');
      }

      // On the last node, finish the run state
      if (i === nodesInShortestPathOrder.length - 1) {
        setIsRunning(false);
                if (i === nodesInShortestPathOrder.length - 1) {
          setIsRunning(false);
          setStatusText("Done");
          setPathLength(nodesInShortestPathOrder.length);
          if (animStartRef.current) {
            setElapsedMs(Math.round(performance.now() - animStartRef.current));
          }
        }

        setStatusText('Done');
      }
    }, pathDelay * i);
  }
};



  // ---------- Render ----------
  return (
    <div className="pfv-root">

      {/* CONTROL PANEL (top, compact 3-column layout) */}
      <div className="pfv-controls-horizontal-new">

        {/* Column 1: Algorithm + Speed + Viz Mode */}
        <div className="pfv-col">
          <h4 className="pfv-col-title">ALGORITHM</h4>
          <select
            className="select full"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isRunning}
            aria-label="Select algorithm"
          >
            {ALGORITHM_OPTIONS.map((opt) => (
              <option key={opt.key} value={opt.key}>{opt.label}</option>
            ))}
          </select>

          <h4 className="pfv-col-title small">SPEED</h4>
          <input
            type="range"
            min="1"
            max="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isRunning}
            className="slider full"
            aria-label="Speed"
          />

          <h4 className="pfv-col-title small" style={{ marginTop: 6 }}>VISUALIZATION</h4>
          <div className="viz-toggle" role="tablist" aria-label="Visualization mode">
            <button
              className={`viz-btn ${vizMode === 'grid' ? 'viz-active' : ''}`}
              onClick={() => setVizMode('grid')}
              aria-pressed={vizMode === 'grid'}
            >
              <span className="viz-ico">▦</span>
              Grid
            </button>

            <button
              className={`viz-btn ${vizMode === 'graph' ? 'viz-active' : ''}`}
              onClick={() => setVizMode('graph')}
              aria-pressed={vizMode === 'graph'}
            >
              <span className="viz-ico">🔗</span>
              Graph
            </button>
          </div>
        </div>

        {/* Column 2: Actions */}
        <div className="pfv-col">
          <h4 className="pfv-col-title">ACTIONS</h4>
          <button className="btn btn-run full" onClick={runAlgorithm} disabled={isRunning}>Run</button>
          <button className="btn btn-clear full" onClick={clearGridClasses} disabled={isRunning}>Clear Path</button>
          <button className="btn btn-reset full" onClick={clearWalls} disabled={isRunning}>Clear Walls</button>
          <button className="btn btn-reset full" onClick={resetGrid} disabled={isRunning}>Reset</button>
        </div>

        {/* Column 3: Modes + Maze */}
        <div className="pfv-col">
          <h4 className="pfv-col-title">MODES</h4>
          <div className="mode-buttons">
            <button className={`btn small ${mode === "draw" ? "btn-active" : ""}`} onClick={() => setMode("draw")} disabled={isRunning}>Draw</button>
            <button className={`btn small ${mode === "move-start" ? "btn-active" : ""}`} onClick={() => setMode("move-start")} disabled={isRunning}>Start</button>
            <button className={`btn small ${mode === "move-finish" ? "btn-active" : ""}`} onClick={() => setMode("move-finish")} disabled={isRunning}>End</button>
          </div>

          <h4 className="pfv-col-title small">MAZE</h4>
          <div className="mode-buttons">
<select
  className="select"
  value={mazeType}
  onChange={(e) => setMazeType(e.target.value)}
  disabled={isRunning}
>
  <option value="random">Random Maze</option>
  <option value="recursive">Recursive Division</option>
  <option value="recursive-backtracking">Recursive Backtracking</option>  {/* NEW */}
  <option value="binary-tree">Binary Tree</option>                      {/* NEW */}
  <option value="vertical">Vertical Lines</option>
  <option value="horizontal">Horizontal Lines</option>
</select>


            <button className="btn btn-reset small" onClick={generateMaze} disabled={isRunning}>Maze</button>
          </div>
        </div>
      </div>

      {/* GRID (centered) */}
      {/* VISUALIZATION AREA */}
{vizMode === "grid" && (
  <div className="pfv-grid-card">
    <div
      className="pfv-grid"
      onMouseLeave={() => setMouseIsPressed(false)}
    >
      {grid.map((row, r) => (
        <div key={r} className="pfv-row">
          {row.map((node, c) => (
            <Node
              key={c}
              node={node}
              onMouseDown={() => handleMouseDown(node.row, node.col)}
              onMouseEnter={() => handleMouseEnter(node.row, node.col)}
              onMouseUp={handleMouseUp}
            />
          ))}
        </div>
      ))}
    </div>
  </div>
)}

{vizMode === "graph" && (
  <div className="pfv-grid-card">
    <div style={{ padding: "90px 20px", textAlign: "center" }}>
      <h2>Graph Mode</h2>
      <p>🚧 Working on it…</p>
    </div>
  </div>
)}



      {/* INFO (bottom full width) */}
      {/* INFO (bottom full width) */}
      <div className="pfv-info-card-bottom">
        <div className="info-top">
          <div className="info-left">
            <h3>{ALGO_INFO[algorithm]?.name ?? ALGORITHM_OPTIONS.find(o => o.key===algorithm)?.label}</h3>
            <div className="algo-meta">
              <span>Time: <strong>{ALGO_INFO[algorithm]?.time ?? "—"}</strong></span>
              <span>Space: <strong>{ALGO_INFO[algorithm]?.space ?? "—"}</strong></span>
            </div>
          </div>

          <div className="info-right">
            <div className="status-line">
              <span>Status: <strong>{statusText}</strong></span>
              <button className="btn small" onClick={resetStats} disabled={isRunning}>Reset Stats</button>
            </div>
            <div className="stats-brief">
              <span>Visited: <strong>{visitedCount}</strong></span>
              <span>Frontier: <strong>{frontierCount}</strong></span>
              <span>Steps: <strong>{animStep}</strong></span>
              <span>Elapsed: <strong>{elapsedMs} ms</strong></span>
            </div>
          </div>
        </div>

        <div className="info-bottom">
          <div className="path-summary">
            <span>Path length: <strong>{pathLength}</strong></span>
            <span>Grid: <strong>{rows} × {cols}</strong></span>
          </div>

          <div className="legend-compact">
            <div className="legend-item"><span className="legend-swatch start"></span> Start</div>
            <div className="legend-item"><span className="legend-swatch finish"></span> Finish</div>
            <div className="legend-item"><span className="legend-swatch visited"></span> Visited</div>
            <div className="legend-item"><span className="legend-swatch path"></span> Final Path</div>
          </div>
        </div>
      </div>
    </div>
  );
}
