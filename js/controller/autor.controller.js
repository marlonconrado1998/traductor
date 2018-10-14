app.controller('autorController', autorController)
/** @ngInject */
autorController.$inject = ['$uibModal', 'audioService', 'NgTableParams'];

function autorController($uibModal, audioService, NgTableParams) {

    var autorCtrl = this;
    autorCtrl.usuario = "marlonconrado1998@gmail.com";

    // Consulta la lista de autores 
    autorCtrl.getAutores = function () {
        audioService.buscarAutores().then(function (resp) {
            if (!resp) return false;
            autorCtrl.autores = resp.data;
            table();
        }).catch(function (error) {});
    }

    autorCtrl.modalAddAutor = function (autor, type) {
        var modalInstance = $uibModal.open({
            templateUrl: 'pages/modal/modal_autor.html',
            size: 'md',
            controller: 'ModalAutorCtrl',
            backdrop: true,
            controllerAs: '$ctrl',
            resolve: {
                items: function () {
                    return {
                        data: autor,
                        type: type
                    };
                }
            }
        });
        modalInstance.result.then(function () {}, function (autor) {
            if (autor) {
                autorCtrl.getAutores();
            }
        });
    }

    function table () {
        autorCtrl.tableParams = new NgTableParams({}, {
            dataset: autorCtrl.autores
        });
    }
    // Ejecutar métodos
    autorCtrl.getAutores();
}