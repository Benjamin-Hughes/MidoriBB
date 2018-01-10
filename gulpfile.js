const gulp = require('gulp');
let run = require('gulp-run-command').default;

gulp.task('clean', run('sequelize db:seed:undo:all --env test'))
gulp.task('seed', run('sequelize db:seed:all --env test'))
gulp.task('test', gulp.series('clean', 'seed', gulp.parallel(run('npm start'), run('npm test'))))