var aglio   = require("gulp-aglio");
var concat  = require("gulp-concat");
var connect = require("gulp-connect");
var rename  = require("gulp-rename");
var drakov  = require("drakov");
var gulp    = require("gulp");
var fs      = require("fs");

const API_SRC  = "api-src"
const API_DOCS = "api-docs"
const API_BLUEPRINT = "api-blueprint.apib"
const DOC_PORT = <%= docPort %>
const SERVER_PORT = <%= serverPort %>

gulp.task("build:apib", function(){
  gulp.src(`${API_SRC}/**/*`)
  .pipe(concat(API_BLUEPRINT))
  .pipe(gulp.dest(API_DOCS))
})

gulp.task("build:html", function(){
  gulp.src(`${API_DOCS}/${API_BLUEPRINT}`)
  .pipe(aglio({ template: "default" }))
  .pipe(rename("index.html"))
  .pipe(gulp.dest(`${API_DOCS}`))
})

gulp.task("serve:docs", function(){
  connect.server({
    root: API_DOCS,
    livereload: true,
    port: DOC_PORT
  })
})

gulp.task("serve:api", function(){
  
  var dir = __dirname + "/static-data";
  fs.readdir(dir, function(err, files){
    if (err) throw err;
    var staticPaths = files.map(function(file){
      var a = file.split(".");
      var modelName = a[0];
      return `static-data/${file}=/${modelName}`
    })
    
    var argv = {
      sourceFiles: `${API_DOCS}/${API_BLUEPRINT}`,
      staticPaths: staticPaths,
      serverPort: SERVER_PORT
    };

    drakov.run(argv);
  })
})

gulp.task("serve:reload", function(){
  gulp.src(`${API_DOCS}/*.html`)
  .pipe(connect.reload())
})

gulp.task("watch", function(){
  gulp.watch( [`${API_SRC}/**/*.apib`] , ["build:apib"]    )
  gulp.watch( [`${API_DOCS}/*.apib`]   , ["build:html"] )
  gulp.watch( [`${API_DOCS}/*.html`]   , ["serve:reload"] )
})

gulp.task("default", [
  "build:apib", 
  "build:html", 
  "serve:docs", 
  "serve:api", 
  "watch"
])
