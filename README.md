# YesMan
Yesman is a **mocking server** built on node.js and express.js. It is designed for use with RESTful json APIs.

## Overview

Yesman combines data from **4 sources** to build a mock json response.

- **Template** - Defines the structure of the response and some default values.
- **HttpRequest** - Values can be picked from the request and echoed back in the response.
- **Generator** - Values can be generated dynamically eg timestamps
- **State** - Each service can be put into a particular state. For example, for a customer lookup service, the state could be set to: CUSTOMER_FOUND, CUSTOMER_NOT_FOUND, UNAUTHORIZED, SERVER_ERROR

This merge is done using [json-cascade](https://www.npmjs.com/package/json-cascade).

## Install
```shell
npm install -g yesman
```

## Usage
```shell
yesman init
cd yesman
yesman start
```

## Templates
Templates define the structure of the response and are stored in .json files in the templates folder.

## States
Each service can be put into various states to mimic the behaviour of a stateful application (eg a database). State information is stored as a **diff** in .json format in the [diffs](diffs) folder.

## Routes
Services are configured in the [routes.json](routes.json) file. The available configuration values are:

- `verbs` - a list of HTTP request methods for this service eg `["GET", "POST"]`
- `template` - path to the template file relative to the templates folder eg `/customer.json`
- `reqParser` - the name of a function in `req-parsers.js` that will parse the request body and produce a diff to be applied to the template eg the `mirror` function returns the request body itself.
- `mockGenerator` - the name of a function in `dummy-data-generator.js` that will dynamically generate a diff eg timestamps, random number generators etc
- `diff` - path to a custom diff file.
- `states` - list of available states. Each state may override the service level config options: `template`, `reqParser`, `mockGenerator`, `diff`

Any values that are not set explicitly will be defaulted and output to the file `/build/_generated-routes.json`

## Scenarios
A **scenario** is a list of services and their current states. This allows us to define the behaviour for a particular sequence of service calls. See [scenarios.json](scenarios.json). The scenario under test is set in [config.json](config.json).