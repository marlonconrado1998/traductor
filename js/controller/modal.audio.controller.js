app.controller('ModalInstanceCtrl', ModalInstanceCtrl)

/** @ngInject */
ModalInstanceCtrl.$inject = ['$uibModalInstance', 'Upload', 'TOASTER_SERVICE', 'GeneralURL', 'audioService', 'items', 'GENERAL_DATA'];

function ModalInstanceCtrl($uibModalInstance, Upload, TOASTER_SERVICE, GeneralURL, audioService, items, GENERAL_DATA) {

    var modalCtrl = this; // Variable de entorno
    modalCtrl.etiquetasSelected = [];
    modalCtrl.fileUploaded = {};
    modalCtrl.etiqueta = {};
    modalCtrl.loader = false;
    modalCtrl.type = items.type;

    // Quita una etiqueta seleccionada
    modalCtrl.dropEtiqueta = function (index) {
        modalCtrl.etiquetasSelected.splice(index, 1);
    }

    // Agrega el audio seleccionado
    modalCtrl.addAudio = function (tag, audio) {
        modalCtrl.audio = audio;
    }

    // Elimina el audio seleccionado
    modalCtrl.removeFile = function () {
        var tag_audio = document.getElementById('art_audio');
        tag_audio.pause();
        modalCtrl.audio = null;
        modalCtrl.type = 'Insertar';
    }

    modalCtrl.executeQuery = function () {
        if (modalCtrl.type == 'Insertar') modalCtrl.addArticulo();
        if (modalCtrl.type == 'Actualizar') modalCtrl.updateArticulo();
    }

    // Modifica el artículo
    modalCtrl.updateArticulo = function () {

        // Valida que se hayan agregado etiquetas
        if (modalCtrl.etiquetasSelected.length < 1) {
            TOASTER_SERVICE.error('No se ha agregado ninguna etiqueta.');
            return false;
        }
        // Valida etiquetas 
        if (!etiquetaIsValid()) {
            TOASTER_SERVICE.error('Hay etiquetas seleccionadas que no han sido creadas.');
            return false;
        }
        // Valida que ninguno de los campos esté vacio
        if (!modalCtrl.articulo.espanol || !modalCtrl.articulo.ingles ||
            !modalCtrl.articulo.kreole) {
            TOASTER_SERVICE.error('Existen campos vacíos.');
            return false;
        }

        let articulo = {
            id: items.data._id,
            autor: modalCtrl.autor.id,
            articulo: modalCtrl.articulo,
            etiquetas: getText()
        }
        modalCtrl.loader = true;
        audioService.updateArticulo(articulo).then(function (resp) {
            if (!resp) return false;
            modalCtrl.loader = false;
            TOASTER_SERVICE.ok('Artículo modificado correctamente.');
            $uibModalInstance.dismiss(true);
        }).catch(function (error) {
            modalCtrl.loader = false;
            TOASTER_SERVICE.error('No se pudo modificar el artículo.');
        });
    }

    // Inserta un nuevo artículo 
    modalCtrl.addArticulo = function () {

        // Valida que se hayan agregado etiquetas
        if (modalCtrl.etiquetasSelected.length < 1) {
            TOASTER_SERVICE.error('No se ha agregado ninguna etiqueta.');
            return false;
        }
        // Valida etiquetas 
        if (!etiquetaIsValid()) {
            TOASTER_SERVICE.error('Hay etiquetas seleccionadas que no han sido creadas.');
            return false;
        }
        // Valida que ninguno de los campos esté vacio
        if (!modalCtrl.articulo.espanol || !modalCtrl.articulo.ingles ||
            !modalCtrl.articulo.kreole) {
            TOASTER_SERVICE.error('Existen campos vacíos.');
            return false;
        }

        modalCtrl.loader = true;
        Upload.upload({
            url: (GeneralURL + "/files"),
            data: {
                file: modalCtrl.audio,
                articulo: {
                    nombre: "Marlon"
                }
            }
        }).then(function (resp) {

            let articulo = {
                audio: resp.data.data.id,
                autor: modalCtrl.autor.id,
                articulo: modalCtrl.articulo,
                etiquetas: getText()
            }

            audioService.addArticulo(articulo).then(function (resp) {
                if (!resp) return false;
                modalCtrl.loader = false;
                TOASTER_SERVICE.ok('Artículo agregado correctamente.');
                $uibModalInstance.dismiss(true);
            }).catch(function (error) {
                modalCtrl.loader = false;
                TOASTER_SERVICE.error('No se pudo agregar el artículo.');

            });
        });
    }

    // Valida la duración del audio
    modalCtrl.validarDuracion = function (duracion) {
        if (duracion < 5) {
            TOASTER_SERVICE.error('Audio debe durar más de 5 segundos.');
        }
        if (duracion > 20) {
            TOASTER_SERVICE.error('Audio debe durar menos de 20 segundos.');
        }
    }


    // Consulta las etiquetas
    function getEtiquetas() {
        audioService.buscarEtiquetas().then(function (resp) {
            if (!resp) return false;
            modalCtrl.etiquetas = resp.data;
        }).catch(function (error) {});
    }

    // Consulta los autores
    function getAutores(idAutor) {
        audioService.buscarAutores().then(function (resp) {
            if (!resp) return false;
            modalCtrl.autores = resp.data;
            if (idAutor) getAutor(idAutor);

        }).catch(function (error) {});
    }

    // Busca el autor insertado en la lista de autores y lo asigna al select de autores 
    function getAutor(idAutor) {
        for (var index in modalCtrl.autores) {
            var autor = modalCtrl.autores[index];
            if (autor.id == idAutor) {
                modalCtrl.autor = angular.copy(autor);
                break;
            }
        }
    }


    // COnsulta las etiquetas digitadas
    modalCtrl.getEtiquetaAdded = function () {
        audioService.getEtiquetaAdded(modalCtrl.texto).then(function (resp) {
            var textos = modalCtrl.texto.split(',');
            findTexto(textos, resp.data);
        }).catch(function (err) {});
    }


    // Crea una lista de los textos digitados que también estan en la consulta
    function findTexto(textos, data) {
        modalCtrl.etiquetasSelected = [];
        for (var indexi in textos) {
            var existe = false;
            for (var indexy in data) {
                if (textos[indexi].trim().toUpperCase() == data[indexy].contenido_es.trim().toUpperCase()) {
                    existe = true;
                }
            }
            if (textos[indexi].trim()) {
                var selected = {
                    nombre: textos[indexi],
                    existe: existe
                }
                if (!existeSelected(selected))
                    modalCtrl.etiquetasSelected.push(selected);
            }
        }
    }

    // Valida que exista la etiqueta seleccionada
    function existeSelected(selected) {
        for (var index in modalCtrl.etiquetasSelected) {
            if (selected.nombre.trim().toUpperCase() == modalCtrl.etiquetasSelected[index].nombre.trim().toUpperCase())
                return true;
        }
    }

    // Valida que las etiquetas seleccionadas hayan sido creadas 
    function etiquetaIsValid() {
        for (var index in modalCtrl.etiquetasSelected) {
            if (!modalCtrl.etiquetasSelected[index].existe) {
                return false;
            }
        }
        return true;
    }


    // Devuelve las etiquetas seleccionadas
    function getText() {
        var textos = modalCtrl.texto.split(',');
        var result = [];

        for (var indexI in textos) {
            for (var indexY in modalCtrl.etiquetasSelected) {
                if (textos[indexI] == modalCtrl.etiquetasSelected[indexY].nombre) {
                    result.push(textos[indexY]);
                }
            }
        }
        return result;
    }

    modalCtrl.callback = function () {
        getEtiquetas();
        modalCtrl.getEtiquetaAdded(modalCtrl.texto);
        modalCtrl.form_etiqueta = false;
    }

    modalCtrl.callbackAutores = function () {
        getAutores(modalCtrl.autorToInsert.id);
        modalCtrl.form_autor = false;
        modalCtrl.autor_filter = null;
    }

    // Cierra el modal
    modalCtrl.cerrar = function () {
        $uibModalInstance.dismiss(null);
    };

    // Ejecución de funciones
    getAutores(false);
    getEtiquetas();

    if (items.data) {
        modalCtrl.texto = items.data.etiquetas.toString();
        modalCtrl.audio = items.data.audio; // Contiene audio a insertar
        modalCtrl.articulo = {
            espanol: items.data.contenido_es,
            ingles: items.data.contenido_en,
            ingles: items.data.contenido_en,
            kreole: items.data.contenido_cr
        }
        getAutores(items.data.autor);
        modalCtrl.getEtiquetaAdded();
    }
}