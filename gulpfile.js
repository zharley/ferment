var gulp = require('gulp');
var react = require('gulp-react');
var git = require('gulp-git');
var fs = require('fs');
var shell = require('gulp-shell')

gulp.task('brew', function () {
  if (fs.existsSync('homebrew')) {
    git.pull('origin', 'master', { cwd: 'homebrew' }, function (err) {
      if (err) throw err;
    });
  } else {
    git.clone('https://github.com/Homebrew/homebrew', function (err) {
      if (err) throw err;
    });
  }
});

gulp.task('collect', shell.task([
  './bin/collect homebrew'
]));

gulp.task('info', shell.task([
  './bin/info homebrew'
]));

gulp.task('rank', shell.task([
  './bin/rank'
]));

gulp.task('dump', shell.task([
  './bin/dump > dist/formulae.json'
]));

gulp.task('copy', function () {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'))
})

gulp.task('react', function () {
  return gulp.src('src/index.js')
    .pipe(react())
    .pipe(gulp.dest('dist'));
})
 
gulp.task('default', [ 'brew', 'collect', 'info', 'rank', 'dump', 'copy', 'react' ], function () {
});
