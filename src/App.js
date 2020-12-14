import React, { useState } from 'react';

import './App.css';

import BlocklyComponent, { Block } from './Blockly'; //, Value, Field, Shadow 
import Blockly from './Blockly';
import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './blocks/movementblocks';
import './blocks/conditionblocks';

import './generator/generator';

import { maze } from './levels/level_map';

function App() {
  const [level, setLevel] = useState(0);
  const simpleWorkspace = React.createRef();
  const [parcours, setParcours] = useState(maze.Parcours[level]);
  const [xml, setXml] = useState(maze.Initial[level]);
  const [position, setPosition] = useState(maze.Init_pos[level]);
  const [affichage, setAffichage] = useState(maze.Affichage[level]);
 // j'aimerai que la MAJ de level puisse mettre à jour tt les autres composants

  const maj = level => {
    setParcours(maze.Parcours[level]);
    setXml(maze.Initial[level]);
    setPosition(maze.Init_pos[level]);
    setAffichage(maze.Affichage[level]);
    console.log(BlocklyComponent.toolbox);
  }
 
  return (
    <div>
      
      <div id="ecran">
        <div class="carte"> 

        <p>Vous avez cliqué {level} fois</p>
      <button onClick={() => setLevel(level + 1)}>
        Cliquez ici
      </button>
      <p> l'affichage du niveau {level} est {parcours} </p>
      <button onClick={() => maj(level)}>
        Cliquez ici
      </button>
       <div> <h1> nous sommes au parcours {parcours} </h1> et la position est {position} et au level {level} </div>
        </div>
      </div> 
      

        <BlocklyComponent ref={simpleWorkspace}
        readOnly={false} trashcan={true} media={'media/'} horizontalLayout={true} maxBlocks={100} grid={false}

        move={{ scrollbars: false }}

        initialXml= 
        {      
        ['<xml>','<block type="instructions" x="20" y="120"  > </block>'] 
        + xml[level] 
        + ['</xml>']
        } 

        >   
        <category name="Mouvement" colour="210"> 
        <Block type="avancer"></Block>
        <Block type="tourner"></Block>
        </category>

        {affichage}

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
