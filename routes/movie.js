const express = require('express');
const router = express.Router();

const Movie = require('../models/Movie');

router.get('/top10', (req, res) => {
  const promise = Movie.find({}).limit(10).sort({imdb_score: -1});

  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});


router.get('/', (req, res) => {
  const promise = Movie.find({});
  promise.then((data) => {
    res.json(data);
  })
      .catch((err) => {
    res.json(err);
  })
});

router.delete('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);
  promise.then((movie) => {
    if (!movie)
      next({message: 'The movie was not found.', code: 99});
    res.json("Movie has been deleted");
  }).catch((err) => {
    res.json(err);
  });
});


router.put('/:movie_id', (req, res, next) => {
  const promise = Movie.findByIdAndUpdate(
      req.params.movie_id,
      req.body,
      {
        new: true
      }
  );
  promise.then((movie) => {
    if (!movie)
      next({message: 'The movie was not found.', code: 99});
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/:movie_id', (req, res) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

router.post('/', (req, res) => {
  const movie = new Movie(req.body);
  movie.save((err, data) =>{
    if (err)
      res.json(err);

    res.json(data);
  });
});



module.exports = router;
