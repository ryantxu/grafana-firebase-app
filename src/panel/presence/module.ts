import {PanelCtrl, loadPluginCss} from 'grafana/app/plugins/sdk';

import config from 'grafana/app/core/config';

import {initAppWithRequest} from '../../firebase';
import {Query} from '@firebase/database';
import _default from 'grafana/app/core/utils/colors';

loadPluginCss({
  dark: 'plugins/ryantxu-firebase-app/css/firebase.dark.css',
  light: 'plugins/ryantxu-firebase-app/css/firebase.light.css',
});

class PresensePanelCtrl extends PanelCtrl {
  static templateUrl = 'panel/presence/module.html';

  query: any;

  results: any[];

  /** @ngInject */
  constructor($scope, $injector, backendSrv) {
    super($scope, $injector);

    // Make sure firebase is setup and configured
    initAppWithRequest(backendSrv)
      .then(app => {
        console.log('OK', app);

        const user = config.bootData.user;
        this.query = app.database().ref('grafana/presense/org/' + user.orgId + '/session/');
        this.query.on('value', this.onPresenseQuery.bind(this));
      })
      .catch(err => {
        console.log('TODO, show error askign to init the panel');
      });

    // Update callbacks
    this.events.on('panel-initialized', this.onPanelInitialized.bind(this));
    this.events.on('refresh', this.onRefresh.bind(this));
    this.events.on('render', this.onRender.bind(this));

    $scope.$on('$destroy', () => {
      console.log('DESTROY', this);
      if (this.query) {
        this.query.off(); // stop listening!!
      }
    });
  }

  onPresenseQuery(snapshot) {
    const wrap = snapshot.val();
    if (wrap) {
      this.results = Object.keys(wrap).map(key => {
        return wrap[key];
      });
    } else {
      this.results = [];
    }

    this.$scope.$apply();

    console.log('The whole list: ', this.results);
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
