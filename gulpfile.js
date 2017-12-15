const
    gulp    = require('gulp'),
    jshint  = require('gulp-jshint'),
    jscs    = require('gulp-jscs'),
    es      = require('event-stream'),
    debug   = require('gulp-debug'),
    nodemon = require('gulp-nodemon');

const jsFiles       = ['*.js','src/**/*.js'];


gulp.task('style', () => {
    return gulp.src(jsFiles)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {
            verbose: true
        }))
        .pipe(jscs());
});

gulp.task('inject', () => {

    const wiredep       = require('wiredep').stream;
    const gulpInject    = require('gulp-inject');
    const injectSrc     = gulp.src(['./public/css/*.css','./public/js/*.js'],{read: false});
    const injectCss     = gulp.src('./public/css/*.css',{read: false} );
    const injectJs      = gulp.src('./public/js/*.js',  {read: false} );

    const injectOptions = {ignorePath: './public'};

    const target        = gulp.src('./src/views/*.html');

    var options       = {
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        ignorePath: '../../public'
    };

    return target
        .pipe(wiredep(options))
        .pipe(gulpInject(injectCss, {
                addRootSlash: false,
                ignorePath: 'public'
            }
        ))
        .pipe(gulpInject(injectJs, {
                addRootSlash: false,
                ignorePath: 'public'
            }
        ))
        .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style','inject']);

gulp.task('run', ['serve'], () => {

    const options       = {
        scripts: 'server.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon ('./server.js')
    });








