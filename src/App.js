import React, {useState} from 'react';
import InstantButtonMatrix from "./InstantButtonMatrix";
import PopUp from "./PopUp"
import ReactLoading from "react-loading";

import firebase from 'firebase/app';
import 'firebase/database';

import {useObject} from 'react-firebase-hooks/database';

const firebaseConfig = require("./firebaseConfig.json");
firebase.initializeApp(firebaseConfig)

export default function App() {
    const [buttonData, buttonDataLoading] = useObject(firebase.database().ref('buttons'));
    const [channelData] = useObject(firebase.database().ref('channel'));

    const [popupIndex, setPopupIndex] = useState(null);

    function buttonCallback(index, secondary) {
        if (buttonData.val()?.[index] == null || secondary) {
            setPopupIndex(index)
        } else {
            if (!buttonData.val()?.[index].activeChannel) {
                buttonData.ref.child(index.toString()).child("activeChannel").set(channelData.val())
            } else {
                buttonData.ref.child(index.toString()).child("activeChannel").remove()
            }
        }
    }

    function popupCallback(newData) {
        if (newData !== undefined) {
            buttonData.ref.child(popupIndex.toString()).set(newData)
        }
        setPopupIndex(null)
    }

    function handleChannelInputEvent(event) {
        channelData.ref.set(event.target.value)
    }

    return (
        <>
            <header className="main-header">
                <h1>Instant Buttons</h1>
                <p>Press a button to play it's sound!<br/>
                    Long press to customize!</p>
                <form><input className="channel-field" type="text" value={channelData?.val() || ""} placeholder="Channel to join"
                             onChange={handleChannelInputEvent}/></form>
            </header>
            <div className='center-container'>
                {buttonDataLoading
                    ? <ReactLoading type={"bars"} color={"#80A1C1"} width={"128px"} height={"128px"}/>
                    : <InstantButtonMatrix data={buttonData.val() || []} width={6} height={6}
                                           callback={buttonCallback}/>}
            </div>
            {popupIndex != null &&
            <PopUp callback={popupCallback} defaultValue={buttonData.val()?.[popupIndex]}/>}
        </>
    )
}