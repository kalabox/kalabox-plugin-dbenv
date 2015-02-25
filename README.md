# Kalabox Plugin Env

A simple Kalabox plugin that lets you inject a json object into your apps environment. The object is available in the `KB_APP_SETTINGS` environmental variable. This is useful for getting `PRESSFLOW_SETTINGS`, `BACKDROP_SETTINGS` and other kinds of settings into your ENV.

## Installation

You can install this plugin by going into your app directory and running the normal

```
npm install kalabox-plugin-dbenv --save
```

In order for your app to use the plugin you will also need to inform the app of its existence. This can be done in the `kalabox.json` file in your app root. Just add the plugin name to the `appPlugins` key.

```json
{
  "appName": "pressflow7",
  "appPlugins": [
    "my-hot-plugin",
    "kalabox-plugin-dbenv",
  ]
}
```

## Configuration 

In your apps kalabox.json add the following to the pluginConf key to set the object you want injected.

```json
  "kalabox-plugin-dbenv": {
    "settings": {
      "databases": {
        "default": {
          "default": {
            "driver": "mysql",
            "prefix": "",
            "database": "kalabox",
            "username": "kalabox",
            "password": "",
            "host": "hiphop-drupal7.kbox",
            "port": 3306
          }
        }
      },
      "conf": {
        "pressflow_smart_start": 1
      }
    }
  }
```

## Other Resources

* [API docs](http://api.kalabox.me/)
* [Test coverage reports](http://coverage.kalabox.me/)
* [Kalabox CI dash](http://ci.kalabox.me/)
* [Mountain climbing advice](https://www.youtube.com/watch?v=tkBVDh7my9Q)
* [Boot2Docker](https://github.com/boot2docker/boot2docker)
* [Syncthing](https://github.com/syncthing/syncthing)
* [Docker](https://github.com/docker/docker)

-------------------------------------------------------------------------------------
(C) 2015 Kalamuna and friends


