export class DebugPageCtrl {
    static templateUrl = 'pages/debug.html';

    /** @ngInject */
    constructor($scope, $rootScope) {
        console.log('DebugPageCtrl:', this);
    }
}
