# Avalanche Dapp SDKs

This is a [Lerna project](https://github.com/lerna/lerna). The idea here is to aggregate all of our SDKs into one mono repo of smaller SDKs. This will avoid having to link a bunch of projects and make it much easier to work features across many SDKs at once.

## Getting started

run `yarn bootstrap` before doing anything. This will install, build and link all packages

## Develop project

To deploy a alpha release make sure you have used a [conventional commit message](https://www.conventionalcommits.org/en/v1.0.0/) after that simply checkout the `alpha-release` branch and push. This will kick off the build and release process

Once we know it works for the consumer on alpha then a push to master can be done and a official release will be issued from there

**note**: make sure all code is PR'd properly before going to master.

## Production Release

Alpha releases are automated but for now production releases are manual.

To create a release:

- Run the following on the `alpha-release` branch (pull first!)

```
    lerna version --conventional-commits --conventional-graduate --exact --message "Production Release %s"
```

- Create a PR from `alpha-release` to `master`
- Squash and merge (this will publish the new version)

## Running example dapp

Make sure to run the getting started steps above, then:

1. cd into the `/packages/web3-react-dapp-example`
2. `yarn start`
