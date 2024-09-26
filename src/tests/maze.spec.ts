import { mazeGenerator } from '../maze';
import { Maze, MazeGeneratorOptions } from './../types';

const mazeOptions: MazeGeneratorOptions = {
  width: 8,
  height: 8,
  seed: 'test',
};

describe('mazeGenerator()', () => {
  it('Should generate empty maze', () => {
    const gen = mazeGenerator(mazeOptions);
    const maze = gen.next().value as Maze;
    expect(maze).toHaveLength(mazeOptions.height);
    expect(maze[0]).toHaveLength(mazeOptions.width);
  });
});
