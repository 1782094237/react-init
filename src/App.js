import React, { Fragment, Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import store from './store';

import './style.css';


import IfLogin from './iflogin';
import Lay from './layout'

require('./static/icons/iconfont.js')

localStorage.api = "http://121.40.217.108:8080/";
console.log(localStorage.api)
class App extends Component {

  render(){
    return(
      <Fragment>
        <Provider store = { store }>
          <IfLogin />
          {/* <Lay /> */}
          {/* <BrowserRouter>
              <Fragment>
                <Route path = '/' exact component={Home}></Route>
                <Route path = '/detail' exact component={Detail}></Route>
                <Route path = '/' exact render={() => <div>home</div>}></Route>
                <Route path = '/detail' exact render={() => <div>detail</div>}></Route>
              </Fragment>
          </BrowserRouter> */}
        </Provider>
      </Fragment>
    );
  }
  
}


export default App;


