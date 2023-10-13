const path = require('path')
module.exports = () => {

    return {
        target: 'node',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'index.js',
            library: {
                name: 'printify-node-api',
                type: 'umd',
                umdNamedDefine: true
            }
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: [/node_modules/]
                }
            ]
        }

    }
}