app.component('formEtiqueta', {
    templateUrl: './js/components/formEtiqueta/form_etiqueta.html',
    bindings: {
        // onSaveChanges: "=",
        etiqueta: "=",
        type: "@",
        editar: "=",
        callback: "="
        // gramatica: "<"
    },
    controller: function formEtiquetaController(GeneralURL, audioService, Upload, GENERAL_DATA, TOASTER_SERVICE) {

        var ctrl = this;
        ctrl.url = GeneralURL + '/image'; // Url de servicio de imagenes
        ctrl.gramatica = GENERAL_DATA.gramatica; // Lista de gramatica permitida


        // LLama al servicio para modificar el registro
        ctrl.updateEtiqueta = function () {
            if (validarContenidos()) return false;
            ctrl.loader = true;

            uploadGaleria(function (images) {
                ctrl.etiqueta.new_galeria = images;
                audioService.updateEtiqueta(ctrl.etiqueta).then(function (resp) {
                    if (!resp) return false;
                    ctrl.loader = false;
                    TOASTER_SERVICE.ok('Etiqueta modificada correctamente.');
                    ctrl.callback();
                }).catch(function (error) {
                    ctrl.loader = false;
                    TOASTER_SERVICE.error("Error al modificar la etiqueta");
                });
            });
        }

        // LLama al servicio para agregar una nueva etiqueta
        ctrl.addEtiqueta = function () {
            // Validaciones
            if (validarContenidos()) return false;

            ctrl.loader = true;
            uploadGaleria(function (images) {
                ctrl.etiqueta.galeria = images;
                audioService.addEtiqueta(ctrl.etiqueta).then(function (resp) {
                    if (!resp) return false;
                    ctrl.loader = false;
                    TOASTER_SERVICE.ok('Etiqueta agregada correctamente.');
                    ctrl.callback();
                }).catch(function (error) {
                    ctrl.loader = false;
                    TOASTER_SERVICE.error(error.data.error);
                });
            });
        }

        ctrl.vaciarGaleria = function () {
            ctrl.galeria_selected = [];
        }
        // Delete image
        ctrl.deleteImage = function (path, loader) {
            if (confirm('Esta imagen será eliminada.')) {
                loader.bool = true;
                audioService.deleteImage(path, ctrl.etiqueta._id).then(function (resp) {
                    if (!resp) return false;
                    TOASTER_SERVICE.ok('Imagen eliminada correctamente.');
                    loader.bool = false;
                    dropImage(resp.data);
                    ctrl.callback();
                }).catch(function (error) {
                    ctrl.loader = false;
                    TOASTER_SERVICE.error("Error al eliminar la imagen.");
                });
            }
        }

        // Elimina la imagen del array
        function dropImage(image) {
            for (var index = 0; index < ctrl.etiqueta.galeria.length; index++) {
                if (ctrl.etiqueta.galeria[index] == image) {
                    ctrl.etiqueta.galeria.splice(index, 1);
                }
            }
        }

        // Recorre las imagenes de la galeria y las carga al servidor
        function uploadGaleria(callback) {

            // Valida que la galeria no esté vacía
            if (!ctrl.galeria_selected || ctrl.galeria_selected.length == 0) {
                callback([]);
                return false;
            };

            var path_images = [];
            for (var i = 0; i < ctrl.galeria_selected.length; i++) {
                var image = ctrl.galeria_selected[i];
                Upload.upload({
                    url: ctrl.url,
                    data: {
                        image: image
                    }
                }).then(function (resp) {
                    // Agrega la ruta a la lista de rutas que fueron cargadas en el servidor
                    path_images.push({
                        path: resp.data.data.filename,
                        author: image.author
                    });
                    // Valida que todas las imagenes hayan sido subidas para devolver las rutas de las imagenes
                    if (ctrl.galeria_selected.length == path_images.length) {
                        callback(path_images);
                    }
                });
            }
        }

        // Necesario para cargar las imagenes
        ctrl.load = function () {
            ctrl.addImages(ctrl.galeria);
        }

        // Agrega imagenes a la galería
        ctrl.addImages = function (images) {
            if (!ctrl.galeria_selected) {
                ctrl.galeria_selected = [];
            }
            for (var index in images) {
                if (!existeImage(images[index].name)) {
                    ctrl.galeria_selected.push(images[index]);
                }
            }
        }


        ctrl.onExecute = function () {
            if (ctrl.type == 'Insertar') ctrl.addEtiqueta();
            if (ctrl.type == 'Actualizar') ctrl.updateEtiqueta();
            // console.log(ctrl.etiqueta);
        }

        // Valida que no se carguen dos imagenes iguales
        function existeImage(name) {
            for (var index in ctrl.galeria_selected) {
                if (ctrl.galeria_selected[index].name == name) {
                    return true;
                }
            }
            return false;
        }

        // Valida el formulario etiqueta no tenga campos vacíos
        function validarContenidos() {
            if (!ctrl.etiqueta.contenido_es || !ctrl.etiqueta.contenido_en ||
                !ctrl.etiqueta.contenido_cr) {
                TOASTER_SERVICE.error('Existen campos vacíos.');
                return false;
            }
        }
    },
    controllerAs: "$ctrl"
});