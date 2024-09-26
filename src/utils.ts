import {
  Maze,
  MazeDimensions,
  MazeCell,
  Cell,
  MazeCoordinate,
  Direction,
} from './types';

export const createEmptyMaze = ({ width, height }: MazeDimensions): Maze =>
  new Array(height).fill(new Array(width).fill(Cell.Wall));

export const updateMazeCell = (maze: Maze, cellToUpdate: MazeCell): Maze => {
  const mazeUpdate = [...maze.map((row) => [...row])];
  const { x, y, type } = cellToUpdate;
  mazeUpdate[y][x] = type;
  return mazeUpdate;
};

export const queryMaze = (maze: Maze, queryType: Cell): MazeCell[] => {
  const results: MazeCell[] = [];
  maze.forEach((yRow, y) => {
    yRow.forEach((type, x) => {
      if (queryType === type) {
        results.push({
          x,
          y,
          type,
        });
      }
    });
  });
  return results;
};

export const getCell = (maze: Maze, { x, y }: MazeCoordinate): Cell => {
  if (y < 0 || y >= maze.length || x < 0 || x >= maze[0].length) {
    return Cell.Outside;
  }
  return maze[y][x];
};

export const queryPossibleMovements = (
  maze: Maze,
  { x, y }: MazeCoordinate
): Direction[] => {
  const result: Direction[] = [];
  const freeSpaces = [Cell.Wall];
  const freeSurroundings = [...freeSpaces, Cell.Outside];
  // top
  if (freeSpaces.includes(getCell(maze, { x, y: y - 1 }))) {
    [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y - 2 })) &&
      [...freeSurroundings].includes(getCell(maze, { x, y: y - 2 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y - 2 })) &&
      result.push(Direction.Top);
  }
  // right
  if (freeSpaces.includes(getCell(maze, { x: x + 1, y }))) {
    [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y + 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 2, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 2, y })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 2, y: y + 1 })) &&
      result.push(Direction.Right);
  }
  // bottom
  if (freeSpaces.includes(getCell(maze, { x, y: y + 1 }))) {
    [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y + 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y + 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y + 2 })) &&
      [...freeSurroundings].includes(getCell(maze, { x, y: y + 2 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x + 1, y: y + 2 })) &&
      result.push(Direction.Bottom);
  }
  // left
  if (freeSpaces.includes(getCell(maze, { x: x - 1, y }))) {
    [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 1, y: y + 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 2, y: y - 1 })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 2, y })) &&
      [...freeSurroundings].includes(getCell(maze, { x: x - 2, y: y + 1 })) &&
      result.push(Direction.Left);
  }

  return result;
};

export const queryForEmptySpace = (
  maze: Maze,
  { x, y }: MazeCoordinate
): Direction[] => {
  const results: Direction[] = [];

  const emptySpaces = [Cell.Empty];

  if ([...emptySpaces].includes(getCell(maze, { x, y: y - 1 }))) {
    results.push(Direction.Top);
  }
  if ([...emptySpaces].includes(getCell(maze, { x: x + 1, y }))) {
    results.push(Direction.Right);
  }
  if ([...emptySpaces].includes(getCell(maze, { x, y: y + 1 }))) {
    results.push(Direction.Bottom);
  }
  if ([...emptySpaces].includes(getCell(maze, { x: x - 1, y }))) {
    results.push(Direction.Left);
  }
  return results;
};
