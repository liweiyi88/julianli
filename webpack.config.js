const Encore = require('@symfony/webpack-encore');

Encore
    .setOutputPath('public/build/')
    .setPublicPath('/build')
    .addStyleEntry('app_css', './assets/css/app.scss')
    .setManifestKeyPrefix('build/')

    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

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
    .addEntry('app', './assets/js/app.js')
    .enableSingleRuntimeChunk()
    .enableSassLoader(function (options) {}, {
        resolveUrlLoader: false
    })
    .enablePostCssLoader()
    .configureDefinePlugin((options) => {
        options.ALGOLIA_SEARCH_ONLY_API_KEY = "'0a297293561cc822339db9f46b0b3bd4'";
        options.ALGOLIA_APP_ID = "'57OYAZ5QGF'";
    })
;

module.exports = Encore.getWebpackConfig();
