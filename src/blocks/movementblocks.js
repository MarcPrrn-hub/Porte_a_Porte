import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

Blockly.Blocks['avancer'] = {
    /**
   * Block for moving forward.
   * @this {Blockly.Block}
   */
  init: function() {
    this.appendDummyInput()
        .appendField("avancer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(315);
 this.setTooltip("Avance le personnage d'une case");
  }
};

  Blockly.JavaScript['avancer'] = function(block) {
    var code = 'avancer(\'block_id_' + block.id + '\');\n';
    return code;
  };


  Blockly.Blocks['tourner'] = {
      /**
   * Block for turning left or right.
   * @this {Blockly.Block}
   */
    init: function() {
      this.appendDummyInput()
          .appendField("tourner à")
          .appendField(new Blockly.FieldDropdown([["droite" + '\u21BA',"droite" ], ["gauche"+ ' \u21BB',"gauche"]]), "DIRECTION");
      this.setPreviousStatement(true);
      this.setNextStatement(true);
      this.setColour(315);
   this.setTooltip("Tourne le personnage de 90° vers la droite ou la gauche");
    }
  };
    
  Blockly.JavaScript['tourner'] = function(block) {
    var dropdown_direction = block.getFieldValue('DIRECTION');
    var code = dropdown_direction + '(\'block_id_' + block.id + '\');\n';
    return code;
  };

