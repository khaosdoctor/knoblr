const gulp = require('gulp')
const babel = require('gulp-babel')
const gutil = require('gulp-util')

gulp.task('transpile', () => {
  console.log(gutil.colors.green.bold('Initializing transpiler'))
  return gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['es2015'] }))
    .pipe(gulp.dest('dist'))
})

gulp.task('watch', () => {
  console.log(gutil.colors.cyan.bold('My watch has started'))
  gulp.watch('./src/**/*.js', ['transpile'])
})

gulp.task('default', ['transpile'])
