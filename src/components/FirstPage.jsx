import React, { Component } from 'react';
import styles from './FirstPage.css';
import { Link } from 'react-router-dom';

class FirstPage extends Component {
  render() {
    return (<div className={styles.firstPage}>
      <h2>This is actually obnoxious...</h2>
      <Link to="/second">Go to second</Link>
    </div>);
  }
}

export default FirstPage;
