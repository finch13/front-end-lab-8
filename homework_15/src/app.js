import React, { Component } from 'react';
// This plugin automatically reload page on changes
import { hot } from 'react-hot-loader';

import ListAvailableColor from './features/ListAvailableColor';
import Filter from './features/Filter';
import AmountColorItems from './features/AmountColorItems';
import SelectedColors from './features/SelectedColors';

let colors = [];


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initial: colors,
      storage: colors,
      temporaryStorage: colors,
      selected: [],
    };
    this.colorIsFound = false;

    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
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
          console.log('fetch data colors >>>', colors)
          that.setState({ storage: colors });
        });
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });
  }

  handleSearch(element) {
    let tempSelectedSearch = this.state.selected;
    let tempStorageSearch = colors.filter(filtredElement => {
      if (filtredElement.tags.toString().toLowerCase()
        .includes(element.target.value.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    });

    if (tempSelectedSearch.length > 0) {
      tempSelectedSearch.forEach(e => {
        for (let i = 0; i < tempStorageSearch.length; i++) {
          if (e.id === tempStorageSearch[i].id) {
            tempStorageSearch.splice(i, 1);
          }
        }
      })
    }

    if (tempStorageSearch.length === 0) {
      this.colorIsFound = true;
    } else {
      this.colorIsFound = false;
    }
    this.setState({ storage: tempStorageSearch });
  }

  handleAdd(element) {
    let tempStorageAdd = this.state.storage;
    let newSelectedStorage = this.state.selected;

    if (newSelectedStorage.length < 10) {
      newSelectedStorage.push(element);
      tempStorageAdd.forEach((e, index) => {
        if (e.id === element.id) {
          tempStorageAdd.splice(index, 1)
        }
      });
      this.setState({
        storage: tempStorageAdd,
        selected: newSelectedStorage
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="container-header">
          <Filter handleSearch={this.handleSearch} />
          <div className="colors-add-field">
            <SelectedColors
              selectiondata={this.state.selected}
            />
            <AmountColorItems counter={this.state.storage.length} />
          </div>
        </div>

        <ListAvailableColor
          colorIsFound={this.colorIsFound}
          data={this.state.storage}
          handleAdd={this.handleAdd}
        />

      </div>
    );
  }
}

// Note: Hot reloading occurs after you save file in the editor.
export default hot(module)(App);