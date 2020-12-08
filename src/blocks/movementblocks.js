import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

Blockly.Blocks['avancer'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("avancer");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("Avance le personnage d'une case");
  }
};

  Blockly.JavaScript['avancer'] = function(block) {
    var code = 'avancer();\n';
    return code;
  };


  Blockly.Blocks['tourner'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("tourner à")
          .appendField(new Blockly.FieldDropdown([["droite","droite"], ["gauche","gauche"]]), "DIRECTION");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(230);
   this.setTooltip("Tourne le personnage de 90° vers la droite ou la gauche");
    }
  };
    
  Blockly.JavaScript['tourner'] = function(block) {
    var dropdown_direction = block.getFieldValue('DIRECTION');
    var code = "tourner("+ dropdown_direction + ");"
    return code;
  };

