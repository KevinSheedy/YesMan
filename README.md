# YesMan
Diff based a **mocking server** built on express.js. It is designed for use with RESTful json APIs.

## Overview

Each mocked service has a json template file which defines the structure of the response. Diffs or deltas are then applied to the template to produce the desired response. Both the template and the diffs are pure json.

## Install
```shell
npm install -g yesman
```

## Create a yesman app
```shell
yesman init
```

## Start the yesman server
```shell
yesman start <app-path>
```

## Help
```shell
yesman help
```

## Services / URLs
All available urls are defined in the `services.json` file. Each url points to a folder which contains the template, config and diffs for that service:
```json
{
	"services" : {
		  "/customer"             : "<customer-dir>"
		, "/product"              : "<product-dir>"
		, "/currencies"           : "<currencies-dir>"
	}
}
```


## Forwards
Services can also be configured to forward to an external url in `services.json`:
```json
{
	"forwards" : {
		  "/countries" : "<external-url>"
	}
}
```


## Service Folder
Each service has it's own folder containing templates, config and diffs for that service:

```
customer
    customer-config.json
    customer-template.json
    customer-diff-john-smith.json
    customer-diff-mary-jones.json
```


## Template
A template is pure json and is named <service-name>-config.json. A simple service can function with just a template file and no config file or diff files (see the currencies service). In this case, the template itself is returned unmodified.

For more complex services, multiple diffs can be applied to the template to produce the desired output. See [json-cascade](https://www.npmjs.com/package/json-cascade) for more on how templates work.


## Config
Services are configured in the `<servicedir>/<servicename>-config.json` file. The available configuration values are:

- `verbs` - a list of HTTP request methods for this service eg `["GET", "POST"]`
- `template` - path to the template file relative to the templates folder eg `/customer.json`
- `reqParser` - the name of a function in `req-parsers.js` that will parse the request body and produce a diff to be applied to the template eg the `mirror` function returns the request body itself.
- `mockGenerator` - the name of a function in `dummy-data-generator.js` that will dynamically generate a diff eg timestamps, random number generators etc
- `diff` - path to a custom diff file.
- `states` - list of available states. Each state may override the service level config options: `template`, `reqParser`, `mockGenerator`, `diff`

Any values that are not set explicitly will be defaulted based on the file default-service-config.json.


## States / Diffs
Each service can be put into various states to mimic the behaviour of a stateful application (eg a database). State information is stored as a **diff** in .json file.


## Scenarios
A **scenario** is a list of services and their current states. This allows us to define the behaviour for a particular sequence of service calls. See [scenarios.json](scenarios.json). The scenario under test is set in [config.json](config.json). Changing the scenario in config.json does **not** require a restart.


## Use with Grunt
Yesman can be started via Grunt using the [grunt-express-server](https://github.com/ericclemmons/grunt-express-server) plugin. It can also be restarted automatically as your code changes using the [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) plugin. For an example, see [Gruntfile.js](https://github.com/KevinSheedy/YesMan/blob/master/Gruntfile.js)



## foo

Yesman combines data from **4 sources** to build a mock json response.

- **Template** - Defines the structure of the response and some default values.
- **HttpRequest** - Values can be picked from the request and echoed back in the response.
- **Generator** - Values can be generated dynamically eg timestamps
- **State** - Each service can be put into a particular state. For example, for a customer lookup service, the state could be set to: CUSTOMER_FOUND, CUSTOMER_NOT_FOUND, UNAUTHORIZED, SERVER_ERROR