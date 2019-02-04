
import { PanelCtrl, loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/ryantxu-firebase-app/css/firebase.dark.css',
    light: 'plugins/ryantxu-firebase-app/css/firebase.light.css',
});


class PresensePanelCtrl extends PanelCtrl {
    static templateUrl = 'panel/presence/module.html';

    /** @ngInject */
    constructor($scope, $injector) {
        super($scope, $injector);

        console.log( 'IN Presense', this );
    }
}

export { PresensePanelCtrl as PanelCtrl };
