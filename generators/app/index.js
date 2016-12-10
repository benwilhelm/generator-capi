var generators = require('yeoman-generator')

module.exports = generators.Base.extend({
  
  constructor: function() {
    generators.Base.apply(this, arguments)
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
      message : 'Project Description'
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
      this.userConfig = answers
    }.bind(this))
  },
  
  writing: function() {
    this._touch( 'api-docs/.gitkeep' )
    this._touch( 'api-src/routes/.gitkeep' )
    this._touch( 'static-data/.gitkeep' )
    this._copyTpl('_gitignore', '.gitignore')
    this._copyTpl('_gulpfile.js', 'gulpfile.js')
    this._copyTpl('api-src/_heading.apib')
  },
  
  _copy: function(src, dest) {
    dest = dest || src;
    this.fs.copy(
      this.templatePath(src),
      this.destinationPath(dest)
    )
  },
  
  _copyTpl: function(src, dest) {
    dest = dest || src;
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(dest),
      this.userConfig
    )
  },
  
  _touch: function(file) {
    this.fs.write( this.destinationPath(file), "" )
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
