import React from 'react';
import PropTypes from 'prop-types';
import useLongPress from "./longPress";

export default function InstantButton(props) {
    let className = 'instant-button';
    if (props.data != null) {
        className += ' instant-button-with-link'
        if (props.data.activeChannel) {
            className += ' instant-button-active'
        }
    }

    const longPress = useLongPress(props.callback, props.secondaryCallback);

    return (
        <button className={className} {...longPress}>
            {props.data == null ? "EMPTY" : props.data.name}
        </button>
    );
}

InstantButton.propTypes = {
    data: PropTypes.object,
    callback: PropTypes.func,
    secondaryCallback: PropTypes.func
};