const gulp = require('gulp');
const merge = require('merge2');
const rename = require('gulp-rename');
const dirname = require('path').dirname;
const readFileSync = require('fs').readFileSync;
const plugin = require('@mu-cms/gulp-ssr-angular');
const renderFactory = require('angular-io-example/dist/render');

gulp.task('default', function() {
  const index = require.resolve('angular-io-example/dist/browser/index.html');

  const app = gulp.src(dirname(index) + '/**')
    .pipe(gulp.dest('dist'));

  const routes = gulp.src('routes/**/*.md')
    .pipe(plugin(renderFactory(readFileSync(index))))
    .pipe(rename({
      extname: '.html'
    }));

  merge(app, routes).pipe(gulp.dest('dist'));
});