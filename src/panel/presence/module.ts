
import { PanelCtrl, loadPluginCss } from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/kentik-app/css/kentik.dark.css',
  light: 'plugins/kentik-app/css/kentik.light.css',
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
