var mongoose = require('mongoose');
var Genre = require('../models/genre');
var Book = require('../models/book');
var async = require('async');

exports.genre_list = function (req, res, next) {
  Genre.find()
    .sort([['name', 'ascending']])
    .exec(function (err, list_genres) {
      if (err) {
        return next(err);
      }
      // Successful, so render.
      res.render('genre_list', {
        title: 'Genre List',
        list_genres: list_genres,
      });
    });
};

exports.genre_detail = function (req, res, next) {
  var id = mongoose.Types.ObjectId(req.params.id);
  async.parallel(
    {
      genre: function (callback) {
        Genre.findById(req.params.id).exec(callback);
      },

      genre_books: function (callback) {
        Book.find({ genre: req.params.id }).exec(callback);
      },
    },
    function (err, results) {
      if (err) {
        return next(err);
      }
      if (results.genre == null) {
        // No results.
        var err = new Error('Genre not found');
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render('genre_detail', {
        title: 'Genre Detail',
        genre: results.genre,
        genre_books: results.genre_books,
      });
    },
  );
};

exports.genre_create_get = function (callback) {
  res.send('NOT IMPLEMENTED: Genre create GET');
};

exports.genre_create_post = function (callback) {
  res.send('NOT IMPLEMENTED: Genre create POST');
};

exports.genre_delete_get = function (callback) {
  res.send('NOT IMPLEMENTED: Genre delete GET');
};

exports.genre_delete_post = function (callback) {
  res.send('NOT IMPLEMENTED: Genre delete POST');
};

exports.genre_update_get = function (callback) {
  res.send('NOT IMPLEMENTED: Genre update GET');
};

exports.genre_update_post = function (callback) {
  res.send('NOT IMPLEMENTED: Genre update POST');
};
