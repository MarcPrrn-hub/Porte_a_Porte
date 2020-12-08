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
const parcours = {
      1:
        [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 2, 1, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
      2:
        [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0],
        [0, 0, 0, 0, 2, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
      3:
        [[0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 1, 1, 1, 0],
        [0, 0, 0, 1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0, 0, 2, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]],
}

const initial_blocks = {
    0:
    [ '</xml>' ],
    1: 
    [
      '<block type="avancer" x="20" y="160"> </block>',
      '</xml>'
    ],
    2: 
    [
      '</xml>'
    ],
    3: 
    [
      '<block type="tourner" x="20" y="160"> </block>',
      '</xml>'
    ]
}

const init_position = {
  1: 
  [5,2,1],
  2:
  [5,5,1],
  3:
  [4,6,0]
}

const log = []

const maze = {Parcours: parcours, Initial : initial_blocks , Init_pos: init_position}

export { maze } ;


//A REPRENDRE

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