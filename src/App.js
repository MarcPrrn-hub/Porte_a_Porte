import './App.css';

import './customBlocks/custom_Blocks'
import React, { useState } from 'react'
import ReactBlockly from 'react-blockly'
import Blockly from 'blockly';

import maze from './Maze/maze'


export default function App() {
  const [level, setLevel] = useState(0);
  const [initialXml, setXml] = useState('<xml> <block type="avancer"> </block> </xml>');
  const [toolboxCategories, setTB] = useState( maze.Affichage[level] );

  function workspaceDidChange(workspace) {
    const newXml = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace));
    document.getElementById('generated-xml').innerText = newXml;

    const code = Blockly.JavaScript.workspaceToCode(workspace);
    document.getElementById('code').value = code;
  }

  function maj () {
    setTB(maze.Affichage[level+1]);
    setLevel(level+1);
    }
  
    function reset_level() {
    setLevel(0);
    setTB(maze.Affichage[0]);
  }

  return (
    <>
      <ReactBlockly
        toolboxCategories={toolboxCategories}
        initialXml={initialXml}
        wrapperDivClassName="fill"
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
      <pre id="generated-xml">
      </pre>
      <textarea id="code" style={{ height: "200px", width: "400px" }} value=""></textarea>
      <button onClick={reset_level}> Reset des levels / on est niveau {level} </button>
      <button onClick={maj}> Niveau suivant </button> 
      <div> Il te reste nombre de blocs </div>


      </div>
s
    </>
  )
}
