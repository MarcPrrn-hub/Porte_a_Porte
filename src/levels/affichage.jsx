import { Category, Block, Value } from '../Blockly';

const affichage = { 
    0:
    <>   
      <Category name="Mouvement" colour="315"> 
      <Block type="avancer"></Block>
      </Category>,
      </>,
    1: 
     <Category name="Mouvement" colour="315"> 
       <Block type="avancer"></Block>
       <Block type="tourner"></Block>
      </Category>,
    2:
    <>
      <Category name="Mouvement" colour="315"> 
        <Block type="avancer"></Block>
        <Block type="tourner"></Block>
      </Category>,

      <Category name="Condition" colour="210">
        <Block type="maze_si"> </Block>
        <Block type="maze_si_sinon"> </Block>
      </Category>,
      <Category name="Boucle" colour="120">
        <Block type="maze_jusqua"></Block>
      </Category>,
    </>,
    3:
    <>
    <Category name="Mouvement" colour="315"> 
    <Block type="avancer"></Block>
    <Block type="tourner"></Block>
    </Category>,
      <Category name="Condition" colour="210">
        <Block type="maze_si"> </Block>
        <Block type="maze_si_sinon"> </Block>
    </Category>,
    <Category name="Boucle" colour="120">
        <Block type="maze_jusqua"></Block>
    </Category>,
   </>,
  }

export default affichage 