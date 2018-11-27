app.controller('homeController', homeController)

/** @ngInject */
homeController.$inject = ['GENERAL_DATA', 'audioService', '$uibModal', 'loginService', '$stateParams', '$log'];

function homeController(GENERAL_DATA, audioService, $uibModal, loginService, $stateParams, $log) {

    var homeCtrl = this;
    homeCtrl.infoUser = JSON.parse(sessionStorage.getItem('data'));

    homeCtrl.modalInicio = function () {
        $uibModal.open({
            templateUrl: 'pages/modal/modal_inicio.html',
            size: 'md',
            controller: 'ModalInicioCtrl',
            backdrop: true,
            controllerAs: '$ctrl'
        })
    }

    homeCtrl.toogleSidebar = function () {
        $('.sidebar-offcanvas').toggleClass('active')
    }

    homeCtrl.getGramatica = function () {
        if (GENERAL_DATA.gramatica.length == 0) {
            audioService.getGramatica().then(function (resp) {
                GENERAL_DATA.gramatica = resp.data;
            }).catch(function (err) {});
        }
    }
    // homeCtrl.login();
    homeCtrl.getGramatica();
    homeCtrl.modalInicio();

}

app.controller('ModalInicioCtrl', ModalInicioCtrl)

/** @ngInject */
ModalInicioCtrl.$inject = ['$uibModalInstance', 'audioService'];

function ModalInicioCtrl($uibModalInstance, audioService) {


    var modalCtrl = this; // Variable de entorno
    modalCtrl.slides = [];
    modalCtrl.pos = 0;


    // Agrega una etiqueta a las seleccionadas
    modalCtrl.pushEtiqueta = function (texto) {
        if (!texto) return false;
        modalCtrl.etiquetasSelected.push(texto.contenido_es);
    }

    modalCtrl.siguiente = function () {
        if (modalCtrl.pos == (modalCtrl.slides.length - 1)) {
            $uibModalInstance.dismiss(false);
            return false;
        }
        modalCtrl.pos += 1;
    }

    modalCtrl.atras = function () {
        modalCtrl.pos -= 1;
    }

    function getManual() {
        audioService.getManual().then(function (resp) {
            modalCtrl.slides = resp.data;
        }).catch(function (err) {});
    }

    modalCtrl.cerrar = function () {
        $uibModalInstance.dismiss(null);
    }
    getManual();
}