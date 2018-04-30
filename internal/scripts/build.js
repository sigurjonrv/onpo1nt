/**
 * This script builds a production output of all of our bundles.
 */

import fs from 'fs';
import path from 'path';
import appRootDir from 'app-root-dir';
import webpack from 'webpack';
import webpackConfigFactory from '../webpack/configFactory';
import config from '../../config';

// eslint-disable-next-line no-unused-vars
const [x, y, ...args] = process.argv;

const optimize = args.findIndex(arg => arg === '--optimize') !== -1;

// UENO: removed! We do this in build script.
// First clear the build output dir.
// exec(`rimraf ${pathResolve(appRootDir.get(), config('buildOutputPath'))}`);

// Get our "fixed" bundle names
Object.keys(config('bundles'))
  // And the "additional" bundle names
  .concat(Object.keys(config('additionalNodeBundles')))
  // And then build them all.
  .forEach((bundleName) => {
    const compiler = webpack(webpackConfigFactory({ target: bundleName, optimize }));

    compiler.run((err, stats) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(stats.toString({ colors: true }));

      // Save the build stats to a file so it can be used for serving css chunks
      if (bundleName === 'client') {
        const {
          assetsByChunkName,
          publicPath,
          assets,
        } = stats.toJson({
          all: false,
          errors: false,
          warnings: false,
          assetsByChunkName: true,
          publicPath: true,
          assets: true,
        });

        const output = { assetsByChunkName, publicPath, assets };

        fs.writeFileSync(
          path.resolve(appRootDir.get(), config('buildOutputPath'), config('webpackStatsFileName')),
          JSON.stringify(output),
        );
      }
    });
  });
