import React, { Component } from 'react';

let AmountColorItems = function (props) {
    return (
        <p className="colors-add-counter">
            Colors: {props.counter}
        </p>
    );
}

export default AmountColorItems;