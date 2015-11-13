'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var PLUGIN_NAME = 'kalabox-plugin-dbenv';

module.exports = function(kbox) {

  var events = kbox.core.events.context('fa577e2f-d464-4471-92cc-b01464196ae6');

  kbox.ifApp(function(app) {
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
    // This lets us run drops-8 as is
    var dhs = crypto
      .createHash('sha256')
      .update(JSON.stringify(defaultSettings.databases))
      .digest('hex');
    /* jshint ignore:start */
    //jscs:disable
    settings['drupal_hash_salt'] = dhs;
    /* jshint ignore:end */
    
    // Events
    // pre-install
    events.on('pre-install-component', function(component, done) {
      var installEnvs = [
        'KB_APP_SETTINGS=' + JSON.stringify(settings)
      ];
      if (component.installOptions.Env) {
        installEnvs.forEach(function(env) {
          component.installOptions.Env.push(env);
        });
      }
      else {
        component.installOptions.Env = installEnvs;
      }
      done();
    });

    // EVENT: pre-engine-create
    events.on('pre-engine-create', function(createOptions, done) {
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
