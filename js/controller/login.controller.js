app.controller('loginController', loginController)

/** @ngInject */
loginController.$inject = ['loginService', '$location', 'GENERAL_DATA', 'audioService', '$uibModal'];

function loginController(loginService, $location, GENERAL_DATA, audioService, $uibModal) {

    var loginCtrl = this;

    //Variables
    loginCtrl.loged = loginService.loged;
    loginCtrl.user = null;
    loginCtrl.password = null;
    loginCtrl.mensaje = null;
    loginCtrl.loading = false;
    loginCtrl.account = loginService.account;
    var cont = 0;
    getAccount();

    loginCtrl.logout = function () {
        sessionStorage.removeItem("user");
        $location.path("/Login");
        loginService.loged = false;
        loginCtrl.loged = loginService.loged;
    }

    loginCtrl.showPass = function () {
        if (cont === 0) {
            $("#contrasena").attr("type", "text");
            cont = 1;
        } else {
            $("#contrasena").attr("type", "password");
            cont = 0;
        }
    }

    loginCtrl.login = function () {
        loginCtrl.mensaje = null;
        loginCtrl.loading = true;
        loginService.login({
                user: loginCtrl.user,
                password: loginCtrl.password
            })
            .then(function (response) {
                console.log(response);

                loginCtrl.loading = false;
                if (response.data == null) {
                    throw new Error();
                } else {
                    setAccount(response.data);
                }
            })
            .catch(function (error) {
                console.log(error);
                loginCtrl.mensaje = "Usuario o contraseña invalido."
            });
    }

    function setAccount(data) {
        $location.path("/Inicio");
        sessionStorage.setItem("user", JSON.stringify(data));
        getAccount();
    }

    function getAccount() {
        if (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined) {
            loginService.loged = false;
        } else {
            loginService.account = JSON.parse(sessionStorage.getItem("user"));
            loginService.loged = true;
        }
        loginCtrl.account = loginService.account;
        loginCtrl.loged = loginService.loged;
    }

    loginCtrl.modalInicio = function () {
        $uibModal.open({
            templateUrl: 'pages/modal/modal_inicio.html',
            size: 'md',
            controller: 'ModalInicioCtrl',
            backdrop: true,
            controllerAs: '$ctrl'
        }).result.then(function () {}, function (resp) {});
    }

    loginCtrl.getGramatica = function () {
        if (GENERAL_DATA.gramatica.length == 0) {
            audioService.getGramatica().then(function (resp) {
                GENERAL_DATA.gramatica = resp.data;
            }).catch(function (err) {});
        }
    }

    loginCtrl.modalInicio();
    loginCtrl.getGramatica();
}

app.controller('ModalInicioCtrl', ModalInicioCtrl)

/** @ngInject */
ModalInicioCtrl.$inject = ['$uibModalInstance', 'audioService', 'GENERAL_DATA'];

function ModalInicioCtrl($uibModalInstance, audioService, GENERAL_DATA) {


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
            modalCtrl.cerrar();
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