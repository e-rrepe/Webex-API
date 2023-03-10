# @webex/plugin-authorization-browser

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> Authorization plugin loaded when the Cisco Webex JS SDK is used in a web browser.

- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [Maintainers](#maintainers)
- [License](#license)

## Install

```bash
npm install --save @webex/plugin-authorization-browser
```

## Usage

This is a plugin for the Cisco Webex JS SDK . Please see our [developer portal](https://developer.webex.com/) and the [API docs](https://webex.github.io/webex-js-sdk/api/) for full details.

## Install

```bash
npm install --save @webex/plugin-authorization-browser
```

## Usage

```js

const Webex = require('webex');

const webex = Webex.init();
webex.authorization-browser.get(id)
  .then((authorization-browser) => {
    console.log(authorization-browser);
  })

```

## Maintainers

This package is maintained by [Cisco Webex for Developers](https://developer.webex.com/).

## Contribute

Pull requests welcome. Please see [CONTRIBUTING.md](https://github.com/webex/webex-js-sdk/blob/master/CONTRIBUTING.md) for more details.

## License

© 2016-2020 Cisco and/or its affiliates. All Rights Reserved.
