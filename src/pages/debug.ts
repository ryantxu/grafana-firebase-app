export class DebugPageCtrl {
    static templateUrl = 'partials/debug.html';

    /** @ngInject */
    constructor($scope, $rootScope) {
        console.log('DebugPageCtrl:', this);
    }
}
