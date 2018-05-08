import React, { Component } from 'react';

let ListAvailableColor = function (props) {
  if (!props.colorIsFound) {
    return (
      <div className="container-body">
        <ul className="list-group-colors">
          {
            props.data.map(function (element) {
              let colorVariable = element.color;
              let liStyle = {
                backgroundColor: colorVariable
              };

              return (
                <li
                  style={liStyle}
                  className="color-item"
                  key={element.id}
                >
                  <button
                    onClick={() => props.handleAdd(element)}
                    className="add-color-button"
                  >
                    <i className="material-icons add_color">add</i>
                    Add
                  </button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  } else {
    return <p className="no-colors">There are no colors found</p>
  }
}

export default ListAvailableColor;