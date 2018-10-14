app.factory("selectFactory", ["generalService", function (generalService) {

    var fac = this;
    fac.gramatica = null; // Lista de posibles gramáticas

    fac.findUrl = function () {
        generalService.EJECUTAR_SERVICES("GET", "/gramatica")
            .then(function (resp) {
                fac.gramatica = resp.data.split(',');
            }).catch(function (error) {});
    }
    return {
        getGramatica: function () {
            if (!fac.gramatica) {
                fac.findUrl();
            }
            return fac.gramatica;
        }
    };
}]);