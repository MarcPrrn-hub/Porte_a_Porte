
import * as Blockly from 'blockly/core';

// Since we're using json to initialize the field, we'll need to import it.
import '../fields/BlocklyReactField';
import '../fields/DateField';

Blockly.Blocks['instructions'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("instructions");
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
