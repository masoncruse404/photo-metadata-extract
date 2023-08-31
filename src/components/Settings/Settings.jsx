// REACT
import React, { useEffect, useState } from 'react'

// ICONS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

// STYLES
import "./Settings.css"
import SettingsModal from '../../modals/SettingsModal/SettingsModal'
function Settings(props) {
    const [settingsArr, setSettingsArr] = useState([])
    

    function toggleSettingsModal(e){
        e.preventDefault()
        props.setIsSettingsModal(!props.isSettingsModal)
    }

    useEffect(() => {
        props.setTagArr(settingsArr)
       
    }, [settingsArr, props.isSettingsModal])
    return (
        <div className='settings-wrapper'>
            <div className='settings-con' onClick={e => toggleSettingsModal(e)}>
                <FontAwesomeIcon
                        size="lg" 
                        icon={faGear} className='mx-3 fa-trash'
                    
                />
            </div>
            <div className={props.isSettingsModal ? '' : 'd-none'}>
                <SettingsModal tagList={props.tagList} isSettingsModal={props.isSettingsModal} setSettingsArr={setSettingsArr} settingsArr={settingsArr}/>
            </div>
        </div>
    )
}

export default Settings