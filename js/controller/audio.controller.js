app.controller('inicioController', inicioController)

inicioController.$inject = ['audioService', '$uibModal', 'NgTableParams', 'TOASTER_SERVICE', '$stateParams', '$state', '$rootScope'];

function inicioController(audioService, $uibModal, NgTableParams, TOASTER_SERVICE, $stateParams, $state, $rootScope) {

    var inicioCtrl = this;
    var date = new Date();
    inicioCtrl.usuario = JSON.parse(sessionStorage.getItem('data'))._email;
    // inicioCtrl.usuario = "marlonconrado1998@gmail.com";
    inicioCtrl.articulos = [];
    inicioCtrl.rangodate = [{
        name: "Todos",
        date: null
    }, {
        name: "Hoy",
        dateInit: generateDate(0, 23, 59, 59),
        dateEnd: generateDate()
    }, {
        name: "Hace una semana",
        dateInit: generateDate(0, 23, 59, 59),
        dateEnd: generateDate(7)
    }, {
        name: "Hace un mes",
        dateInit: generateDate(0, 23, 59, 59),
        dateEnd: generateDate(31)
    }];
    inicioCtrl.rangoQuery = inicioCtrl.rangodate[0];

    function generateDate(ago = 0, hour = 0, min = 0, seg = 1) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate() - ago, hour, min, seg)
    }

    inicioCtrl.filterRange = function () {
        if (inicioCtrl.rangoQuery.name == "Todos") {
            inicioCtrl.buscarArticulos();
            return false;
        }
        audioService.articulosByDate(inicioCtrl.rangoQuery).then(function (resp) {
            if (resp.data) {
                inicioCtrl.articulos = resp.data;
                table();
            }
        }).catch(function (error) {});
    }



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
        }).catch(function (error) {});
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