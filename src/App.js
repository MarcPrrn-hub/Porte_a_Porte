import './App.css';
import React, { useState, useEffect } from 'react';
import Blockly from 'blockly';
import {Gui, guiData} from './js/gui';
import Game from './js/game';
import Gamepad from './Gamepad/gamepad';
import levels from './js/levels';


export default function App(){

  const [categories, SetCategories] = useState(0);
  const [start, SetStart] = useState(0) ;
  const [id , SetId] = useState(0);
  const [toolbox, setToolbox]  = useState(categories ? 'toolbox_c' : 'toolbox');
  const [workspace, setWorkspace] = useState(React.createRef());

  Blockly.inject('blocklyDiv', {
        toolbox,
        toolboxPosition: 'start',
        horizontalLayout: false,
    });

  Gamepad['INPUTS'] = {
      'FORWARD': '0',
      'RIGHT': '1',
      'BACKWARD': '2',
      'LEFT': '3'
  };

  // init the Gamepad
  Gamepad.init({
      toolbox,
      blocks: {
          'repeat_until': {
              // the request will be { method: 'REPEAT', args: [] }
              method: 'REPEAT', // the method of the request
              statements: ['DO'], // the statement name*
              template: Gamepad['TEMPLATES']['WHILE'], // the template type
              json: {
                  // type: 'repeat_until',    is automatically setted
                  'message0': 'Repeat until %1 %2 do %3',
                  'args0': [{
                      'type': 'field_image',
                      'src': 'images/marker.png',
                      'width': 15,
                      'height': 15,
                  },
                  {
                      'type': 'input_dummy'
                  },
                  {
                      // the child blocks will be contained here
                      'type': 'input_statement',
                      'name': 'DO' // the statement name*
                  }
                  ],
                  'previousStatement': null,
                  'colour': 120,
              }
          },
          'if_path': {
              // the request will be { method: 'PATH', args: [ Gamepad['INPUTS']['...some direction'] ]}
              method: 'PATH',
              args: [{
                  field: 'DIRECTION', // the field name
                  get: parseInt // return the number instead of the string
              }],
              statements: ['DO'],
              template: Gamepad['TEMPLATES']['IF'],
              json: {
                  'message0': 'if path %1 %2 do %3',
                  'args0': [{
                      'type': 'field_dropdown',
                      'name': 'DIRECTION', // the field name
                      'options': [ // args[0] will be one of these options
                          ['ahead', Gamepad['INPUTS']['FORWARD']],
                          ['to the right ↻', Gamepad['INPUTS']['RIGHT']],
                          ['to the left ↺', Gamepad['INPUTS']['LEFT']]
                      ]
                  },
                  {
                      'type': 'input_dummy'
                  },
                  {
                      'type': 'input_statement',
                      'name': 'DO'
                  }
                  ],
                  'previousStatement': null,
                  'nextStatement': null,
                  'colour': 210
              }
          },
          'if_else_path': {
              // the request will be { method: 'PATH', args: [ Gamepad['INPUTS']['...some direction'] ]}
              method: 'PATH',
              args: [{
                  field: 'DIRECTION',
                  get: parseInt
              }],
              statements: ['DO', 'ELSE'],
              template: Gamepad['TEMPLATES']['IF_ELSE'],
              json: {
                  'message0': 'if path %1 %2 do %3 else %4',
                  'args0': [{
                      'type': 'field_dropdown',
                      'name': 'DIRECTION',
                      'options': [
                          ['ahead', Gamepad['INPUTS']['FORWARD']],
                          ['to the right ↻', Gamepad['INPUTS']['RIGHT']],
                          ['to the left ↺', Gamepad['INPUTS']['LEFT']]
                      ]
                  },
                  {
                      'type': 'input_dummy'
                  },
                  {
                      'type': 'input_statement',
                      'name': 'DO'
                  },
                  {
                      'type': 'input_statement',
                      'name': 'ELSE'
                  }
                  ],
                  'previousStatement': null,
                  'nextStatement': null,
                  'colour': 210
              }
          },
          'turn': {
              // the request will be { method: 'TURN', args: [ Gamepad['INPUTS']['...some direction'] ]}
              method: 'TURN',
              args: [{
                  field: 'DIRECTION',
                  get: parseInt
              }],
              json: {
                  'message0': 'turn %1',
                  'args0': [{
                      'type': 'field_dropdown',
                      'name': 'DIRECTION',
                      'options': [
                          ['right ↻', Gamepad['INPUTS']['RIGHT']],
                          ['left ↺', Gamepad['INPUTS']['LEFT']]
                      ]
                  }],
                  'previousStatement': null,
                  'nextStatement': null,
                  'colour': 285
              }
          },
          'move': {
              // the request will be { method: 'MOVE', args: [] ]}
              method: 'MOVE',
              json: {
                  'message0': 'move forward',
                  'previousStatement': null,
                  'nextStatement': null,
                  'colour': 285
              }
          }
      },
      workspace: workspace
  });

// create the gamepad and the game
const
    gamepad = new Gamepad({
        'start': start, // enable/disable start block
        'magicJson': true, // look at the game.js file to see how this option work
        'customHighlight': true // if false use the blockly highlight method
    }),
    gui = new Gui(),
    game = new Game(gui, gamepad)

// add debug options in the blocks context menu
const populate_ = Blockly.ContextMenu.populate_;
Blockly.ContextMenu.populate_ = function (options, rtl) {
    options = options.concat(
        {
            text: 'Set as breakpoint (forward)',
            enabled: true,
            callback: async () => {
                // decrease times
                guiData.time /= 10
                guiData.lotOfTime /= 10
                // debug
                await gamepad.debug(Blockly.selected.id, false)
                // restore times
                guiData.time *= 10
                guiData.lotOfTime *= 10
            }
        },
        {
            text: 'Set as breakpoint (backward)',
            enabled: true,
            callback: async () => {
                // decrease times
                guiData.time /= 10
                guiData.lotOfTime /= 10
                // debug
                await gamepad.debug(Blockly.selected.id, true)
                // restore times
                guiData.time *= 10
                guiData.lotOfTime *= 10
            }
        })

    return populate_.apply(Blockly.ContextMenu, [options, rtl])
}

// load the level
game.loadLevel(levels[id])
 
  return (

<>

<header>
        <vr></vr>

        <span class="switch_span">start</span>
        <label class="switch">
            <input id="start_check" type="checkbox"/>
            <span class="slider round"></span>
        </label>
        <vr></vr>

        <span class="switch_span">categories</span>
        <label class="switch">
            <input id="categories_check" type="checkbox"/>
            <span class="slider round"></span>
        </label>
        <vr></vr>

        <span class="switch_span">levels</span>

        <vr></vr>
    </header>

      <div id="game-div">
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}} version="1.1" id="1" width="400px"
                height="400px" viewBox="0 0 400 400">
                <image href="images/maze1.png" class="maze" x="0" y="-1" width="400" height="399" />
                <image id="finish1" href="images/marker.png" height="34" width="20" x="215" y="146" />
                <clipPath id="pegmanClipPath1">
                    <rect id="clipRect1" width="49" height="52" x="101" y="191"></rect>
                </clipPath>
                <image id="pegman1" href="images/pegman.png" height="52" width="1029"
                    clip-path="url(#pegmanClipPath1)" x="-95" y="191" transform="rotate(0, 0, 0)" />
            </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}} version="1.1" id="2" width="400px"
                height="400px" viewBox="0 0 400 400">
                <image href="images/maze2.png" class="maze" x="0" y="0" width="400" height="400" />
                <image id="finish2" href="images/marker.png" height="34" width="20" x="215" y="46"/>
                <clipPath id="2pegmanClipPath">
                    <rect id="clipRect2" width="49" height="52" x="51" y="291"></rect>
                </clipPath>
                <image id="pegman2" href="images/pegman.png" height="52" width="1029"
                    clip-path="url(#2pegmanClipPath)" x="-145" y="291" transform="rotate(0, 0, 0)" />
            </svg>


            <div id="capacity" style={{display: "none"}}>You have <span id="capacityNumber">10</span> blocks left.</div>

            <div class="buttons">
                <button id="play" class="button green" style={{gridArea : '1'}}  > Play </button>
                <button id="pause" class="button green" style={{gridArea : '2'}}  > Pause </button>
                <hr/>
                <button id="forward" class="button blue" style={{gridArea : '2'}}  > Forward </button>
                <button id="backward" class="button blue" style={{gridArea : '3'}}  > Backward </button>
                <hr/>
                <button id="load" class="button violet" style={{gridArea : '1'}}  > &nbsp;Load&ensp;code </button>
            </div>

      </div>

      
<div id="blockly-editor">
    <div id="blockly-div"></div>

    <xml id="toolbox" style={{display: "none"}}>
        <block type="move"></block>
        <block type="turn"></block>
        <block type="turn">
            <field name="DIRECTION">3</field>
        </block>
        <block type="repeat_until"></block>
        <block type="if_path"></block>
        <block type="if_else_path"></block>
    </xml>

    <xml id="toolbox_c" style={{display: "none"}}>
        <category name="Controls" colour="285">
            <block type="move"></block>
            <block type="turn"></block>
            <block type="turn">
                <field name="DIRECTION">3</field>
            </block>
        </category>
        <category name="Logic" colour="120">
            <block type="repeat_until"></block>
            <block type="if_path"></block>
            <block type="if_else_path"></block>
        </category>
    </xml>
  </div>
</>

  );
}




    // <header>
    //     <vr></vr>

    //     <span class="switch_span">start</span>
    //     <label class="switch">
    //         <input id="start_check" type="checkbox"/>
    //         <span class="slider round"></span>
    //     </label>
    //     <vr></vr>

    //     <span class="switch_span">categories</span>
    //     <label class="switch">
    //         <input id="categories_check" type="checkbox"/>
    //         <span class="slider round"></span>
    //     </label>
    //     <vr></vr>

    //     <span class="switch_span">levels</span>
    //     <button class="button level" id="level_1" onClick={game.loadLevel(levels[id = 0]) + console.clear() }>1</button>
    //     <button class="button level" id="level_2" onClick={ game.loadLevel(levels[id = 1]) + console.clear() }>2</button>
    //     <vr></vr>
    // </header>

    //   <div id="game-div">
    //         <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}} version="1.1" id="1" width="400px"
    //             height="400px" viewBox="0 0 400 400">
    //             <image href="images/maze1.png" class="maze" x="0" y="-1" width="400" height="399" />
    //             <image id="finish1" href="images/marker.png" height="34" width="20" x="215" y="146" />
    //             <clipPath id="pegmanClipPath1">
    //                 <rect id="clipRect1" width="49" height="52" x="101" y="191"></rect>
    //             </clipPath>
    //             <image id="pegman1" href="images/pegman.png" height="52" width="1029"
    //                 clip-path="url(#pegmanClipPath1)" x="-95" y="191" transform="rotate(0, 0, 0)" />
    //         </svg>
            
    //         <svg xmlns="http://www.w3.org/2000/svg" style={{display: "none"}} version="1.1" id="2" width="400px"
    //             height="400px" viewBox="0 0 400 400">
    //             <image href="images/maze2.png" class="maze" x="0" y="0" width="400" height="400" />
    //             <image id="finish2" href="images/marker.png" height="34" width="20" x="215" y="46"/>
    //             <clipPath id="2pegmanClipPath">
    //                 <rect id="clipRect2" width="49" height="52" x="51" y="291"></rect>
    //             </clipPath>
    //             <image id="pegman2" href="images/pegman.png" height="52" width="1029"
    //                 clip-path="url(#2pegmanClipPath)" x="-145" y="291" transform="rotate(0, 0, 0)" />
    //         </svg>


    //         <div id="capacity" style={{display: "none"}}>You have <span id="capacityNumber">10</span> blocks left.</div>

    //         <div class="buttons">
    //             <button id="play" class="button green" style={{gridArea : '1'}} onClick={ gamepad.play() } > Play </button>
    //             <button id="pause" class="button green" style={{gridArea : '2'}} onClick={ gamepad.pause() } > Pause </button>
    //             <hr/>
    //             <button id="forward" class="button blue" style={{gridArea : '2'}} onClick= { gamepad.forward() + gui.removeAnimation() }> Forward </button>
    //             <button id="backward" class="button blue" style={{gridArea : '3'}} onClick= { gamepad.backward() + gui.removeAnimation() } > Backward </button>
    //             <hr/>
    //             <button id="load" class="button violet" style={{gridArea : '1'}} onClick={ game.loadCode() + console.clear()} > &nbsp;Load&ensp;code </button>
    //         </div>

    //   </div>


  //   <div id="blockly-editor">
  //   <div id="blockly-div"></div>

  //   <xml id="toolbox" style={{display: "none"}}>
  //       <block type="move"></block>
  //       <block type="turn"></block>
  //       <block type="turn">
  //           <field name="DIRECTION">3</field>
  //       </block>
  //       <block type="repeat_until"></block>
  //       <block type="if_path"></block>
  //       <block type="if_else_path"></block>
  //   </xml>

  //   <xml id="toolbox_c" style={{display: "none"}}>
  //       <category name="Controls" colour="285">
  //           <block type="move"></block>
  //           <block type="turn"></block>
  //           <block type="turn">
  //               <field name="DIRECTION">3</field>
  //           </block>
  //       </category>
  //       <category name="Logic" colour="120">
  //           <block type="repeat_until"></block>
  //           <block type="if_path"></block>
  //           <block type="if_else_path"></block>
  //       </category>
  //   </xml>
  // </div>



 
