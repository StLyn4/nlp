// Place for importing libs, styles etc

if (process.env.NODE_ENV === 'production') {
  // installing offline-plugin sw
  import * as OfflinePluginRuntime from 'offline-plugin/runtime';
  OfflinePluginRuntime.install();
}

// JS
import 'regenerator-runtime/runtime';
export * from './js/';
// Styles
import './assets/styles/main.scss';
