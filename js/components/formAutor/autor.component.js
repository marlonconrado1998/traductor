app.component('formAutor', {
    templateUrl: './js/components/formAutor/form_autor.html',
    bindings: {
        callback: "=",
        autor: "=",
        type: "@",
        editar: "="
    },
    controller: function formAutorController(audioService, TOASTER_SERVICE) {

        var ctrl = this; // Variable de entorno

        // Ejecuta una función dependiendo del valor de ctrl.type
        ctrl.onExecute = function () {
            if (ctrl.type == 'Insertar') ctrl.addAutor();
            if (ctrl.type == 'Actualizar') ctrl.updateAutor();
        }

        // Llama al servicio que va a agregar un nuevo registro a la lista de autores
        ctrl.addAutor = function () {
            if (validarAutor()) return false;
            ctrl.loader = true;
            audioService.addAutor(ctrl.autor).then(function (resp) {
                if (!resp) return false;
                ctrl.loader = false;
                TOASTER_SERVICE.ok('Autor agregado correctamente.');
                if (typeof ctrl.callback == 'function') ctrl.callback();
            }).catch(function (error) {
                TOASTER_SERVICE.error(error.data.error);
                ctrl.loader = false;
            });
        }

        // Llama al servicio que va a actualizar los datos del autor
        ctrl.updateAutor = function () {
            if (validarAutor()) return false;
            ctrl.loader = true;
            audioService.updateAutor(ctrl.autor).then(function (resp) {
                if (!resp) return false;
                ctrl.loader = false;
                TOASTER_SERVICE.ok('Autor modificado correctamente.');
                if (typeof ctrl.callback == 'function') ctrl.callback();
            }).catch(function (error) {
                ctrl.loader = false;
                TOASTER_SERVICE.error(error.data.error);
            });
        }

        // Valida que los datos del formulario autor no esté vacíos
        function validarAutor() {
            if (!ctrl.autor.id || !ctrl.autor.nombre ||
                !ctrl.autor.email || !ctrl.autor.ubicacion) {
                TOASTER_SERVICE.error('Existen campos vacíos.');
                return false;
            }
        }
    },
    controllerAs: "$ctrl"
});