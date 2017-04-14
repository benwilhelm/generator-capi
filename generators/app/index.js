var Base = require('./generator-base')

module.exports = class extends Base {
  
  // constructor() {
  //   Base.apply(this, arguments)
  // }
  // 
  initializing() {
    this.composeWith(require.resolve('generator-npm-init/app'))
  }
  
  prompting() {
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
  }
  
  writing() {
    this._touch( 'api-docs/.gitkeep' );
    this._touch( 'api-src/routes/.gitkeep' );
    this._touch( 'static-data/.gitkeep' );
    this._copyTpl('_gitignore', '.gitignore');
    this._copyTpl('_gulpfile.js', 'gulpfile.js');
    this._copyTpl('api-src/_heading.apib');
    this._copy('api-src/data-structures/_heading.apib');
    this._copy('api-src/data-structures/errors.apib');
    this._copyTpl('README.md');
  }

  install() {
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
}
