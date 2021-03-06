import React, { Component } from 'react';

import './style.css'
import AuthContext from '../../contexts/AuthContext'
import API from "../../lib/API"
import SearchBar from '../../components/SearchBar';
import Carousel from '../../components/Carousel';
import Table from '../../components/Table';
import Loader from '../../components/Loader';

class HomePage extends Component {
  static contextType = AuthContext

  state = {
    movies: [],
    topMovies: [],
    nowPlaying: [],
    shows: [],
    topShows: [],
    popularShows: [],
    isLoaded: false
  }

  componentDidMount() {
    this.gatherData()
  }

  gatherData = () => {
    API.TMDB.trending('movie')
      .then(movies => {
        if (!movies.data.results) return this.gatherData()
        API.TMDB.topRated('movie')
          .then(topMovies => {
            if (!topMovies.data.results) return this.gatherData()
            API.TMDB.nowPlaying()
              .then(nowPlaying => {
                if (!nowPlaying.data.results) return this.gatherData()
                API.TMDB.trending('tv')
                  .then(shows => {
                    if (!shows.data.results) return this.gatherData()
                    API.TMDB.topRated('tv')
                      .then(topShows => {
                        if (!topShows.data.results) return this.gatherData()
                        API.TMDB.popular('tv')
                          .then(popularShows => {
                            if (!popularShows.data.results) return this.gatherData()

                            this.setState({
                              movies: movies.data.results,
                              topMovies: topMovies.data.results,
                              nowPlaying: nowPlaying.data.results,
                              shows: shows.data.results,
                              topShows: topShows.data.results,
                              popularShows: popularShows.data.results,
                              isLoaded: true
                            })
                          })
                      })
                  })
              })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div className='Home'>
        <div className="jumbotron jumbotron-fluid">
          <div className="container">
            <div className="display-3">Pop Media</div>
            <div className="lead pt-2">Discover something new!</div>
            <SearchBar handler={() => { }} />
          </div>
        </div>

        {!this.state.isLoaded ? (
          <div className="position-relative">
            <Loader />
          </div>
        ) : (
            <div className="Featured">
              <div className="h2 text-center">Movies</div>
              <div className="row no-gutters">
                <div className="col-12 col-md-8">
                  <div className="row no-gutters">
                    <div className="col-12 col-xl-6 p-3">
                      <div className="h5">Featured</div>
                      <Carousel data={this.state.movies} type={"movie"} handler={console.log} />
                    </div>
                    <div className="col-12 col-xl-6 p-3">
                      <div className="h5">Top Rated</div>
                      <Carousel data={this.state.topMovies} type={"topMovie"} handler={console.log} />
                    </div>
                  </div>
                  {/* <div className="row no-gutters">
                    <div className="col-12">
                      <div className="h5">Editor Picks</div>
                    </div>
                  </div> */}
                </div>
                <div className="col-12 col-md-4 p-3">
                  <div className="h5">In Theaters</div>
                  <Table dataSet={this.state.nowPlaying.slice(0, 10)} type="movie" />
                </div>
              </div>

              <div className="h2 text-center">TV Shows</div>
              <div className="row no-gutters">
                <div className="col-12 col-md-8">
                  <div className="row no-gutters">
                    <div className="col-12 col-xl-6 p-3">
                      <div className="h5">Featured</div>
                      <Carousel data={this.state.shows} type={"show"} handler={console.log} />
                    </div>
                    <div className="col-12 col-xl-6 p-3">
                      <div className="h5">Top Rated</div>
                      <Carousel data={this.state.topShows} type={"topShow"} handler={console.log} />
                    </div>
                  </div>
                  {/* <div className="row no-gutters">
                    <div className="col-12">
                      <div className="h5">Editor Picks</div>
                    </div>
                  </div> */}
                </div>
                <div className="col-12 col-md-4 p-3">
                  <div className="h5">Today's Most Popular</div>
                  <Table dataSet={this.state.popularShows.slice(0, 10)} type="tv" />
                </div>
              </div>
            </div>)}
      </div>
    )
  }
}

export default HomePage
