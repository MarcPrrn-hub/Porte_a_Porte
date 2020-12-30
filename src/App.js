import './App.css';
import React, { useState } from 'react';
import BlocklyComponent from './Blockly'; //, Value, Field, Shadow Block Category
import Blockly, { Block, Category, Value } from './Blockly';
import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './blocks/movementblocks';
import './blocks/conditionblocks';

import './generator/generator';

import { maze } from './levels/maze';
import { createCookie, readCookie, eraseCookie } from './cookie';

function App() {
  createCookie('ppkcookie0',0,7)
  var level_cookie = readCookie('ppkcookie');
  var def_level = readCookie('ppkcookie0')
  const [level, setLevel] = useState( level_cookie ? level_cookie : def_level );  
  const simpleWorkspace = React.createRef();
  const [parcours, setParcours] = useState(maze.Parcours[level]);
  const [xml, setXml] = useState(maze.Initial[level]);
  const [position, setPosition] = useState(maze.Init_pos[level]);
  const [toolbox, setToolbox] = useState(maze.Affichage[level]);
  const [max_blocks, setMax_Blocks] = useState(maze.Max_Blocks[level]);
 // j'aimerai que la MAJ de level puisse mettre à jour tt les autres composants
                

  function maj () {
  generateCode()
  var test = 1;
  if ( level_cookie) {
    test = parseInt(level_cookie) +1; 
    }  
    createCookie('ppkcookie',test,7)
    document.location.reload();
  }

  function reset_level() {
    setLevel(0);
    document.location.reload();
    eraseCookie('ppkcookie');
  };

  function generateCode() {
    var code = BlocklyJS.workspaceToCode(
      simpleWorkspace.current.workspace
    );
    alert(code); //j'ai change le console.log en alert pour afficher les instructions
    //console.log(this.state.affichage);
    //console.log(this.state.xml[this.state.level])
  }  

  return (
    <div>
      
      <div id="ecran">
        <div class="bandeau"> 
          <div class="bouton">   
              <button onClick={() => reset_level()}>
              Reset des levels
              </button>
              <button onClick={() => maj()}>
                Niveau suivant
              </button>
          </div>
              <div class="titre"> <h1> nous sommes au parcours {level} </h1> et la position initale est {position} </div>
           </div>
           <div class="carte"/>
           <h4> Nombre de block max : {max_blocks} </h4>

      </div> 
      

        <BlocklyComponent 
        ref={simpleWorkspace}
        readOnly={false}
        trashcan={true} 
        media={'media/'} 
        horizontalLayout={true} 
        maxBlocks={max_blocks} 
        grid={false}
        move={{ scrollbars: false }}
        initialXml=  { xml }
        > 
        
        {toolbox}

        </BlocklyComponent>

  </div>  
  );
}



class Test extends React.Component {
  constructor(props) {  
    super(props);
    this.simpleWorkspace = React.createRef();
    this.state = {
      level: 0,
      parcours: maze.Parcours,
      xml: maze.Initial,
      position: [0][0][0], //x,y, direction
      objectif: false,
      affichage: maze.Affichage[0] ,
    }
  }


  next_lvl = () => {
    this.setState( { 
        level: this.state.level + 1 ,
        position: maze.Init_pos[this.state.level],
        affichage: maze.Affichage[this.state.level]});
        alert(this.state.level);
        alert(this.state.affichage);
        console.log(this.state.affichage);
  }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    alert(code); //j'ai change le console.log en alert pour afficher les instructions
    //console.log(this.state.affichage);
    //console.log(this.state.xml[this.state.level])
  }     


  
  render() {
    let button;
    if ( this.state.level > 0 ) {
      button = <button onClick={this.generateCode}>Générer code</button>;
    }
    return (
      <div>
        
        <div id="ecran">
          <div class="carte"> 
          <button onClick={() => this.next_lvl()}> Commencer simulation </button>
          {button}
          </div>
        </div> 
        

          <BlocklyComponent ref={this.simpleWorkspace}
          readOnly={false} trashcan={true} media={'media/'} horizontalLayout={true} maxBlocks={100}
          move={{
            scrollbars: false,

          }}

          initialXml= 
          {      
          ['<xml>','<block type="instructions" x="20" y="120"  > </block>'] 
          + this.state.xml[this.state.level] 
          } >   
          {this.state.affichage}
          </BlocklyComponent>

    </div>  
    );
  }
}

export default App;
