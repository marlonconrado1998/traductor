(function () {
    'use strict';

    app.controller('etiquetaSolController', etiquetaSolController)

    /** @ngInject */
    etiquetaSolController.$inject = ['NgTableParams', 'audioService', '$rootScope', '$location'];

    function etiquetaSolController(NgTableParams, audioService, $rootScope, $location) {

        var vm = this;

        // variables
        vm.etiquetas_seleccionadas = new Array();

        // funciones
        vm.getEtiquetasSol = getEtiquetasSol;
        vm.deleteEtiquetaSol = deleteEtiquetaSol;
        vm.addEtiquetaSol = addEtiquetaSol;
        

        // llamada de funciones
        vm.getEtiquetasSol();


        function getEtiquetasSol() {
            audioService.getEtiquetasSol().then(function (resp) {
                if (!resp) return false;
                vm.etiquetas_seleccionadas = resp.data;
                table();
            }).catch(function (error) {});
        }

        function deleteEtiquetaSol(idsolicitud_sol) {
            if (!confirmExec()) return false;
            audioService.deleteEtiquetaSol(idsolicitud_sol).then(function (resp) {
                vm.getEtiquetasSol();
            }).catch(function (error) {});
        }

        function addEtiquetaSol (nombre) {
            // $rootScope.nombre = nombre;
            $location.path('/inicio/etiqueta');
        }

        function table() {
            vm.tableParams = new NgTableParams({}, {
                dataset: vm.etiquetas_seleccionadas
            });
        }

        function confirmExec () {
            let conf = confirm("¿Está seguro de rechazar la petición?")
            return conf;
        }
    }

}());