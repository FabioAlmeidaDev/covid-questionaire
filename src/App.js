import React, { useState } from 'react';
import i16n from './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.scss';

// Pages
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import i18n from './i18n';

function App() {
  const [language, setLanguage] = useState('en');

  const changeLanguage = (ln) => {
    return () => {
      setLanguage(ln);
      i18n.changeLanguage(ln);
    };
  };

  const backbutton = () => {
    const loc = window.location.href;
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if (loc.indexOf('/projects') > -1) {
      return (
        <div className="home-button">
          <a href={`/#project-id-${urlParams.get('id')}`}>
            <FontAwesomeIcon icon={faHome} /> Home
          </a>
        </div>
      );
    } else {
      return '';
    }
  };
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
