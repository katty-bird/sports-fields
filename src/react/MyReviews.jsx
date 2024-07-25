import React, { useState, useEffect } from 'react'
import GoogleMap from './GoogleMap' // Import the updated GoogleMap component

const MyReviews = () => {
  const [reviews, setReviews] = useState([])
  const [userPosition, setUserPosition] = useState(null)

  useEffect(() => {
    // Fetch user reviews with location data (replace with your logic)
    fetch('/api/user/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error))
  }, [])

  useEffect(() => {
    // Update user position from GoogleMap component (if available)
    const handleUserPositionUpdate = position => {
      setUserPosition(position)
    }

    // Add listener for user position updates (replace with your event system)
    window.addEventListener('userPositionUpdated', handleUserPositionUpdate)

    return () => {
      // Remove listener on component unmount
      window.removeEventListener('userPositionUpdated', handleUserPositionUpdate)
    }
  }, [])

  return (
    <div>
      <h1>My Reviews</h1>
      {reviews.length > 0 ? (
        <div>
          {reviews.map(review => (
            <div key={review.id}>
              {/* Display review details (including location from review data) */}
              <p>{review.title}</p>
              <p>{review.text}</p>
              {userPosition && (
                <GoogleMap
                  // Center the map on review location if user position is available
                  mapCenter={{ lat: review.location.lat, lng: review.location.lng }}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>You haven not written any reviews yet.</p>
      )}
    </div>
  )
}

export default MyReviews
