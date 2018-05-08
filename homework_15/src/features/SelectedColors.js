import React, { Component } from 'react';

let SelectedColors = function (props) {

  if (props.selectiondata.length === 0) {
    return (
      <ul className="selected-colors">
        <li className="unselected-color__container first_item"></li>
        <li className="unselected-color__container second_item"></li>
        <li className="unselected-color__container third_item"></li>
      </ul>
    );
  } else {
    let currentArrayColors = null;
    if (props.selectiondata.length <= 5) {
      currentArrayColors = props.selectiondata;
    } else {
      let tempSelectionStorage = props.selectiondata;
      currentArrayColors = tempSelectionStorage.slice(-5);
    }
    return (
      <ul className="selected-colors">
        {
          currentArrayColors.map(function (element) {
            let colorVariable = element.color;
            let liStyle = {
              backgroundColor: colorVariable
            };
            return (
              <li className="selected-color__container"
                key={element.id}
              >
                <div className="selected-color__item"
                  style={liStyle}
                >
                  <i className="material-icons remove-color"
                    onClick={() => props.handleDelete(element)}
                  >
                    clear
                  </i>
                </div>
                <span>{element.id}</span>
              </li>
            );
          })
        }
      </ul>
    );
  }
}

export default SelectedColors;