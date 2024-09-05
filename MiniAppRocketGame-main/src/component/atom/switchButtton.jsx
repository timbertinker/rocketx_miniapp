import React,{useState} from "react";
import  "../../css_generated/Switch.css"


const SwitchButton = (props) =>{
  const [ isSelected, setSelected ] = useState(false);
  
  return (
    <label className="switch">
      <input type="checkbox" {...props}/>
      <span className="slider"></span>
    </label>
  )
}

export default SwitchButton;