import React from 'react';
import { render } from 'react-dom';
import './index.less';

const App = () => (
  <div>
    <img src={require('./logo.svg')} alt="logo" />
    <h2>welcome to react-quick-start</h2>
  </div>
);

if (module.hot) { // hmr necessary
  module.hot.accept();
}

render(<App />, document.getElementById('root'));