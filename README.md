# Webpack 4 Tutorial

## Getting Started default Configuration

* Install **webpack webpack-cli** as devDependencies
* Add script to your **package.json** file

    ```
    "scripts": {
        "dev": "webpack --mode development",
        "build": "webpack --mode production"
    }
    ```

## Support ES6 and Beyond

* Install **babel-core babel-loader babel-preset-env** as devDependencies
* Create file **.babelrc** and inside **.babelrc** is

    ```
    {
        "presets": [
            "env"
        ]
    }
    ```

* Let's use babel with webpack, create **webpack.config.js** file, and code inside file is

    ```
    const path = require("path");

    module.exports = {
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: 'script.js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        }
    };
    ```

## Support CSS

Install **style-loader css-loader mini-css-extract-plugin** as devDependencies
* Open **webpack.config.js** and add to module.rules :
    
    ```
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');

    {
        test: /\.css$/,
        use: [
            'style-loader',
            MiniCssExtractPlugin.loader,
            'css-loader'
        ]
    }
    ```

    And at Plugin add

    ```
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
    ]
    ```

## Support SASS/SCSS

* Install **node-sass sass-loader** as devDependencies
* Change a little bit css module like this

    ```
    {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }
    ```

## Add PostCSS

* install **postcss-loader autoprefixer cssnano** as devDependencies
* create **postcss.config.js** for PostCSS Config

    ```
    module.exports = {
        plugins: [
            require('autoprefixer')({
                browsers: [
                    '> 1%',
                    'last 10 versions',
                ]
            }),
            require('cssnano')()
        ]
    }
    ```

* Add postcss to your scss loader

    ```
    use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    ```

## Auto Inject your bundle code to HTML

* Install **html-webpack-plugin** as devDependencies
* Open **webpack.config.js** and add :

    ```
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    module.export = {
        plugins: [
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            })
        ]
    }
    ```

## Caching and Hashing

* install **webpack-md5-hash** as devDependencies
* Edit output point of your js :
    
    ```
    filename: '[name].[chunkhash].js'
    ```
    
    And in plugin css

    ```
    new MiniCssExtractPlugin({
        filename: 'style.[contenthash].css',
    }),
    ```

    Add new plugin 

    ```
    const WebpackMd5Hash = require('webpack-md5-hash');
    
    plugins: [
        new WebpackMd5Hash()
    ]
    ```

## Keep Clean and Fresh

* install **clean-webpack-plugin** as devDependencies

    ```
    const CleanWebpackPlugin = require('clean-webpack-plugin');

    plugins: [
        new CleanWebpackPlugin('dist', {})
    ]
    ```

## Add Development Server

* Install **webpack-dev-server** as devDependencies
* Add script to **package.json**

    ```
    "start": "webpack-dev-server --open --mode development"
    ```

* Add configuration to **webpack.config.js**

    ```
    devServer: {
        contentBase: path.join(__dirname, 'build'),
        compress: true,
        port: 3000
    },
    ```

## Separate Development and Production

* install **webpack-merge** as devDependencies
* Make 3 webpack configuration
    * **webpack.common.js** for common configuration
    * **webpack.dev.js** for Development Mode
    * **webpack.prod.js** for Production and optimized

* Separate your code
    * **webpack.common.js**
    ```
    const path = require('path');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const WebpackMd5Hash = require('webpack-md5-hash');
    const CleanWebpackPlugin = require('clean-webpack-plugin');

    module.exports = {
        entry: {
            main: './src/index.js'
        },
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[chunkhash].js'
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader'
                    }
                },
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use: [
                        'style-loader', 
                        MiniCssExtractPlugin.loader, 
                        'css-loader', 
                        'postcss-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin('build', {} ),
            new MiniCssExtractPlugin({
                filename: 'style.[contenthash].css'
            }),
            new HtmlWebpackPlugin({
                template: './src/index.html',
                filename: 'index.html'
            }),
            new WebpackMd5Hash()
        ]
    };
    ```

    * **webpack.dev.js**
    ```
    const merge = require('webpack-merge');
    const common = require('./webpack.common');
    const path = require('path');

    module.exports = merge(common, {
        mode: 'development',
        devServer: {
            contentBase: path.join(__dirname, 'build'),
            compress: true,
            port: 3000
        },
        devtool: 'inline-source-map'
    });
    ```

    * **webpack.prod.js**
    ```
    const merge = require('webpack-merge');
    const common = require('./webpack.common');

    module.exports = merge(common, {
        mode: 'production',
        devtool: 'source-map'
    });
    ```

* Edit script to your package.json to look like this, and remove others scripts

    ```
    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
    ```

* Now delete your **webpack.config.js** because we already use separate configuration