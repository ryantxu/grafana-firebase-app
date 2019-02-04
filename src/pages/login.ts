import {initApp, doSignInWithGoogleRedirect, doSignInWithEmailAndPassword} from '../firebase';
import {FirebaseApp} from '@firebase/app-types';

export class FirebaseLoginPageCtrl {
  static templateUrl = 'pages/login.html';

  appModel: any; // filled in automaticaly
  valid = false;
  error: any;

  email: string;
  pass: string;

  app: FirebaseApp;
  user: any;
  token: string;

  /** @ngInject */
  constructor($scope, $rootScope) {
    console.log('FirebaseLoginPageCtrl:', this);

    // Load firebase with our settings
    initApp(this.appModel)
      .then(app => {
        if (app) {
          this.app = app;
          this.valid = true;

          // The applicaiton I am listenting to
          app.auth().onAuthStateChanged(user => {
            this.user = user;
            console.log('User changed: ', user);
            $scope.$apply();

            if (user) {
              app
                .auth()
                .currentUser.getIdToken()
                .then(v => {
                  console.log('TOKEN', v);
                  this.token = v;
                  $scope.$apply();
                });
            } else {
              this.token = null;
            }
          });
        } else {
          this.error = 'Firebase not loaded';
        }
      })
      .catch(reason => {
        this.error = reason;
        this.valid = false;
      });
  }

  doLoginWithGoogle() {
    this.error = null;
    doSignInWithGoogleRedirect()
      .then(user => {
        console.log('USER: ', user);
      })
      .catch(error => {
        this.error = error;
      });
  }

  doLoginWithPassword() {
    this.error = null;
    doSignInWithEmailAndPassword(this.email, this.pass)
      .then(user => {
        console.log('USER: ', user);
      })
      .catch(error => {
        this.error = error;
      });
  }

  doLogout() {
    this.app.auth().signOut();
  }
}
