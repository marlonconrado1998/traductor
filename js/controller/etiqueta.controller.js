app.controller('etiquetaController', etiquetaController)

/** @ngInject */
etiquetaController.$inject = ['audioService', '$uibModal', 'NgTableParams'];

function etiquetaController(audioService, $uibModal, NgTableParams) {

    var etiquetaCtrl = this;
    etiquetaCtrl.usuario = "marlonconrado1998@gmail.com";
    etiquetaCtrl.etiquetas = [];

    etiquetaCtrl.buscarEtiquetas = function () {
        audioService.buscarEtiquetas().then(function (resp) {
            if (!resp) return false;
            etiquetaCtrl.etiquetas = resp.data;
            table();
        }).catch(function (error) {});
    }

    etiquetaCtrl.modalAddEtiqueta = function (etiqueta, type) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/modal/modal_etiqueta.html',
            size: 'lg',
            controller: 'ModalEtiquetaCtrl',
            backdrop: true,
            controllerAs: '$ctrl',
            resolve: {
                items: function () {
                    return {
                        data: etiqueta,
                        type: type
                    };
                }
            }
        });
        modalInstance.result.then(function () {}, function (etiqueta) {
            if (etiqueta) {
                etiquetaCtrl.buscarEtiquetas();
            }
        });
    }

    function table () {
        etiquetaCtrl.tableParams = new NgTableParams({}, {
            dataset: etiquetaCtrl.etiquetas
        });
    }
    // Ejecución de funciones
    etiquetaCtrl.buscarEtiquetas();
}