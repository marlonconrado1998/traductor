app.service('loginService', loginService)

/** @ngInject */
loginService.$inject = [];

function loginService() {

    var loginService = this;

    // Variables 
    loginService.logged = false;
    loginService.dataUser = null;

    // Functions 
    loginService.logIn = logIn;
    loginService.logOut = logOut;
    loginService.getLogged = getLogged;
    loginService.setData = setData;
    loginService.getData = getData;

    function logIn() {
        loginService.logged = true;
    }

    function getLogged() {
        return loginService.logged;
    }

    function setData(data) {
        loginService.dataUser = data;
    }

    function getData() {
        return loginService.dataUser;
    }

    function logOut() {
        loginService.logged = false;
        loginService.dataUser = null;
    }
}