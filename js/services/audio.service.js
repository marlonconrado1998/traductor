app.service('audioService', audioService)

/** @ngInject */
audioService.$inject = ["generalService", '$http', '$q'];

function audioService(generalService, $http, $q) {

    var audioService = this;

    // Servicio Artículo
    audioService.buscarArticulos = buscarArticulos;
    audioService.addArticulo = addArticulo;
    audioService.removeFile = removeFile;
    audioService.getAudio = getAudio;
    audioService.updateArticulo = updateArticulo;


    // Servicios Autor
    audioService.buscarAutores = buscarAutores;
    audioService.updateAutor = updateAutor;
    audioService.addAutor = addAutor;

    // Servicios Etiqueta
    audioService.buscarEtiquetas = buscarEtiquetas;
    audioService.addEtiqueta = addEtiqueta;
    audioService.updateEtiqueta = updateEtiqueta;
    audioService.getEtiquetaAdded = getEtiquetaAdded;
    audioService.getGramatica = getGramatica;
    audioService.deleteImage = deleteImage;

    // Auth
    audioService.addUser = addUser;
    audioService.getUser = getUser;


    // Manual inicial
    audioService.getManual = getManual;

    function buscarArticulos(usuario) {
        return generalService.EJECUTAR_SERVICES("GET", "/articulos/" + usuario);
    }

    function addArticulo(articulo) {
        return generalService.EJECUTAR_SERVICES("POST", "/articulo", articulo);
    }

    function removeFile(id) {
        return generalService.EJECUTAR_SERVICES("DELETE", "/files/" + id);
    }

    function getAudio(id) {
        return generalService.EJECUTAR_SERVICES("GET", "/files/" + id);
    }

    function updateArticulo(articulo) {
        return generalService.EJECUTAR_SERVICES("PUT", "/articulo", articulo);
    }

    function buscarAutores() {
        return generalService.EJECUTAR_SERVICES("GET", "/autores");
    }

    function updateAutor(autor) {
        return generalService.EJECUTAR_SERVICES("PUT", "/autor", autor);
    }

    function addAutor(autor) {
        return generalService.EJECUTAR_SERVICES("POST", "/autor", autor);
    }

    function buscarEtiquetas() {
        return generalService.EJECUTAR_SERVICES("GET", "/etiquetas");
    }

    function addEtiqueta(etiqueta) {
        return generalService.EJECUTAR_SERVICES("POST", "/etiqueta", etiqueta);
    }

    function updateEtiqueta(etiqueta) {
        return generalService.EJECUTAR_SERVICES("PUT", "/etiqueta", etiqueta);
    }

    function getManual() {
        var defer = $q.defer();

        $http.get('https://isysingenieria.mobi/cloudhosting/localizador/api/webService.php?metodo=config').then(function (response) {
            defer.resolve(response.data);
        }).catch(function (error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    function getEtiquetaAdded(etiquetas) {
        return generalService.EJECUTAR_SERVICES("GET", "/etiquetas/" + etiquetas);
    }

    function getGramatica() {
        return generalService.EJECUTAR_SERVICES("GET", "/gramatica");
    }

    function deleteImage(path, id) {
        return generalService.EJECUTAR_SERVICES("DELETE", "/image/" + path + "/" + id);
    }

    function getUser() {
        return generalService.EJECUTAR_SERVICES("GET", "/autentication");
    }

    function addUser() {
        var user = {
            nombre: "Marlon",
            apellido: "Conrado",
            edad: 20
        }
        return generalService.EJECUTAR_SERVICES("POST", "/autentication", user);
    }
}