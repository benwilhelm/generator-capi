var Base = require('../app/generator-base');
var dashify = require('dashify');
var pluralize = require("pluralize");

module.exports = class extends Base {
  
  prompting() {
    var self = this;
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
    }])
    .then(function(answers){
      return self._promptForProperty(answers)
    })
    .then(function(answers){
      answers.idSample = 1;
      if (answers.idType === 'string') {
        answers.idSample = '507f191e810c19729de860ea'
      }
      answers.resourcePlural = pluralize(answers.resourceName)
      this.templateVars = answers;
    }.bind(this))
  }
  
  _promptForProperty(answers) {
    var self = this;
    answers.properties = answers.properties || [];
    if (!answers.properties.length) {
      this.log("")
      this.log("Let's add some properties!")
    }
    return self.prompt([{
      type: 'input',
      name: 'name',
      message: 'Property Name'
    },{
      type: 'list',
      name: 'type',
      message: 'Property Type',
      choices: ['number', 'string'],
      when: function(property) {
        return !!property.name;
      }
    }, {
      type: 'input',
      name: 'description',
      message: 'Property Description',
      when: function(property) {
        return !!property.name;
      }
    }, {
      type: 'confirm',
      name: 'required',
      message: "Required?",
      default: false,
      when: function(property) {
        return !!property.name
      }
    }, {
      type: 'input',
      name: 'sampleValue',
      message: 'Sample Value (optional)',
      when: function(property) {
        return !!property.name
      }
    }])
    .then(function(property){
      var declaration = `${property.name}: `;
      declaration += `\`${property.sampleValue}\` `;
      declaration += `(${property.type}`;
      if (property.required) {
        declaration += ', required'
      }
      declaration += ')'
      property.declaration = declaration;
      answers.properties.push(property);
      return self._promptForAnother(answers)
    })
  }
  
  _promptForAnother(answers) {
    var self = this;
    return self.prompt({
      type: 'confirm',
      name: 'another',
      message: "Add another property?",
      default: true,
    })
    .then(function(response){
      if (response.another) {
        self.log("")
        return self._promptForProperty(answers);
      }
      return answers;
    })
  }
  
  writing(){
    this._writeDataStructure();
    this._writeRoutes();
  }
  
  _writeDataStructure() {
    var filename = dashify(this.templateVars.resourceName);
    var src = `data-structure.apib`;
    var dest = `api-src/data-structures/${filename}.apib`;
    this._copyTpl(src, dest)
  }
  
  _writeRoutes() {
    var filename = dashify(this.templateVars.resourceName);
    var src = `route.apib`;
    var dest = `api-src/routes/${filename}.apib`;
    this._copyTpl(src, dest)
  }
}
