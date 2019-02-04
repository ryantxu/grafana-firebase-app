import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import {FirebaseOptions, FirebaseApp} from '@firebase/app-types';

export type Settings = {
  config: FirebaseOptions;
  presense: {
    enabled: boolean;
  };
};

let app: FirebaseApp;

export function initApp(appConfig: any): Promise<FirebaseApp> {
  if (appConfig) {
    if (!appConfig.enabled) {
      return Promise.resolve(null); // not enabled
    }
    const settings = appConfig.jsonData as Settings;
    if (settings && settings.config && settings.config.apiKey) {
      if (app) {
        return Promise.resolve(app);
      }

      try {
        app = firebase.initializeApp(settings.config);

        // Setup presense system (should only happen once)
        firebase.auth().onAuthStateChanged(user => {
          if (user) {
            console.log('Logged In: ', user);
          } else {
            console.log('LOGOUT!');
          }
        });

        return Promise.resolve(app);
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
  return Promise.reject('Invalid Firebase config');
}

export function initAppWithRequest(backendSrv): Promise<FirebaseApp> {
  if (app) {
    return Promise.resolve(app); // Use the same application
  }

  // Load the application settings
  return backendSrv.get('/api/plugins/ryantxu-firebase-app/settings').then(appModel => {
    return initApp(appModel);
  });
}

export function doSignInWithGoogleRedirect(): Promise<any> {
  if (!app) {
    return Promise.reject('app not initalized yet');
  }
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
  return firebase
    .auth()
    .signInWithRedirect(provider)
    .then((result: any) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      console.log('Logged in');
      return user;
    });
}

export function doSignInWithEmailAndPassword(email: string, password: string): Promise<any> {
  if (!app) {
    return Promise.reject('app not initalized yet');
  }

  if (email.length < 4) {
    Promise.reject('Please enter an email address.');
  }
  if (password.length < 4) {
    Promise.reject('Please enter a password.');
  }
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
