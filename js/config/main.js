var app = angular.module('app', [
    'ui.router',
    'ui.bootstrap',
    'ngWizard',
    'ngFileUpload',
    'ngImgCrop',
    'chart.js',
    'toaster',
    'ngTable'
    // 'oc.lazyLoad'
]);

// app.run(["$rootScope", "$location", "$window", '$stateParams',
//     function ($rootScope, $location, $window, $stateParams) {
//         $rootScope.$on("$locationChangeStart",
//             function () {});
//     }
// ]);