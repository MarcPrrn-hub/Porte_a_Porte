
import parcours from './parcours';
import initial_blocks from './initial_blocks';
import affichage from './affichage';
import initial_position from './initial_position'
const maze = {Parcours: parcours, Initial : initial_blocks , Init_pos: initial_position, Affichage: affichage}

export { maze } ;


//A REPRENDRE
/*
const block_max = [ 50 , 50 ] ;

const resultType = {
  UNSET: 0,
  SUCCESS: 1,
  FAILURE: -1,
  TIMEOUT: 2,
  ERROR: -2
}

const param = {
    WALL: 0,
    OPEN:  1,
    START: 2,
    FINISH: 3
}

const skins = 
    {
      sprite: 'maze/pegman.png',
      tiles: 'maze/tiles_pegman.png'
    }
  */


/*
const log = []
*/ 


/*Maze.reset = function(first) {
  // Kill all tasks.
  for (var i = 0; i < Maze.pidList.length; i++) {
    clearTimeout(Maze.pidList[i]);
  }
  Maze.pidList = [];

  // Move Pegman into position.
  Maze.pegmanX = Maze.start_.x;
  Maze.pegmanY = Maze.start_.y;

  if (first) {
    // Opening animation.
    Maze.pegmanD = Maze.startDirection + 1;
    Maze.scheduleFinish(false);
    Maze.pidList.push(setTimeout(function() {
      Maze.stepSpeed = 100;
      Maze.schedule([Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4],
                    [Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4 - 4]);
      Maze.pegmanD++;
    }, Maze.stepSpeed * 5));
  } else {
    Maze.pegmanD = Maze.startDirection;
    Maze.displayPegman(Maze.pegmanX, Maze.pegmanY, Maze.pegmanD * 4);
  }

  // Move the finish icon into position.
  var finishIcon = document.getElementById('finish');
  finishIcon.setAttribute('x', Maze.SQUARE_SIZE * (Maze.finish_.x + 0.5) -
      finishIcon.getAttribute('width') / 2);
  finishIcon.setAttribute('y', Maze.SQUARE_SIZE * (Maze.finish_.y + 0.6) -
      finishIcon.getAttribute('height'));

  // Make 'look' icon invisible and promote to top.
  var lookIcon = document.getElementById('look');
  lookIcon.style.display = 'none';
  lookIcon.parentNode.appendChild(lookIcon);
  var paths = lookIcon.getElementsByTagName('path');
  for (var i = 0, path; (path = paths[i]); i++) {
    path.setAttribute('stroke', Maze.SKIN.look);
  }
};
*/

/*
  BlocklyInterface.nextLevel = function() {
  if (BlocklyGames.LEVEL < BlocklyGames.MAX_LEVEL) {
    window.location = window.location.protocol + '//' +
        window.location.host + window.location.pathname +
        '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1) +
        '&skin=' + Maze.SKIN_ID;
  } else {
    BlocklyInterface.indexPage();
  }
};


*/ 