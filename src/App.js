import React, { Fragment, Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import IfLogin from './iflogin';
import Lay from './layout'
import './style.css';
import { isLogicalExpression } from '@babel/types';
require('./static/icons/iconfont.js')
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


