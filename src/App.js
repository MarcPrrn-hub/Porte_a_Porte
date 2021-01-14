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
import { PixiComponent, Stage , Sprite, Container, useTick} from '@inlet/react-pixi';
import bunny from './assets/test.png';
import pegman from './assets/pegman.png';


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

const reducer = (_, { data }) => data;

const Bunny = () => {
  const [motion, update] = useReducer(reducer);
  const iter = useRef(0);
  useTick(delta => {
    const i = (iter.current += 0.05 * delta);
    update({
      type: 'update',
      data: {
        x: Math.sin(i) * 100,
        y: Math.sin(i / 1.5) * 100,
        rotation: Math.sin(i) * Math.PI,
        anchor: Math.sin(i / 2),
      },
    })
  });
  return (
    <Sprite
      image={bunny}
      {...motion}
    />
  )
}

let rotation = 0;

const BunnyBlockly = () => (
  <Sprite
    image={bunny}
    x={180}
    y={200}
    rotation={rotation}
  />
);



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
    
     <div class="carte">

     <Stage options={{ transparent: true }}>
      <Container x={150} y={150}>
        <BunnyBlockly />
      </Container>
    </Stage>


      {/* <div> 
      <button onClick={reset_level}> Reset des levels / on est niveau {level} </button>
      <button onClick={maj}> Niveau suivant </button> 
      </div> */}

     </div>    


      {/* <pre id="generated-xml"></pre> 
      <textarea id="code" style={{ height: "200px", width: "400px" }} value=""></textarea>
      

      <div> Il te reste nombre de blocs </div> */}

   
      </div>

    </>
  )
}
