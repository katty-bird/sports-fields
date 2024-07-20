import React from 'react'
import PropTypes from 'prop-types'

const MyReviews = ({ reviews, onReviewClick }) => (
  <div>
    {reviews.map(review => (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line max-len,jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
      <div key={review.id} onClick={() => onReviewClick(review.location)}>
        <h2>{review.field}</h2>
        <p>{review.review}</p>
      </div>
    ))}
  </div>
)

MyReviews.propTypes = {
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    field: PropTypes.string.isRequired,
    review: PropTypes.string.isRequired,
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired
    }).isRequired
  })).isRequired,
  onReviewClick: PropTypes.func.isRequired
}

export default MyReviews
