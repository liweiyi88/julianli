var Encore = require('@symfony/webpack-encore');

Encore
    // the project directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // the public path used by the web server to access the previous directory
    .setPublicPath('/build')
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())
    .addEntry('css/app', './assets/css/app.css')
    .addEntry('style', './assets/style.css')
    .addEntry('rtl', './assets/rtl.css')
    .addEntry('color/amber', './assets/color/amber.css')
    .addEntry('js/jquery.bxslider', './assets/js/plugins/jquery.bxslider/jquery.bxslider.css')
    .addEntry('js/jquery.customscroll', './assets/js/plugins/jquery.customscroll/jquery.mCustomScrollbar.css')
    .addEntry('js/jquery.mediaelementplayer', './assets/js/plugins/jquery.mediaelement/mediaelementplayer.css')
    .addEntry('js/jquery.fancybox', './assets/js/plugins/jquery.fancybox/jquery.fancybox.css')
    .addEntry('js/owl.carousel', './assets/js/plugins/jquery.owlcarousel/owl.carousel.css')
    .addEntry('js/owl.theme', './assets/js/plugins/jquery.owlcarousel/owl.theme.css')
    .addEntry('js/jquery.mousewheel-3.0.6.pack', './assets/js/plugins/jquery.mousewheel-3.0.6.pack.js')
    .addEntry('js/imagesloaded.pkgd', './assets/js/plugins/imagesloaded.pkgd.min.js')
    .addEntry('js/isotope.pkgd', './assets/js/plugins/isotope.pkgd.min.js')
    // .addEntry('js/jquery.appear', './assets/js/plugins/jquery.appear.min.js')
    .addEntry('js/jquery.onepagenav', './assets/js/plugins/jquery.onepagenav.min.js')
    .addEntry('js/jquery.customscrollbar.contact', './assets/js/plugins/jquery.customscroll/jquery.mCustomScrollbar.concat.min.js')
    .addEntry('js/jquery.mediaelement-and-player', './assets/js/plugins/jquery.mediaelement/mediaelement-and-player.js')
    .addEntry('js/jquery.fancybox.pack', './assets/js/plugins/jquery.fancybox/jquery.fancybox.pack.js')
    .addEntry('js/jquery.fancybox-media', './assets/js/plugins/jquery.fancybox/helpers/jquery.fancybox-media.js')
    .addEntry('js/options', './assets/js/options.js')
    .addEntry('js/site', './assets/js/site.js')
    .addEntry('fonts/map-icons', './assets/fonts/map-icons/css/map-icons.css')
    .addEntry('fonts/icomoon/style', './assets/fonts/icomoon/style.css')
    // uncomment to create hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // uncomment to define the assets of the project
    // .addEntry('js/app', './assets/js/app.js')
    // .addStyleEntry('css/app', './assets/css/app.scss')

    // uncomment if you use Sass/SCSS files
    // .enableSassLoader()

    // uncomment for legacy applications that require $/jQuery as a global variable
    //.autoProvidejQuery()
;

module.exports = Encore.getWebpackConfig();
