import {PanelCtrl} from 'grafana/app/plugins/sdk';


class PresensePanelCtrl extends PanelCtrl {
    static templateUrl = 'panel/presense/presense.html';

    /** @ngInject */
    constructor($scope, $injector) {
        super($scope, $injector);

        console.log( 'IN Presense', this );
    }
}

export { PresensePanelCtrl as PanelCtrl };
