
import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

Blockly.Blocks['instructions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("liste des instructions");
    this.setNextStatement(true, null);
    this.setColour(330);
 this.setMovable(false);  
 this.setDeletable(false);
 this.setEditable(false);
  }
};

Blockly.JavaScript['instructions'] = function(block) {
  // TODO: Assemble JavaScript into code variable.
  var code = 'Executons ces instructions:\n';
  return code;
};

Blockly.Blocks['maze_jusqua'] = {
  /**
   * Block for repeat loop.
   * @this {Blockly.Block}
   */
  init: function() {
    this.setColour(120);
    this.appendDummyInput()
        .appendField('Répéter jusqu a l arrivée ')
       // .appendField(new Blockly.FieldImage(Maze.SKIN.marker, 12, 16));
    this.appendStatementInput('FAIRE')
        .appendField('faire');
    this.setPreviousStatement(true);
    this.setTooltip('répéte une action tant que le personnage n est pas arrivé au point d arrivé');
  }
};

Blockly.JavaScript['maze_jusqua'] = function(block) {
  // Generate JavaScript for repeat loop.
  var branch = Blockly.JavaScript.statementToCode(block, 'FAIRE');
  if (Blockly.JavaScript.INFINITE_LOOP_TRAP) {
    branch = Blockly.JavaScript.INFINITE_LOOP_TRAP.replace(/%1/g,
        '\'block_id_' + block.id + '\'') + branch;
  }
  return 'while (notDone()) {\n' + branch + '}\n';
};