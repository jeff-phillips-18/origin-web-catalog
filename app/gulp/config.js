'use strict';

var wiredep = require('wiredep');
var merge = require('merge');

module.exports = (function() {
  var src = './src/';
  var dist = './client/';
  var templates = './templates/';
  var reports = './reports/';
  var bower = './bower_components/';
  var server = './server/';

  var config = {};

  /**
   * Files
   */
  var indexFileEjs = 'index.ejs';
  var indexFile = 'index.html';
  var specsFile = 'specs.html';
  var cssFile = 'appstyles.css';
  var lessFiles = [
    src + 'styles/**/*.less'
  ];
  var templateFiles = src + '**/*.html';

  var imageFiles = [
    src + 'assets/images/**/*.*'
  ];

  var fontFiles = [
    src + 'assets/fonts/**/*.*',
    bower + 'font-awesome/fonts/**/*.*',
    bower + 'patternfly/dist/fonts/**/*.*'
  ];

  var serverApp = dist + 'catalogApp.js';

  // gulp-load-plugins options
  config.plugins = {
    lazy: true
  };

  // task lesslint: Runs less-lint on client code
  config.lesslint = {
    src: lessFiles
  };
  // task clean: Directories to clean
  config.clean = {
    src: [
      // report + '*',
      dist + '*'
    ]
  };

  config.cleanStyles = {
    src: [
      dist + '**/*.css'
    ]
  };

  config.cleanFonts = {
    src: [dist + 'fonts/**/*.*']
  };

  config.cleanImages = {
    src: [dist + 'images/**/*.*']
  };

  config.cleanCode = {
    src: [
      dist + '**/*.js',
      dist + '**/*.html'
    ]
  };

  // task images: Image build options
  config.images = {
    src: imageFiles,
    build: dist + 'images',
    minify: true,
    options: {
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }
  };

  config.imgs = {
    src: [
      bower + 'patternfly/dist/img/**/*'
    ],
    build: dist + 'img',
    minify: true,
    options: {
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }
  };

  config.devImgs = {
    src: [
      bower + 'patternfly/dist/img/**/*'
    ],
    build: dist + 'img',
    dist: dist + 'img',
    minify: false
  };

  // task fonts: Copies fonts into build directory
  config.fonts = {
    src: fontFiles,
    build: dist + 'fonts'
  };

  config.devFonts = {
    src: fontFiles,
    build: dist + 'fonts',
    dist: dist + 'fonts'
  };

  // task sass: Sass build options
  config.less = {
    src: src + 'styles/app.less',
    build: dist + 'styles/',
    output: cssFile,
    options: {
      outputStyle: 'compressed',
      precision: 8
    },
    autoprefixer: {
      browsers: [
        'last 2 versions',
        '> 5%'
      ],
      cascade: true
    }
  };

  // task templatecache: Optimize templates
  config.templatecache = {
    src: templateFiles,
    build: dist,
    output: 'templates.js',
    minify: true, // Always minify the templates
    minifyOptions: {
      empty: true
    },
    templateOptions: {
      module: 'catalogApp',
      standalone: false,
      root: 'app/'
    }
  };

  config.tsc = {
    ts: ['src/**/*.ts'],
    tsLib: ['../src/**/*.ts'],
    build: dist
  };

  // task wiredep: Inject Bower CSS and JS into index.html
  // This task will also inject the application JavaScript
  // The inject task will inject the application CSS
  config.wiredep = {
    index: templates + 'index.ejs',
    copyOptions: {prefix: 1},
    templates: [templates + 'javascripts.html', templates + 'styles.html'],
    build: dist,
    options: {
      json: require('../bower.json'),
      directory: bower,
      ignorePath: '../..',
      // Ignore CSS and JavaScript this is not needed or is undesired
      exclude: [
        // Exclude the bootstrap CSS, the Sass versdion will be @imported instead
        /bootstrap\.css/
      ],
      build: dist,
      verbose: true,
      dist: dist
    }
};

  config.build = {
    clean: dist
  };

  var serverApp = server + 'app.js';

  config.serve = {
    serverApp: serverApp,
    serverPort: process.env.PORT || '8001',
    watch: [dist],
    browserReloadDelay: 1000,
    specsFile: specsFile,
    less: lessFiles,
    js: dist + '**/*.js',
    html: [].concat(dist + '**/*.html', templateFiles),
    devFiles: [
      dist + '**/*.js',
      dist + '**/*.html',
      dist + '**/*.css'
    ],
    browserSyncOptions: {
      port: 3001,
      startPath: '/',
      baseDir: dist,
      notify: true,
      reloadDelay: 0
    }
  };


  return config;
})();
