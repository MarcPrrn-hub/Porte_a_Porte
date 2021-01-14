import './App.css';

// blocks crées pour l'activité porte à porte : avancer, tourner etc.
import './customBlocks/custom_Blocks'

// principaux composants :
import React, { useState, useReducer, useRef} from 'react'
import ReactBlockly from 'react-blockly'
import Blockly from 'blockly';

// interpretation du code généré par Blockly
import Interpreter from 'js-interpreter';

// rendu graphique de la carte
import { Graphics } from 'pixi.js';
import { PixiComponent, Stage , Sprite, Container, useTick, useIteration} from '@inlet/react-pixi';
import bunny from './assets/test.png';
import pegman from './assets/pegman.png';
import carte from './assets/carte.jpg';

// configuration des paramètres du niveau : carte, nb block limit, xml etc.
import maze from './Maze/maze'

/* ************************************************************************************ */

export default function App() {
  const [level, setLevel] = useState(0);
  const [initialXml, setXml] = useState('<xml> <block type="avancer"> </block> </xml>');
  const [toolboxCategories, setTB] = useState( maze.Affichage[level] );

/* *********************************************************************************** */

  // FONCTION TRANSITOIRE 
  function workspaceDidChange(workspace) {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    // document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    // document.getElementById('code').value = code;
  }

// CHANGER LE NIVEAU ET L AFFICHAGE DES TOOLBOX
  const maj = () => {
    setTB(maze.Affichage[level+1]);
    setLevel(level+1);

    // const code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);
    // const myInterpreter = new Interpreter(code);
    // myInterpreter.run();
  }

  // RESET DU NIVEAU : 0 ET AFFICHAGE TOOLBOX
  const reset_level = () => {
    setLevel(0);
    setTB(maze.Affichage[0]);
  }
/* ************************************************************************************ */

const [x_bunny, setX] = useState(150);
const [y_bunny, setY] = useState(210);

const avancer = () => {
  setX(x_bunny+10);
}
const tourner_g = () => {
  setY(y_bunny-10);
}
const reculer = () => {
  setX(x_bunny-10);
}
const tourner_d = () => {
  setY(y_bunny+10);
}

/* ************************************************************************************* */
  return (
    <>
      <ReactBlockly
        toolboxCategories={toolboxCategories}
        initialXml={initialXml}
        wrapperDivClassName="blockly"
        workspaceConfiguration={{
          grid: {
            spacing: 20,
            length: 3,
            colour: '#ccc',
            snap: true,
          },
          maxBlocks: maze.Max_Blocks[level],
          horizontalLayout: true,
          scrollbars: false,
        }}
        workspaceDidChange={workspaceDidChange}
      />

     <div class="react"> 

     <button onClick={avancer}> avancer </button>
     <button onClick={tourner_g}> tourner à gauche </button> 
     <button onClick={reculer}> reculer </button>
     <button onClick={tourner_d}> tourner à droite </button> 
        
     <Stage class="carte">

      <Container>

      <Sprite image={carte}/>

      <Sprite image={bunny} x={x_bunny} y={y_bunny} /> 

      </Container>

    </Stage>



     </div>    


      {/* <pre id="generated-xml"></pre> 
      <textarea id="code" style={{ height: "200px", width: "400px" }} value=""></textarea>
      

      <div> Il te reste nombre de blocs </div> */}

   

    </>
  )
}
