import React from 'react';
import { render } from 'react-dom';
import 'babel-polyfill';
import A from './a';
import './commom';
import './index.less';

const App = () => (
  <div>
    <img src={require('./logo.svg')} alt="logo" />
    <h2>welcome to react-full-start</h2>
    <A />
  </div>
);


if (module.hot) { // hmr necessary
  module.hot.accept();
}

render(<App />, document.getElementById('root'));
