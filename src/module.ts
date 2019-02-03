import './sass/firebase.dark.scss';
import './sass/firebase.light.scss';


// The pages
import {FirebaseConfigCtrl} from './components/config';
import {FirebaseLoginPageCtrl} from './pages/login';
import {DebugPageCtrl} from './pages/debug';

// CSS Support
import { loadPluginCss } from 'grafana/app/plugins/sdk';
loadPluginCss({
  dark: 'plugins/ryantxu-firebase-app/css/firebase.dark.css',
  light: 'plugins/ryantxu-firebase-app/css/firebase.light.css',
});
console.log( 'IN firebase app init (module.ts)' );

export {
  FirebaseConfigCtrl as ConfigCtrl,

  // Must match `pages.component` in plugin.json
  DebugPageCtrl,
  FirebaseLoginPageCtrl,
};
