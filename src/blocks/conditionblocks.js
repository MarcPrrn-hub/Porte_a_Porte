import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

Blockly.Blocks['condition'] = {
  init: function() {
    this.appendValueInput("condition")
        .setCheck(null)
        .appendField("Si ");
    this.appendStatementInput("consequence")
        .setCheck(null)
        .appendField("Alors, faire");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(20);
  }
};

Blockly.JavaScript['condition'] = function(block) {
  var value_condition = Blockly.JavaScript.valueToCode(block, 'condition', Blockly.JavaScript.ORDER_ATOMIC);
  var statements_consequence = Blockly.JavaScript.statementToCode(block, 'consequence');
  var code = 'Si' + value_condition + '{\n' + statements_consequence + '}\n';
  return code;
};

Blockly.Blocks['condition_chemin'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("le chemin est")
        .appendField(new Blockly.FieldDropdown([["tout droit","tout_droit"], ["à gauche","gauche"], ["à droite","droite"]]), "DIRECTION");
    this.setOutput(true, null);
    this.setColour(20);
  }
};

Blockly.JavaScript['condition_chemin'] = function(block) {
  var dropdown_direction = block.getFieldValue('DIRECTION');
  var code = "chemin(" + dropdown_direction + ")";
  return [code, Blockly.JavaScript.ORDER_NONE] ;
};

