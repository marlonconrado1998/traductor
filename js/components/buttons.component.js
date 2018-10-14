app.component('buttonSave', {
    bindings: {
        method: "&",
        disabled: "=",
        data: '@'
    },
    controller: function formAutorController() {
        var ctrl = this; // Variable de entorno
        ctrl.onExecute = function () {
            console.log(ctrl.method())
            // if (typeof ctrl.method == 'function') {
            //     ctrl.method(ctrl.data);
            // }
        }
    },
    controllerAs: "$ctrl",
    template: '<button type="button" ng-click="$ctrl.onExecute();" class="btn btn-outline-success"> <i class="fa fa-save"></i>Guardar</button>'
});

app.component('buttonReset', {

    bindings: {
        mcMethod: "=",
        mcDisabled: "="
    },
    template: '<button type="reset" class="btn btn-outline-info"><i class="fa fa-eraser"></i> Limpiar</button>'
});

app.component('buttonClose', {

    bindings: {
        mcMethod: "=",
        mcDisabled: "="
    },
    controller: function formAutorController() {
        var ctrl = this; // Variable de entorno
        ctrl.onExecute = function () {
            if (typeof ctrl.mcMethod == 'function') {
                ctrl.mcMethod();
            }
        }
    },
    controllerAs: "$ctrl",
    template: '<button type="reset" class="btn btn-outline-danger"><i class="fa fa-times"></i> Cerrar</button>'
});