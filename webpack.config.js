const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: 'source-map', // issue related: https://bugs.chromium.org/p/chromium/issues/detail?id=1052872
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: 'index.js',
        library: process.env.npm_package_name,
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.[jt]s$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin(),
    ],
    externals: [/@pixi.*/, /lodash/],
};
