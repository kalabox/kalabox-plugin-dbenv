'use strict';

// "Constants"
var PLUGIN_NAME = 'kalabox-plugin-dbenv';

module.exports = function(kbox, app) {
  var events = kbox.core.events;

  // Events
  events.on('pre-install-component', function(component, done) {

    var settings = {};
    if (app.config.pluginConf[PLUGIN_NAME]) {
      if (app.config.pluginConf[PLUGIN_NAME].settings) {
        settings = app.config.pluginConf[PLUGIN_NAME].settings;
      }
    }

    component.installOptions.Env.push(
      'KB_APP_SETTINGS=' + JSON.stringify(settings)
    );

    done();
  });

};
