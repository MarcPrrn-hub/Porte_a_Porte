const initial_position = [
    [2,5],
    [5,2],
    [5,5],
    [4,6]
]

  const max_blocks = [3, Infinity, 2, 5, 5, 5, 5, 10, 7, 10];

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