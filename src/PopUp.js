import React from 'react';
import PropTypes from 'prop-types';
import './PopUp.css';

export default function PopUp({defaultValue, callback}) {

    function submit(event) {
        event.preventDefault()

        const data = new FormData(event.target)
        const newValue = {
            name: data.get("name"),
            link: data.get("link"),
            start: data.get("start"),
            end: data.get("end")
        }

        callback(newValue)
    }

    return (
        <>
            <div className="popup-pane" onClick={() => callback()}/>
            <div className="popup">
                <header>
                    <h2>Customize Instant Button</h2>
                </header>
                <div className="popup-body">
                    <form onSubmit={submit} id="customize-instant-button">
                        <div className="popup-field-group">
                            <label htmlFor="name" className="asterisk">Name</label>
                            <input id="name" name="name" type="text" placeholder="Name for the Button"
                                   defaultValue={defaultValue?.name || ""} required
                                   pattern="([A-Za-z0-9!? ])+"/>
                        </div>
                        <div className="popup-field-group">
                            <label htmlFor="link" className="asterisk">YT-Link</label>
                            <input id="link" name="link" type="url" placeholder="https://www.youtube.com/watch?v="
                                   defaultValue={defaultValue?.link || ""} required/>
                        </div>
                    </form>
                </div>
                <footer>
                    {defaultValue && <input title="Clear Instant Button" className="clear" type="button" onClick={() => callback(null)}
                                            value="Clear"/>}
                    <input title="Cancel and return" className="cancel" type="button" onClick={() => callback()}
                           value="Cancel"/>
                    <input title="Apply instant button options" className="apply"
                           form="customize-instant-button"
                           type="submit" value="Apply"/>
                </footer>
            </div>
        </>
    );
}

PopUp.propTypes = {
    defaultValue: PropTypes.object,
    callback: PropTypes.func.isRequired
};

/*
                        <div className="popup-field-group">
                            <label htmlFor="start">Start Time</label>
                            <input className="short" id="start" name="start" type="text" placeholder="00:00"
                                   defaultValue={defaultValue?.start || ""} pattern="([0-5]?[0-9]:[0-5][0-9])"/>
                            <label htmlFor="end">End Time</label>
                            <input className="short" id="end" name="end" type="text" placeholder="00:00"
                                   defaultValue={defaultValue?.end || ""} pattern="([0-5]?[0-9]:[0-5][0-9])"/>
                        </div>

 */