const path = require('path');  
const gulp = require('gulp');  
const gutil = require('gulp-util');  
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const header = require('gulp-header');

const pkg = require('./package.json');
const banner = ['/*!',
  ' * <%= pkg.name %> v<%= pkg.version %> (<%= pkg.repository.url %>)',
  ' * <%= pkg.description %>',
  ' * Copyright 2015 <%= pkg.author %>',
  ' * Licensed under the <%= pkg.license %> license',
  ' */'].join('\n');

gulp.task('clean', function () {  
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('default', function() {  
  return gulp.src([
      'src/prototypes.js',
      'src/constants.js',
      'src/utils/*.js',
      'src/proxies/*.js',
      'src/BaseApp.js',
      'src/models/Chasm.js',
      'src/models/Entity.js',
      'src/models/Item.js',
      'src/models/Container.js',
      'src/models/Exit.js',
      'src/models/Place.js',
      'src/models/Player.js',
      'src/models/Scoreboard.js',
      'src/views/*.js',
      'src/controllers/inputDelegates/*.js',
      'src/controllers/*.js',
      'src/commands/BaseCommand.js',
      'src/commands/BaseActionCommand.js',
      'src/commands/CloseCommand.js',
      'src/commands/ExamineCommand.js',
      'src/commands/FooCommand.js',
      'src/commands/GoCommand.js',
      'src/commands/InventoryCommand.js',
      'src/commands/LockCommand.js',
      'src/commands/LookCommand.js',
      'src/commands/MoveCommand.js',
      'src/commands/OpenCommand.js',
      'src/commands/PutCommand.js',
      'src/commands/ScoreCommand.js',
      'src/commands/TakeCommand.js',
      'src/commands/TieCommand.js',
      'src/commands/UnlockCommand.js',
      'src/commands/UntieCommand.js'
    ])
    .pipe(concat('chasm.js'))
    .pipe(header('\n\n"use strict";\n\n'))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(gulp.dest('dist/js'))
});


gulp.task('dist', ['default'], function() {  
  return gulp.src('dist/js/chasm.js')
    .pipe(babel({
      presets: ['babel-preset-es2015']
    }))
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(rename('chasm.min.js'))
    .pipe(gulp.dest('dist/js'))
    .on('error', gutil.log)
});

