import {initApp, Settings} from '../firebase';

export class FirebaseConfigCtrl {
  static templateUrl = 'components/config.html';

  appEditCtrl: any;
  appModel: any;

  valid: boolean;
  err: any;
  settings: Settings;

  grafanaUserInfo: any;

  /** @ngInject */
  constructor($scope, $injector, private $q) {
    this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    this.valid = false;
    this.err = null;
    this.grafanaUserInfo = window.grafanaBootData.user;

    // Make sure it has a JSON Data spot
    if (!this.appModel) {
      this.appModel = {};
    }
    if (!this.appModel.jsonData) {
      this.appModel.jsonData = {};
    } else {
      // Load firebase with our settings
      initApp(this.appModel)
        .then(app => {
          console.log('HERE!!!', app);
          if (app) {
            this.valid = true;
          }
        })
        .catch(reason => {
          this.err = reason;
          this.valid = false;
        });
    }

    this.settings = this.appModel.jsonData;
  }

  postUpdate() {
    if (!this.appModel.enabled) {
      return this.$q.resolve();
    }

    // TODO, can do stuff after update
  }
}
