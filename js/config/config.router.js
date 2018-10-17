app.config(["$stateProvider", '$compileProvider', '$urlRouterProvider',
    function ($stateProvider, $compileProvider, $urlRouterProvider) {

        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise("/_404");

        $stateProvider
            .state('_404', {
                url: "/_404",
                templateUrl: "pages/samples/error-404.html"
            })
            .state('login', {
                url: "/login?data&token",
                templateUrl: 'pages/samples/login.html',
                controller: "loginController",
                controllerAs: "loginCtrl",
                onEnter: function () {
                    if (sessionStorage.getItem('data')) {
                        $state.go($state.current.name, null);
                    }
                },
                // resolve: resolve
            })
            .state('inicio', {
                url: "/inicio",
                templateUrl: "pages/inicio.html",
                controller: "homeController",
                controllerAs: "homeCtrl",
                onEnter: checkLogged
            })
            .state('inicio.audio', {
                url: '/audio',
                templateUrl: 'pages/audio.html',
                controller: "inicioController",
                controllerAs: "inicioCtrl",
            }).state('inicio.autor', {
                url: '/autor',
                templateUrl: 'pages/autor.html',
                controller: "autorController",
                controllerAs: "autorCtrl",
            }).state('inicio.etiqueta', {
                url: '/etiqueta',
                templateUrl: 'pages/etiqueta.html',
                controller: "etiquetaController",
                controllerAs: "etiquetaCtrl",
            })

        function checkLogged($state) {
            // var logged = false;
            if (!sessionStorage.getItem('data')) {
                $state.go($state.current.name, null);
                location.href = "https://cloudhosting.isysingenieria.co/testWebServices/authservice/";
            }
        }

        function resolve(toLoad) {
            return {
                load: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load(toLoad)
                }]
            }
        }
    }
]);