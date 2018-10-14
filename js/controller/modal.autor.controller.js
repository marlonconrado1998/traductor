app.controller('ModalAutorCtrl', ModalAutorCtrl)
/** @ngInject */
ModalAutorCtrl.$inject = ['$uibModalInstance', 'items'];

function ModalAutorCtrl($uibModalInstance, items) {

    var modalCtrl = this;
    modalCtrl.autor = angular.copy(items.data);
    modalCtrl.type = items.type;
    modalCtrl.editar = modalCtrl.type == 'Actualizar' ? false : true;

    modalCtrl.callback = function () {
        // Con true al cerrar el modal permite que se consulten nuevamente los autores
        $uibModalInstance.dismiss(true);
    }

    modalCtrl.execute = function (Persona) {
        console.log(Persona)
    }

    modalCtrl.cerrar = function () {
        // Con false al cerrar el modal no permite que se consulten nuevamente los autores
        $uibModalInstance.dismiss(false);
    };

}