const gulp = require('gulp');
const merge = require('merge2');
const rename = require('gulp-rename');
const dirname = require('path').dirname;
const readFileSync = require('fs').readFileSync;
const plugin = require('@mu-cms/gulp-ssr-angular');
const renderFactory = require('angular-io-example/dist/render');

gulp.task('default', function() {
  // path to Angular index file
  const index = require.resolve('angular-io-example/dist/browser/index.html');
  // Angular files relative to index
  const app = gulp.src(dirname(index) + '/**')
    .pipe(gulp.dest('dist'));
  // static HTML files from routes
  const routes = gulp.src('routes/**/*.md')
    .pipe(plugin(renderFactory(readFileSync(index))))
    .pipe(rename({
      extname: '.html'
    }));
  // merge and write to `dist`
  merge(app, routes).pipe(gulp.dest('dist'));
});