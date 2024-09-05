/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React, { memo, useState } from 'react'
import "../css_generated/DropDown.css";

export default memo(function DropDown ({ label, content, onChange }) {
  const [showDropDown, setShowDropDown] = useState(false)
  const [selected, setSelected] = useState(label)
  const [list, setList] = useState(content)

  return (
    <div
      onClick={() => setShowDropDown(!showDropDown)}
      onMouseLeave={() => setShowDropDown(false)}
      className={`dropdown text-black h-11 ${showDropDown ? 'show-dropdown' : ''}`}>
      <span className='d-d '>{selected}</span>
      <img src='image/icon/down-arrow.png'/>
      <div className='dropdown-content w-full relative rounded-xl'>
        {list.map((i,index) => <p key = {index} onClick={e => {
          setList([...list.filter(i => i !== e.target.innerText), selected])
          setSelected(e.target.innerText)
          onChange(e.target.innerText)
        }}>{i}</p>)}
      </div>
    </div>
  )
})
