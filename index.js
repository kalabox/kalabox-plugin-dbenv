'use strict';

var _ = require('lodash');
var PLUGIN_NAME = 'kalabox-plugin-dbenv';

module.exports = function(kbox) {

  kbox.whenApp(function(app) {
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
            host: app.domain,
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

    // Events
    // pre-install
    kbox.core.events.on('pre-install-component', function(component, done) {
      var envSet = 'KB_APP_SETTINGS=' + JSON.stringify(settings);
      if (component.installOptions.Env) {
        component.installOptions.Env.push(envSet);
      }
      else {
        component.installOptions.Env = [envSet];
      }
      done();
    });

    // EVENT: pre-engine-create
    kbox.core.events.on('pre-engine-create', function(createOptions, done) {
      if (!createOptions.name) {
        var envs = [
          'PRESSFLOW_SETTINGS=' + JSON.stringify(settings),
          'BACKDROP_SETTINGS=' + JSON.stringify(settings),
          'KB_APP_SETTINGS=' + JSON.stringify(settings)
        ];
        if (createOptions.Env) {
          envs.forEach(function(env) {
            createOptions.Env.push(env);
          });
        }
        else {
          createOptions.Env = envs;
        }
      }
      done();
    });

  });

};
