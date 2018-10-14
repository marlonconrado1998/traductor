var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngWizard',
    'ngFileUpload',
    'ngImgCrop',
    'chart.js',
    'toaster',
    'ngTable'
]);

app.run(["$rootScope", "$location", "$window",
    function ($rootScope, $location, $window) {
        $rootScope.$on("$locationChangeStart",
            function () {
                // $window.location = 'https://cloudhosting.isysingenieria.co/testWebServices/authservice/';
                // if (sessionStorage.getItem("user") == null || sessionStorage.getItem("user") == undefined) {
                    // $location.path("/Etiqueta");
                // } else {
                //     if ($location.path() == "/Login") {
                //         // window.history.back();
                //         $location.path("/Inicio");
                //     }
                // }
            });
    }
]);