var Base = require('../_lib/generator-base');
var dashify = require('dashify');
var pluralize = require("pluralize");

module.exports = Base.extend({
  
  prompting: function() {
    return this.prompt([{
      type: 'input',
      name: 'resourceName',
      message: 'Resource Name',
      default: 'Model'
    }, {
      type: 'input',
      name: 'route',
      message : 'Route',
      default : '/models'
    }, {
      type: 'list',
      name: 'idType',
      message: 'ID Type',
      choices: [ 'number', 'string' ],
      store: true
    }, {
      type: 'input',
      name: 'resourceDescription',
      message : 'Description'
    }]).then(function(answers){
      answers.idSample = 1;
      if (answers.idType === 'string') {
        answers.idSample = '507f191e810c19729de860ea'
      }
      answers.resourcePlural = pluralize(answers.resourceName)
      this.templateVars = answers;
    }.bind(this))
  },
  
  writing: function(){
    this._writeDataStructure();
    this._writeRoutes();
  },
  
  _writeDataStructure: function() {
    var filename = dashify(this.templateVars.resourceName);
    var src = `data-structure.apib`;
    var dest = `api-src/data-structures/${filename}.apib`;
    this._copyTpl(src, dest)
  },
  
  _writeRoutes: function() {
    var filename = dashify(this.templateVars.resourceName);
    var src = `route.apib`;
    var dest = `api-src/routes/${filename}.apib`;
    this._copyTpl(src, dest)
  }
})
