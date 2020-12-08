import React from 'react';
import './App.css';

import BlocklyComponent, { Block, Value, Field, Shadow } from './Blockly';

import BlocklyJS from 'blockly/javascript';

import './blocks/customblocks';
import './blocks/movementblocks';
import './blocks/conditionblocks';

import './generator/generator';

import { maze } from './levels/level_map';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.simpleWorkspace = React.createRef();
    this.state = {
      level: 0,
      parcours: maze.Parcours,
      xml: maze.Initial,
      position: [0][0][0], //x,y, direction
      objectif: false,
      affichage: false,
    }
  }

  level = () => {
    if (this.state.level === 0){
      this.init();
    }
    else {
      this.next_lvl();
    }
    this.changer_block();
  }

  init = () => {
    this.setState ({ level: 1 });
    this.setState( { position: maze.Init_pos[1] })
    alert("Vous commencez le niveau " + this.state.level );
  }

  next_lvl = () => {
    this.setState( { level: this.state.level });
    this.setState( { position: maze.Init_pos[this.state.level] } );
    alert("Vous commencez le niveau " + this.state.level );
    alert( this.state.parcours[this.state.level] )
    this.setState ( { level : this.state.level + 1 })
  }

  changer_block = () => {

    this.setState( { affichage :   <category name="Mouvement" colour="210"> 
                                    <Block type="avancer"></Block>
                                    <Block type="tourner"></Block>
                                    </category> } ) ;
    if (this.state.level > 1 ) {
      this.setState( { affichage : <div> <category name="Mouvement" colour="210"> 
                                    <Block type="avancer"></Block>
                                    <Block type="tourner"></Block>
                                    </category>
  
                                    <category name="Boucle" colour="120">
                                      <Block type="controls_whileUntil">
                                        <Value name="TIMES">
                                          </Value>
                                      </Block>
                                    </category> 
                                    </div> } ) ; 
      }
      if (this.state.level > 2 ) {
      this.setStage( { affichage : <div> <category name="Mouvement" colour="210"> 
                                    <Block type="avancer"></Block>
                                    <Block type="tourner"></Block>
                                    </category>
  
                                    <category name="Boucle" colour="120">
                                      <Block type="controls_whileUntil">
                                        <Value name="TIMES">
                                          </Value>
                                      </Block>
                                    </category> 
                                    <category name="Condition" colour="20">
                                    <Block type="condition"> </Block>
                                    <Block type="condition_chemin"> </Block>
                                    </category>
                                     </div> } ) ;                       
      } 
      return this.state.affichage;
    }

  generateCode = () => {
    var code = BlocklyJS.workspaceToCode(
      this.simpleWorkspace.current.workspace
    );
    alert(code); //j'ai change le console.log en alert pour afficher les instructions
    console.log(this.state.affichage);
    console.log(this.state.xml[this.state.level])
  }     

  

// il faudra organiser pour charger les blocks en fonction des niveaux
  render() {
    let button;
    if ( this.state.level > 0 ) {
      button = <button onClick={this.generateCode}>Générer code</button>;
    }
    return (
      <div>
        
        <div id="ecran">
          <div class="carte"> 
          <button onClick={this.level}>Commencer simulation </button>
          {button}
          </div>
          <button onClick={this.refresh}>Button</button>
          {this.state.showComponent ?
           button :
           null
          }
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

/* 

changer_block = () => {

  this.setState( { affichage :   <category name="Mouvement" colour="210"> 
                                  <Block type="avancer"></Block>
                                  <Block type="tourner"></Block>
                                  </category> } ) ;
  if (this.state.level > 1 ) {
    this.setState( { affichage : <div> <category name="Mouvement" colour="210"> 
                                  <Block type="avancer"></Block>
                                  <Block type="tourner"></Block>
                                  </category>

                                  <category name="Boucle" colour="120">
                                    <Block type="controls_whileUntil">
                                      <Value name="TIMES">
                                        </Value>
                                    </Block>
                                  </category> 
                                  </div> } ) ; 
    }
    if (this.state.level > 2 ) {
    this.setStage( { affichage : <div> <category name="Mouvement" colour="210"> 
                                  <Block type="avancer"></Block>
                                  <Block type="tourner"></Block>
                                  </category>

                                  <category name="Boucle" colour="120">
                                    <Block type="controls_whileUntil">
                                      <Value name="TIMES">
                                        </Value>
                                    </Block>
                                  </category> 
                                  <category name="Condition" colour="20">
                                  <Block type="condition"> </Block>
                                  <Block type="condition_chemin"> </Block>
                                  </category>
                                   </div> } ) ;                       
    } 
    return this.state.affichage;
  }

  */