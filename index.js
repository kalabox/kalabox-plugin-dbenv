'use strict';

module.exports = function(app, events) {

  // Events
  events.on('pre-install-component', function(component, done) {

    // Add in the pressflow magic
    // @todo: get his to handle variable input about
    // driver/prefix/name/db/pass/port/etc
    var pressflowSettings = {
      databases: {
        default: {
          default: {
            driver: 'mysql',
            prefix: '',
            database: 'kalabox',
            username: 'kalabox',
            password: '',
            host: app.domain,
            port: 3306,
          }
        }
      },
      conf: {
        'pressflow_smart_start': 1
      }
    };
    component.installOptions.Env.push(
      'KB_APP_SETTINGS=' + JSON.stringify(pressflowSettings)
    );

    done();
  });

};
