/**
 * Created by romainseb on 06/10/2015.
 */

var fs = require('fs');
var utils = require("../utils")();

module.exports = function (grunt) {


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

        var filePath = `${path}/${componentName}.controller.js`;
        var strToInsert = null;

        if (initServiceController === true) {
            strToInsert =
                `export default class ${utils.capitalizeFirstLetter(componentName)}Controller {\n` +
                `    constructor( ${utils.capitalizeFirstLetter(componentName)}Service ) {\n` +
                `        'ngInject';\n` +
                `        this.${utils.capitalizeFirstLetter(componentName)}Service = ${utils.capitalizeFirstLetter(componentName)}Service;\n` +
                `    }\n` +
                `}\n`;
        }
        else {
            strToInsert =
                `class ${utils.capitalizeFirstLetter(componentName)}Controller {\n` +
                `    constructor( ) {\n` +
                `    }\n` +
                `}\n`;
        }

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }
    };

    var createServiceFile = function (path, componentName, moduleName) {

        var filePath = `${path}/${componentName}.service.js`;

        var strToInsert =
            `export default class ${utils.capitalizeFirstLetter(componentName)}Service {\n` +
            `    constructor( ) {\n` +
            `    }\n` +
            `}\n`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }


    };

    var createDirectiveFile = function (path, componentName, moduleName, pwd) {
    };

    var createModuleComponentFile = function createModuleFile(path, componentName, moduleName, componentPrefix, pwd) {

        var filePath = `${path}/${componentName}.module.js`;
        var pathHtmlFile = path.split(pwd)[1] + "/" + componentName + ".html";
        var componentAngularName;

        var newModuleName = path.split(pwd)[1].replaceAll("/", ".").replaceAll(".app", moduleName);

        if (componentPrefix != '') {
            componentAngularName = componentPrefix + utils.capitalizeFirstLetter(componentName);
        } else {
            componentAngularName = componentName;
        }

        var strToInsert =
            `import ${utils.capitalizeFirstLetter(componentName)}Controller from './${componentName}.controller';\n` +
            `import ${utils.capitalizeFirstLetter(componentName)}Service from './${componentName}.service';\n` +
            `\n` +
            `export default angular.module('${newModuleName}', [])\n` +
            `    .component('${componentAngularName}', {\n` +
            `        controller: ${utils.capitalizeFirstLetter(componentName)}Controller,\n` +
            `        templateUrl : "${pathHtmlFile}",\n` +
            `        controllerAs: 'vm'\n` +
            `    })\n` +
            `    .service('${utils.capitalizeFirstLetter(componentName)}Service', ${utils.capitalizeFirstLetter(componentName)}Service)\n` +
            `;`;


        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }

    };

    var createModuleViewFile = function createModuleViewFile(path, componentName, moduleName, pwd) {

        var filePath = `${path}/${componentName}.module.js`;
        var newModuleName = path.split(pwd)[1].replaceAll("/", ".").replaceAll(".app", moduleName);

        var strToInsert =
            `import ${utils.capitalizeFirstLetter(componentName)}Controller from './${componentName}.controller';\n` +
            `import ${utils.capitalizeFirstLetter(componentName)}Service from './${componentName}.service';\n` +
            `\n` +
            `export default angular.module('${newModuleName}', [])\n` +
            `    .controller('${utils.capitalizeFirstLetter(componentName)}Controller', ${utils.capitalizeFirstLetter(componentName)}Controller)\n` +
            `    .service('${utils.capitalizeFirstLetter(componentName)}Service', ${utils.capitalizeFirstLetter(componentName)}Service)\n` +
            `;\n`;

        if (!fs.existsSync(filePath)) {
            fs.writeFile(
                filePath,
                strToInsert
            );
        }

    };

    var functions = {
        createHtmlViewFile: createHtmlViewFile,
        createHtmlDirectiveFile: createHtmlDirectiveFile,
        createCssFile: createCssFile,
        createControllerFile: createControllerFile,
        createServiceFile: createServiceFile,
        createDirectiveFile: createDirectiveFile,
        createModuleComponentFile: createModuleComponentFile,
        createModuleViewFile: createModuleViewFile,
    };

    return functions;

};