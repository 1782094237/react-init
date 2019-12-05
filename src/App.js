import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';

import './style.css';


import IfLogin from './iflogin';
import Lay from './layout'


require('./static/icons/iconfont.js')
// http://27y6v05022.wicp.vip:40292/
// http://121.40.217.108:8080/
localStorage.api = "http://121.40.217.108:8080/";
console.log(localStorage.api)
class App extends Component {

  render(){
    return(
      <Fragment>
        <Provider store = { store }>
          <IfLogin />
          {/* <Main></Main> */}
        </Provider>
      </Fragment>
    );
  }
  
}


export default App;


