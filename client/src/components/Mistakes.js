import React from 'react'
import PropTypes from 'prop-types'

const Mistakes = ({ error }) => {
  if (!error) return null
  return (
    <p>{error.message}</p> ||
    error.map((err, index) => <p key={index}>{err.message}</p>)
  )
}

Mistakes.propTypes = {
  error: PropTypes.any,
}

export default Mistakes
