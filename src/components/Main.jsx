import React, { Component, PropTypes } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';

class Main extends Component {
  render() {
    return (
      <Provider store={this.props.store}>
        <Router>
          <div>
            <Route exact path="/" component={FirstPage} />
            <Route path="/second" component={SecondPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

Main.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Main;

