import {FirebaseConfigCtrl} from './components/config';

// The pages
import {FirebaseLoginPageCtrl} from './pages/login';
import {DebugPageCtrl} from './pages/debug';

console.log( 'IN firebase app init (module.ts)' );

export {
  FirebaseConfigCtrl as ConfigCtrl,

  // Must match `pages.component` in plugin.json
  DebugPageCtrl,
  FirebaseLoginPageCtrl,
};
