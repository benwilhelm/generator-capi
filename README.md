CAPI stands for _Composable API_. This is a Yeoman generator that creates a gulp-based authoring environment for [API Blueprint][apib] files, building a master blueprint file and HTML documentation composed of smaller, route- and model-specific files.

[apib]: https://apiblueprint.org/documentation/tutorial.html

In addition, the gulp command will start two local servers, 

## Prerequisites

Node.js, Yeoman, Gulp

## Installation

    npm install -g generator-capi

## Usage

**Scaffolding your project**

    yo capi 

This will build your generic project, prompting you for name and description, port numbers for local servers, and values for your package.json file.  

**Creating a REST Resource**

    yo capi:resource

This will create a new model definition file in the `api-src/data-structures` directory, and a new routes file in `api-src/routes`

**Compiling and Serving Documentation**

    gulp

Compiles fragment files into master blueprint and html files, serves html documentation on localhost over the port specified during setup (defaults to http://localhost:8080). Watches files for changes and re-concatenates the documentation. 
