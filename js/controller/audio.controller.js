app
.filter('dateRange', dateRange)
.controller('inicioController', inicioController)


function dateRange () {
    return function (range) {
        // var date = new Date();
        return false;
    }
}
inicioController.$inject = ['audioService', '$uibModal', 'NgTableParams', 'TOASTER_SERVICE', '$stateParams', '$state', '$rootScope'];

function inicioController(audioService, $uibModal, NgTableParams, TOASTER_SERVICE, $stateParams, $state, $rootScope) {

    var inicioCtrl = this;
    inicioCtrl.usuario = "marlonconrado1998@gmail.com";
    inicioCtrl.articulos = [];

    function table() {
        inicioCtrl.tableParams = new NgTableParams({}, {
            dataset: inicioCtrl.articulos
        });
    }

    inicioCtrl.buscarArticulos = function () {
        audioService.buscarArticulos(inicioCtrl.usuario).then(function (resp) {
            if (!resp) return false;
            inicioCtrl.articulos = resp.data;
            table();
        }).catch(function (error) {
            // TOASTER_SERVICE.error(error.error);
        });
    }

    inicioCtrl.modalAddArticulo = function (type, articulo) {

        var modalInstance = $uibModal.open({
            templateUrl: 'pages/modal/modal_audio.html',
            size: 'lg',
            controller: 'ModalInstanceCtrl',
            backdrop: true,
            controllerAs: '$ctrl',
            resolve: {
                items: function () {
                    return {
                        data: articulo,
                        type: type
                    };
                }
            }
        });
        modalInstance.result.then(function () {}, function (articulo) {
            if (articulo) {
                inicioCtrl.getAutores();
                inicioCtrl.buscarArticulos();
            };
        });
    }

    inicioCtrl.getAutor = function (id_autor) {
        for (let index in inicioCtrl.autores) {
            let autor = inicioCtrl.autores[index];
            if (autor.id == id_autor) {
                return autor.nombre;
            }
        }
    }
    inicioCtrl.getAutores = function () {
        audioService.buscarAutores().then(function (resp) {
            inicioCtrl.autores = resp.data;
        }).catch(function (err) {});
    }
    // Ejecuta la funcion
    inicioCtrl.buscarArticulos();
    inicioCtrl.getAutores();
}