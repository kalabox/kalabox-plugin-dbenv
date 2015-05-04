'use strict';

var _ = require('lodash');
var PLUGIN_NAME = 'kalabox-plugin-dbenv';

module.exports = function(kbox) {

  kbox.whenApp(function(app) {

    // Events
    kbox.core.events.on('pre-install-component', function(component, done) {

      var settings = {};
      var defaultSettings = {
        databases: {
          default: {
            default: {
              driver: 'mysql',
              prefix: '',
              database: 'kalabox',
              username: 'kalabox',
              password: '',
              host: component.appDomain,
              port: 3306
            }
          }
        },
        conf: {}
      };
      if (app.config.pluginConf[PLUGIN_NAME]) {
        if (app.config.pluginConf[PLUGIN_NAME].settings) {
          settings = app.config.pluginConf[PLUGIN_NAME].settings;
        }
      }
      settings = _.merge({}, defaultSettings, settings);
      var envSet = 'KB_APP_SETTINGS=' + JSON.stringify(settings);
      if (component.installOptions.Env) {
        component.installOptions.Env.push(envSet);
      }
      else {
        component.installOptions.Env = [envSet];
      }

      done();
    });

  });

};
