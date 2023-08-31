// REACT
import React, { useEffect, useState } from 'react'

// STYLES
import "./SettingsModal.css"

function SettingsModal(props) {
    const [checked, setChecked] = useState([]);
  
    const handleCheck = (event) => {
        var updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };
    
  
    useEffect(() => {
       
        props.setSettingsArr(checked)
       
    },[props.isSettings, checked])
  


  return (
    <div className='settings-modal-con'>
        <div className='settings-checkbox-con'>
            {props.tagList.map((item, index) => (
            <div key={index}>
                <input value={item} type="checkbox" onChange={handleCheck} />
                <span>{item}</span>
            </div>
            ))}
        </div>
    </div>
  )
}

export default SettingsModal