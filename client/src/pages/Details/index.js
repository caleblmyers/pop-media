import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'
import { getDetails } from '../../store/actions/searchActions'

import './style.css'
import AuthContext from '../../contexts/AuthContext'
import API from '../../lib/API'
import CastSlider from '../../components/CastSlider'
import Carousel from '../../components/Carousel'

class Details extends Component {
  static contextType = AuthContext

  state = {
    isLoaded: false,
    message: "",
    messageType: "",
    // castSlide: 1,
    // maxSlide: 0,
    cast: []
  }

  componentDidMount() {
    this.props.getDetails(this.props.location.state.type, this.props.location.state.id)
    setTimeout(() => this.setState({
      isLoaded: true,
      // maxSlide: Math.floor(this.props.details.credits.cast.length / 5),
      cast: this.props.details.credits.cast
    }), 2000)
  }

  addFavorite = (type, id, title, userId, token) => {
    API.Favorites.add(type, id, title, userId, token)
      .then(res => {
        let message = ""
        let messageType = ""
        if (res.data.errors) {
          message = res.data.errors[0].type === "unique violation" ? "This item is already on your favorites!" : "Unknown error"
          messageType = "danger"
        } else {
          message = `${res.data.title} added to favorites!`
          messageType = "success"
        }
        this.setState({ message, messageType })
        console.log(res)
      })
      .catch(err => console.log(err))
  }

  // changeCast = (slide, e) => {
  //   if (e.target.id === "next") this.setState({ castSlide: slide + 1 })
  //   else this.setState({ castSlide: slide - 1 })
  // }

  render() {
    const { details } = this.props
    const { user } = this.context

    return (
      <div className="Details p-4">
        {!this.state.isLoaded ? (
          <div>Loading...</div>
        ) : (
            <div className="container">
              {this.state.message &&
                <div className='row'>
                  <div className='col'>
                    <div className={`alert alert-${this.state.messageType} mb-3`} role='alert'>
                      {this.state.message}
                    </div>
                  </div>
                </div>}
              <div className="row p-3 bg-light-grey" id="details-body">
                <div className="col-9 px-3">
                  <div className="p-3" id="details-header">
                    <div className="row no-gutters">
                      <div className="col">
                        <div className="h2">{details.title || details.name}</div>
                      </div>
                    </div>
                    {details.tagline &&
                      <div className="row no-gutters">
                        <div className="col">
                          <small>{details.tagline}</small>
                        </div>
                      </div>}
                    <div className="row no-gutters">
                      <div className="col">
                        <div>
                          Released:
                          {moment((
                            details.release_date || details.first_air_date
                          ), "YYYY-MM-DD").format(" MMMM Do, YYYY")}
                        </div>
                      </div>
                      {details.genres && <div className="col">
                        <div>
                          Genres:
                          {details.genres.map(genre => (
                            <span key={genre.id}> {genre.name}</span>
                          ))}
                        </div>
                      </div>}
                      {details.runtime &&
                        <div className="col">
                          <div>
                            Runtime: {`${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`}
                          </div>
                        </div>}
                    </div>
                  </div>

                  <div className="row no-gutters my-4">
                    <div className="col-8">
                      <div className="h5">Overview</div>
                      <p>{details.overview}</p>
                    </div>
                    <div className="col-4">
                      <div>
                        Rating: {details.vote_average} <small>({details.vote_count})</small>
                      </div>
                      {user && <div>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => this.addFavorite(
                            this.props.location.state.type,
                            this.props.location.state.id,
                            (details.title || details.name),
                            this.context.user.id,
                            this.context.authToken
                          )}>Favorite</button>
                      </div>}
                    </div>
                  </div>
                </div>
                <div className="col-3">
                  <img className="img-fluid rounded" src={`https://image.tmdb.org/t/p/original/${details.poster_path}`} alt="Poster" />
                </div>
              </div>

              <div className="row">
                <div className="col-12 col-lg-9 p-3 text-left">
                  <div className="h4"><strong>Cast</strong></div>
                  <CastSlider cast={details.credits.cast} />
                  <div className="row pt-2">
                    <div className="mr-auto col-8">
                      <div className="h4"><strong>Recommended</strong></div>
                    </div>
                    <div className="ml-auto col-3">
                      <div className="h4"><strong>Collection</strong></div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="mr-auto col-8 bg-light-grey border-round py-2">
                      <Carousel data={details.recommendations.results} type="movie" />
                    </div>
                    <div className="ml-auto col-3 bg-light-grey border-round py-2">
                    </div>
                  </div>
                </div>
                <div className="col-3 p-3 text-left">
                  <div className="h4"><strong>Crew</strong></div>
                  <div className="row no-gutters bg-light-grey border-round py-2">
                    <div className="col-12">
                      {details.credits.crew.slice(0, 8).map(person => (
                        <div className="pl-2 py-1" key={person.credit_id}>
                          <div className="text-sm"><strong>{person.name}</strong></div>
                          <div className="text-xs">{person.job}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="h4 mt-2"><strong>Facts</strong></div>
                  <div className="row no-gutters bg-light-grey border-round py-2">
                    <div className="col-12">
                      <div className="pl-2 py-1">
                        <div className="text-sm"><strong>Revenue</strong></div>
                        <div className="text-xs">${details.revenue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                      </div>
                      <div className="pl-2 py-1">
                        <div className="text-sm"><strong>Budget</strong></div>
                        <div className="text-xs">${details.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</div>
                      </div>
                      <div className="pl-2 py-1">
                        <div className="text-sm"><strong>Production Companies</strong></div>
                        {details.production_companies.map(company => (
                          <div className="text-xs" key={company.id}>{company.name}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-8">
                  Comments
                </div>
                <div className="col-4">
                  Ratings
                </div>
              </div>
            </div>
          )
        }
      </div>
    )
  }
}

Details.propTypes = {
  getDetails: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  details: state.search.details
})

export default connect(mapStateToProps, { getDetails })(Details)