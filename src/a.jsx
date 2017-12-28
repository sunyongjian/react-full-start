import React from 'react';
import axios from 'axios';

export default class A extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    (async () => {
      const response = await axios({
        method: 'get',
        url: '/api/list',
        responseType: 'json',
      });
      console.log(response, 'response');
      const { data: { list = [] } = {} } = response;
      this.setState({
        list,
      });
    })();
  }

  render() {
    const { list } = this.state;
    return <ul>{list.length && list.map(item => (<li key={item.id}>{item.id + item.name}</li>))}</ul>;
  }
}
