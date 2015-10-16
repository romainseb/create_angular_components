/**
 * Created by romainseb on 13/10/2015.
 */
module.exports = function () {

    var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    var functions = {
        capitalizeFirstLetter: capitalizeFirstLetter
    };

    return functions;

};