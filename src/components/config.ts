

export class FirebaseConfigCtrl {
    static templateUrl = 'partials/config.html';

    enabled: boolean;
    appEditCtrl: any;
    appModel: any;
  
    /** @ngInject */
    constructor($scope, $injector, private $q) {
      this.enabled = false;
      this.appEditCtrl.setPostUpdateHook(this.postUpdate.bind(this));
    }
  
    postUpdate() {
      if (!this.appModel.enabled) {
        return this.$q.resolve();
      }

      console.log( 'POST', this );
    }
  }