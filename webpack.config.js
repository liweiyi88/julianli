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

    .createSharedEntry('layout', './assets/js/layout.js')
    .addEntry('post', './assets/js/post.js')
//.addStyleEntry('css/app', './assets/css/app.scss')

// uncomment if you use TypeScript
//.enableTypeScriptLoader()

// uncomment if you use Sass/SCSS files
    .enableSassLoader(function (options) {}, {
        resolveUrlLoader: false
    })
    .enablePostCssLoader()

// uncomment for legacy applications that require $/jQuery as a global variable
//.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
