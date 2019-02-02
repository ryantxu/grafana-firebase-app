## Grafana Firebase App

[![CircleCI](https://circleci.com/gh/ryantxu/grafana-firebase-app/tree/master.svg?style=svg)](https://circleci.com/gh/ryantxu/grafana-firebase-app/tree/master)
[![dependencies Status](https://david-dm.org/ryantxu/grafana-firebase-app/status.svg)](https://david-dm.org/ryantxu/grafana-firebase-app)
[![devDependencies Status](https://david-dm.org/ryantxu/grafana-firebase-app/dev-status.svg)](https://david-dm.org/ryantxu/grafana-firebase-app?type=dev)



This app loads loads firebase authentication.  It also keeps track of who is looking at what.

/!\ WORK IN PROGRESS /!\


### Building

To complie, run:

```
yarn install
yarn build
```

### Releasing

This plugin uses [release-it](https://github.com/webpro/release-it) to release to GitHub.

```
env GITHUB_TOKEN=your_token yarn release-it patch
```


#### Changelog

##### v%VERSION% (not yet released)

- Contributions welcome!

##### v0.0.1

- First working version
