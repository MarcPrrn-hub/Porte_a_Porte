import Blockly from 'blockly';

// Chaque bloc se sépare en 2 parties : 
// la définition du bloc au sens de blockly : la forme, les inputs  et le contenu
// la définition du bloc pour son interprétation en javascript

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
          .appendField(new Blockly.FieldDropdown([["droite \u21BA" ,"droite" ], ["gauche \u21BB","gauche"]]), "DIRECTION");
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

