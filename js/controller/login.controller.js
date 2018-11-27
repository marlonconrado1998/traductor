app.controller('loginController', loginController)

/** @ngInject */
loginController.$inject = ['$stateParams', '$location'];

function loginController($stateParams, $location) {

    var loginCtrl = this;
    loginCtrl.userInfo = {};

    loginCtrl.login = function () {

        var data = $stateParams.data,
            token = $stateParams.token;
        var session = {
            data: sessionStorage.getItem('data'),
            token: sessionStorage.getItem('token')
        };

        if (!data && !token) return false; // Valida que venga un usuario y un token
        if (session.data) return false; // Valida que no haya session usuario creada
        if (session.token) return false; // Valida que no haya session de token creada

        sessionStorage.setItem('data', data);
        sessionStorage.setItem('token', token);
        $location.path('/inicio/audio');
    }

    loginCtrl.logout = function () {
        sessionStorage.removeItem('data');
        sessionStorage.getItem('token');
        location.href = "https://cloudhosting.isysingenieria.co/testWebServices/authservice/";
    };

    loginCtrl.login();
}