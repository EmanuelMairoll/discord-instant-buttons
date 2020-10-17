import React from 'react';
import PropTypes from 'prop-types';
import InstantButton from "./InstantButton";

export default function InstantButtonMatrix(props) {

    function renderRows(data, width, height, callback) {
        let rows = []
        for (let index = 0; index < width * height; index += width) {
            rows.push(
                <div key={index / 4}>
                    {renderRow(index, data, width, callback)}
                </div>)
        }
        return rows;
    }

    function renderRow(startingAtIndex, data, width, callback) {
        let buttons = []
        for (let index = startingAtIndex; index < startingAtIndex + width; index++) {
            buttons.push(<InstantButton
                key={index}
                data={data[index]}
                callback={() => callback(index)}
                secondaryCallback={() => callback(index, true)}
            />)
        }
        return buttons;
    }

    return <div className={'button-matrix'}>
        {renderRows(props.data, props.width, props.height, props.callback)}
    </div>;
}

InstantButtonMatrix.propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    callback: PropTypes.func.isRequired
};