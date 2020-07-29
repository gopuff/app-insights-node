# Foobar

`app-insights-node` is a node app used to send build information from appcenter.ms mobile builds to appcenter.

## Usage

In appcenter create a post build script described [here](https://docs.microsoft.com/en-us/appcenter/build/custom/scripts/).

Add the following to the file:

```
#!/usr/bin/env bash
#
yarn add gopuff/app-insights-node.git#master
node node_modules/app-insights-node-cli/index.js
```

In appcenter create the following environment variables:

`APP_INSIGHTS_KEY`: the App Insights Instrumentation Key
`APP_FILE`: the name of the file built by app center. You can find this in the build logs or in the distributions.

### Potential Issue on Android build machines

As of this writing, the installed version of node on the Android build machines is unsupported. If you run into errors use the following script to install more recent version of node before running app:

```
#!/usr/bin/env bash
#

set -ex
brew uninstall node@6
NODE_VERSION="12.18.2"
curl "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}.pkg" > "$HOME/Downloads/node-installer.pkg"
sudo installer -store -pkg "$HOME/Downloads/node-installer.pkg" -target "/"
yarn add gopuff/app-insights-node.git#master
node node_modules/app-insights-node-cli/index.js
```

## Contributing

Pull requests are welcome.

## License

[MIT](https://choosealicense.com/licenses/mit/)
