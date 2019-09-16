import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { processSearch } from '../../actions/searchActions'

import ResultsGrid from '../../components/ResultsGrid'

class SearchResults extends Component {
  componentDidMount() {
    this.props.processSearch()
  }

  render() {
    let resultItems = this.props.results.results ?
      this.props.results.results.map(result => (
        <div className="col-12 col-md-6 col-xl-3" key={result.id}>
          <div className="card mb-3">
            <div className="row no-gutters">
              <div className="col-4">
                <img src={`https://image.tmdb.org/t/p/original/${result.poster_path}`} className="card-img" alt="..." />
              </div>
              <div className="col-8">
                <div className="card-body">
                  <h5 className="card-title">{result.original_title}</h5>
                  <p className="card-text">{result.overview}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )) : <div></div>

    return (
      <div className='SearchResults' >
        <div className="display-4">Search Results</div>
        <ResultsGrid>
          {resultItems}
        </ResultsGrid>
      </div>
    );
  }
}

SearchResults.propTypes = {
  processSearch: PropTypes.func.isRequired,
  results: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  results: state.search.results
})

export default connect(mapStateToProps, { processSearch })(SearchResults)
