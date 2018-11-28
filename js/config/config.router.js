app.config(["$stateProvider", '$compileProvider', '$urlRouterProvider', 'Login', 
    function ($stateProvider, $compileProvider, $urlRouterProvider, Login) {

        $compileProvider.debugInfoEnabled(false);
        $urlRouterProvider.otherwise("/inicio/audio");

        $stateProvider
            .state('login', {
                url: "/login?data&token",
                templateUrl: 'pages/samples/login.html',
                controller: "loginController",
                controllerAs: "loginCtrl",
                onEnter: function () {
                    if (sessionStorage.getItem('data')) {
                        $state.go($state.current.name, null);
                    }
                }
            })
            .state('inicio', {
                url: "/inicio",
                templateUrl: "pages/inicio.html",
                controller: "homeController",
                controllerAs: "homeCtrl",
                onEnter: checkLogged,
                abstract: true
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
            }).state('inicio.etiquetas_solicitadas', {
                url: '/etiquetas_solicitadas',
                templateUrl: 'pages/etiquetas_sol.html',
                controller: "etiquetaSolController",
                controllerAs: "etiquetaSolCtrl",
            })

        function checkLogged($state) {
            if (!sessionStorage.getItem('data')) {
                $state.go($state.current.name, null);
                location.href = Login;
            }
        }
    }
]);