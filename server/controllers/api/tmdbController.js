const axios = require('axios')
const tmdbController = require('express').Router();
// const { JWTVerifier } = require('../../lib/passport');
// const db = require('../../models');
const tmdbKey = process.env.TMDB_KEY
const omdbKey = process.env.OMDB_KEY

tmdbController.get('/genres', (req, res) => {
  let genres = {}
  axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${tmdbKey}`)
    .then(movie => {
      axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${tmdbKey}`)
        .then(tv => {
          genres.movie = movie.data
          genres.tv = tv.data
          res.json(genres)
        })
        .catch(err => res.json(err))
    })
    .catch(err => res.json(err))
})

tmdbController.get('/popular', (req, res) => {
  let popular = {}
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${tmdbKey}`)
    .then(movie => {
      axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=${tmdbKey}`)
        .then(tv => {
          popular.movies = movie.data
          popular.shows = tv.data
          res.json(popular)
        })
    })
    .catch(err => res.json(err))
})

tmdbController.post('/search', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/search/multi?query=${req.body.data}&api_key=${tmdbKey}`)
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

tmdbController.get('/trending/:type', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/trending/${req.params.type}/week?api_key=${tmdbKey}`)
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

tmdbController.post('/movie', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/movie/${req.body.data}?api_key=${tmdbKey}&append_to_response=credits,recommendations`)
    .then(movie => res.json(movie.data))
    .catch(err => res.json(err))
})

tmdbController.post('/omdb', (req, res) => {
  axios.get(`http://www.omdbapi.com/?t=blade+runner&apikey=${omdbKey}`)
    .then(response => res.json(response.data))
    .catch(err => res.json(err))
})

tmdbController.post('/people', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/search/person?query=Harrison%20Ford&api_key=${tmdbKey}`)
    .then(response => {
      console.dir(response.data)
      res.json(response.data)
    })
    .catch(err => res.json(err))
})

tmdbController.post('/person', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/person/3?api_key=${tmdbKey}`)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => res.json(err))
})

tmdbController.post('/person/movies', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/person/3/combined_credits?api_key=${tmdbKey}`)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => res.json(err))
})

tmdbController.post('/directors', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/search/person?query=Ridley%20Scott&api_key=${tmdbKey}`)
    .then(response => {
      console.dir(response.data)
      res.json(response.data)
    })
    .catch(err => res.json(err))
})

tmdbController.post('/director', (req, res) => {
  axios.get(`https://api.themoviedb.org/3/person/578?api_key=${tmdbKey}`)
    .then(response => {
      res.json(response.data)
    })
    .catch(err => res.json(err))
})

module.exports = tmdbController;