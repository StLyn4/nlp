// Place for importing libs, styles etc

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
if (process.env.NODE_ENV === 'production') {
  // installing offline-plugin sw
  OfflinePluginRuntime.install();
}

// JS
import 'regenerator-runtime/runtime';
export * from './js/';
// Styles
import './assets/styles/main.scss';
