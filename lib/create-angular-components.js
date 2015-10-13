/*
 * grunt-sro-create-angular-components
 * https://github.com/romainseb/grunt-sro-create-angular-components
 *
 * Copyright (c) 2015 romainseb
 * Licensed under the MIT license.
 */
var fs = require('fs');
var mkdirp = require('mkdirp');

var basedir = process.cwd();

var createAngularComponentsConfig = null;
try {
    //Load the local package.json file
    var packageJsonFile = require(basedir + "/package.json");
    //Get the plugin local configuration
    createAngularComponentsConfig = packageJsonFile.createAngularComponents;
}
catch (error) {
    console.log("ERROR : unable to find local package.json file.");
}

//If the configuartion is here
if (createAngularComponentsConfig != null) {
    //get the options & the modules to create
    var options = createAngularComponentsConfig.options;
    var modules = createAngularComponentsConfig.modules;

    var initServiceController = (options !== undefined && options.initServiceController !== undefined) ? options.initServiceController : false;
    var cssSuffix = (options !== undefined && options.cssSuffix !== undefined) ? options.cssSuffix.toLowerCase() : 'css';
    var language = (options !== undefined && options.language !== undefined) ? options.language.toLowerCase() : 'es5';
    var angularVersion = (options !== undefined && options.angularVersion !== undefined) ? options.angularVersion : '1';
    var prefix = (options !== undefined && options.prefix !== undefined) ? options.prefix : '';

    var paramsOk = true;

    //check sur initServiceController
    if (initServiceController != true && initServiceController != false) {
        paramsOk = false;
        console.log("ERROR : initServiceController must be valued by true or false, " + initServiceController + " given");
    }
    //Verification du css suffix
    if (cssSuffix != "css" && cssSuffix != "less" && cssSuffix != "scss" && cssSuffix != "sass") {
        console.log("WARNING : cssSuffix is filled with " + cssSuffix + ", is it really what you want ?");
    }

    //Transformation de ES2015 to ES6
    if (language == "es2015") {
        language = "es6";
    }

    //Verification du langauge
    if (language != "es5" && language != "es6") {
        paramsOk = false;
        console.log("ERROR : language must be valued by es5 or es6, " + language + " given");
    }
    //Verification de la version d'angular
    if (angularVersion != "1") {
        paramsOk = false;
        console.log("ERROR : currently, the only angular version available is 1 , " + angularVersion + " given");
    }

    //Si tous les paramètres sont bons
    if (paramsOk) {
        var factoryName = "angular" + angularVersion + "-" + language + ".js";
        var factory = require("./factories/" + factoryName);
        var moduleName, componentPath, componentName, absolutePath = null;

        var currentModule = null;
        //On boucle sur les modules
        for (var i = 0; i < modules.length; i++) {
            currentModule = modules[i];
            moduleName = currentModule['module-name'];

            if (currentModule.views != null) {
                for (j = 0; j < currentModule.views.length; j++) {
                    try {
                        componentPath = currentModule.views[i];
                        componentName = componentPath.split("/").slice(-1).pop();
                        absolutePath = basedir + "/" + prefix + componentPath;
                        console.log(absolutePath);
                        // Query the entry
                        if (!fs.existsSync(absolutePath)) {
                            //Create the folder to create files
                            mkdirp(absolutePath);
                            factory.createHtmlViewFile(absolutePath, componentName);
                            factory.createCssFile(absolutePath, componentName, cssSuffix);
                            factory.createControllerFile(absolutePath, componentName, moduleName, initServiceController);
                            factory.createServiceFile(absolutePath, componentName, moduleName);
                            console.log(componentName + " view created");
                        }
                        else {
                            console.log(componentName + " view already created.");
                        }
                    }
                    catch (e) {
                        console.log(e)
                    }
                    /*
                     if (!grunt.file.exists(views[i])) {
                     generator.createHtmlViewFile(views[i], componentName);
                     generator.createCssFile(views[i], componentName, cssSuffix);
                     generator.createControllerFile(views[i], componentName, moduleName, initServiceController);
                     generator.createServiceFile(views[i], componentName, moduleName);
                     console.log(componentName + " view created");
                     }
                     */
                }
            }
        }
    }
    else {
        console.error("Process canceled due to errors");
    }

}
else {
    console.log("Unable to find create-angular-component configuration in package.json. Please refer the documentation for further informations.");
}

/*
 if (javascriptVersion === 5) {
 generator = require('./es5.js');
 }
 else {
 generator = require('./es6.js');
 }

 generator = generator(grunt);

 var i = 0;

 if (views !== undefined) {
 for (i = 0; i < views.length; i++) {
 componentName = views[i].split("/").slice(-1).pop();
 if (!grunt.file.exists(views[i])) {
 generator.createHtmlViewFile(views[i], componentName);
 generator.createCssFile(views[i], componentName, cssSuffix);
 generator.createControllerFile(views[i], componentName, moduleName, initServiceController);
 generator.createServiceFile(views[i], componentName, moduleName);
 console.log(componentName + " view created");
 }
 }
 }

 if (directives !== undefined) {
 for (i = 0; i < directives.length; i++) {
 componentName = directives[i].split("/").slice(-1).pop();
 if (!grunt.file.exists(directives[i])) {
 generator.createHtmlDirectiveFile(directives[i], componentName);
 generator.createCssFile(directives[i], componentName, cssSuffix);
 generator.createControllerFile(directives[i], componentName, moduleName, initServiceController);
 generator.createServiceFile(directives[i], componentName, moduleName);
 generator.createDirectiveFile(directives[i], componentName, moduleName);

 console.log(componentName + " component created");
 }
 }
 }
 */