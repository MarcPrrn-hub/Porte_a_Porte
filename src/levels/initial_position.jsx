const initial_position = {
    0: 
    [2,5,3],
    1: 
    [5,2,1],
    2:
    [5,5,1],
    3:
    [4,6,0]
  }

  const max_blocks = [Infinity, Infinity, 2, 5, 5, 5, 5, 10, 7, 10];

  const resultType = {
    UNSET: 0,
    SUCCESS: 1,
    FAILURE: -1,
    TIMEOUT: 2,
    ERROR: -2
  }

  const skins = 
    {
      sprite: './maze/pegman.png',
      tiles: 'maze/tiles_pegman.png'
    }
  
  export  {initial_position , max_blocks, resultType, skins} 