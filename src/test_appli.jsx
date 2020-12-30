import { maze } from './levels'

maze.ROWS = maze.parcours.length;
maze.COLS = maze.parcours[0].length;
maze.SQUARE_SIZE = 50;
maze.PEGMAN_HEIGHT = 52;
maze.PEGMAN_WIDTH = 49;

maze.maze_WIDTH = maze.SQUARE_SIZE * maze.COLS;
maze.maze_HEIGHT = maze.SQUARE_SIZE * maze.ROWS;
maze.PATH_WIDTH = maze.SQUARE_SIZE / 3;

maze.DirectionType = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3
  };

  maze.ResultType = {
    UNSET: 0,
    SUCCESS: 1,
    FAILURE: -1,
    TIMEOUT: 2,
    ERROR: -2
  };

  /**
 * Result of last execution.
 */
maze.result = maze.ResultType.UNSET;

/**
 * Starting direction.
 */
maze.startDirection = maze.DirectionType.EAST;
