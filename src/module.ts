import './sass/firebase.dark.scss';
import './sass/firebase.light.scss';

import {
  initApp,
  initAppWithRequest,
  doSignInWithGoogleRedirect,
  doSignInWithEmailAndPassword,
} from './firebase';

// The pages
import {FirebaseConfigCtrl} from './components/config';
import {FirebaseLoginPageCtrl} from './pages/login';
import {DebugPageCtrl} from './pages/debug';

// CSS Support
import {loadPluginCss} from 'grafana/app/plugins/sdk';
loadPluginCss({
  dark: 'plugins/ryantxu-firebase-app/css/firebase.dark.css',
  light: 'plugins/ryantxu-firebase-app/css/firebase.light.css',
});

export {
  initApp,
  initAppWithRequest,
  doSignInWithGoogleRedirect,
  doSignInWithEmailAndPassword,
  FirebaseConfigCtrl as ConfigCtrl,
  // Must match `pages.component` in plugin.json
  DebugPageCtrl,
  FirebaseLoginPageCtrl,
};

// STUFF That is auto loaded

// import { BackendSrv, getBackendSrv } from 'grafana/app/core/services/backend_srv';
// import contextSrv from 'grafana/app/core/core'
// import coreModule from 'grafana/app/core/core_module';
function xxx() {
  console.log('LOADING! Firebase');
}

xxx();
