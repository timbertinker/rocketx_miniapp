import React, {useState, useContext} from "react";
import InputNumber from "../../component1/InputNumber";
import AppContext from "../../component1/AppContext";


const PannelSetting = () =>{
  const [bet, setBet] = useState(1)
  const [autoStop, setAutoStop] = useState(20)
  const [stopWasPressed, setStopWasPressed] = useState(false)
  const context = useContext(AppContext)
  
  const stopGame = () =>{
    setStopWasPressed(true)
    context.socket.send(JSON.stringify({ operation: 'stop' }))
  }

  return(
    
    <div className="flex w-full  gap-4">
      <InputNumber InputProps={{ value: bet, min: 1, step: 1, onChange: e => { setBet(parseFloat(e.target.value)) } }}/>
      <InputNumber InputProps={{ value: autoStop, min: 1.01, max: 100, step: 1, onChange: e => { stopGame(); setAutoStop(parseFloat(e.target.value)) } }}/>
    </div>
  )
}
export default PannelSetting;