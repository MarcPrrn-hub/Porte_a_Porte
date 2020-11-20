import React from 'react';
import './App.css';


import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './blocks/movementblocks';
import './blocks/conditionblocks';



import './generator/generator';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    console.log(code);
  }

  render() {
    return (
      <div>
          <button onClick={this.generateCode}>Cliquez ici</button>

          <BlocklyComponent ref={this.simpleWorkspace}
          readOnly={false} trashcan={true} media={'media/'} horizontalLayout={true} maxBlocks={100}
          move={{
            scrollbars: false,

          }}
          initialXml={`
            <xml>
            <block type="instructions"> </block>
            </xml>
                  `}>   
          
            <category name="Mouvement" colour="210"> 
            <Block type="avancer"></Block>
            <Block type="tourner"></Block>
            </category>

            <category name="Boucle" colour="120">
              <Block type="controls_whileUntil">
                <Value name="TIMES">
                  </Value>
              </Block>
              <Block type="controls_repeat_ext">
                <Value name="TIMES">
                  <Shadow type="math_number">
                  </Shadow>
                </Value>
              </Block>
            </category>

            <category name="Condition" colour="20">
            <Block type="condition"> </Block>
            <Block type="condition_chemin"> </Block>
            </category>
       
          </BlocklyComponent>
    </div>  
    );
  }
}

export default App;