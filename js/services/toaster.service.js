app.service('TOASTER_SERVICE', TOASTER_SERVICE)

/** @ngInject */
TOASTER_SERVICE.$inject = ["toaster"];

function TOASTER_SERVICE(toaster) {

    var TOASTER_SERVICE = this;

    TOASTER_SERVICE.ok = ok;
    TOASTER_SERVICE.error = error;

    function ok(msg) {
        toaster.clear();
        toaster.pop({
            type: 'success',
            title: 'Hecho',
            body: msg,
            timeout: 5000,
            showCloseButton: true
        });
    }

    function error(msg) {
        toaster.clear();
        toaster.pop({
            type: 'error',
            title: 'Error',
            body: msg,
            timeout: 5000,
            showCloseButton: true
        });
    }


}