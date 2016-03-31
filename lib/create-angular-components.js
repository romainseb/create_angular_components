/*
 * grunt-sro-create-angular-components
 * https://github.com/romainseb/grunt-sro-create-angular-components
 *
 * Copyright (c) 2015 romainseb
 * Licensed under the MIT license.
 */
var fs = require('fs');
var mkdirp = require('mkdirp');
var format = require("string-template");

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
    var componentPrefix = (options !== undefined && options.componentPrefix !== undefined) ? options.componentPrefix : '';

    var paramsOk = true;

    //check on initServiceController
    if (initServiceController != true && initServiceController != false) {
        paramsOk = false;
        console.log(`ERROR : initerviceController must be valued by true or false, ${initSericeController} given`);
    }
    //check css suffix
    if (cssSuffix != "css" && cssSuffix != "less" && cssSuffix != "scss" && cssSuffix != "sass") {
        console.log(`WARNING : cssSuffix is filled with ${cssSuffix}, is it really what you want ?`);
    }

    //set ES2015 to ES6
    if (language == "es2015") {
        language = "es6";
    }

    //check languages
    if (language != "es5" && language != "es6") {
        paramsOk = false;
        console.log(`ERROR : language must be valued by es5 or es6, ${language} given`);
    }
    //Check the version of angularjs
    if (angularVersion != "1") {
        paramsOk = false;
        console.log(`ERROR : curretly, the only angular version available is 1 , ${angularVersion} given`);
    }

    //If all parameters are rights
    if (paramsOk) {
        var factoryName = `angular${angularVersion}-${language}.js`;
        var factory = require(`./factories/${factoryName}`);
        var factory = factory();
        var moduleName, componentPath, componentName, absolutePath, currentModule = null;

        //we iterate on
        for (var i = 0; i < modules.length; i++) {
            currentModule = modules[i];
            moduleName = currentModule['module-name'];

            if (currentModule.views != null) {
                for (var j = 0; j < currentModule.views.length; j++) {

                    componentPath = currentModule.views[j];
                    componentName = componentPath.split("/").slice(-1).pop();
                    absolutePath = basedir + "/" + prefix + componentPath;

                    createView(factory, absolutePath, componentName, cssSuffix, moduleName, initServiceController);
                }
            }
            if (currentModule.directives != null) {
                for (var j = 0; j < currentModule.directives.length; j++) {

                    componentPath = currentModule.directives[j];
                    componentName = componentPath.split("/").slice(-1).pop();
                    absolutePath = basedir + "/" + prefix + componentPath;

                    createDirective(factory, absolutePath, componentName, cssSuffix, moduleName, initServiceController, componentPrefix);
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

function createDirective(factory, absolutePath, componentName, cssSuffix, moduleName, initServiceController, componentPrefix) {

    // Query the entry
    if (!fs.existsSync(absolutePath)) {
        //Create the folder to create files
        mkdirp(absolutePath, function () {
            factory.createHtmlDirectiveFile(absolutePath, componentName);
            factory.createCssFile(absolutePath, componentName, cssSuffix);
            factory.createControllerFile(absolutePath, componentName, moduleName, initServiceController);
            factory.createServiceFile(absolutePath, componentName, moduleName);
            factory.createDirectiveFile(absolutePath, componentName, moduleName, basedir);
            factory.createModuleComponentFile(absolutePath, componentName, moduleName, componentPrefix, basedir);
            console.log(`${componentName} directive created`);
        });
    }
    else {
        console.log(`${componentName} directed already created.`);
    }

}

function createView(factory, absolutePath, componentName, cssSuffix, moduleName, initServiceController) {

    // Query the entry
    if (!fs.existsSync(absolutePath)) {
        //Create the folder to create files

        mkdirp(absolutePath, function () {

            factory.createHtmlViewFile(absolutePath, componentName);
            factory.createCssFile(absolutePath, componentName, cssSuffix);
            factory.createControllerFile(absolutePath, componentName, moduleName, initServiceController);
            factory.createServiceFile(absolutePath, componentName, moduleName);
            factory.createModuleViewFile(absolutePath, componentName, moduleName, basedir);
            console.log(`${componentName} view created`);
        });
    }
    else {
        console.log(`${componentName} view already created.`);
    }

}
