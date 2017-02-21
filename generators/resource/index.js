var Base = require('../app/generator-base');
var dashify = require('dashify');
var pluralize = require("pluralize");

module.exports = Base.extend({
  
  prompting: function() {
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
  },
  
  _promptForProperty(answers) {
    var self = this;
    answers.properties = answers.properties || [];
    if (!answers.properties.length) {
      this.log("")
      this.log("Let's add some properties!")
      this.log("Leave `Property Name` blank to finish.")
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
      self.log("")
      if (property.name) {
        var declaration = `${property.name}: `;
        declaration += `\`${property.sampleValue}\` `;
        declaration += `(${property.type}`;
        if (property.required) {
          declaration += ', required'
        }
        declaration += ')'
        property.declaration = declaration;
        answers.properties.push(property);
        return self._promptForProperty(answers);
      }
      return answers;
    })
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
