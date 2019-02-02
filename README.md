## Grafana Firebase App

This app loads loads firebase authentication.  It also keeps track of who is looking at what.


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
