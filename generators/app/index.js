var Base = require('../_lib/generator-base')

module.exports = Base.extend({
  
  constructor: function() {
    Base.apply(this, arguments)
  },
  
  initializing: function() {
    this.composeWith(require.resolve('generator-npm-init/app'))
  },
  
  prompting: function() {
    return this.prompt([{
      type : 'input',
      name : 'projectTitle',
      message : 'Project Title',
      default : 'My Project'
    }, {
      type: 'input',
      name: 'projectDescription',
      message : 'Project Description',
      default : '...'
    }, {
      type: 'input',
      name: 'docPort',
      message: 'Port to serve documentation site locally',
      default: 8080
    }, {
      type: 'input',
      name: 'serverPort',
      message: 'Port to serve mock API',
      default: 8000
    }]).then(function(answers){
      this.templateVars = answers
      this.log("")
      this.log("*** Initializing package.json ***")
    }.bind(this))
  },
  
  writing: function() {
    this._touch( 'api-docs/.gitkeep' )
    this._touch( 'api-src/routes/.gitkeep' )
    this._touch( 'static-data/.gitkeep' )
    this._copyTpl('_gitignore', '.gitignore')
    this._copyTpl('_gulpfile.js', 'gulpfile.js')
    this._copyTpl('api-src/_heading.apib')
    this._copy('api-src/data-structures/_heading.apib')
  },

  install: function() {
    this.npmInstall([
      'aglio',
      'drakov',
      'gulp',
      'gulp-aglio',
      'gulp-concat',
      'gulp-connect',
      'gulp-rename'
    ], { "save": true })
  }
})
