module.exports = {
    entry: __dirname + '/app.ts',
    output: {
        filename: 'app.js',
        path: __dirname + '/../static/js'
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    }
};