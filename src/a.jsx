import React from 'react';
import axios from 'axios';

export default class A extends React.PureComponent {
  componentDidMount() {
    axios({
      method: 'get',
      url: '/api/list',
      responseType: 'json'
    })
      .then(function (response) {
        console.log(response);
      });
  }
  render() {
    return <div>AAAAA</div>
  }
}
