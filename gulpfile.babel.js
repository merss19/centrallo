import gulp from 'gulp';
import plumber from 'gulp-plumber';
import errorHandler from 'gulp-plumber-error-handler';
import stylus from 'gulp-stylus';
import cssnano from 'gulp-cssnano';
import sourcemaps from 'gulp-sourcemaps';
import postcss from 'gulp-postcss';
import jade from 'gulp-jade';
import pugLint from 'gulp-pug-lint';
import prettify from 'gulp-jsbeautifier';
import cached from 'gulp-cached';
import browserSync from 'browser-sync';
import runSequence from 'run-sequence';
import notify from 'gulp-notify';
import stylint from 'gulp-stylint';
import  csslint from 'gulp-csslint';
import svgSprite from 'gulp-svg-sprite'
import  gulpIf from 'gulp-if';
import postcssSorting from 'postcss-sorting'
import babel from 'gulp-babel'
import jshint from 'gulp-jshint'
var sorting = require('postcss-sorting');
var clean = require('gulp-clean');
var print = require('gulp-print');

const processors = [
    require('autoprefixer')({ browsers: ['last 2 version'] }),
    sorting('./postcss-sorting.json')
]


/*const bs = browserSync.create();*/
var bs = require("browser-sync").create();

const srcPaths = {
    js: 'src/js/**/*.js',
    styl: 'src/styles/*.styl',
    templates: 'src/pages/*.jade',
    icons: 'src/svg/icons/*',
    svg: '_src/svg/*.svg',
    img: 'src/img/**/*',
    data: 'src/data/',
    vendors: [

    ]
}

const distPaths = {
    dist: 'dist/**/*.*',
    js: 'build/js/',
    css: 'dist/css/',
    templates: 'dist/',
    img: 'build/img',
    svg: 'build/svg/',
    vendors: 'src/js/_core/'
}

gulp.task('css', () => {
    gulp.src(srcPaths.styl)
        .pipe(plumber({errorHandler: errorHandler(`Error in \'css\' task`)}))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            'include css': true
        }))
        .on('error', notify.onError())
        .pipe(postcss(processors))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/assets/css'))
})

gulp.task('styles:lint', () => (
    gulp.src('src/blocks/**/*.styl')
        .pipe(stylint({
            reporter: 'stylint-stylish',
            reporterOptions: {verbose: true}
        }))
        .pipe(stylint.reporter())
));


// lint tasks
gulp.task('csslint', function() {
    gulp.src('dist/css/app.css')
        .pipe(csslint('.csslintrc'))
        .pipe(csslint.formatter(require('csslint-stylish')))
});

gulp.task('templates', () => (
    gulp.src('src/pages/*.jade')
        .pipe(plumber({errorHandler: errorHandler(`Error in \'templates\' task`)}))
        //.pipe(cached('jade'))
        .pipe(jade())
        .pipe(prettify({
            braceStyle: 'expand',
            indentWithTabs: true,
            indentInnerHtml: true,
            preserveNewlines: true,
            endWithNewline: true,
            wrapLineLength: 120,
            maxPreserveNewlines: 50,
            wrapAttributesIndentSize: 1,
            unformatted: ['use']
        }))
        .on('error', (err) =>{
            console.log(err)
        })
        .pipe(clean('dist/index.html'))
        .pipe(gulp.dest(distPaths.templates))
        .on('end', function() {
            console.log('succssee');
        })
));

gulp.task('templates:lint', () =>
    gulp
        .src('src/{blocks,pages}/**/*.jade')
        .pipe(pugLint())
);

// svg tasks
gulp.task('svgSprite', function() {
    gulp.src('src/svg/*.svg')
        .pipe(svgSprite({
            shape:{
                spacing: {
                    padding: 2
                }
            },
            mode:{
                css:{
                    dest:'.',
                    sprite:'sprite.svg',
                    layout:'vertical',
                    prefix:'.svg-',
                    dimensions:true,
                    render:{
                        styl:{
                            dest:'sprite.styl'
                        }
                    }
                }
            }
        }))
        .pipe(gulpIf('*.styl',gulp.dest('src/styles/helper'),gulp.dest('dist/assets/css')))
});

// copy tasks
gulp.task('copy', function() {
    gulp.src('src/assets/**/*')
    .pipe(print())
    .pipe(gulp.dest('dist/assets'))
});

var stylish = require('jshint-stylish');
// js tasks
gulp.task('js', function() {
    gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest('dist/assets/js'))
});
gulp.task('watch', () => {
    gulp.watch('src/svg/*.svg', ['svgSprite']);
    gulp.watch('src/js/*.js', ['js']);
    gulp.watch('src/{pages,blocks}/**/*.jade', ['templates','templates:lint'])
    gulp.watch('src/{styles,blocks}/**/*.styl', ['csslint','css']);

});

/*gulp.task('browser-sync', () => {
 var files = [
 distPaths.dist
 ];

 browserSync.init(files,{
 reloadOnRestart: true,
 port: 3000,
 server: {
 baseDir: './dist/'
 }
 });

 browserSync.watch(distPaths.dist2).on('change',browserSync.reload)

 });*/
gulp.task('browser-sync', () => {
    var files = [
        distPaths.dist
    ];

    bs.init(files,{
        reloadOnRestart: true,
        open:true,
        snippetOptions: {
            rule: {
                match: /<\/body>/i
            }
        },
        port: 3000,
        server: {
        baseDir: './dist/'
        }
    });

    bs.watch(distPaths.dist).on('change', bs.reload);

});

gulp.task('default', [
    'copy',
    'js',
    'svgSprite',
    'csslint',
    'css',
    'templates:lint',
    'templates',
    'watch',
    'browser-sync'
]);
