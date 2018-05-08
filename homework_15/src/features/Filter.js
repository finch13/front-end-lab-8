import React, { Component } from 'react';

let Filter = function (props) {
  return (
    <input
      onChange={props.handleSearch}
      id="search"
      className="form-control"
      type="text"
      placeholder="Color's name, tags"
    />
  );
}

export default Filter;