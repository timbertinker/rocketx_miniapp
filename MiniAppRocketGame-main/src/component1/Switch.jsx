/* eslint-disable react/prop-types */
import React, { memo } from 'react'

export default memo(function Switch (props) {
  return (
    <label className="switch">
      <input type="checkbox" {...props}/>
      <span className="slider"></span>
    </label>
  )
})
