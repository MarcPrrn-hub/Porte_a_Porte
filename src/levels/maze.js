
import {parcours, param} from './parcours';
import initial_blocks from './initial_blocks';
import affichage from './affichage';
import {initial_position, max_blocks, resultType, skins} from './initial_position'
const maze = {Parcours: parcours, Initial : initial_blocks , Init_pos: initial_position, 
              Affichage: affichage, Param: param, Max_Blocks: max_blocks, Result: resultType, Skin: skins }

export { maze } ;
