app.controller('ModalEtiquetaCtrl', ModalEtiquetaCtrl)

/** @ngInject */
ModalEtiquetaCtrl.$inject = ['audioService', '$uibModalInstance', 'items', 'TOASTER_SERVICE', 'GENERAL_DATA', 'Upload', 'GeneralURL'];

function ModalEtiquetaCtrl(audioService, $uibModalInstance, items, TOASTER_SERVICE, GENERAL_DATA, Upload, GeneralURL) {

    var modalCtrl = this; // Variable de entorno
    modalCtrl.etiqueta = angular.copy(items.data); // Etiqueta con sus valores
    modalCtrl.type = items.type; // Tipo de modal Insertar/Actualizar
    modalCtrl.editar = modalCtrl.type == 'Actualizar' ? false : true; // Variable de control de modificación de campos según modalCtrl.type


    modalCtrl.callback = function () {
        $uibModalInstance.dismiss(true);
    }
    modalCtrl.cerrar = function () {
        $uibModalInstance.dismiss(null);
    };

}