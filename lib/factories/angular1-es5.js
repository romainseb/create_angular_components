/**
 * Created by romainseb on 06/10/2015.
 */

var fs = require('fs');
var utils = require("../utils")();

module.exports = function () {

    var createHtmlViewFile = function (path, componentName) {

        var filePath = `${path}/${componentName}.html`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `<div id="${componentName}"></div>`
            );
        }
    };

    var createHtmlDirectiveFile = function (path, componentName) {

        var filePath = `${path}/${componentName}.html`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `<div class="${componentName}"></div>`
            );
        }
    };

    var createCssFile = function (path, componentName, cssSuffix) {
        var filePath = `${path}/${componentName}.${cssSuffix}`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                ''
            );
        }
    };

    var createControllerFile = function (path, componentName, moduleName, initServiceController) {

        var serviceController = initServiceController === true ? utils.capitalizeFirstLetter(componentName) + "Service" : '';
        var filePath = `${path}/${componentName}Controller.js`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `angular.module('${moduleName}').controller('${utils.capitalizeFirstLetter(componentName)}Controller',\n` +
                `    function ${utils.capitalizeFirstLetter(componentName)}Controller (${serviceController}){\n` +
                `    }\n` +
                `);`
            );
        }
    };

    var createServiceFile = function (path, componentName, moduleName) {

        var filePath = `${path}/${componentName}.service.js`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `angular.module('${moduleName}').service('${utils.capitalizeFirstLetter(componentName)}Service',\n` +
                `    function ${utils.capitalizeFirstLetter(componentName)}Service (){\n` +
                `    }\n` +
                `);`
            );
        }
    };

    var createDirectiveFile = function (path, componentName, moduleName, pwd) {

        var filePath = `${path}/${componentName}Directive.js`;
        var pathHtmlFile = path.split(pwd)[1] + ".html";

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                `angular.module('${moduleName}').directive('${componentName}',\n` +
                `    function (){\n` +
                `        return {\n` +
                `            restrict:"E",\n` +
                `            bindToController : {},\n` +
                `            controller:"${utils.capitalizeFirstLetter(componentName)}Controller",\n` +
                `            controllerAs : "vm",\n` +
                `            templateUrl : "${pathHtmlFile}",\n` +
                `            scope : true\n` +
                `        };\n` +
                `    }\n` +
                `);`
            )
            ;
        }
    };

    var createModuleComponentFile = function createModuleComponentFile(path, componentName, moduleName, isView) {

    };

    var createModuleViewFile = function createModuleViewFile(path, componentName, moduleName) {

    };

    var functions = {
        createHtmlViewFile: createHtmlViewFile,
        createHtmlDirectiveFile: createHtmlDirectiveFile,
        createCssFile: createCssFile,
        createControllerFile: createControllerFile,
        createServiceFile: createServiceFile,
        createDirectiveFile: createDirectiveFile,
        createModuleViewFile: createModuleComponentFile,
        createModuleViewFile: createModuleViewFile
    };

    return functions;

};