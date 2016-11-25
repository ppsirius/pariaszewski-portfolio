"use strict";

var gulp = require("gulp"),
    sass = require("gulp-sass"),
    browsersync = require("browser-sync"),
    sourcemaps = require("gulp-sourcemaps"),
    supportedBrowsers = "last 2 versions",
    plumber = require("gulp-plumber"),
    autoprefixer = require("autoprefixer"),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyHtml = require('gulp-minify-html'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    replace = require('gulp-replace-task'),
    gulpPostCss = require("gulp-postcss"),
    postcssDiscardDuplicates = require("postcss-discard-duplicates"),
    postcssDiscardEmpty = require("postcss-discard-empty"),
    postcssRoundSubpixels = require("postcss-round-subpixels"),
    postcssFlexbugsFixes = require("postcss-flexbugs-fixes"),
    postcssFocus = require("postcss-focus"),
    postcssZindex = require("postcss-zindex"),
    postcssVmin = require("postcss-vmin"),
    reload = browsersync.reload,

/* Paths */
    src = 'src',
    dist = 'dist',
    paths = {
        js: src + '/js/*.js',
        scss: src + '/scss/*.scss',
        html: src + '/**/*.html',
        img: src + '/img/**'
    };

gulp.task("compile-scss", function () {
    gulp.src(paths.scss)
        .pipe(plumber())
        .pipe(sass({
            "errLogToConsole": true
        }))
        .pipe(gulpPostCss([
            autoprefixer({
                "browsers": supportedBrowsers
            }),
            postcssDiscardDuplicates,
            postcssDiscardEmpty,
            postcssRoundSubpixels,
            postcssFlexbugsFixes,
            postcssFocus,
            postcssZindex,
            postcssVmin
        ]))
        .pipe(sourcemaps.write())
        .pipe(plumber.stop())
        .pipe(gulp.dest(src + '/css'))
        .pipe(reload({
            "stream": true
        }));
});


gulp.task('move-img', function () {
    gulp.src(paths.img)
        .pipe(gulp.dest(dist + '/img/'));
});

gulp.task("watch", function () {
    gulp.watch(src + '/scss/**/*.scss', ['compile-scss']);

    //gulp.watch(paths.img, ['move-img']);
});

gulp.task("dev", ["watch"], function () {
    browsersync({
        "server": src
    });
    gulp.watch(src + '/**').on("change", reload);
});
