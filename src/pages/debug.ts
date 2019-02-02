export class DebugPageCtrl {
    static templateUrl = 'partials/debug.html';

    /** @ngInject */
    constructor($scope, $rootScope, $injector, natelApp) {
        console.log('DebugPageCtrl:', this, 'app:', natelApp);
    }
}
