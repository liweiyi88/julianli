var Encore = require('@symfony/webpack-encore');

Encore
// the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    // the public path you will use in Symfony's asset() function - e.g. asset('build/some_file.js')
    .setManifestKeyPrefix('build/')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    // the following line enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())
    .enableReactPreset()
    .configureBabel((babelConfig) => {
        if (Encore.isProduction()) {
            babelConfig.plugins.push(
                'transform-react-remove-prop-types'
            );
        }
    })

    .addEntry('posts_main', './assets/js/posts_main.js')
    .addEntry('post_create', './assets/js/post_create.js')
    .addEntry('post_show', './assets/js/post_show.js')
    .addEntry('post_edit', './assets/js/post_edit.js')
    .enableSingleRuntimeChunk()
    .enableSassLoader(function (options) {}, {
        resolveUrlLoader: false
    })
    .enablePostCssLoader()
;

if (Encore.isProduction()) {
    Encore.setPublicPath('https://s3-ap-southeast-2.amazonaws.com/julianli/assets');
    Encore.setManifestKeyPrefix('build/');
}

module.exports = Encore.getWebpackConfig();
