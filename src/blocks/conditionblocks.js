import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

// Blockly.JavaScript['condition'] = function(block) {
//   var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
//   var statements_consequence = Blockly.JavaScript.statementToCode(block, 'consequence');
//   var code = 'Si' + value_condition + '{\n' + statements_consequence + '}\n';
//   return code;
// };

// Blockly.JavaScript['condition_chemin'] = function(block) {
//   var dropdown_direction = block.getFieldValue('DIRECTION');
//   var code = "chemin(" + dropdown_direction + ")";
//   return [code, Blockly.JavaScript.ORDER_NONE] ;
// };

Blockly.Blocks['maze_si'] = { 
        /**
   * Block for turning left or right.
   * @this {Blockly.Block}
   */
  init: function() {
    this.appendDummyInput()
        .appendField("Si le chemin est")
        .appendField(new Blockly.FieldDropdown([["tout droit","tout_droit"], ["à gauche","gauche"], ["à droite","droite"]]), "DIRECTION");
    this.appendStatementInput("FAIRE")
        .setCheck(["tourner", "avancer"])
        .appendField("alors ");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
  this.setTooltip("Verifie que le chemin soit à droite,à gauche ou tout droit");

  }
};

Blockly.JavaScript['maze_si'] = function(block) {
  // Generate JavaScript for 'if' conditional if there is a path.
  var argument = block.getFieldValue('DIRECTION') +
      '(\'block_id_' + block.id + '\')';
  var branch = Blockly.JavaScript.statementToCode(block, 'FAIRE');
  var code = 'if (' + argument + ') {\n' + branch + '}\n';
  return code;
};

Blockly.Blocks['maze_si_sinon'] = {
  /**
   * Block for 'if/else' conditional if there is a path.
   * @this {Blockly.Block}
   */
  init: function() {
    var DIRECTIONS =
    [["tout droit","tout_droit"], 
    ["à gauche","gauche"], 
    ["à droite","droite"]];
    // Append arrows to direction messages.
    DIRECTIONS[1][0] +=  '\u21BA';
    DIRECTIONS[2][0] +=  ' \u21BB';
    this.setColour(230);
    this.appendDummyInput()
        .appendField("Si le chemin est")
        .appendField(new Blockly.FieldDropdown(DIRECTIONS), 'DIRECTION');
    this.appendStatementInput('FAIRE')
        .appendField('faire');
    this.appendStatementInput('SINON')
        .appendField('sinon faire');
    this.setTooltip('Verifie une condition est donne une action a faire dans les deux cas');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
  }
};

Blockly.JavaScript['maze_si_sinon'] = function(block) {
  // Generate JavaScript for 'if/else' conditional if there is a path.
  var argument = block.getFieldValue('DIRECTION') +
      '(\'block_id_' + block.id + '\')';
  var branch0 = Blockly.JavaScript.statementToCode(block, 'FAIRE');
  var branch1 = Blockly.JavaScript.statementToCode(block, 'SINON');
  var code = 'if (' + argument + ') {\n' + branch0 +
             '} else {\n' + branch1 + '}\n';
  return code;
};
