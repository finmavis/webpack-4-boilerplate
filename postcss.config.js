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