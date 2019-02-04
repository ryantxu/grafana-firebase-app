import {PanelCtrl, loadPluginCss} from 'grafana/app/plugins/sdk';

import {initAppWithRequest} from '../../firebase';

loadPluginCss({
  dark: 'plugins/ryantxu-firebase-app/css/firebase.dark.css',
  light: 'plugins/ryantxu-firebase-app/css/firebase.light.css',
});

class PresensePanelCtrl extends PanelCtrl {
  static templateUrl = 'panel/presence/module.html';

  /** @ngInject */
  constructor($scope, $injector, backendSrv) {
    super($scope, $injector);

    // Make sure firebase is setup and configured
    initAppWithRequest(backendSrv)
      .then(app => {
        console.log('OK', app);
      })
      .catch(err => {
        console.log('TODO, show error askign to init the panel');
      });

    // Update callbacks
    this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('render', this.onRender.bind(this));
  }

  onPanelInitialized() {
    console.log('onPanelInitalized()');
    this.render();
  }

  onRefresh() {
    console.log('onRefresh()');
    this.render();
  }

  onRender() {
    console.log('onRender');
  }
}

export {PresensePanelCtrl as PanelCtrl};
