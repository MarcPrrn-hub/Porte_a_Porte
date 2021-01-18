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
  const [x_bunny, setX] = useState(50);
  const [y_bunny, setY] = useState(275);
/* *********************************************************************************** */


// CHANGER LE NIVEAU ET L AFFICHAGE DES TOOLBOX
  const maj = () => {
    setTB(maze.Affichage[level+1]);
    setLevel(level+1);
  }
  // RESET DU NIVEAU : 0 ET AFFICHAGE TOOLBOX
  const reset_level = () => {
    setLevel(0);
    setTB(maze.Affichage[0]);
    setX(50);
    setY(275);
  }
  // RUN CODE & INTERPRETER 

  const run_code = () => {
    const code = Blockly.JavaScript.workspaceToCode(Blockly.workspace);
    console.log(code)
    const myInterpreter = new Interpreter(code, initInterpreter);
    console.log(myInterpreter);
    console.log(myInterpreter.run())
    myInterpreter.run();
  }

  const initInterpreter = (interpreter, globalObject) => {
    var wrapper;

      wrapper = (id) => {
        avancer();
  };
    interpreter.setProperty(globalObject, 'avancer', interpreter.createNativeFunction(wrapper));

      wrapper = (id) => {
        gauche();
    }
    interpreter.setProperty(globalObject, 'gauche', interpreter.createNativeFunction(wrapper));

      wrapper = (id) => {
          droite()
    }
    interpreter.setProperty(globalObject, 'droite', interpreter.createNativeFunction(wrapper));

  };



/* ************************************************************************************ */
// FONCTIONS DE DEPLACEMENT 

const avancer = () => {
  setX(x_bunny+25);
}
const gauche = () => {
  setY(y_bunny-25);
}
const reculer = () => {
  setX(x_bunny-25);
}
const droite = () => {
  setY(y_bunny+25);
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
      />

     <div class="react"> 

     <button onClick={avancer}> avancer </button>
     <button onClick={gauche}> tourner à gauche </button> 
     <button onClick={reculer}> reculer </button>
     <button onClick={droite}> tourner à droite </button> 
     <button onClick={reset_level}>RESET </button>  
     <button onClick={maj}> LEVEL +1 </button>  
     <button onClick={run_code}> LANCER CODE </button>  

     <Stage class="carte" options={{ transparent:true }}>

      <Container position={[200,100]} >

      <Sprite image={carte} />

      <Sprite image={bunny} x={x_bunny} y={y_bunny} /> 

      </Container>

    </Stage>



     </div>    
   

    </>
  )
}
