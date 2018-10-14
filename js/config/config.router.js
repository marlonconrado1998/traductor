app.config(["$stateProvider", "$urlRouterProvider", '$compileProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $compileProvider, $locationProvider) {

        $compileProvider.debugInfoEnabled(false);
        // $locationProvider.hashPrefix(".com");
        $urlRouterProvider.otherwise("/Audio");

        $stateProvider.state({
            name: 'Audio',
            url: '/Audio',
            templateUrl: 'pages/audio.html'
        }).state({
            name: 'Autor',
            url: '/Autor',
            templateUrl: 'pages/autor.html'
        }).state({
            name: 'Etiqueta',
            url: '/Etiqueta',
            templateUrl: 'pages/etiqueta.html'
        });
    }
]);