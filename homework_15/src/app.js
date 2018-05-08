import React, { Component } from 'react';
// This plugin automatically reload page on changes
import { hot } from 'react-hot-loader';

let colors = [];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storage: colors,
      selected: [],
    };
  }

  componentDidMount() {
    let that = this;
    fetch('https://epam-fe-homework-15.firebaseio.com/colors.json')
      .then(function (response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' + response.status);
          return;
        }
        response.json().then(function (data) {
          colors = data;
          that.setState({ storage: colors })
          console.log('fetch data colors >>>', data);
          return data;
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="container-header">

          <div className="colors-add-field">


          </div>
        </div>

      </div>
    );
  }
}

// Note: Hot reloading occurs after you save file in the editor.
export default hot(module)(App);