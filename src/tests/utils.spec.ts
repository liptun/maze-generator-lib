import { queryPossibleMovements, queryForEmptySpace } from './../utils';
import { MazeDimensions, MazeCell, Cell, Direction } from '../types';
import { createEmptyMaze, updateMazeCell, queryMaze } from '../utils';

const mazeDimensions: MazeDimensions = {
  width: 8,
  height: 8,
};

describe('createEmptyMaze()', () => {
  it('should create empty maze with specified dimensions', () => {
    const maze = createEmptyMaze(mazeDimensions);
    expect(maze).toHaveLength(8);
    maze.forEach((el) => expect(el).toHaveLength(8));
  });

  it('should have each cell of the new maze as a wall', () => {
    const maze = createEmptyMaze(mazeDimensions);
    maze.forEach((x) => x.forEach((y) => expect(y).toEqual(Cell.Wall)));
  });
});

describe('updateMazeCell()', () => {
  it('should update one cell and return new maze array', () => {
    const maze = createEmptyMaze(mazeDimensions);
    const cellToUpdate: MazeCell = { x: 3, y: 4, type: Cell.Empty };
    const mazeUpdated = updateMazeCell(maze, cellToUpdate);

    expect(maze).not.toEqual(mazeUpdated);
    expect(maze[4][3]).not.toEqual(cellToUpdate.type);
    expect(mazeUpdated[4][3]).toEqual(cellToUpdate.type);
  });
});

describe('queryMaze', () => {
  it('should query all wall elements', () => {
    const maze = createEmptyMaze(mazeDimensions);
    const query = Cell.Wall;
    const results = queryMaze(maze, query);
    expect(results).toHaveLength(64);
    results.forEach((result) => expect(result.type).toEqual(query));
  });

  it('should query entrance element', () => {
    let maze = createEmptyMaze(mazeDimensions);
    maze = updateMazeCell(maze, {
      x: 0,
      y: 0,
      type: Cell.Entrance,
    });
    const query = Cell.Entrance;
    const results = queryMaze(maze, query);
    expect(results).toHaveLength(1);
    results.forEach((result) => expect(result.type).toEqual(query));
  });
});

describe('queryPossibleMovements()', () => {
  it('should allow possible moves to be bottom and right', () => {
    const maze = createEmptyMaze(mazeDimensions);
    const possibleMovements = queryPossibleMovements(maze, { x: 0, y: 0 });
    expect(possibleMovements).toHaveLength(2);
    expect(possibleMovements).toEqual([Direction.Right, Direction.Bottom]);
  });

  it('should allow possible moves to be top, left, and right', () => {
    let maze = createEmptyMaze(mazeDimensions);
    maze = updateMazeCell(maze, { x: 4, y: 7, type: Cell.Entrance });
    const possibleMovements = queryPossibleMovements(maze, { x: 4, y: 6 });
    expect(possibleMovements).toHaveLength(3);
    expect(possibleMovements).toEqual([
      Direction.Top,
      Direction.Right,
      Direction.Left,
    ]);
  });
});

describe('queryForEmptySpace', () => {
  it('should return four possible directions', () => {
    let maze = createEmptyMaze(mazeDimensions);
    maze = updateMazeCell(maze, { x: 2, y: 3, type: Cell.Empty });
    maze = updateMazeCell(maze, { x: 4, y: 3, type: Cell.Empty });
    maze = updateMazeCell(maze, { x: 3, y: 2, type: Cell.Empty });
    maze = updateMazeCell(maze, { x: 3, y: 4, type: Cell.Empty });
    expect(queryForEmptySpace(maze, { x: 3, y: 3 })).toHaveLength(4);
  });

  it('should return two possible directions', () => {
    let maze = createEmptyMaze(mazeDimensions);
    maze = updateMazeCell(maze, { x: 2, y: 3, type: Cell.Empty });
    maze = updateMazeCell(maze, { x: 3, y: 4, type: Cell.Empty });
    expect(queryForEmptySpace(maze, { x: 3, y: 3 })).toHaveLength(2);
  });
});
