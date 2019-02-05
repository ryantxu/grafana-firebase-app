import firebase from '@firebase/app';
import '@firebase/auth';
import '@firebase/database';

import config from 'grafana/app/core/config';
import {debounce} from 'lodash';

import {FirebaseOptions, FirebaseApp} from '@firebase/app-types';

export type Settings = {
  config: FirebaseOptions;
  presense: {
    enabled: boolean;
    path: string;
  };
};

function setupPresense(app: FirebaseApp, settigns: Settings) {
  const user = config.bootData.user;

  // Create a reference to this user's specific status node.
  // This is where we will store data about being online/offline.
  const userStatusDatabaseRef = app
    .database()
    .ref('grafana/presense/org/' + user.orgId + '/session/')
    .push();

  // We'll create two constants which we will write to
  // the Realtime database when this device is offline
  // or online.
  const isOfflineForDatabase = {
    state: 'offline',
    offline: firebase.database.ServerValue.TIMESTAMP,
  };

  const isOnlineForDatabase = {
    state: 'online',
    online: firebase.database.ServerValue.TIMESTAMP,
    email: user.email,
    login: user.login,
    avatar: user.gravatarUrl,
    userId: user.id,
    href: document.location.href,
    changed: firebase.database.ServerValue.TIMESTAMP,
  };

  // Create a reference to the special '.info/connected' path in
  // Realtime Database. This path returns `true` when connected
  // and `false` when disconnected.
  app
    .database()
    .ref('.info/connected')
    .on('value', function(snapshot) {
      // If we're not currently connected, don't do anything.
      if (snapshot.val() == false) {
        return;
      }

      console.log('Connected!');
      // If we are currently connected, then use the 'onDisconnect()'
      // method to add a set which will only trigger once this
      // client has disconnected by closing the app,
      // losing internet, or any other means.
      userStatusDatabaseRef
        .onDisconnect()
        //.update(isOfflineForDatabase)
        .remove()
        .then(() => {
          // The promise returned from .onDisconnect().set() will
          // resolve as soon as the server acknowledges the onDisconnect()
          // request, NOT once we've actually disconnected:
          // https://firebase.google.com/docs/reference/js/firebase.database.OnDisconnect

          // We can now safely set ourselves as 'online' knowing that the
          // server will mark us as offline once we lose connection.
          userStatusDatabaseRef.set(isOnlineForDatabase);
        });
    });

  const updatePath = debounce(() => {
    console.log('After a second', document.location.href);
    userStatusDatabaseRef.update({
      href: document.location.href,
      changed: firebase.database.ServerValue.TIMESTAMP,
    });
  }, 500);

  // Look for any changes to the URL
  let oldHref = document.location.href;
  const bodyList = document.querySelector('body');
  const observer = new MutationObserver(mutations => {
    if (oldHref != document.location.href) {
      oldHref = document.location.href;
      updatePath();
    }
  });

  const ocfg = {
    childList: true,
    attributes: false,
    subtree: true,
  };
  observer.observe(bodyList, ocfg);
}

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

        setupPresense(app, settings);

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
